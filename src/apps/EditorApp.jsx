import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './EditorApp.css';

export default function EditorApp() {
  const [code, setCode] = useState('function helloWorld() {\n  console.log("Welcome to the Virtual OS Editor!");\n}\n\nhelloWorld();');

  return (
    <div className="editor-app">
      <div className="editor-sidebar">
        <div className="sidebar-title">EXPLORER</div>
        <div className="file-item active">index.js</div>
        <div className="file-item">styles.css</div>
        <div className="file-item">package.json</div>
      </div>
      <div className="editor-main">
        <div className="editor-tabs">
          <div className="editor-tab active">index.js</div>
        </div>
        <div className="editor-content">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on'
            }}
          />
        </div>
      </div>
    </div>
  );
}
