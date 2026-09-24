import Link from "next/link";
import { tours } from "@/lib/demo-data";

export default async function TourDetails({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const tour = tours.find(t => t.slug === slug) ?? tours[0];

  return <main>
    <section className="page-head"><div className="container"><span className="badge">UPCOMING TOUR</span><h1>{tour.title}</h1><p>{tour.summary}</p></div></section>
    <section className="section"><div className="container" style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:30}}>
      <div>
        <h2>Experience overview</h2>
        <p className="muted">This page is structured for the full production tour content: itinerary, inclusions, exclusions, accommodation, pickup information, gallery and FAQs. The admin dashboard will eventually manage all of these sections.</p>
        <h2>Sample itinerary</h2>
        <div className="card"><div className="card-body">
          <p><strong>Day 1:</strong> Arrival, pickup and welcome experience.</p>
          <p><strong>Day 2:</strong> Guided cultural and historical exploration.</p>
          <p><strong>Day 3:</strong> Local food, markets and community experiences.</p>
          <p><strong>Day 4:</strong> Music, arts and free exploration.</p>
          <p><strong>Day 5:</strong> Checkout and departure transfer.</p>
        </div></div>
      </div>
      <aside className="form">
        <span className="badge">{tour.seats_available} seats left</span>
        <h2>{tour.currency} {tour.price.toLocaleString()}</h2>
        <p className="muted">Reserve your place with our booking flow.</p>
        <Link className="btn" href={`/booking?tour=${tour.slug}`}>Start Booking</Link>
      </aside>
    </div></section>
  </main>;
}