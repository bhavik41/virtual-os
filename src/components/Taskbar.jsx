import React, { useState } from 'react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { Wifi, Volume2, Battery, Search, Menu } from 'lucide-react';
import { apps } from '../apps/appsConfig';
import './Taskbar.css';

export default function Taskbar({ time }) {
  const { windows, activeWindowId, focusWindow, openApp } = useStore();
  const [showStart, setShowStart] = useState(false);

  // Get unique open apps
  const openAppsIds = [...new Set(windows.map(w => w.appId))];
  const pinnedAppsIds = ['terminal', 'explorer', 'editor']; // Example pinned
  const taskbarApps = [...new Set([...pinnedAppsIds, ...openAppsIds])];

  return (
    <>
      <div className="taskbar">
        <div className="taskbar-left">
          <button 
            className={`taskbar-btn start-btn ${showStart ? 'active' : ''}`}
            onClick={() => setShowStart(!showStart)}
          >
            <Menu size={20} />
          </button>
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="taskbar-center">
          {taskbarApps.map(appId => {
            const app = apps.find(a => a.id === appId);
            if (!app) return null;
            
            const isOpen = windows.some(w => w.appId === appId);
            const isActive = windows.some(w => w.appId === appId && w.id === activeWindowId);

            return (
              <button 
                key={appId} 
                className={`taskbar-app-btn ${isOpen ? 'open' : ''} ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (!isOpen) {
                    openApp(app);
                  } else {
                    // focus first window of this app
                    const win = windows.find(w => w.appId === appId);
                    if (win) focusWindow(win.id);
                  }
                }}
                title={app.title}
              >
                {React.createElement(app.icon, { size: 20 })}
              </button>
            );
          })}
        </div>

        <div className="taskbar-right">
          <div className="tray-icons">
            <Wifi size={14} />
            <Volume2 size={14} />
            <Battery size={14} />
          </div>
          <div className="clock">
            <div className="time">{format(time, 'h:mm a')}</div>
            <div className="date">{format(time, 'M/d/yyyy')}</div>
          </div>
        </div>
      </div>

      {showStart && (
        <div className="start-menu">
          <div className="start-header">
            <h3>Pinned Apps</h3>
          </div>
          <div className="start-apps">
            {apps.map(app => (
              <div 
                key={app.id} 
                className="start-app-item"
                onClick={() => {
                  openApp(app);
                  setShowStart(false);
                }}
              >
                <div className="start-app-icon">
                  {React.createElement(app.icon, { size: 24 })}
                </div>
                <span>{app.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
