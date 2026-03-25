import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import './TerminalApp.css';

export default function TerminalApp() {
  const { fs, createNode } = useStore();
  const [cwd, setCwd] = useState('/Users/bhavik');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to macOS Terminal (Zsh) v2.4.2' },
    { type: 'output', text: 'Prompt personalized to bhavik@macbook.' },
    { type: 'output', text: 'Type "help" to list creative commands, or "matrix" for a screen saver.' }
  ]);
  const [input, setInput] = useState('');
  const [isMatrixActive, setIsMatrixActive] = useState(false);
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
        setHistory(prev => [...prev, { type: 'input', text: `bhavik@macbook ~ % ` }]);
        return;
      }
      
      const args = cmdStr.split(' ').filter(Boolean);
      const cmd = args[0].toLowerCase();
      
      const displayCwd = cwd === '/Users/bhavik' ? '~' : cwd.split('/').pop() || '/';
      const newHistory = [...history, { type: 'input', text: `bhavik@macbook ${displayCwd} % ${cmdStr}` }];
      let output = '';
      
      try {
        if (cmd === 'help') {
          output = 'Available commands:\n  help      - Show this documentation\n  about     - About Bhavik Thumbadiya\n  skills    - Visual ASCII technical expertise chart\n  projects  - Descriptions of software engineering projects\n  education - Detailed academic timelines\n  contact   - Interactive details & social profile links\n  matrix    - Launch full digital rain matrix screensaver\n  clear     - Clear shell window logs\n  ls, cd, pwd, mkdir, touch, cat, date, whoami, echo';
        } else if (cmd === 'clear') {
          setHistory([]);
          setInput('');
          return;
        } else if (cmd === 'matrix') {
          setIsMatrixActive(true);
          setInput('');
          return;
        } else if (cmd === 'whoami') {
          output = 'bhavik';
        } else if (cmd === 'about') {
          output = 'Bhavik Thumbadiya - Full-stack Software Developer\n-------------------------------------------------\nFull-stack software developer with experience building scalable web\napplications using React.js, Node.js, TypeScript, REST APIs, and MongoDB.\nSkilled in software development, debugging, testing, API integration, and\ncollaborating with cross-functional teams to develop reliable, user-focused applications.\n\nLocation: Windsor, Ontario, Canada\nAvailability: Sep 2026 (Available for 4 or 8 month internships)\n\nType "skills" or "projects" to learn more!';
        } else if (cmd === 'skills') {
          output = 'TECHNICAL EXPERTISE RATINGS:\n===========================\n\nProgramming Languages  [████████████████████████████████████░░░] 90%\nFront-End Development  [██████████████████████████████████████] 95%\nBack-End / API Design  [████████████████████████████████████░░░] 90%\nDatabase Engineering   [██████████████████████████████████░░░░] 85%\nCloud Infrastructure   [██████████████████████████████░░░░░░░░] 75%\n\nStack Details:\n- Front-End: React, Next.js, Redux, Tailwind, CSS3, jQuery\n- Back-End: Node.js, Express, Spring Boot, REST APIs, FastAPI\n- Databases: MongoDB, PostgreSQL, MySQL, Redis, SQL Server, Oracle\n- Cloud/DevOps: AWS, Vercel, Render, DigitalOcean, GCP, Git, CI/CD';
        } else if (cmd === 'projects') {
          output = 'ACADEMIC & PROFESSIONAL PROJECTS:\n=================================\n\n🚀 AI-Powered Collaborative Coding Platform (Jan 2025 - Apr 2025)\n   - Built a MERN Stack real-time synchronized coding workspace using Socket.IO.\n   - Integrated live code-sync, live developer chat, and synchronization workflows.\n   - Standardized client/server models supporting 50+ concurrent active editing streams.\n   - Tech: MongoDB, Express, React, Node, Tailwind CSS, Socket.IO.\n\nTo explore project files, open Finder or view in VS Code!';
        } else if (cmd === 'education') {
          output = 'EDUCATION TIMELINE:\n===================\n\n🎓 Master of Applied Computing (MAC) (Aug 2025 - Present)\n   University of Windsor, Windsor, Ontario | GPA: 81%\n   Internship Start Availability: September 2026 (4 or 8 months term)\n\n🎓 BS in Computer Science and Engineering (Jul 2021 - May 2025)\n   Indus Institute of Technology & Engineering, Ahmedabad, India | GPA: 9.46 / 10';
        } else if (cmd === 'contact') {
          output = 'CONTACT DETAILS & CHANNELS:\n===========================\n\n📧 Email:    bhavikpatel73241@gmail.com\n📞 Phone:    +1 (647) 382-0767\n🐙 GitHub:   https://github.com/bhavik41\n💼 LinkedIn: https://linkedin.com/in/bhavik-thumbadiya-192868272';
        } else if (cmd === 'date') {
          output = new Date().toString();
        } else if (cmd === 'echo') {
          const redirIdx = args.indexOf('>');
          if (redirIdx !== -1 && args.length > redirIdx + 1) {
            const content = args.slice(1, redirIdx).join(' ').replace(/^["']|["']$/g, '');
            const target = resolvePath(args[redirIdx + 1]);
            createNode(target, { type: 'file', content });
          } else {
            output = args.slice(1).join(' ').replace(/^["']|["']$/g, '');
          }
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
          const target = args[1] ? resolvePath(args[1]) : '/Users/bhavik';
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
          output = `zsh: command not found: ${cmd}. Type "help" for support.`;
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

  const displayCwd = cwd === '/Users/bhavik' ? '~' : cwd.split('/').pop() || '/';

  if (isMatrixActive) {
    return <MatrixRain onExit={() => setIsMatrixActive(false)} />;
  }

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
        <span className="terminal-prompt">bhavik@macbook {displayCwd} % </span>
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

// -------------------------------------------------------------
// RETRO DIGITAL MATRIX RAIN CANVAS SCREENSAVER
// -------------------------------------------------------------
function MatrixRain({ onExit }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = '01010101010101010101アァカサタナハマヤャラワガザダバパイィキシチニヒミリ';
    const alphabet = katakana.split('');

    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize) + 1;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100; // staggered drop heights
    }

    let animationId;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41'; // classic hacker green
      ctx.font = fontSize + 'px Courier New, monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        
        // Make leading character slightly brighter
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = '#00ff41';
        }
        
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'q' || e.key === 'Q') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  return (
    <div className="matrix-screensaver" onClick={onExit}>
      <canvas ref={canvasRef} />
      <div className="matrix-overlay-text">
        <span>MATRIX RAIN ACTIVE</span>
        <span>Press ESC or 'q' to return to shell</span>
      </div>
    </div>
  );
}

// navigator.clipboard.writeText() support added
