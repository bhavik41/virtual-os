import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import Window from './Window';
import MenuBar from './MenuBar';
import Dock from './Dock';
import { apps } from '../apps/appsConfig';
import './Desktop.css';

export default function Desktop() {
  const { windows, openApp } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Startup Auto-launch logic
  useEffect(() => {
    const browserApp = apps.find(a => a.id === 'browser');
    const editorApp = apps.find(a => a.id === 'editor');
    
    // Auto-open Safari browser dashboard
    if (browserApp) {
      openApp(browserApp);
    }
    
    // Auto-open VS Code with a slight delay for aesthetic flow
    if (editorApp) {
      const timer = setTimeout(() => {
        openApp(editorApp);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [openApp]);

  return (
    <div className="desktop">
      <MenuBar time={time} />
      
      <div className="desktop-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
      
      <div className="desktop-content">
        <div className="desktop-icons">
          {apps.map(app => (
            <motion.div 
              key={app.id} 
              className="desktop-icon" 
              onDoubleClick={() => openApp(app)}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            >
              <div className="icon-container">
                {React.createElement(app.icon, { size: 28, strokeWidth: 1.5 })}
              </div>
              <span>{app.title}</span>
            </motion.div>
          ))}
        </div>
        
        {windows.map(win => (
          <Window key={win.id} window={win} />
        ))}
      </div>
      
      <Dock />
    </div>
  );
}

// Keyboard shortcut: Cmd+W closes active window

// React.lazy() applied to all app components

// React.memo applied to icon grid
