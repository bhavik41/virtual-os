import React from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
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

  const rndStyle = {
    zIndex: win.zIndex,
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
      style={rndStyle}
      size={{
        width: win.isMaximized ? '100vw' : win.width,
        height: win.isMaximized ? 'calc(100vh - 28px)' : win.height
      }}
      position={{
        x: win.isMaximized ? 0 : win.x,
        y: win.isMaximized ? 28 : Math.max(28, win.y)
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
      <motion.div
        className="window-container-motion"
        initial={{ scale: 0.9, opacity: 0, y: 15 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          y: 0,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 22 
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(24, 24, 30, 0.82)',
          backdropFilter: 'blur(20px)',
          borderRadius: win.isMaximized ? '0' : '12px',
          boxShadow: isActive 
            ? '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 1px rgba(255, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)' 
            : '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className={`window-header ${isActive ? 'active' : ''}`} onDoubleClick={() => maximizeWindow(win.id)}>
          <div className="window-controls-mac">
            <button onClick={() => closeWindow(win.id)} className="mac-btn close"></button>
            <button onClick={() => minimizeWindow(win.id)} className="mac-btn minimize"></button>
            <button onClick={() => maximizeWindow(win.id)} className="mac-btn maximize"></button>
          </div>
          <div className="window-title-mac">
            <span>{win.title}</span>
          </div>
          <div className="window-spacer"></div>
        </div>
        <div className="window-content">
          {React.createElement(win.component, { windowId: win.id })}
        </div>
      </motion.div>
    </Rnd>
  );
}

// Snap logic: detect edges and snap window position
