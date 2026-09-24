const reviews = [
  ["Adaeze O.", "Lagos Deep Dive", "I thought I knew Lagos until TravelKulture showed me another side of it."],
  ["Marcus T.", "Heritage Circuit", "The planning made the experience easy from arrival to departure."],
  ["Funmi A.", "Calabar Road Trip", "Having the itinerary and updates in one place made the trip much easier."]
];
export default function ReviewsPage() {
  return <main><section className="page-head"><div className="container"><h1>Traveler Reviews</h1><p>Stories and feedback from people who experienced TravelKulture tours.</p></div></section>
    <section className="section"><div className="container"><div className="grid">{reviews.map(r=><article className="card" key={r[0]}><div className="card-body"><div style={{letterSpacing:3}}>★★★★★</div><p><em>“{r[2]}”</em></p><strong>{r[0]}</strong><p className="muted">{r[1]}</p></div></article>)}</div></div></section></main>;
}