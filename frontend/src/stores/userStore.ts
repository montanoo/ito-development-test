import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the user data interface
interface ILoginUserDatata {
  exists: object;
  refresher: string;
  token: string;
}

interface UserState {
  user: ILoginUserDatata | null;
  setUser: (user: ILoginUserDatata) => void;
}

// Create the Zustand store with persist middleware
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
