import { createContext, type ReactElement, useContext, useState } from "react";
import { createStore, type StoreApi, useStore } from "zustand";

type User = {
    username: string;
    first_name: string;
    last_name: string;
    token: string;
}

export type AuthStore = ({
    user: User,
    loggedIn: true,
} | {
    user: null,
    loggedIn: false,
}) & {
    actions: {
        login: (user: User) => void,
        logout: () => void,
    }
};

const AuthContext = createContext<StoreApi<AuthStore> | null>(null);

export function AuthStoreContextProvider({ children }: { children: ReactElement }) {
    const [store] = useState(() => createStore<AuthStore>((set) => ({
        user: null,
        loggedIn: false,
        actions: {
            login: (user: User) => set(() => ({ user })),
            logout: () => set(() => ({ user: null }))
        }
    })));

    return <AuthContext.Provider value={store}>
        {children}
    </AuthContext.Provider>
}

export function useAuthStore() {
    const store = useContext(AuthContext);

    if (!store) {
        throw new Error("Missing AuthStoreContextProvider!");
    }

    return useStore(store);
}