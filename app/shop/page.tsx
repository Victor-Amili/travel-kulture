const products = [
  ["TravelKulture Ankara Tee","₦12,000"],["Handmade Bead Set","₦8,500"],["Aso-Oke Woven Tote","₦15,000"],["Travel Journal","₦9,000"]
];
export default function ShopPage() {
  return <main><section className="page-head"><div className="container"><h1>Souvenirs & Merch</h1><p>Bring a piece of the TravelKulture experience home.</p></div></section>
  <section className="section"><div className="container"><div className="grid">{products.map(p=><article className="card" key={p[0]}><div style={{height:190,background:"linear-gradient(135deg,#d9e383,#2e5d3a)"}}/><div className="card-body"><h3>{p[0]}</h3><strong>{p[1]}</strong><div style={{marginTop:15}}><button className="btn">Add to Cart</button></div></div></article>)}</div></div></section></main>;
}