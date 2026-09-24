 "use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BookingPage() {
  const params = useSearchParams();
  const tour = params.get("tour") || "";
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <main><section className="section"><div className="container"><div className="form" style={{maxWidth:700,margin:"auto",textAlign:"center"}}><h1>Booking request received</h1><p className="muted">Your production version will create a booking reference here and take the customer to payment.</p></div></div></section></main>;

  return <main>
    <section className="page-head"><div className="container"><h1>Book Your Tour</h1><p>Tell us who is traveling. Payment and confirmation can be connected after Supabase and Paystack are configured.</p></div></section>
    <section className="section"><div className="container"><form className="form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><div className="form-grid">
      <div className="field"><label>Full name</label><input required name="name"/></div>
      <div className="field"><label>Email</label><input required type="email" name="email"/></div>
      <div className="field"><label>Phone</label><input required name="phone"/></div>
      <div className="field"><label>Tour</label><input name="tour" defaultValue={tour} /></div>
      <div className="field"><label>Number of travelers</label><input required type="number" min="1" defaultValue="1"/></div>
      <div className="field"><label>Country</label><input name="country"/></div>
      <div className="field full"><label>Special requests</label><textarea rows={5}/></div>
      <div className="field full"><button className="btn" type="submit">Continue to Payment</button></div>
    </div></form></div></section>
  </main>;
}