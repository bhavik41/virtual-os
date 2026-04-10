import TerminalApp from './TerminalApp';
import EditorApp from './EditorApp';
import ExplorerApp from './ExplorerApp';
import BrowserApp from './BrowserApp';
import { Terminal, Code2, Folder, Globe } from 'lucide-react';

export const apps = [
  {
    id: 'browser',
    title: 'Safari',
    icon: Globe,
    component: BrowserApp,
    defaultWidth: 1000,
    defaultHeight: 700,
  },
  {
    id: 'explorer',
    title: 'Finder',
    icon: Folder,
    component: ExplorerApp,
    defaultWidth: 800,
    defaultHeight: 500,
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: Terminal,
    component: TerminalApp,
    defaultWidth: 700,
    defaultHeight: 450,
  },
  {
    id: 'editor',
    title: 'VS Code',
    icon: Code2,
    component: EditorApp,
    defaultWidth: 900,
    defaultHeight: 600,
  }
];
