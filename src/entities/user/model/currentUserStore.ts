import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ICurrentUser } from 'features/auth/api';

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
  ),
);
