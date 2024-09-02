import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Layout from './components/layout/Layout';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage";
import PageNotFound from "./pages/PageNotFound";
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import AdminAddProduct from "./pages/AdminAddProduct";
import Spinner from "./components/Spinner";
// import CartCard from "./components/cartCard";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AdminProductsPage from "./pages/AllAdminProducts";
import Delete from "./pages/Auth/Delete";

function App() {
  return (
    <div className="App">
      {/* <Layout> */}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Spinner />} />
        <Route path="/admin-landing" element={<AdminAddProduct/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product-details" element={<SingleProduct />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/wishlist" element={<WishlistPage/>}/>
        <Route path="/admin-shop" element={<AdminProductsPage/>}/>
        <Route path="/delete-account" element={<Delete/>}/>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {/* </Layout> */}
    </div>
  );
}

export default App;
