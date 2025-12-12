import { create } from 'zustand'

interface LayoutState {
  isHeaderVisible: boolean
  isBottomNavVisible: boolean
  setHeaderVisible: (visible: boolean) => void
  setBottomNavVisible: (visible: boolean) => void
  setFullscreen: (fullscreen: boolean) => void
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isHeaderVisible: true,
  isBottomNavVisible: true,
  setHeaderVisible: (visible) => set({ isHeaderVisible: visible }),
  setBottomNavVisible: (visible) => set({ isBottomNavVisible: visible }),
  setFullscreen: (fullscreen) => set({ 
    isHeaderVisible: !fullscreen, 
    isBottomNavVisible: !fullscreen 
  }),
}))
