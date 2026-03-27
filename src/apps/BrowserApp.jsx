import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, RotateCw, Home, Search, 
  Terminal, MessageSquare, Code, CheckCircle, ExternalLink, 
  Github, Linkedin, Mail, Phone, MapPin, Briefcase, 
  GraduationCap, Cpu, Database, Server, Cloud, Layers, Send
} from 'lucide-react';
import './BrowserApp.css';

export default function BrowserApp() {
  const [urlInput, setUrlInput] = useState('portfolio://dashboard');
  const [currentUrl, setCurrentUrl] = useState('portfolio://dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleNavigate = (e) => {
    e.preventDefault();
    let finalUrl = urlInput.trim();
    if (!finalUrl) return;
    if (finalUrl.toLowerCase() === 'portfolio://dashboard' || finalUrl.toLowerCase() === 'dashboard') {
      setCurrentUrl('portfolio://dashboard');
      setUrlInput('portfolio://dashboard');
      setActiveTab('dashboard');
      return;
    }
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }
    setCurrentUrl(finalUrl);
    setUrlInput(finalUrl);
  };

  const loadLocalDashboard = (tabName) => {
    setCurrentUrl('portfolio://dashboard');
    setUrlInput('portfolio://dashboard');
    setActiveTab(tabName);
  };

  return (
    <div className="browser-app">
      <div className="browser-toolbar">
        <div className="browser-nav-actions">
          <button className="nav-btn" onClick={() => loadLocalDashboard('dashboard')}><Home size={16} /></button>
          <button className="nav-btn" onClick={() => setIsLoading(true)}><RotateCw size={16} className={isLoading ? 'spin-anim' : ''} /></button>
        </div>
        <form className="browser-address-bar" onSubmit={handleNavigate}>
          <Search size={14} className="address-icon" />
          <input 
            type="text" 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter URL or 'dashboard'"
          />
        </form>
      </div>

      <div className="browser-content">
        {currentUrl === 'portfolio://dashboard' ? (
          <DashboardContent activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <iframe 
            src={currentUrl} 
            title="Browser Content"
            onLoad={() => setIsLoading(false)}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PORTFOLIO DASHBOARD INTERNAL REACT ROUTING
// -------------------------------------------------------------
function DashboardContent({ activeTab, setActiveTab }) {
  return (
    <div className="dashboard-container">
      {/* Portfolio Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-profile">
          <div className="avatar-orb">BT</div>
          <h3>Bhavik Patel</h3>
          <p>Full-stack Developer</p>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            🏡 Overview
          </button>
          <button className={`nav-tab-btn ${activeTab === 'collab' ? 'active' : ''}`} onClick={() => setActiveTab('collab')}>
            💻 Collab Lab (Live Demo)
          </button>
          <button className={`nav-tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
            🛠 Tech Stack
          </button>
          <button className={`nav-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            🚀 Projects Hub
          </button>
          <button className={`nav-tab-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
            📬 Contact Me
          </button>
        </nav>
      </aside>

      {/* Main dashboard panels */}
      <main className="dashboard-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="tab-panel-container"
          >
            {activeTab === 'dashboard' && <OverviewTab setActiveTab={setActiveTab} />}
            {activeTab === 'collab' && <CollabLabTab />}
            {activeTab === 'skills' && <SkillsTab />}
            {activeTab === 'projects' && <ProjectsTab />}
            {activeTab === 'contact' && <ContactTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 1: OVERVIEW (HOME)
// -------------------------------------------------------------
function OverviewTab({ setActiveTab }) {
  // 3D Parallax Tilt state
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    // Map to max 12 degrees tilt
    const rX = -(mouseY / height) * 20;
    const rY = (mouseX / width) * 20;
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="tab-overview">
      <div className="overview-hero">
        <div className="hero-text-block">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Hi, I'm <span className="highlight">Bhavik Patel</span>
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Full-stack Software Developer & Master of Applied Computing Student
          </motion.p>
          <motion.p 
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Specialized in crafting scalable MERN applications, high-performance APIs, real-time synchronized platforms, and premium interactive layouts. Available for internships starting September 2026!
          </motion.p>

          <div className="hero-badge-grid">
            <div className="hero-badge"><MapPin size={14} /> Windsor, Ontario</div>
            <div className="hero-badge"><GraduationCap size={14} /> University of Windsor (MAC)</div>
            <div className="hero-badge"><Cpu size={14} /> MERN & TypeScript Specialist</div>
          </div>

          <div className="cta-row">
            <button className="btn btn-primary" onClick={() => setActiveTab('collab')}>Try Live Demo</button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('projects')}>Browse Projects</button>
          </div>
        </div>

        {/* 3D Parallax Card */}
        <motion.div 
          ref={cardRef}
          className="three-d-profile-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transformStyle: 'preserve-3d'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <div className="card-glow" />
          <div className="card-inner" style={{ transform: 'translateZ(50px)' }}>
            <div className="card-header">
              <span className="mac-circle red"></span>
              <span className="mac-circle yellow"></span>
              <span className="mac-circle green"></span>
            </div>
            <div className="card-body">
              <div className="profile-chip">DEVELOPER PROFILE</div>
              <h2>Bhavik Thumbadiya</h2>
              <div className="tech-stack-ribbon">
                <span>React</span>
                <span>Node.js</span>
                <span>TypeScript</span>
                <span>MongoDB</span>
                <span>Socket.IO</span>
              </div>
              <ul className="stats-list">
                <li><strong>Windsor GPA:</strong> 81%</li>
                <li><strong>Undergrad GPA:</strong> 9.46 / 10</li>
                <li><strong>Availability:</strong> Sep 2026 (4/8 Month Intern)</li>
              </ul>
              <div className="card-socials">
                <a href="https://github.com/bhavik41" target="_blank" rel="noreferrer"><Github size={18} /></a>
                <a href="https://linkedin.com/in/bhavik-thumbadiya-192868272" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
                <a href="mailto:bhavikpatel73241@gmail.com"><Mail size={18} /></a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Highlights Grid */}
      <section className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon"><Code /></div>
          <h3>Modern Frontends</h3>
          <p>Constructing sleek SPA views utilizing React, Next.js, and spring motions inside clean custom design ecosystems.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Server /></div>
          <h3>Robust Server Architectures</h3>
          <p>Engineering performant REST routing APIs using Express, Node.js, Spring Boot, and Python FastAPI.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Database /></div>
          <h3>Efficient Query Modeling</h3>
          <p>Structuring relational databases (PostgreSQL, MySQL) and flexible document stores (MongoDB, Redis) for extreme speeds.</p>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 2: COLLAB LAB (SOCKET.IO SIMULATOR)
// -------------------------------------------------------------
function CollabLabTab() {
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [aliceCode, setAliceCode] = useState('// Room #404 workspace loaded.\n');
  const [bhavikCode, setBhavikCode] = useState('// Room #404 workspace loaded.\n');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeUsers, setActiveUsers] = useState(['You (Guest)']);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, messages]);

  const addLog = (text) => {
    setLogs(prev => [...prev, { text, time: new Date().toLocaleTimeString() }]);
  };

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const resetSim = () => {
    setMessages([]);
    setLogs([]);
    setAliceCode('// Room #404 workspace loaded.\n');
    setBhavikCode('// Room #404 workspace loaded.\n');
    setActiveUsers(['You (Guest)']);
    setCurrentStep(0);
    setIsSimulating(false);
  };

  const runSimulation = () => {
    if (isSimulating) return;
    resetSim();
    setIsSimulating(true);
    
    addLog('Establishing handshake with Socket.IO gateway...');
    
    // Step-by-step collaboration simulation loop
    setTimeout(() => {
      // Step 1: Alice Connects
      setActiveUsers(prev => [...prev, 'Alice_Dev (LA)']);
      addLog('WebSocket Connection: Alice_Dev connected to room #404');
      addMessage('Alice', 'Hey! Let\'s build this server socket adapter.');
      setCurrentStep(1);
    }, 1500);

    setTimeout(() => {
      // Step 2: Bhavik Connects
      setActiveUsers(prev => [...prev, 'Bhavik_Thumbadiya (Windsor)']);
      addLog('WebSocket Connection: Bhavik_Thumbadiya connected to room #404');
      addMessage('Bhavik', 'Ready! I\'ll watch your stream and add the listener.');
      setCurrentStep(2);
    }, 3000);

    setTimeout(() => {
      // Step 3: Alice Types Code
      addLog('[Socket event: code-change] Alice_Dev typing: line 1');
      setAliceCode(prev => prev + 'const express = require("express");\n');
      setCurrentStep(3);
    }, 4500);

    setTimeout(() => {
      // Step 4: Code Synchronizes to Bhavik
      addLog('[Socket sync] Broadcast code-delta to room #404 - 38 bytes synchronized');
      setBhavikCode(prev => prev + 'const express = require("express");\n');
      setCurrentStep(4);
    }, 5500);

    setTimeout(() => {
      // Step 5: Alice types next lines
      addLog('[Socket event: code-change] Alice_Dev typing: lines 2-3');
      const lines = 'const app = express();\nconst server = require("http").createServer(app);\n';
      setAliceCode(prev => prev + lines);
      setCurrentStep(5);
    }, 7000);

    setTimeout(() => {
      // Step 6: Sync to Bhavik
      addLog('[Socket sync] Broadcast code-delta - 72 bytes synchronized');
      const lines = 'const app = express();\nconst server = require("http").createServer(app);\n';
      setBhavikCode(prev => prev + lines);
      setCurrentStep(6);
    }, 8000);

    setTimeout(() => {
      // Step 7: Bhavik adds socket listener
      addMessage('Bhavik', 'Awesome! Adding the Socket.IO setup now...');
      addLog('[Socket event: code-change] Bhavik_Thumbadiya typing: lines 4-5');
      const bhLines = 'const io = require("socket.io")(server);\nio.on("connection", socket => {\n  console.log("Client connected");\n});\n';
      setBhavikCode(prev => prev + bhLines);
      setCurrentStep(7);
    }, 10000);

    setTimeout(() => {
      // Step 8: Sync back to Alice
      addLog('[Socket sync] Broadcast code-delta from Bhavik_Thumbadiya - 110 bytes synchronized');
      const bhLines = 'const io = require("socket.io")(server);\nio.on("connection", socket => {\n  console.log("Client connected");\n});\n';
      setAliceCode(prev => prev + bhLines);
      addMessage('Alice', 'Wow! Synchronized instantly! Under 50ms latency. Flawless socket workflows.');
      addLog('Active session: 3 developers active. Sync status: Stable.');
      setIsSimulating(false);
      setCurrentStep(8);
    }, 11500);
  };

  return (
    <div className="tab-collab">
      <div className="collab-header">
        <div className="collab-intro">
          <h2>MERN Real-Time Socket.IO Lab</h2>
          <p>Experience a fully animated simulation of Bhavik's <strong>AI-Powered Collaborative Coding Platform</strong>. Watch code sync dynamically across remote editors via WebSocket relays!</p>
        </div>
        <div className="collab-controls">
          <button className={`btn btn-primary ${isSimulating ? 'disabled' : ''}`} onClick={runSimulation} disabled={isSimulating}>
            {isSimulating ? 'Syncing...' : 'Start Collaboration Demo'}
          </button>
          <button className="btn btn-secondary" onClick={resetSim}>Reset Lab</button>
        </div>
      </div>

      <div className="collab-workspace-grid">
        {/* Editor 1: Alice */}
        <div className="mock-editor-box">
          <div className="editor-tab-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="title">alice_dev_workspace.js (Los Angeles)</span>
          </div>
          <div className="editor-content-area">
            <pre className="code-display">
              {aliceCode}
              {currentStep === 3 || currentStep === 5 ? <span className="cursor">|</span> : ''}
            </pre>
          </div>
          {currentStep >= 4 && currentStep < 7 && <div className="sync-pulse">SYNC ACTIVE</div>}
        </div>

        {/* Editor 2: Bhavik (Windsor) */}
        <div className="mock-editor-box highlighted-box">
          <div className="editor-tab-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="title">bhavik_windsor_workspace.js (Windsor, ON)</span>
          </div>
          <div className="editor-content-area">
            <pre className="code-display">
              {bhavikCode}
              {currentStep === 7 ? <span className="cursor">|</span> : ''}
            </pre>
          </div>
          {currentStep === 8 && <div className="sync-pulse success">CODE SYNCHRONIZED</div>}
        </div>
      </div>

      <div className="collab-bottom-grid">
        {/* Active room users */}
        <div className="collab-card users-card">
          <h4>Room Users (#404)</h4>
          <div className="user-orbs-container">
            {activeUsers.map((user, i) => (
              <div key={i} className="user-orb-item">
                <span className="pulse-orb" />
                <span className="username">{user}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live chat feed */}
        <div className="collab-card chat-card">
          <h4>Room Chat</h4>
          <div className="chat-messages-container">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.sender === 'Bhavik' ? 'me' : 'them'}`}>
                <span className="chat-sender">{m.sender}</span>
                <p className="chat-text">{m.text}</p>
              </div>
            ))}
            {messages.length === 0 && <p className="placeholder-text">Chat feed will appear here during collaboration.</p>}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* WebSocket Central Logs */}
        <div className="collab-card logs-card">
          <h4><Terminal size={14} style={{ marginRight: '6px' }} /> WebSocket Server Console</h4>
          <div className="terminal-logs-container">
            {logs.map((l, i) => (
              <div key={i} className="log-line">
                <span className="time">[{l.time}]</span> <span className="log-text">{l.text}</span>
              </div>
            ))}
            {logs.length === 0 && <p className="placeholder-text">Console idle. Hit "Start Collaboration Demo" above.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 3: SKILLS
// -------------------------------------------------------------
function SkillsTab() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code />,
      skills: [
        { name: 'TypeScript', rating: 90 },
        { name: 'JavaScript', rating: 95 },
        { name: 'Python', rating: 85 },
        { name: 'Java', rating: 80 },
        { name: 'C / C++', rating: 75 }
      ]
    },
    {
      title: 'Front-End Technologies',
      icon: <Layers />,
      skills: [
        { name: 'React.js', rating: 95 },
        { name: 'Next.js', rating: 85 },
        { name: 'Tailwind CSS', rating: 95 },
        { name: 'Redux State Management', rating: 85 },
        { name: 'HTML5 & CSS3', rating: 95 }
      ]
    },
    {
      title: 'Back-End & API Frameworks',
      icon: <Server />,
      skills: [
        { name: 'Node.js', rating: 90 },
        { name: 'Express.js', rating: 95 },
        { name: 'RESTful Web APIs', rating: 95 },
        { name: 'Spring Boot', rating: 75 },
        { name: 'FastAPI (Python)', rating: 80 }
      ]
    },
    {
      title: 'Database Architecture & ORMs',
      icon: <Database />,
      skills: [
        { name: 'MongoDB', rating: 90 },
        { name: 'PostgreSQL', rating: 85 },
        { name: 'MySQL', rating: 85 },
        { name: 'Prisma / TypeORM', rating: 85 },
        { name: 'Redis Caching', rating: 75 }
      ]
    },
    {
      title: 'Cloud & System Infrastructure',
      icon: <Cloud />,
      skills: [
        { name: 'AWS Services', rating: 75 },
        { name: 'Vercel / Render', rating: 90 },
        { name: 'Docker / DigitalOcean', rating: 70 },
        { name: 'Git & GitHub Workflows', rating: 95 },
        { name: 'CI/CD Pipelines & Agile', rating: 85 }
      ]
    }
  ];

  return (
    <div className="tab-skills">
      <div className="skills-intro">
        <h2>Technical Matrix & Skills</h2>
        <p>Bhavik's expertise index built through years of academic research and deployment-ready software construction.</p>
      </div>

      <div className="skills-grids">
        {skillCategories.map((cat, i) => (
          <div key={i} className="skill-card-glass">
            <div className="cat-title">
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.title}</h3>
            </div>
            <div className="skills-bar-list">
              {cat.skills.map((skill, si) => (
                <div key={si} className="skill-item">
                  <div className="skill-meta">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.rating}%</span>
                  </div>
                  <div className="progress-bg">
                    <motion.div 
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.rating}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 4: PROJECTS
// -------------------------------------------------------------
function ProjectsTab() {
  const projects = [
    {
      title: 'AI-Powered Collaborative Coding Platform',
      timeline: 'Jan 2025 - Apr 2025',
      location: 'Indus University, Ahmedabad, India',
      tech: ['MongoDB', 'Node.js', 'React.js', 'Tailwind CSS', 'Socket.IO'],
      points: [
        'Developed a scalable real-time collaborative coding platform using the MERN stack with role-based authentication and multi-user project management features.',
        'Integrated Socket.IO to enable real-time synchronization, collaborative editing, live chat, and instant project updates for multiple concurrent users.',
        'Engineered scalable client/server communication workflows enabling seamless real-time collaboration and synchronized updates for 50+ concurrent users.',
        'Conducted debugging, testing, and performance optimization to improve platform stability and maintainability within Agile development cycles.'
      ]
    }
  ];

  return (
    <div className="tab-projects">
      <div className="projects-intro">
        <h2>Engineering Portfolios</h2>
        <p>Highlighting core academic works and full-stack software deployments engineered by Bhavik.</p>
      </div>

      <div className="projects-list">
        {projects.map((proj, idx) => (
          <div key={idx} className="project-detail-card">
            <div className="proj-main-info">
              <div className="proj-header-row">
                <h3>{proj.title}</h3>
                <span className="proj-date">{proj.timeline}</span>
              </div>
              <p className="proj-loc">{proj.location}</p>
              
              <div className="proj-tech-container">
                {proj.tech.map((t, ti) => (
                  <span key={ti} className="tech-badge">{t}</span>
                ))}
              </div>

              <div className="proj-bullet-list">
                <h4>Key Accomplishments & Systems Built:</h4>
                <ul>
                  {proj.points.map((pt, pti) => (
                    <li key={pti}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 5: CONTACT
// -------------------------------------------------------------
function ContactTab() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="tab-contact">
      <div className="contact-grid">
        <div className="contact-info-panel">
          <h2>Let's Connect!</h2>
          <p>Looking for a talented software engineering intern for a 4 or 8 month term starting from **September 2026**? Or want to discuss scaling real-time web applications? Drop me a line!</p>

          <div className="contact-detail-items">
            <div className="detail-item">
              <Mail className="detail-icon" />
              <div>
                <h4>Email</h4>
                <a href="mailto:bhavikpatel73241@gmail.com">bhavikpatel73241@gmail.com</a>
              </div>
            </div>
            <div className="detail-item">
              <Phone className="detail-icon" />
              <div>
                <h4>Phone</h4>
                <p>+1 (647) 382-0767</p>
              </div>
            </div>
            <div className="detail-item">
              <MapPin className="detail-icon" />
              <div>
                <h4>Location</h4>
                <p>Windsor, Ontario, Canada</p>
              </div>
            </div>
          </div>

          <div className="contact-links-grid">
            <a href="https://github.com/bhavik41" target="_blank" rel="noreferrer" className="social-pill">
              <Github size={16} /> GitHub <ExternalLink size={12} />
            </a>
            <a href="https://linkedin.com/in/bhavik-thumbadiya-192868272" target="_blank" rel="noreferrer" className="social-pill">
              <Linkedin size={16} /> LinkedIn <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="contact-form-panel">
          {isSent ? (
            <motion.div 
              className="success-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle size={48} className="success-icon" />
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. Bhavik will get back to you as soon as possible.</p>
              <button className="btn btn-primary" onClick={() => setIsSent(false)}>Send Another Message</button>
            </motion.div>
          ) : (
            <form className="glass-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input 
                  type="email" 
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  rows="4" 
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Type your message here..."
                  required
                />
              </div>
              <button 
                type="submit" 
                className={`btn btn-primary form-submit ${isSending ? 'sending' : ''}`}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : <><Send size={14} style={{ marginRight: '6px' }} /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Bookmarks: stored in localStorage under "vos-bookmarks"
