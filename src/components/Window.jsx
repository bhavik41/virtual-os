import React from 'react';
import { Rnd } from 'react-rnd';
import { useStore } from '../store/useStore';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import './Window.css';

export default function Window({ window: win }) {
  const { 
    activeWindowId, 
    focusWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow,
    updateWindowBounds 
  } = useStore();

  const isActive = activeWindowId === win.id;

  if (win.isMinimized) return null;

  const style = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(30, 30, 30, 0.85)',
    backdropFilter: 'blur(12px)',
    borderRadius: win.isMaximized ? '0' : '12px',
    boxShadow: isActive ? '0 10px 40px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    zIndex: win.zIndex,
    transition: 'box-shadow 0.2s ease',
  };

  const handleDragStop = (e, d) => {
    updateWindowBounds(win.id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    updateWindowBounds(win.id, {
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      ...position
    });
  };

  return (
    <Rnd
      style={style}
      size={{
        width: win.isMaximized ? '100vw' : win.width,
        height: win.isMaximized ? 'calc(100vh - 48px)' : win.height
      }}
      position={{
        x: win.isMaximized ? 0 : win.x,
        y: win.isMaximized ? 0 : win.y
      }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      disableDragging={win.isMaximized}
      enableResizing={!win.isMaximized}
      onMouseDown={() => focusWindow(win.id)}
      dragHandleClassName="window-header"
      bounds="parent"
      minWidth={300}
      minHeight={200}
    >
      <div className={`window-header ${isActive ? 'active' : ''}`} onDoubleClick={() => maximizeWindow(win.id)}>
        <div className="window-title">
          <span className="window-icon">{React.createElement(win.icon, { size: 16 })}</span>
          <span>{win.title}</span>
        </div>
        <div className="window-controls">
          <button onClick={() => minimizeWindow(win.id)} className="control-btn minimize"><Minus size={14} /></button>
          <button onClick={() => maximizeWindow(win.id)} className="control-btn maximize">
            {win.isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
          </button>
          <button onClick={() => closeWindow(win.id)} className="control-btn close"><X size={14} /></button>
        </div>
      </div>
      <div className="window-content">
        {React.createElement(win.component, { windowId: win.id })}
      </div>
    </Rnd>
  );
}
