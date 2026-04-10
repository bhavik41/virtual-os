import React, { useState, useEffect } from 'react';
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
            <div key={app.id} className="desktop-icon" onDoubleClick={() => openApp(app)}>
              <div className="icon-container">
                {React.createElement(app.icon, { size: 28, strokeWidth: 1.5 })}
              </div>
              <span>{app.title}</span>
            </div>
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
