import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/logo.jpg" alt="TravelKulture" style={{height: 48, background: "white", padding: 6, borderRadius: 8}} />
          <p>Travel experiences infused with culture, community and unforgettable stories.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link href="/tours">Tours</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/shop">Souvenirs</Link>
          <Link href="/my-trip">Track My Trip</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/radio">Radio Show</Link>
        </div>
        <div>
          <h4>Social</h4>
          <a href="https://www.instagram.com/travelkulture/" target="_blank">Instagram</a>
          <a href="https://www.youtube.com/@travelkulturetravel7684" target="_blank">YouTube</a>
          <a href="https://linktr.ee/travelkultu" target="_blank">All Links</a>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 TravelKulture. All rights reserved.</div>
    </footer>
  );
}