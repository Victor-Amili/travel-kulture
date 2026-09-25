import Link from "next/link";

export function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/"><img className="nav-logo" src="/images/logo.png" alt="TravelKulture" /></Link>
        <nav className="nav-links">
          <Link href="/tours">Tours</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/radio">Radio</Link>
          <Link href="/my-trip">My Trip</Link>
          <Link className="btn" href="/booking">Book a Tour</Link>
        </nav>
      </div>
    </header>
  );
}