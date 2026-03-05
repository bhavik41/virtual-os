import { useState } from "react";
export default function SettingsApp() {
  const [dark, setDark] = useState(true);
  return (
    <div style={{padding:24}}>
      <h2 style={{color:"#fff",marginBottom:16}}>Settings</h2>
      <label style={{color:"#ccc",display:"flex",alignItems:"center",gap:12}}>
        <input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)} />
        Dark Mode
      </label>
    </div>
  );
}
