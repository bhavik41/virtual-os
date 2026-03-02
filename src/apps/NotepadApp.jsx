import { useState } from "react";
export default function NotepadApp() {
  const [text, setText] = useState("");
  return (
    <div style={{padding:16,height:"100%",display:"flex",flexDirection:"column"}}>
      <textarea style={{flex:1,resize:"none",background:"#1e1e1e",color:"#d4d4d4",border:"none",fontFamily:"monospace",fontSize:14,padding:8}}
        value={text} onChange={e=>setText(e.target.value)} placeholder="Start typing…" />
    </div>
  );
}
