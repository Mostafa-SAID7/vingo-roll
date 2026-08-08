/**
 * UI Store - Global UI state management (modals, sidebars, preferences)
 * Manages non-persistent UI state that doesn't belong in domain stores
 */

import { create } from "zustand";

interface UIState {
  // Mobile menu state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  // Quick view / modal state
  quickViewOpen: boolean;
  setQuickViewOpen: (open: boolean) => void;

  // Filter sidebar state (mobile)
  filterSidebarOpen: boolean;
  setFilterSidebarOpen: (open: boolean) => void;

  // Toast/notification dismissal
  dismissedNotifications: string[];
  dismissNotification: (id: string) => void;
  clearDismissedNotifications: () => void;

  // Global loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  quickViewOpen: false,
  setQuickViewOpen: (open) => set({ quickViewOpen: open }),

  filterSidebarOpen: false,
  setFilterSidebarOpen: (open) => set({ filterSidebarOpen: open }),

  dismissedNotifications: [],
  dismissNotification: (id) =>
    set((state) => ({
      dismissedNotifications: [...state.dismissedNotifications, id],
    })),
  clearDismissedNotifications: () => set({ dismissedNotifications: [] }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
