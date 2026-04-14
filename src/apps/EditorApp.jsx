import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useStore } from '../store/useStore';
import './EditorApp.css';

export default function EditorApp() {
  const { fs, updateFileContent } = useStore();
  const [activeFile, setActiveFile] = useState(null);
  
  // Find all files in the fs to display in sidebar
  const allFiles = Object.entries(fs)
    .filter(([path, node]) => node.type === 'file')
    .map(([path, node]) => ({ path, name: path.split('/').pop(), content: node.content || '' }));

  useEffect(() => {
    if (!activeFile && allFiles.length > 0) {
      setActiveFile(allFiles[0]);
    }
  }, [allFiles, activeFile]);

  const handleEditorChange = (value) => {
    if (activeFile) {
      updateFileContent(activeFile.path, value);
      setActiveFile({ ...activeFile, content: value });
    }
  };

  return (
    <div className="editor-app">
      <div className="editor-sidebar">
        <div className="sidebar-title">EXPLORER</div>
        {allFiles.map(file => (
          <div 
            key={file.path}
            className={`file-item ${activeFile?.path === file.path ? 'active' : ''}`}
            onClick={() => setActiveFile(file)}
            title={file.path}
          >
            {file.name}
          </div>
        ))}
        {allFiles.length === 0 && <div style={{ padding: '10px', fontSize: '12px', color: '#666' }}>No files found</div>}
      </div>
      <div className="editor-main">
        {activeFile ? (
          <>
            <div className="editor-tabs">
              <div className="editor-tab active">{activeFile.name}</div>
            </div>
            <div className="editor-content">
              <Editor
                height="100%"
                defaultLanguage={activeFile.name.endsWith('.js') ? 'javascript' : activeFile.name.endsWith('.css') ? 'css' : activeFile.name.endsWith('.html') ? 'html' : 'plaintext'}
                theme="vs-dark"
                value={activeFile.content}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on'
                }}
              />
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
            Open a file to edit
          </div>
        )}
      </div>
    </div>
  );
}
