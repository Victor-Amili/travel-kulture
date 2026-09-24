import type { Tour } from "@/types";

export const tours: Tour[] = [
  {
    id: "demo-1",
    slug: "lagos-deep-dive",
    title: "Lagos Deep Dive — 5 Days",
    summary: "A curated Lagos experience built around food, history, music, markets and local culture.",
    start_date: "2026-12-15",
    end_date: "2026-12-19",
    price: 850000,
    currency: "NGN",
    seats_total: 20,
    seats_available: 12,
    cover_image: "/images/tour-lagos.svg",
    status: "published"
  },
  {
    id: "demo-2",
    slug: "osun-osogbo",
    title: "Osun-Osogbo & Sacred Grove — 3 Days",
    summary: "Explore heritage, art, community and the sacred grove through a guided cultural journey.",
    start_date: "2027-01-09",
    end_date: "2027-01-11",
    price: 420000,
    currency: "NGN",
    seats_total: 20,
    seats_available: 8,
    cover_image: "/images/tour-osun.svg",
    status: "published"
  },
  {
    id: "demo-3",
    slug: "west-africa-heritage-circuit",
    title: "West Africa Heritage Circuit — 7 Days",
    summary: "A multi-country heritage journey designed for travelers who want deeper cultural context.",
    start_date: "2027-02-02",
    end_date: "2027-02-08",
    price: 2000,
    currency: "USD",
    seats_total: 18,
    seats_available: 10,
    cover_image: "/images/tour-west-africa.svg",
    status: "published"
  }
];