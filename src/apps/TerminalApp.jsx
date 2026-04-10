import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import './TerminalApp.css';

export default function TerminalApp() {
  const { fs, createNode } = useStore();
  const [cwd, setCwd] = useState('/Users/guest');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to macOS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const resolvePath = (p) => {
    if (p.startsWith('/')) return p;
    if (p === '..') {
      if (cwd === '/') return '/';
      return cwd.substring(0, cwd.lastIndexOf('/')) || '/';
    }
    return cwd === '/' ? `/${p}` : `${cwd}/${p}`;
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmdStr = input.trim();
      if (!cmdStr) {
        setHistory(prev => [...prev, { type: 'input', text: `guest@macbook ~ % ` }]);
        return;
      }
      
      const args = cmdStr.split(' ').filter(Boolean);
      const cmd = args[0];
      
      const newHistory = [...history, { type: 'input', text: `guest@macbook ${cwd === '/Users/guest' ? '~' : cwd} % ${cmdStr}` }];
      let output = '';
      
      try {
        if (cmd === 'help') {
          output = 'Available commands: help, clear, date, whoami, echo, ls, cd, pwd, mkdir, touch, cat';
        } else if (cmd === 'clear') {
          setHistory([]);
          setInput('');
          return;
        } else if (cmd === 'date') {
          output = new Date().toString();
        } else if (cmd === 'whoami') {
          output = 'guest';
        } else if (cmd === 'echo') {
          output = args.slice(1).join(' ');
        } else if (cmd === 'pwd') {
          output = cwd;
        } else if (cmd === 'ls') {
          const target = args[1] ? resolvePath(args[1]) : cwd;
          if (fs[target] && fs[target].type === 'dir') {
            output = fs[target].children.join('  ');
          } else {
            output = `ls: ${target}: No such file or directory`;
          }
        } else if (cmd === 'cd') {
          const target = args[1] ? resolvePath(args[1]) : '/Users/guest';
          if (fs[target] && fs[target].type === 'dir') {
            setCwd(target);
          } else {
            output = `cd: ${target}: No such file or directory`;
          }
        } else if (cmd === 'mkdir') {
          if (!args[1]) output = 'usage: mkdir directory_name';
          else {
            const target = resolvePath(args[1]);
            createNode(target, { type: 'dir', children: [] });
          }
        } else if (cmd === 'touch') {
          if (!args[1]) output = 'usage: touch file_name';
          else {
            const target = resolvePath(args[1]);
            createNode(target, { type: 'file', content: '' });
          }
        } else if (cmd === 'cat') {
          if (!args[1]) output = 'usage: cat file_name';
          else {
            const target = resolvePath(args[1]);
            if (fs[target] && fs[target].type === 'file') {
              output = fs[target].content;
            } else {
              output = `cat: ${target}: No such file or directory`;
            }
          }
        } else {
          output = `zsh: command not found: ${cmd}`;
        }
      } catch (err) {
        output = `Error: ${err.message}`;
      }

      if (output) {
        setHistory([...newHistory, { type: 'output', text: output }]);
      } else {
        setHistory(newHistory);
      }
      setInput('');
    }
  };

  const displayCwd = cwd === '/Users/guest' ? '~' : cwd.split('/').pop() || '/';

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
        <span className="terminal-prompt">guest@macbook {displayCwd} % </span>
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
