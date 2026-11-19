import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="brand">{product.brand}</p>
      <p className="price">${product.price.toFixed(2)}</p>
    </Link>
  );
}

export default ProductCard;