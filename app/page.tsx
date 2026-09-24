import Link from "next/link";
import { tours } from "@/lib/demo-data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="badge">TRAVELKULTURE</span>
          <h1>Experience Nigeria. Not just visit it.</h1>
          <p>Immersive cultural journeys, local experiences and group tours designed to help you experience the places behind the postcards.</p>
          <div className="hero-actions">
            <Link className="btn light" href="/tours">Explore Tours</Link>
            <Link className="btn secondary" style={{color:"white",borderColor:"white"}} href="/reviews">What Travelers Say</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Upcoming Experiences</h2>
            <p>Discover the next TravelKulture journeys and reserve your place.</p>
          </div>
          <div className="grid">
            {tours.map(tour => (
              <article className="card" key={tour.id}>
                <div style={{height:210, background:`url("${tour.cover_image}") center/cover`}} />
                <div className="card-body">
                  <span className="badge">{tour.seats_available} seats left</span>
                  <h3>{tour.title}</h3>
                  <p className="muted">{tour.summary}</p>
                  <p><strong>{tour.currency} {tour.price.toLocaleString()}</strong></p>
                  <Link className="btn" href={`/tours/${tour.slug}`}>View Tour</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"white"}}>
        <div className="container">
          <div className="section-title">
            <h2>Your Trip, In One Place</h2>
            <p>Once you book, your booking reference becomes your gateway to your itinerary, updates and travel documents.</p>
          </div>
          <div style={{textAlign:"center"}}><Link className="btn" href="/my-trip">Track My Trip</Link></div>
        </div>
      </section>
    </>
  );
}