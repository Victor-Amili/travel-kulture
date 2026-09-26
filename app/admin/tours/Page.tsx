
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminToursPage() {
  const supabase = await createClient();

  const { data: tours, error } = await supabase
    .from("tours")
    .select(
      "id, slug, title, start_date, end_date, price, currency, seats_total, seats_available, status, cover_image"
    )
    .order("start_date", { ascending: true });

  return (
    <main>
      <section className="page-head">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1>Tour Management</h1>
              <p>Manage TravelKulture tours, availability and publishing.</p>
            </div>

            <Link className="btn" href="/admin/tours/new">
              + Create Tour
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {error && (
            <div className="card">
              <div className="card-body">
                <p>
                  Unable to load tours. Please check your Supabase connection.
                </p>
              </div>
            </div>
          )}

          {!error && (!tours || tours.length === 0) && (
            <div className="card">
              <div className="card-body">
                <h3>No tours yet</h3>
                <p className="muted">
                  Create your first TravelKulture tour to get started.
                </p>

                <Link className="btn" href="/admin/tours/new">
                  Create First Tour
                </Link>
              </div>
            </div>
          )}

          {tours && tours.length > 0 && (
            <div className="grid">
              {tours.map((tour) => (
                <div className="card" key={tour.id}>
                  {tour.cover_image && (
                    <img
                      src={tour.cover_image}
                      alt={tour.title}
                      style={{
                        width: "100%",
                        height: 220,
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <h3>{tour.title}</h3>

                      <span className="muted">
                        {tour.status}
                      </span>
                    </div>

                    <p className="muted">
                      {tour.start_date} → {tour.end_date}
                    </p>

                    <p>
                      {tour.currency}{" "}
                      {Number(tour.price).toLocaleString()}
                    </p>

                    <p className="muted">
                      Seats: {tour.seats_available} / {tour.seats_total}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        marginTop: 16,
                      }}
                    >
                      <Link
                        className="btn secondary"
                        href={`/admin/tours/${tour.id}`}
                      >
                        Edit
                      </Link>

                      <Link
                        className="btn secondary"
                        href={`/tours/${tour.slug}`}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
