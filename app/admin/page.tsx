
import Link from "next/link";
// Change this line to import from server instead of client:
import { createClient } from "../../lib/supabase/server";

export default async function AdminPage() {
  // Await the createClient function if it's asynchronous
  const supabase = await createClient();

  const [
    { count: upcomingTours },
    { count: bookings },
    { count: customers },
    { count: pendingReviews },
  ] = await Promise.all([
    supabase
      .from("tours")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),

    supabase.from("bookings").select("*", { count: "exact", head: true }),

    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "customer"),

    supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("approved", false),
  ]);

  const items = [
    ["Tours", "Create, edit, publish and archive tours.", "/admin/tours"],
    ["Bookings", "Review reservations and payment status.", "/admin/bookings"],
    ["Customers", "Manage traveler information.", "/admin/customers"],
    ["Reviews", "Moderate verified traveler reviews.", "/admin/reviews"],
    ["Products", "Manage souvenir inventory and pricing.", "/admin/products"],
    ["Radio", "Manage episodes and show information.", "/admin/radio"],
    [
      "Trip Updates",
      "Publish itinerary changes and customer updates.",
      "/admin/trip-updates",
    ],
  ];

  return (
    <main>
      <section className="page-head">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>TravelKulture content and operations management.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stat-grid">
            <div className="stat">
              <strong>{upcomingTours ?? 0}</strong>
              Published Tours
            </div>

            <div className="stat">
              <strong>{bookings ?? 0}</strong>
              Bookings
            </div>

            <div className="stat">
              <strong>{customers ?? 0}</strong>
              Customers
            </div>

            <div className="stat">
              <strong>{pendingReviews ?? 0}</strong>
              Pending Reviews
            </div>
          </div>

          <div className="grid" style={{ marginTop: 30 }}>
            {items.map(([title, description, href]) => (
              <div className="card" key={title}>
                <div className="card-body">
                  <h3>{title}</h3>
                  <p className="muted">{description}</p>

                  <Link className="btn secondary" href={href}>
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

