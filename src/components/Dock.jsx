import React from 'react';
import { useStore } from '../store/useStore';
import { apps } from '../apps/appsConfig';
import './Dock.css';

export default function Dock() {
  const { windows, activeWindowId, focusWindow, openApp, minimizeWindow } = useStore();

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
          return (
            <div 
              key={app.id} 
              className="dock-item-wrapper"
              onClick={() => handleAppClick(app)}
            >
              <div className="dock-item">
                {React.createElement(app.icon, { size: 32, strokeWidth: 1.5 })}
              </div>
              {isOpen && <div className="dock-indicator" />}
              <div className="dock-tooltip">{app.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
