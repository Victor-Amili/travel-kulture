
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import CloudinaryUploader, {
  UploadedImage,
} from "@/components/admin/CloudinaryUploader";
// Use the browser/client-side supabase instance here:
import { supabase } from "@/lib/supabase/client";

export default function NewTourPage() {
  // No need to initialize createClient() here; use `supabase` directly below.

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [slug, setSlug] = useState("");

  const [coverImage, setCoverImage] = useState<UploadedImage | null>(null);

  const [galleryImages, setGalleryImages] = useState<UploadedImage[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    const form = new FormData(event.currentTarget);

    const title = String(form.get("title") || "").trim();
    const slug = String(form.get("slug") || "").trim();
    const summary = String(form.get("summary") || "").trim();
    const description = String(form.get("description") || "").trim();

    const startDate = String(form.get("start_date") || "");
    const endDate = String(form.get("end_date") || "");

    const price = Number(form.get("price") || 0);
    const seatsTotal = Number(form.get("seats_total") || 0);

    if (!title || !slug || !startDate || !endDate) {
      setError("Please complete all required fields.");
      setSaving(false);
      return;
    }

    if (price < 0 || seatsTotal < 0) {
      setError("Price and seats cannot be negative.");
      setSaving(false);
      return;
    }

    const { data: existingTour } = await supabase
      .from("tours")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existingTour) {
      setError("A tour with this slug already exists.");
      setSaving(false);
      return;
    }

    const { data: tour, error: tourError } = await supabase
      .from("tours")
      .insert({
        title,
        slug,
        summary: summary || null,
        description: description || null,
        start_date: startDate,
        end_date: endDate,
        price,
        currency: "NGN",
        seats_total: seatsTotal,
        seats_available: seatsTotal,
        cover_image: coverImage?.secure_url || null,
        status: "draft",
      })
      .select()
      .single();

    if (tourError || !tour) {
      console.error(tourError);
      setError(tourError?.message || "Unable to create the tour.");
      setSaving(false);
      return;
    }

    if (galleryImages.length > 0) {
      const { error: galleryError } = await supabase.from("tour_images").insert(
        galleryImages.map((image, index) => ({
          tour_id: tour.id,
          image_url: image.secure_url,
          public_id: image.public_id,
          sort_order: index,
        })),
      );

      if (galleryError) {
        console.error(galleryError);

        setError("The tour was created, but the gallery could not be saved.");

        setSaving(false);
        return;
      }
    }

    setSuccess("Tour created successfully.");

    setTimeout(() => {
      window.location.href = `/admin/tours/${tour.id}`;
    }, 700);
  }

  return (
    <main>
      <section className="page-head">
        <div className="container">
          <Link href="/admin/tours" className="muted">
            ← Back to Tours
          </Link>

          <h1 style={{ marginTop: 12 }}>Create Tour</h1>

          <p>Create a new TravelKulture tour and prepare it for publishing.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form
            onSubmit={handleSubmit}
            className="card"
            style={{ maxWidth: 900, margin: "0 auto" }}
          >
            <div className="card-body">
              <h2>Tour Information</h2>

              <div className="form-grid">
                <label>
                  Tour title *
                  <input
                    name="title"
                    required
                    placeholder="e.g. Osun Cultural Experience"
                  />
                </label>

                <label>
                  URL slug *
                  <input
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    placeholder="osun-cultural-experience"
                  />
                </label>

                <label>
                  Start date *
                  <input name="start_date" type="date" required />
                </label>

                <label>
                  End date *
                  <input name="end_date" type="date" required />
                </label>

                <label>
                  Price (NGN) *
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                  />
                </label>

                <label>
                  Total seats *
                  <input name="seats_total" type="number" min="1" required />
                </label>
              </div>

              <label style={{ display: "block", marginTop: 20 }}>
                Short summary
                <textarea
                  name="summary"
                  rows={3}
                  placeholder="A short description shown on tour cards."
                />
              </label>

              <label style={{ display: "block", marginTop: 20 }}>
                Full description
                <textarea
                  name="description"
                  rows={7}
                  placeholder="Detailed information about the tour."
                />
              </label>

              <hr style={{ margin: "30px 0" }} />

              <h2>Cover Image</h2>

              <p className="muted">
                This image will be used as the main image for the tour.
              </p>

              <CloudinaryUploader
                folder={`travelkulture/tours/${slug || "new-tour"}`}
                onUpload={(images) => {
                  setCoverImage(images[0] || null);
                }}
              />

              {coverImage && (
                <div style={{ marginTop: 20 }}>
                  <img
                    src={coverImage.secure_url}
                    alt="Tour cover preview"
                    style={{
                      width: "100%",
                      maxWidth: 500,
                      height: 280,
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                </div>
              )}

              <hr style={{ margin: "30px 0" }} />

              <h2>Gallery</h2>

              <p className="muted">
                Add additional images customers can view on the tour details
                page.
              </p>

              <CloudinaryUploader
                folder={`travelkulture/tours/${slug || "new-tour"}/gallery`}
                multiple
                onUpload={(images) => {
                  setGalleryImages((current) => [...current, ...images]);
                }}
              />

              {galleryImages.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 12,
                    marginTop: 20,
                  }}
                >
                  {galleryImages.map((image) => (
                    <img
                      key={image.public_id}
                      src={image.secure_url}
                      alt="Tour gallery"
                      style={{
                        width: "100%",
                        height: 140,
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />
                  ))}
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  style={{
                    marginTop: 24,
                    color: "crimson",
                  }}
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  style={{
                    marginTop: 24,
                  }}
                >
                  {success}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 30,
                  flexWrap: "wrap",
                }}
              >
                <button type="submit" className="btn" disabled={saving}>
                  {saving ? "Creating Tour..." : "Create Tour"}
                </button>

                <Link href="/admin/tours" className="btn secondary">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
