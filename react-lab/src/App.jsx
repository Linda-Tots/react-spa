import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AdminPortal from "./pages/AdminPortal";
import ProductDetail from "./pages/ProductDetail";
import "./styles/index.css";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;