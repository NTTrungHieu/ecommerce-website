import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from "../features/blog/blogSlice";
import categoryReducer from "../features/category/categorySlice";
import colorReducer from "../features/color/colorSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    color: colorReducer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
