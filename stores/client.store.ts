import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Account } from "@/features/account/interfaces/account.interfaces";

interface ClientState {
    client: Account | null;
    setClient: (client: Account) => void;
    clearClient: () => void;
}

const STORE_KEY = "client";

const initialValues: ClientState = {
    client: null,
    setClient: () => { },
    clearClient: () => { },
};

export const useClientStore = create<ClientState>()(
    devtools(
        persist(
            (set) => ({
                ...initialValues,
                setClient: (client: Account) => set({ client }),
                clearClient: () => set({ client: null }),
            }),
            {
                name: STORE_KEY,
            }
        )
    )
);

export const getClientStoreState = () => useClientStore.getState();
