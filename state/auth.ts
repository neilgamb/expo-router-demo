import create from "zustand";
import { Auth } from "aws-amplify";

type AuthQueryParam = {
  authCode: string;
  animalOwnerEmail: string;
  animalOwnerSmsNumber: string;
};

type Header = {
  [key: string]: unknown;
};

interface AuthState {
  isAuthenticated: boolean;
  queryParams: AuthQueryParam[];
  headers: Header;
  path: string;
  setPath: (path: string) => void;
  authenticate: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setQueryParams: (queryParams: AuthQueryParam[]) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  queryParams: [],
  headers: {},
  path: "home",
  setPath: (path: string) => set({ path }),
  authenticate: () => {
    console.log("authenticating...");
    getCurrentSession()
      .then(async (session) => {
        if (session) {
          const headers = getHeadersWithToken(
            session.getIdToken().getJwtToken()
          );

          set((state) => ({ headers, isAuthenticated: true }));
        } else {
          set((state) => {
            const { authCode, animalOwnerSmsNumber } = state.queryParams;
            let isAuthenticated = false;
            let headers = {};

            if (authCode && animalOwnerSmsNumber) {
              getResourceToken(animalOwnerSmsNumber, authCode).then((value) => {
                headers = getHeadersWithToken(value);
                isAuthenticated = true;
              });
              return { isAuthenticated, headers };
            }
          });
        }
      })
      .catch(() => set({ isAuthenticated: false }));
  },
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setQueryParams: (queryParams: AuthQueryParam[]) => set({ queryParams }),
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
