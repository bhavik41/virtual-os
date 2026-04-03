export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
export const uuid = () => Math.random().toString(36).slice(2);
export const sleep = ms => new Promise(r => setTimeout(r, ms));
export const formatBytes = b => b < 1024 ? b+"B" : b < 1048576 ? (b/1024).toFixed(1)+"KB" : (b/1048576).toFixed(1)+"MB";

// JSX syntax highlight patch

// Explorer rename patch
