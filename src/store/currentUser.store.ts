import {create} from "zustand";
import {ICurrentUser} from "@repo/services";
import {createJSONStorage, persist} from "zustand/middleware";

interface CurrentUserState {
  currentUser: ICurrentUser | null;
  setCurrentUser: (userData: ICurrentUser | null) => void;
}

export const useCurrentUser = create<CurrentUserState>()(
    persist(
        (set) => ({
          currentUser: null,
          setCurrentUser: (userData: ICurrentUser | null) => {
            set({ currentUser: userData });
          },
        }),
        {
          name: 'currentUser',
          storage: createJSONStorage(() => localStorage),
        },
    ))
