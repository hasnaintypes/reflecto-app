

import { create } from 'zustand';
import type { UserProfile } from '@/types';
import type { UseBoundStore, StoreApi } from 'zustand';

export type UserState = {
  profile?: UserProfile;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
};

const useUserStore: UseBoundStore<StoreApi<UserState>> = create<UserState>((set) => ({
  profile: undefined,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: undefined }),
}));

export default useUserStore;

