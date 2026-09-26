
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import CloudinaryUploader, {
  UploadedImage,
} from "@/components/admin/CloudinaryUploader";

type Tour = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  start_date: string;
  end_date: string;
  price: number;
  currency: string;
  seats_total: number;
  seats_available: number;
  cover_image: string | null;
  status: "draft" | "published" | "archived";
};

type TourImage = {
  id: string;
  image_url: string;
  public_id: string | null;
  sort_order: number;
};

export default function AdminTourEditPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const id = String(params.id);

  const [tour, setTour] = useState<Tour | null>(null);
  const [gallery, setGallery] = useState<TourImage[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [newCover, setNewCover] =
    useState<UploadedImage | null>(null);

  const [newGallery, setNewGallery] =
    useState<UploadedImage[]>([]);

  useEffect(() => {
    loadTour();
  }, [id]);

  async function loadTour() {
    setLoading(true);
    setError("");

    const { data: tourData, error: tourError } =
      await supabase
        .from("tours")
        .select("*")
        .eq("id", id)
        .single();

    if (tourError || !tourData) {
      console.error(tourError);
      setError("Unable to load this tour.");
      setLoading(false);
      return;
    }

    const { data: imageData, error: imageError } =
      await supabase
        .from("tour_images")
        .select("id, image_url, public_id, sort_order")
        .eq("tour_id", id)
        .order("sort_order", { ascending: true });

    if (imageError) {
      console.error(imageError);
    }

    setTour(tourData);
    setGallery(imageData || []);
    setLoading(false);
  }

  async function saveTour() {
    if (!tour) return;

    setSaving(true);
    setError("");
    setMessage("");

    const updateData: Record<string, unknown> = {
      title: tour.title,
      slug: tour.slug,
      summary: tour.summary,
      description: tour.description,
      start_date: tour.start_date,
      end_date: tour.end_date,
      price: Number(tour.price),
      seats_total: Number(tour.seats_total),
      seats_available: Number(tour.seats_available),
    };

    if (newCover) {
      updateData.cover_image = newCover.secure_url;
    }

    const { error: updateError } = await supabase
      .from("tours")
      .update(updateData)
      .eq("id", tour.id);

    if (updateError) {
      console.error(updateError);
      setError(updateError.message);
      setSaving(false);
      return;
    }

    if (newGallery.length > 0) {
      const startOrder =
        gallery.length > 0
          ? Math.max(...gallery.map((image) => image.sort_order)) + 1
          : 0;

      const { error: galleryError } = await supabase
        .from("tour_images")
        .insert(
          newGallery.map((image, index) => ({
            tour_id: tour.id,
            image_url: image.secure_url,
            public_id: image.public_id,
            sort_order: startOrder + index,
          }))
        );

      if (galleryError) {
        console.error(galleryError);
        setError(
          "Tour was updated, but the new gallery images could not be saved."
        );
        setSaving(false);
        return;
      }

      setNewGallery([]);
    }

    if (newCover) {
      setTour({
        ...tour,
        ...updateData,
        cover_image: newCover.secure_url,
      } as Tour);

      setNewCover(null);
    }

    setMessage("Tour saved successfully.");
    setSaving(false);

    await loadTour();
  }

  async function changeStatus(
    status: "draft" | "published" | "archived"
  ) {
    if (!tour) return;

    setSaving(true);
    setError("");
    setMessage("");

    const { error: statusError } = await supabase
      .from("tours")
      .update({ status })
      .eq("id", tour.id);

    if (statusError) {
      console.error(statusError);
      setError(statusError.message);
      setSaving(false);
      return;
    }

    setTour({
      ...tour,
      status,
    });

    setMessage(`Tour ${status}.`);
    setSaving(false);
  }

  async function deleteGalleryImage(image: TourImage) {
    const confirmed = window.confirm(
      "Delete this gallery image?"
    );

    if (!confirmed) return;

    const { error: deleteError } = await supabase
      .from("tour_images")
      .delete()
      .eq("id", image.id);

    if (deleteError) {
      console.error(deleteError);
      setError(deleteError.message);
      return;
    }

    setGallery((current) =>
      current.filter((item) => item.id !== image.id)
    );

    setMessage("Gallery image removed.");
  }

  async function deleteTour() {
    if (!tour) return;

    const confirmed = window.confirm(
      `Delete "${tour.title}" permanently? This cannot be undone.`
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    const { error: deleteError } = await supabase
      .from("tours")
      .delete()
      .eq("id", tour.id);

    if (deleteError) {
      console.error(deleteError);
      setError(deleteError.message);
      setDeleting(false);
      return;
    }

    router.push("/admin/tours");
    router.refresh();
  }

  if (loading) {
    return (
      <main>
        <section className="section">
          <div className="container">
            <p>Loading tour...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!tour) {
    return (
      <main>
        <section className="section">
          <div className="container">
            <h1>Tour not found</h1>
            <Link href="/admin/tours" className="btn">
              Back to Tours
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-head">
        <div className="container">
          <Link href="/admin/tours" className="muted">
            ← Back to Tours
          </Link>

          <h1 style={{ marginTop: 12 }}>
            Edit Tour
          </h1>

          <p>{tour.title}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <button
              type="button"
              className="btn"
              onClick={() => changeStatus("published")}
              disabled={saving || tour.status === "published"}
            >
              Publish
            </button>

            <button
              type="button"
              className="btn secondary"
              onClick={() => changeStatus("draft")}
              disabled={saving || tour.status === "draft"}
            >
              Move to Draft
            </button>

            <button
              type="button"
              className="btn secondary"
              onClick={() => changeStatus("archived")}
              disabled={saving || tour.status === "archived"}
            >
              Archive
            </button>

            <button
              type="button"
              className="btn secondary"
              onClick={deleteTour}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Tour"}
            </button>
          </div>

          {error && (
            <div
              role="alert"
              style={{
                marginBottom: 20,
                color: "crimson",
              }}
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              style={{
                marginBottom: 20,
              }}
            >
              {message}
            </div>
          )}

          <div
            className="card"
            style={{ maxWidth: 1000 }}
          >
            <div className="card-body">
              <h2>Tour Information</h2>

              <div className="form-grid">
                <label>
                  Tour title
                  <input
                    value={tour.title}
                    onChange={(event) =>
                      setTour({
                        ...tour,
                        title: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  URL slug
                  <input
                    value={tour.slug}
                    onChange={(event) =>
                      setTour({
                        ...tour,
                        slug: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Start date
                  <input
                    type="date"
                    value={tour.start_date}
                    onChange={(event) =>
                      setTour({
                        ...tour,
                        start_date: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  End date
                  <input
                    type="date"
                    value={tour.end_date}
                    onChange={(event) =>
                      setTour({
                        ...tour,
                        end_date: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Price
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tour.price}
                    onChange={(event) =>
                      setTour({
                        ...tour,
                        price: Number(event.target.value),
                      })
                    }
                  />
                </label>

                <label>
                  Total seats
                  <input
                    type="number"
                    min="1"
                    value={tour.seats_total}
                    onChange={(event) =>
                      setTour({
                        ...tour,
                        seats_total: Number(
                          event.target.value
                        ),
                      })
                    }
                  />
                </label>

                <label>
                  Available seats
                  <input
                    type="number"
                    min="0"
                    value={tour.seats_available}
                    onChange={(event) =>
                      setTour({
                        ...tour,
                        seats_available: Number(
                          event.target.value
                        ),
                      })
                    }
                  />
                </label>
              </div>

              <label
                style={{
                  display: "block",
                  marginTop: 20,
                }}
              >
                Summary
                <textarea
                  rows={4}
                  value={tour.summary || ""}
                  onChange={(event) =>
                    setTour({
                      ...tour,
                      summary: event.target.value,
                    })
                  }
                />
              </label>

              <label
                style={{
                  display: "block",
                  marginTop: 20,
                }}
              >
                Description
                <textarea
                  rows={8}
                  value={tour.description || ""}
                  onChange={(event) =>
                    setTour({
                      ...tour,
                      description: event.target.value,
                    })
                  }
                />
              </label>

              <hr style={{ margin: "30px 0" }} />

              <h2>Cover Image</h2>

              {tour.cover_image && (
                <img
                  src={tour.cover_image}
                  alt={tour.title}
                  style={{
                    width: "100%",
                    maxWidth: 600,
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 12,
                    marginBottom: 16,
                  }}
                />
              )}

              <CloudinaryUploader
                folder={`travelkulture/tours/${tour.slug}`}
                onUpload={(images) => {
                  setNewCover(images[0] || null);
                }}
              />

              {newCover && (
                <img
                  src={newCover.secure_url}
                  alt="New cover preview"
                  style={{
                    width: "100%",
                    maxWidth: 600,
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 12,
                    marginTop: 16,
                  }}
                />
              )}

              <hr style={{ margin: "30px 0" }} />

              <h2>Gallery</h2>

              <CloudinaryUploader
                folder={`travelkulture/tours/${tour.slug}/gallery`}
                multiple
                onUpload={(images) => {
                  setNewGallery((current) => [
                    ...current,
                    ...images,
                  ]);
                }}
              />

              {(gallery.length > 0 ||
                newGallery.length > 0) && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 14,
                    marginTop: 20,
                  }}
                >
                  {gallery.map((image) => (
                    <div key={image.id}>
                      <img
                        src={image.image_url}
                        alt="Tour gallery"
                        style={{
                          width: "100%",
                          height: 150,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                      />

                      <button
                        type="button"
                        className="btn secondary"
                        style={{
                          marginTop: 8,
                          width: "100%",
                        }}
                        onClick={() =>
                          deleteGalleryImage(image)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {newGallery.map((image) => (
                    <div key={image.public_id}>
                      <img
                        src={image.secure_url}
                        alt="New tour gallery"
                        style={{
                          width: "100%",
                          height: 150,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                      />

                      <span
                        className="muted"
                        style={{
                          display: "block",
                          marginTop: 8,
                        }}
                      >
                        New image
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="btn"
                style={{ marginTop: 30 }}
                onClick={saveTour}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
