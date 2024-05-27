import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ILoginUserDatata {
  exists: {
    id: string;
    email: string;
    roleId: number;
    password: string;
    createdAt: string;
  };
  refresher: string;
  token: string;
}

interface UserState {
  user: ILoginUserDatata | null;
  setUser: (user: ILoginUserDatata) => void;
  logout: () => void;
}

// Create the Zustand store with persist middleware
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
