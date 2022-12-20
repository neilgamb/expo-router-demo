import create from "zustand";
import { Auth } from "aws-amplify";

export type AuthQueryParams = {
  authCode?: string;
  animalOwnerSmsNumber?: string;
};

export type Header = {
  [key: string]: unknown;
};

interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authQueryParams: AuthQueryParams | null;
  headers: Header;
  authenticate: (authQueryParams?: AuthQueryParams) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAuthenticating: true,
  authQueryParams: null,
  headers: {},
  authenticate: async ({ authCode, animalOwnerSmsNumber }: AuthQueryParams) => {
    if (authCode && animalOwnerSmsNumber) {
      try {
        const token = await getResourceToken(animalOwnerSmsNumber, authCode);
        const headers = getHeadersWithToken(token);
        set(() => ({
          headers,
          isAuthenticated: true,
          isAuthenticating: false,
        }));
      } catch (error) {
        console.log(error);
        set(() => ({ isAuthenticating: false }));
      }
    } else {
      const session = await getCurrentSession();
      if (session) {
        try {
          const headers = getHeadersWithToken(
            session.getIdToken().getJwtToken()
          );
          set(() => ({
            headers,
            isAuthenticated: true,
            isAuthenticating: false,
          }));
        } catch (error) {
          console.log(error);
          set(() => ({ isAuthenticating: false }));
        }
      } else {
        set(() => ({ isAuthenticating: false }));
      }
    }
  },
}));

export default useAuthStore;

export const getCurrentSession = async () => {
  try {
    return await Auth.currentSession();
  } catch (error) {
    return null;
  }
};

export async function signIn(username: string) {
  try {
    return await Auth.signIn(username);
  } catch (error) {
    throw new Error(error);
  }
}

export async function answerCustomChallenge(cognitoUser: string, code: string) {
  try {
    return await Auth.sendCustomChallengeAnswer(cognitoUser, code);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getResourceToken(username: string, code: string) {
  const user = await signIn(username);
  await answerCustomChallenge(user, code);
  try {
    const authenticatedUser = await Auth.currentAuthenticatedUser();
    return authenticatedUser.getSignInUserSession().getIdToken().getJwtToken();
  } catch (error) {
    throw new Error(error);
  }
}

export function getHeadersWithToken(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}
