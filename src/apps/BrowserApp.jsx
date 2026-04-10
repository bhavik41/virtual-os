import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search } from 'lucide-react';
import './BrowserApp.css';

export default function BrowserApp() {
  const [urlInput, setUrlInput] = useState('https://en.wikipedia.org/wiki/Main_Page');
  const [currentUrl, setCurrentUrl] = useState('https://en.wikipedia.org/wiki/Main_Page');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (e) => {
    e.preventDefault();
    let finalUrl = urlInput;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }
    setCurrentUrl(finalUrl);
    setUrlInput(finalUrl);
  };

  return (
    <div className="browser-app">
      <div className="browser-toolbar">
        <div className="browser-nav-actions">
          <button className="nav-btn"><ArrowLeft size={16} /></button>
          <button className="nav-btn"><ArrowRight size={16} /></button>
          <button className="nav-btn" onClick={() => setCurrentUrl(currentUrl)}><RotateCw size={16} /></button>
          <button className="nav-btn" onClick={() => { setUrlInput('https://en.wikipedia.org/wiki/Main_Page'); setCurrentUrl('https://en.wikipedia.org/wiki/Main_Page'); }}><Home size={16} /></button>
        </div>
        <form className="browser-address-bar" onSubmit={handleNavigate}>
          <Search size={14} className="address-icon" />
          <input 
            type="text" 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Search or enter website name"
          />
        </form>
      </div>
      <div className="browser-content">
        <iframe 
          src={currentUrl} 
          title="Browser Content"
          onLoad={() => setIsLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
