import { useState } from "react";
export default function CalcApp() {
  const [display, setDisplay] = useState("0");
  const press = v => setDisplay(p => p === "0" ? v : p + v);
  const calc = () => { try { setDisplay(String(eval(display))); } catch { setDisplay("Err"); } };
  const btns = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"];
  return (
    <div style={{padding:16,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
      <div style={{gridColumn:"1/-1",textAlign:"right",fontSize:24,padding:8}}>{display}</div>
      {btns.map(b=><button key={b} onClick={()=>b==="="?calc():press(b)} style={{padding:12,fontSize:16,borderRadius:8}}>{b}</button>)}
    </div>
  );
}
