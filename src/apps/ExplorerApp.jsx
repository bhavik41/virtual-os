import React from 'react';
import { Folder, FileText, Image, Code } from 'lucide-react';
import './ExplorerApp.css';

export default function ExplorerApp() {
  const items = [
    { name: 'Documents', type: 'folder', icon: Folder },
    { name: 'Downloads', type: 'folder', icon: Folder },
    { name: 'Pictures', type: 'folder', icon: Folder },
    { name: 'notes.txt', type: 'file', icon: FileText },
    { name: 'screenshot.png', type: 'file', icon: Image },
    { name: 'script.js', type: 'file', icon: Code },
  ];

  return (
    <div className="explorer-app">
      <div className="explorer-sidebar">
        <div className="sidebar-group">
          <div className="sidebar-group-title">Favorites</div>
          <div className="sidebar-item">Desktop</div>
          <div className="sidebar-item active">Downloads</div>
          <div className="sidebar-item">Documents</div>
          <div className="sidebar-item">Pictures</div>
        </div>
      </div>
      <div className="explorer-main">
        <div className="explorer-toolbar">
          <div className="path-bar">/Users/guest/Downloads</div>
        </div>
        <div className="explorer-content">
          {items.map((item, i) => (
            <div key={i} className="explorer-item">
              <div className={`item-icon ${item.type}`}>
                {React.createElement(item.icon, { size: 32, strokeWidth: 1.5 })}
              </div>
              <div className="item-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
