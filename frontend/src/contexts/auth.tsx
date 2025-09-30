import { createContext, type ReactElement, useContext, useEffect, useState } from "react";
import { createStore, type StoreApi, useStore } from "zustand";
import { client } from "@/client";
import { useLocalStorage } from "@uidotdev/usehooks";

type User = NonNullable<Awaited<ReturnType<typeof client.login.post>>['data']>;
type LoginFn = (creds: { user_name: string, password: string }) => Promise<{ success: true } | { success: false, error: string }>;

export type AuthStore = ({
    user: User,
    loggedIn: true,
} | {
    user: null,
    loggedIn: false,
}) & {
    actions: {
        login: LoginFn,
        logout: () => void,
    }
};

const AuthContext = createContext<StoreApi<AuthStore> | null>(null);

export function AuthStoreContextProvider({ children }: { children: ReactElement }) {
    const [localStorageUser, setLocalStorageUser] = useLocalStorage<User | null>("user", null);

    const [store] = useState(() => createStore<AuthStore>((set) => ({
        user: null,
        loggedIn: false,
        actions: {
            login: async (creds: { user_name: string, password: string }) => {
                try {
                    const req = await client.login.post({ user_name: creds.user_name, password: creds.password });

                    if (req.error) {
                        throw new Error('Nombre de usuario o contraseña incorrectos');
                    }

                    const { token, ...user } = req.data;

                    set(() => ({
                        token: token,
                        user: user as User,
                        loggedIn: true,
                    }));

                    setLocalStorageUser({
                        ...user,
                        token
                    });

                    
                    return { success: true };
                } catch (err: unknown) {
                    const message =
                        typeof err === 'object' && err && 'message' in err
                            ? String((err).message)
                            : 'Error de red';
                    return { success: false, error: message };
                }
            },
            logout: () => set(() => ({ user: null }))
        }
    })));

    // biome-ignore lint/correctness/useExhaustiveDependencies: Only on first load
    useEffect(() => {
        
        if (localStorageUser) {
            const { token, ...user } = localStorageUser;
            console.log("loading localstorage user")
            
            store.setState(() => ({
                token,
                user: user as User,
                loggedIn: true
            }))
        }
    }, []);

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