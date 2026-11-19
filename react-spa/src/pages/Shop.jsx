import { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function Shop() {
  const { products, loading, error } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="shop-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <h3>Categories</h3>
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <section className="product-section">
        <h2>Shop</h2>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Shop;