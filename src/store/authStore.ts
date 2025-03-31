import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  hasPermission: (requiredRole: UserRole) => {
    const { user } = get();
    if (!user) return false;

    const roleHierarchy: { [key in UserRole]: number } = {
      super_admin: 3,
      admin: 2,
      teacher: 1,
      student: 0,
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  },
}));

export default useAuthStore;