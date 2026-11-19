import { useState, useEffect } from "react";

function ProductForm({ initialData = {}, onSubmit, isEdit = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "Laptop",
    price: "",
    stock: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  // When editing, fill the form with existing product data
  useEffect(() => {
    if (initialData && initialData.id) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        brand: initialData.brand || "",
        category: initialData.category || "Laptop",
        price: initialData.price || "",
        stock: initialData.stock || "",
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Convert price and stock to numbers before sending
    const productToSubmit = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock) || 0,
    };

    onSubmit(productToSubmit);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. MacBook Pro 14"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short product description"
          rows="3"
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          name="brand"
          type="text"
          value={formData.brand}
          onChange={handleChange}
          placeholder="e.g. Apple, Samsung, LG"
        />
        {errors.brand && <span className="error-text">{errors.brand}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Laptop">Laptop</option>
          <option value="Phone">Phone</option>
          <option value="TV">TV</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="price">Price ($)</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. 999.99"
        />
        {errors.price && <span className="error-text">{errors.price}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="e.g. 15"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <button type="submit" className="submit-btn">
        {isEdit ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;