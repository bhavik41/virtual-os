import { create } from 'zustand';

const initialFs = {
  '/': { type: 'dir', children: ['Users'] },
  '/Users': { type: 'dir', children: ['guest'] },
  '/Users/guest': { type: 'dir', children: ['Desktop', 'Documents', 'Downloads'] },
  '/Users/guest/Desktop': { type: 'dir', children: [] },
  '/Users/guest/Documents': { type: 'dir', children: ['notes.txt'] },
  '/Users/guest/Downloads': { type: 'dir', children: [] },
  '/Users/guest/Documents/notes.txt': { type: 'file', content: 'Virtual OS is awesome!' },
};

export const useStore = create((set) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,
  
  // File System State
  fs: initialFs,
  
  createNode: (path, node) => set((state) => {
    const parentPath = path.substring(0, path.lastIndexOf('/')) || '/';
    const name = path.substring(path.lastIndexOf('/') + 1);
    
    if (!state.fs[parentPath]) return state;
    
    const newFs = { ...state.fs, [path]: node };
    newFs[parentPath] = {
      ...state.fs[parentPath],
      children: [...new Set([...state.fs[parentPath].children, name])]
    };
    
    return { fs: newFs };
  }),

  // Window Management
  openApp: (app) => set((state) => {
    const existing = state.windows.find(w => w.appId === app.id);
    if (existing) {
      return {
        activeWindowId: existing.id,
        windows: state.windows.map(w => 
          w.id === existing.id 
            ? { ...w, isMinimized: false, zIndex: state.nextZIndex } 
            : w
        ),
        nextZIndex: state.nextZIndex + 1
      };
    }

    const newWindow = {
      id: `win_${Date.now()}`,
      appId: app.id,
      title: app.title,
      icon: app.icon,
      isMinimized: false,
      isMaximized: false,
      zIndex: state.nextZIndex,
      width: app.defaultWidth || 800,
      height: app.defaultHeight || 600,
      x: app.defaultX || Math.max(0, 100 + (state.windows.length * 30)),
      y: app.defaultY || Math.max(0, 50 + (state.windows.length * 30)),
      component: app.component
    };

    return {
      windows: [...state.windows, newWindow],
      activeWindowId: newWindow.id,
      nextZIndex: state.nextZIndex + 1
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
  })),

  focusWindow: (id) => set((state) => {
    if (state.activeWindowId === id) return state;
    return {
      activeWindowId: id,
      windows: state.windows.map(w => 
        w.id === id ? { ...w, zIndex: state.nextZIndex, isMinimized: false } : w
      ),
      nextZIndex: state.nextZIndex + 1
    };
  }),

  updateWindowBounds: (id, bounds) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, ...bounds } : w)
  }))
}));
