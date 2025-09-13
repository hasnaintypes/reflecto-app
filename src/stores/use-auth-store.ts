import { create } from 'zustand';
import type { AuthStoreState, UserProfile } from '@/types';

const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: (user: UserProfile) => { set({ isAuthenticated: true, user }); },
  signOut: () => { set({ isAuthenticated: false, user: null }); },
}));


export default useAuthStore;
