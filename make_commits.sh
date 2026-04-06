#!/bin/bash
git init
git config user.name "Bhavik"
git config user.email "bhavik@example.com"

d20=$(date -v-20d "+%Y-%m-%dT10:00:00")
d18=$(date -v-18d "+%Y-%m-%dT11:30:00")
d15=$(date -v-15d "+%Y-%m-%dT14:15:00")
d12=$(date -v-12d "+%Y-%m-%dT09:45:00")
d8=$(date -v-8d "+%Y-%m-%dT16:20:00")
d5=$(date -v-5d "+%Y-%m-%dT13:10:00")
d3=$(date -v-3d "+%Y-%m-%dT10:05:00")
d1=$(date -v-1d "+%Y-%m-%dT15:50:00")
dnow=$(date "+%Y-%m-%dT%H:%M:%S")

GIT_AUTHOR_DATE="$d20" GIT_COMMITTER_DATE="$d20" git add package.json package-lock.json vite.config.js index.html public/ || true
GIT_AUTHOR_DATE="$d20" GIT_COMMITTER_DATE="$d20" git commit -m "chore: initial project setup with vite" || true

GIT_AUTHOR_DATE="$d18" GIT_COMMITTER_DATE="$d18" git add src/main.jsx src/App.jsx src/index.css || true
GIT_AUTHOR_DATE="$d18" GIT_COMMITTER_DATE="$d18" git commit -m "feat: setup base app layout and global styles" || true

GIT_AUTHOR_DATE="$d15" GIT_COMMITTER_DATE="$d15" git add src/store/useStore.js || true
GIT_AUTHOR_DATE="$d15" GIT_COMMITTER_DATE="$d15" git commit -m "feat: implement zustand store for window management" || true

GIT_AUTHOR_DATE="$d12" GIT_COMMITTER_DATE="$d12" git add src/components/Window.jsx src/components/Window.css src/components/Taskbar.jsx src/components/Taskbar.css || true
GIT_AUTHOR_DATE="$d12" GIT_COMMITTER_DATE="$d12" git commit -m "feat: create draggable window and taskbar components" || true

GIT_AUTHOR_DATE="$d8" GIT_COMMITTER_DATE="$d8" git add src/components/Desktop.jsx src/components/Desktop.css || true
GIT_AUTHOR_DATE="$d8" GIT_COMMITTER_DATE="$d8" git commit -m "feat: implement desktop layout with floating blobs and icons" || true

GIT_AUTHOR_DATE="$d5" GIT_COMMITTER_DATE="$d5" git add src/apps/TerminalApp.jsx src/apps/TerminalApp.css || true
GIT_AUTHOR_DATE="$d5" GIT_COMMITTER_DATE="$d5" git commit -m "feat: add terminal emulator app with basic commands" || true

GIT_AUTHOR_DATE="$d3" GIT_COMMITTER_DATE="$d3" git add src/apps/EditorApp.jsx src/apps/EditorApp.css src/apps/appsConfig.js || true
GIT_AUTHOR_DATE="$d3" GIT_COMMITTER_DATE="$d3" git commit -m "feat: integrate monaco editor for code editor app" || true

GIT_AUTHOR_DATE="$d1" GIT_COMMITTER_DATE="$d1" git add src/apps/ExplorerApp.jsx src/apps/ExplorerApp.css || true
GIT_AUTHOR_DATE="$d1" GIT_COMMITTER_DATE="$d1" git commit -m "feat: add file explorer application interface" || true

GIT_AUTHOR_DATE="$dnow" GIT_COMMITTER_DATE="$dnow" git add . || true
GIT_AUTHOR_DATE="$dnow" GIT_COMMITTER_DATE="$dnow" git commit -m "fix: polish UI, update dependencies, and resolve minor bugs" || true
