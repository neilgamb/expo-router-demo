import create from "zustand";

type QueryParam = {
  param: string;
};

interface AuthState {
  isAuthenticated: boolean;
  queryParams: QueryParam[];
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setQueryParams: (queryParams: QueryParam[]) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  queryParams: [],
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setQueryParams: (queryParams: QueryParam[]) => set({ queryParams }),
}));

export default useAuthStore;
