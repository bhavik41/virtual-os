import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { apps } from '../apps/appsConfig';
import './Dock.css';

export default function Dock() {
  const { windows, activeWindowId, focusWindow, openApp, minimizeWindow } = useStore();
  const [hoveredId, setHoveredId] = useState(null);

  const handleAppClick = (app) => {
    const appWindows = windows.filter(w => w.appId === app.id);
    if (appWindows.length === 0) {
      openApp(app);
    } else {
      const mainWin = appWindows[0];
      if (activeWindowId === mainWin.id && !mainWin.isMinimized) {
        minimizeWindow(mainWin.id);
      } else {
        focusWindow(mainWin.id);
      }
    }
  };

  return (
    <div className="dock-container">
      <div className="dock">
        {apps.map(app => {
          const isOpen = windows.some(w => w.appId === app.id);
          const isHovered = hoveredId === app.id;
          return (
            <div 
              key={app.id} 
              className="dock-item-wrapper"
              onClick={() => handleAppClick(app)}
              onMouseEnter={() => setHoveredId(app.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="dock-item"
                whileHover={{ 
                  y: -12, 
                  scale: 1.24,
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.3)'
                }}
                whileTap={{ scale: 0.9, y: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 14 
                }}
              >
                {React.createElement(app.icon, { size: 32, strokeWidth: 1.5 })}
              </motion.div>
              {isOpen && <div className="dock-indicator" />}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    className="dock-tooltip"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.12 }}
                  >
                    {app.title}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
