import { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const value = useProducts();
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used inside ProductProvider");
  }
  return context;
}