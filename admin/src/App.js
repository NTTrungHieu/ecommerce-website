import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import LoginLayout from "./components/LoginLayout";
import BlogList from "./pages/BlogList";
import BlogCatList from "./pages/BlogCatList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ProductList from "./pages/ProductList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ColorList from "./pages/ColorList";
import CouponList from "./pages/CouponList";
import CustomToast from "./components/CustomToast";
import { ConfigProvider } from "antd";

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          cssVar: true,
          token: {
            // Seed Token
            // colorPrimary: "#00b96b",
            // borderRadius: 2,
            // colorDefaultBorderHover: "#131921",
            // colorDefaultHover: "#131921",
            controlItemBgHover: "rgba(0, 0, 0, 0.08)",
            colorBgContainerDisabled: "rgba(0, 0, 0, 0.08)",
            // // Alias Token
            // colorBgContainer: "#ccc",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginLayout />}>
              <Route index element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="blog-list" element={<BlogList />} />
              <Route path="blog-categories" element={<BlogCatList />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="products" element={<ProductList />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="colors" element={<ColorList />} />
              <Route path="brands" element={<BrandList />} />
              <Route path="coupons" element={<CouponList />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <CustomToast />
      </ConfigProvider>
    </div>
  );
}

export default App;
