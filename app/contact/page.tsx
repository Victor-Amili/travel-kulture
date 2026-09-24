export default function ContactPage() {
  return <main><section className="page-head"><div className="container"><h1>Contact & Support</h1><p>Questions about a tour, booking or trip? Get in touch with the TravelKulture team.</p></div></section>
  <section className="section"><div className="container"><form className="form" style={{maxWidth:750,margin:"auto"}}><div className="form-grid">
    <div className="field"><label>Name</label><input required/></div><div className="field"><label>Email</label><input type="email" required/></div>
    <div className="field full"><label>Message</label><textarea rows={7} required/></div>
    <div className="field full"><button className="btn" type="button">Send Message</button></div>
  </div></form></div></section></main>;
}