export type Tour = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  start_date: string;
  end_date: string;
  price: number;
  currency: string;
  seats_total: number;
  seats_available: number;
  cover_image?: string | null;
  status: "draft" | "published" | "archived";
};

export type Booking = {
  id: string;
  reference: string;
  tour_id: string;
  customer_name: string;
  customer_email: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
};
