import { api } from "@/services/api";
import { create } from "zustand";

export interface Auth {
  client_id: string;
  client_secret: string;
  access_token: string;
}

interface AuthStore {
  auth: Auth;
  authenticate: (client_id: string, client_secret: string) => Promise<void>;
  checkAuth: () => Promise<boolean>;
  isAuthenticated: boolean;
}

export const useAuth = create<AuthStore>((set) => ({
  auth: {
    client_id: "",
    client_secret: "",
    access_token: "",
  },
  isAuthenticated: false,
  authenticate: async (
    client_id: string,
    client_secret: string
  ): Promise<void> => {
    const { data } = await api.post("/auth/token", {
      client_id,
      client_secret,
    });

    const { access_token } = data;

    sessionStorage.setItem("@products-manager/token", access_token);

    set({
      auth: {
        client_id,
        client_secret,
        access_token,
      },
    });
  },
  checkAuth: async () => {
    const token = await sessionStorage.getItem("@products-manager/token");

    set({ isAuthenticated: !!token });

    return !!token;
  },
}));
