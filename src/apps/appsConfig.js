import TerminalApp from './TerminalApp';
import EditorApp from './EditorApp';
import ExplorerApp from './ExplorerApp';
import { Terminal, Code2, Folder } from 'lucide-react';

export const apps = [
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
    title: 'Code Editor',
    icon: Code2,
    component: EditorApp,
    defaultWidth: 900,
    defaultHeight: 600,
  },
  {
    id: 'explorer',
    title: 'File Explorer',
    icon: Folder,
    component: ExplorerApp,
    defaultWidth: 800,
    defaultHeight: 500,
  }
];
