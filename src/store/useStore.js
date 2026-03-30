import { create } from 'zustand';

const initialFs = {
  '/': { type: 'dir', children: ['Users'] },
  '/Users': { type: 'dir', children: ['bhavik'] },
  '/Users/bhavik': { type: 'dir', children: ['Desktop', 'Documents', 'Downloads'] },
  '/Users/bhavik/Desktop': { type: 'dir', children: ['Welcome_README.txt', 'About_Me.json', 'Skills.json'] },
  '/Users/bhavik/Documents': { type: 'dir', children: ['Education.txt', 'Projects'] },
  '/Users/bhavik/Documents/Projects': { type: 'dir', children: ['AI_Collaborative_Coding_Platform.jsx', 'Bhavik_Portfolio_Overview.md'] },
  '/Users/bhavik/Downloads': { type: 'dir', children: [] },
  
  '/Users/bhavik/Desktop/Welcome_README.txt': { 
    type: 'file', 
    content: `Welcome to Bhavik Thumbadiya's Creative Portfolio!
===================================================

This is a fully-interactive macOS-inspired 3D Virtual Desktop Portfolio built using React, Vite, Framer Motion, and Zustand.

💡 QUICK TIPS ON HOW TO NAVIGATE:
---------------------------------
1. Double-click any icon on the desktop to open it, or click the icons in the Dock at the bottom.
2. The windows are draggable and resizable. Click any window to focus it.
3. Open "Finder" to explore files and folders.
4. Double-click files in Finder to open and edit them in VS Code.
5. Launch "Safari" to browse the premium Interactive Portfolio Dashboard, featuring a 3D-tilt profile card and a real-time AI Coding Platform simulator!
6. Open "Terminal" and try typing these custom commands:
   - about
   - skills
   - projects
   - education
   - contact
   - matrix  (Hint: a retro hack screen saver! Press ESC or 'q' to exit Matrix mode)

Feel free to browse around, inspect the code in VS Code, and enjoy the experience!

-- Bhavik Patel (Thumbadiya)
   Full-stack Software Developer
   Windsor, Ontario
   bhavikpatel73241@gmail.com`
  },
  
  '/Users/bhavik/Desktop/About_Me.json': { 
    type: 'file', 
    content: `{
  "name": "Bhavik Thumbadiya",
  "title": "Full-stack Software Developer",
  "location": "Windsor, Ontario, Canada",
  "email": "bhavikpatel73241@gmail.com",
  "phone": "+1 (647) 382-0767",
  "github": "https://github.com/bhavik41",
  "linkedin": "https://linkedin.com/in/bhavik-thumbadiya-192868272",
  "bio": "Full-stack software developer with experience building scalable web applications using React.js, Node.js, TypeScript, REST APIs, and MongoDB. Passionate about engineering high-performance interactive interfaces, clean architectures, and multi-user concurrent platforms."
}`
  },
  
  '/Users/bhavik/Desktop/Skills.json': { 
    type: 'file', 
    content: `{
  "programming_languages": ["TypeScript", "JavaScript", "Python", "Java", "C", "C++"],
  "frontend": ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Redux", "Bootstrap"],
  "backend": ["Node.js", "Express.js", "REST APIs", "Spring Boot", "FastAPI"],
  "databases": ["MongoDB", "MySQL", "PostgreSQL", "Oracle", "SQL Server", "Redis"],
  "orms": ["Prisma", "TypeORM"],
  "cloud_deployment": ["AWS", "Vercel", "Render", "DigitalOcean", "GCP"],
  "practices": ["Agile SDLC", "Git/GitHub", "Debugging & Testing", "CI/CD", "Code Reviews"]
}`
  },
  
  '/Users/bhavik/Documents/Education.txt': { 
    type: 'file', 
    content: `ACADEMIC TIMELINE & CREDENTIALS

1. Master of Applied Computing (MAC)
   University of Windsor • Windsor, Ontario
   Timeline: Aug 2025 - Present
   Current GPA: 81%
   Status: Available for a 4 or 8 month internship starting from September 2026!

2. Bachelor of Science in Computer Science & Engineering
   Indus Institute of Technology & Engineering • Ahmedabad, India
   Timeline: Jul 2021 - May 2025
   Graduation GPA: 9.46/10`
  },
  
  '/Users/bhavik/Documents/Projects/AI_Collaborative_Coding_Platform.jsx': { 
    type: 'file', 
    content: `import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MonacoEditor from '@monaco-editor/react';

// Real-Time Collaborative Workspace Core Component
// Built by Bhavik Thumbadiya - MERN Stack Socket.IO Project
export default function CollaborativeWorkspace({ roomId, user }) {
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState('// Welcome to the Collaborative Coding Room!\\n');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Establish connection to MERN server socket gateway
    const newSocket = io('https://api.collab-code.platform', {
      query: { roomId, username: user.name }
    });
    setSocket(newSocket);

    // Sync state on connection
    newSocket.on('room-users', (activeUsers) => {
      setUsers(activeUsers);
    });

    // Real-time synchronization event listeners
    newSocket.on('code-update', (updatedCode) => {
      setCode(updatedCode);
    });

    newSocket.on('chat-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => newSocket.disconnect();
  }, [roomId, user.name]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket?.emit('code-change', { roomId, code: newCode });
  };

  return (
    <div className="workspace-container">
      <div className="editor-section">
        <h3>Room: {roomId}</h3>
        <MonacoEditor
          height="500px"
          language="javascript"
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
        />
      </div>
      <div className="active-users-bar">
        <h4>Connected Developers ({users.length}):</h4>
        {users.map(u => (
          <span key={u.id} className="user-tag">{u.username}</span>
        ))}
      </div>
    </div>
  );
}`
  },
  
  '/Users/bhavik/Documents/Projects/Bhavik_Portfolio_Overview.md': { 
    type: 'file', 
    content: `# Academic & Full-Stack Projects Overview

## 🚀 AI-Powered Collaborative Coding Platform (Jan 2025 - Apr 2025)
*Location: Indus University, Ahmedabad, India*
*Technologies: MongoDB, Express.js, React.js, Node.js (MERN), Tailwind CSS, Socket.IO*

### Core Engineering Details:
- **Scalable Architecture**: Engineered a complete real-time collaborative IDE designed to support multi-user concurrent project synchronization.
- **WebSocket Synchronization**: Integrated Socket.IO pathways to enable flawless code editing, synchronized cursor placements, live text changes, and low-latency chat feeds.
- **Concurrent Optimization**: Standardized event-driven communications enabling the platform to scale smoothly to support 50+ concurrent active editing threads.
- **Secure Controls**: Developed role-based authentication and modular group authorization features ensuring room creators maintain administrative control over workspace security.
- **Quality Assurance**: Executed comprehensive unit-testing, automated API verification, and performance profiling loops within Agile development sprints to boost app uptime to 99.9%.

---

## 💡 Engineering Philosophies
1. **Interactive Interfaces**: Utilizing animations, motion elements, and clean grid alignments to create user journeys that feel fast and delightful.
2. **Performant Backend Pipelines**: Writing highly optimized asynchronous API paths in Node.js and Python.
3. **Robust Data Architecture**: Modeling relational (PostgreSQL) and non-relational (MongoDB) database indexes for speed and reliability.
`
  }
};

export const useStore = create((set) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,
  
  // File System State
  fs: initialFs,
  activeFilePath: null,
  setActiveFilePath: (path) => set({ activeFilePath: path }),
  
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

  updateFileContent: (path, content) => set((state) => {
    if (state.fs[path] && state.fs[path].type === 'file') {
      return { fs: { ...state.fs, [path]: { ...state.fs[path], content } } };
    }
    return state;
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

// bringToFront: increments z-index of focused window
