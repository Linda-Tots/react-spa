import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, updateProduct, deleteProduct } = useProductContext();

  const product = products.find((p) => p.id === Number(id));

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const handleUpdate = async (updates) => {
    await updateProduct(product.id, updates);
    alert("Product updated successfully!");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(product.id);
      navigate("/shop");
    }
  };

  return (
    <div className="product-detail">
      <div className="detail-info">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div>
          <h1>{product.name}</h1>
          <p className="brand">{product.brand}</p>
          <p className="category">{product.category}</p>
          <p className="description">{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p>In stock: {product.stock}</p>
        </div>
      </div>

      <hr />

      <h2>Edit Product</h2>
      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        isEdit={true}
      />

      <button onClick={handleDelete} className="delete-btn">
        Delete Product
      </button>
    </div>
  );
}

export default ProductDetail;