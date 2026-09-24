import Link from "next/link";
export default function AdminPage() {
  const items = [["Tours","Create, edit, publish and archive tours."],["Bookings","Review reservations and payment status."],["Customers","Manage traveler information."],["Reviews","Moderate verified traveler reviews."],["Products","Manage souvenir inventory and pricing."],["Radio","Manage episodes and show information."],["Trip Updates","Publish itinerary changes and customer updates."]];
  return <main><section className="page-head"><div className="container"><h1>Admin Dashboard</h1><p>TravelKulture content and operations management.</p></div></section>
    <section className="section"><div className="container"><div className="stat-grid"><div className="stat"><strong>—</strong>Upcoming Tours</div><div className="stat"><strong>—</strong>Bookings</div><div className="stat"><strong>—</strong>Customers</div><div className="stat"><strong>—</strong>Pending Reviews</div></div>
    <div className="grid" style={{marginTop:30}}>{items.map(x=><div className="card" key={x[0]}><div className="card-body"><h3>{x[0]}</h3><p className="muted">{x[1]}</p><Link className="btn secondary" href="#">Open</Link></div></div>)}</div></div></section>
  </main>;
}