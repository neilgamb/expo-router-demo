import create from "zustand";
import { Auth } from "aws-amplify";

type AuthQueryParams = {
  authCode: string;
  animalOwnerEmail: string;
  animalOwnerSmsNumber: string;
};

type Header = {
  [key: string]: unknown;
};

interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  queryParams: AuthQueryParams | null;
  headers: Header;
  authenticate: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setQueryParams: (queryParams: AuthQueryParams) => void;
}

const useAuthStore = create<AuthState>((set, state) => ({
  isAuthenticated: false,
  isAuthenticating: true,
  queryParams: null,
  headers: {},
  authenticate: async () => {
    try {
      const session = await getCurrentSession();
      if (session) {
        const headers = getHeadersWithToken(session.getIdToken().getJwtToken());
        set(() => ({
          headers,
          isAuthenticated: true,
          isAuthenticating: false,
        }));
      } else {
        console.log(state());
        const { authCode, animalOwnerSmsNumber } = state().queryParams;
        console.log(authCode, animalOwnerSmsNumber);
        if (authCode && animalOwnerSmsNumber) {
          const token = await getResourceToken(animalOwnerSmsNumber, authCode);
          const headers = getHeadersWithToken(token);
          set(() => ({
            headers,
            isAuthenticated: true,
            isAuthenticating: false,
          }));
        }
      }
    } catch (error) {
      setTimeout(() => {
        set(() => ({
          isAuthenticating: false,
        }));
      }, 200);
    }
  },
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setQueryParams: (queryParams: AuthQueryParams) => set({ queryParams }),
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
