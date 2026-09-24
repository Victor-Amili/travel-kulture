import Link from "next/link";
import { tours } from "@/lib/demo-data";

export default function ToursPage() {
  return (
    <main>
      <section className="page-head"><div className="container"><h1>Our Tours</h1><p>Browse upcoming TravelKulture journeys and explore the experiences planned for each trip.</p></div></section>
      <section className="section"><div className="container"><div className="grid">
        {tours.map(tour => <article className="card" key={tour.id}>
          <div style={{height:220,background:`url("${tour.cover_image}") center/cover`}} />
          <div className="card-body">
            <span className="badge">{tour.seats_available} seats available</span>
            <h2>{tour.title}</h2>
            <p className="muted">{tour.summary}</p>
            <p><strong>{tour.start_date} → {tour.end_date}</strong></p>
            <p><strong>{tour.currency} {tour.price.toLocaleString()}</strong></p>
            <Link className="btn" href={`/tours/${tour.slug}`}>View Details</Link>
          </div>
        </article>)}
      </div></div></section>
    </main>
  );
}