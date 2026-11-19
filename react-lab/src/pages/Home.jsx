import { useProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Home() {
  const { products, loading } = useProductContext();

  // Show only the first 3 products as featured
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>TechVault</h1>
        <p>Your trusted destination for laptops, phones and TVs</p>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;