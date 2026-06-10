import { useState } from "react";
export default function ContextMenu({ x, y, items, onClose }) {
  return (
    <div style={{position:"fixed",top:y,left:x,background:"rgba(40,40,40,0.95)",borderRadius:8,padding:4,zIndex:9999,minWidth:160,boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
      {items.map(it => <div key={it.label} style={{padding:"6px 12px",color:"#fff",cursor:"pointer",borderRadius:4,fontSize:13}} onClick={()=>{it.action();onClose();}}>{it.label}</div>)}
    </div>
  );
}
