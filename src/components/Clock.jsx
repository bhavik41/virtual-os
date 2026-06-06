import { useState, useEffect } from "react";
export default function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return <div style={{color:"#fff",fontSize:13,fontWeight:500}}>{time.toLocaleTimeString()}</div>;
}
