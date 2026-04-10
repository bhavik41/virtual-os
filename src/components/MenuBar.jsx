import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { Wifi, Battery, Search, Apple } from 'lucide-react';
import './MenuBar.css';

export default function MenuBar({ time }) {
  const { windows, activeWindowId } = useStore();
  const activeWindow = windows.find(w => w.id === activeWindowId);
  const activeAppName = activeWindow ? activeWindow.title : 'Finder';

  return (
    <div className="menu-bar">
      <div className="menu-left">
        <div className="menu-item apple-icon">
          <Apple size={16} fill="currentColor" />
        </div>
        <div className="menu-item active-app-name">{activeAppName}</div>
        <div className="menu-item">File</div>
        <div className="menu-item">Edit</div>
        <div className="menu-item">View</div>
        <div className="menu-item">Go</div>
        <div className="menu-item">Window</div>
        <div className="menu-item">Help</div>
      </div>

      <div className="menu-right">
        <div className="menu-item"><Wifi size={14} /></div>
        <div className="menu-item"><Battery size={14} /></div>
        <div className="menu-item"><Search size={14} /></div>
        <div className="menu-item clock">{format(time, 'EEE MMM d   h:mm a')}</div>
      </div>
    </div>
  );
}
