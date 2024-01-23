import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blogs from "./pages/Blogs";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SingleBlog from "./pages/SingleBlog";
import Policy from "./pages/Policy";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import Order from "./pages/Order";
import Account from "./pages/Account";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account" element={<Account />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/my-orders" element={<Order />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/store" element={<OurStore />} />
            <Route path="/products/:slug" element={<SingleProduct />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />
            <Route path="/compare-product" element={<CompareProduct />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/pages/:policy" element={<Policy />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
