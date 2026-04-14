import React, { useState } from 'react';
import { Folder, FileText, Image, Code } from 'lucide-react';
import { useStore } from '../store/useStore';
import './ExplorerApp.css';
import { apps } from './appsConfig';

export default function ExplorerApp() {
  const { fs, openApp } = useStore();
  const [currentPath, setCurrentPath] = useState('/Users/guest');

  const handleNavigate = (folderName) => {
    const newPath = currentPath === '/' ? `/${folderName}` : `${currentPath}/${folderName}`;
    if (fs[newPath] && fs[newPath].type === 'dir') {
      setCurrentPath(newPath);
    }
  };

  const openFile = (fileName) => {
    // Just open the editor app
    const editor = apps.find(a => a.id === 'editor');
    if (editor) {
      openApp(editor);
    }
  };

  const currentFolder = fs[currentPath];
  const items = currentFolder ? currentFolder.children.map(name => {
    const itemPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
    const node = fs[itemPath];
    return {
      name,
      type: node?.type || 'file',
      icon: node?.type === 'dir' ? Folder : (name.endsWith('.js') ? Code : (name.endsWith('.png') ? Image : FileText)),
      path: itemPath
    };
  }) : [];

  return (
    <div className="explorer-app">
      <div className="explorer-sidebar">
        <div className="sidebar-group">
          <div className="sidebar-group-title">Favorites</div>
          <div className={`sidebar-item ${currentPath === '/Users/guest/Desktop' ? 'active' : ''}`} onClick={() => setCurrentPath('/Users/guest/Desktop')}>Desktop</div>
          <div className={`sidebar-item ${currentPath === '/Users/guest/Downloads' ? 'active' : ''}`} onClick={() => setCurrentPath('/Users/guest/Downloads')}>Downloads</div>
          <div className={`sidebar-item ${currentPath === '/Users/guest/Documents' ? 'active' : ''}`} onClick={() => setCurrentPath('/Users/guest/Documents')}>Documents</div>
          <div className={`sidebar-item ${currentPath === '/Users/guest' ? 'active' : ''}`} onClick={() => setCurrentPath('/Users/guest')}>Home</div>
        </div>
      </div>
      <div className="explorer-main">
        <div className="explorer-toolbar">
          <div className="path-bar">{currentPath}</div>
        </div>
        <div className="explorer-content">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="explorer-item" 
              onDoubleClick={() => item.type === 'dir' ? handleNavigate(item.name) : openFile(item.name)}
            >
              <div className={`item-icon ${item.type}`}>
                {React.createElement(item.icon, { size: 32, strokeWidth: 1.5 })}
              </div>
              <div className="item-name">{item.name}</div>
            </div>
          ))}
          {items.length === 0 && <div style={{ color: '#666', padding: '20px' }}>This folder is empty</div>}
        </div>
      </div>
    </div>
  );
}
