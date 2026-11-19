import { useState, useEffect, useCallback } from "react";

const API = "http://localhost:3001/products";

/**
 * Custom hook that handles all product data and CRUD operations.
 * Components only need to call the functions – they don't repeat fetch logic.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback stops infinite loops with useEffect
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // CREATE
  const addProduct = async (newProduct) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const created = await res.json();
    setProducts((prev) => [...prev, created]);
    return created;
  };

  // UPDATE (PATCH)
  const updateProduct = async (id, updates) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const updated = await res.json();
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    return updated;
  };

  // DELETE
  const deleteProduct = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
}