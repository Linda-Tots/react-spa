import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";

function AdminPortal() {
  const { addProduct } = useProductContext();
  const navigate = useNavigate();

  const handleAddProduct = async (formData) => {
    await addProduct(formData);
    // After adding, go to the Shop page so the user can see the new product
    navigate("/shop");
  };

  return (
    <div className="admin-page">
      <h1>Admin Portal</h1>
      <p>Add a new product to the store</p>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
}

export default AdminPortal;