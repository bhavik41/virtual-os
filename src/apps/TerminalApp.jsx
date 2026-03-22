import React, { useState, useRef, useEffect } from 'react';
import './TerminalApp.css';

export default function TerminalApp() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Virtual OS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;
      
      const newHistory = [...history, { type: 'input', text: `user@os:~$ ${cmd}` }];
      
      let output = '';
      if (cmd === 'help') {
        output = 'Available commands: help, clear, date, whoami, echo, ls';
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'date') {
        output = new Date().toString();
      } else if (cmd === 'whoami') {
        output = 'guest_user';
      } else if (cmd.startsWith('echo ')) {
        output = cmd.substring(5);
      } else if (cmd === 'ls') {
        output = 'Documents  Downloads  Pictures  Desktop';
      } else {
        output = `Command not found: ${cmd}`;
      }

      setHistory([...newHistory, { type: 'output', text: output }]);
      setInput('');
    }
  };

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-history">
        {history.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.text}
          </div>
        ))}
      </div>
      <div className="terminal-input-row">
        <span className="terminal-prompt">user@os:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
          spellCheck="false"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
