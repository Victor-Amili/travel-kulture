 "use client";
import { useState } from "react";

export default function MyTripPage() {
  const [reference,setReference] = useState("");
  const [shown,setShown] = useState(false);
  return <main>
    <section className="page-head"><div className="container"><h1>Track My Trip</h1><p>Use your booking reference to access your itinerary and travel updates.</p></div></section>
    <section className="section"><div className="container"><div className="form" style={{maxWidth:650,margin:"auto"}}>
      <div className="field"><label>Booking reference</label><input placeholder="e.g. TK-2481" value={reference} onChange={e=>setReference(e.target.value)}/></div>
      <div style={{marginTop:15}}><button className="btn" onClick={()=>setShown(!!reference.trim())}>View Itinerary</button></div>
      {shown && <div style={{marginTop:25,padding:20,background:"var(--sand)",borderRadius:12}}>
        <h3>Booking {reference.toUpperCase()}</h3>
        <p><strong>Lagos Deep Dive — 5 Days</strong></p>
        <p>Day 1 — Arrival, airport pickup and welcome dinner.</p>
        <p>Day 2 — Guided cultural exploration.</p>
        <p>Day 3 — Markets and community experience.</p>
        <p>Day 4 — Heritage and music experience.</p>
        <p>Day 5 — Checkout and departure transfer.</p>
      </div>}
    </div></div></section>
  </main>;
}