import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  token: string;
};

export type AuthActions = {
  saveToken: (token: string) => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return { token: "" };
};
export const defaultInitState: AuthState = {
  token: "",
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initState,
        saveToken: (token: string) =>
          set((state) => {
            return { token };
          }),
      }),
      {
        name: "auth",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
