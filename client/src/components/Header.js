import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  getUserWishlist,
  logout,
} from "../features/user/userSlice";
import { getAllProductCategories } from "../features/category/categorySlice";
import { getUserCart } from "../features/cart/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userToken } = useSelector((state) => state.auth);
  const { productCategories } = useSelector((state) => state.category);
  const { cart } = useSelector((state) => state.cart);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!user) {
      if (userToken) {
        dispatch(getUserDetails());
      }
    }
    dispatch(getAllProductCategories());
    dispatch(getUserWishlist());
    dispatch(getUserCart());
  }, [user, userToken, dispatch]);

  return (
    <div className="header">
      <Container className="header-top-strip py-1">
        <div className="row">
          <div className="col-6 ">
            <p className="text-white mb-0">
              Free Shipping Over $100 & Free Returns
            </p>
          </div>
          <div className="col-6">
            <p className="text-end text-white mb-0">
              Hotline:{" "}
              <a className="text-white" href="tel:+84 939629971">
                +84 939629971
              </a>
            </p>
          </div>
        </div>
      </Container>
      <Container className="header-upper py-3">
        <div className="row align-items-center">
          <div className="col-2">
            <div className="m-0 fs-2">
              <Link to="/" className="text-white">
                Hieseu.
              </Link>
            </div>
          </div>
          <div className="col-5">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Product Here..."
                aria-label="Search Product Here..."
                aria-describedby="basic-addon2"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    navigate(`/store?title=${searchInput}&o=i`);
                  }
                }}
              />
              <Link
                className="input-group-text py-2 px-3"
                id="basic-addon2"
                to={`/store?title=${searchInput}&o=i`}
              >
                <BsSearch className="fs-6" />
              </Link>
            </div>
          </div>
          <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-end gap-30">
              <Link to="/compare-product" className="header-link hover-rotate">
                <img src="/images/compare.svg" alt="compare" />
                <div>
                  Compare <br /> Products
                </div>
              </Link>
              <Link to="/wishlist" className="header-link hover-rotate">
                <img src="/images/wishlist.svg" alt="wishlist" />
                <div>
                  Favourite <br /> Wishlist
                </div>
              </Link>
              <div className="dropdown header-link hover-rotate bg-transparent">
                <div
                  className="dropdown-toggle bg-transparent d-flex align-items-center cursor-pointer gap-10 text-white"
                  id="Account"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="/images/user.svg" alt="account" />
                  <div>
                    Log in <br /> My Account
                  </div>
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    {!user ? (
                      <>
                        <Link className="dropdown-item text-active" to="/login">
                          Login
                        </Link>
                        <Link
                          className="dropdown-item text-active"
                          to="/register"
                        >
                          Register
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link className="dropdown-item" to="/account">
                          My Account
                        </Link>
                        <Link className="dropdown-item" to="/change-password">
                          Change Password
                        </Link>

                        <Link className="dropdown-item" to="/my-orders">
                          My Orders
                        </Link>
                        <Link
                          className="dropdown-item text-danger"
                          onClick={() => dispatch(logout())}
                        >
                          Logout
                        </Link>
                      </>
                    )}
                  </li>
                </ul>
              </div>
              {user && (
                <Link to="/cart" className="header-link hover-rotate">
                  <img src="/images/cart.svg" alt="cart" />
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <span
                      className="text-center w-75 bg-white text-dark"
                      style={{
                        borderRadius: 25,
                        lineHeight: "16px",
                        fontSize: "12px",
                      }}
                    >
                      {cart ? cart.Products?.length : 0}
                    </span>
                    <div>
                      $ {cart ? Math.round(cart.CartTotal * 100) / 100 : 0}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Container className="header-menu-bottom py-1">
        <div className="row">
          <div className="col-12">
            <div className="menu-bottom d-flex align-items-center gap-30">
              <div className="dropdown">
                <button
                  className="my-2 dropdown-toggle border-0 bg-transparent d-flex align-items-center gap-15"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="me-5">Shop Categories</div>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {productCategories &&
                    productCategories.map((e, i) => {
                      return (
                        <li key={"header-cat-" + i}>
                          <Link
                            className="dropdown-item text-white"
                            to={`/store?category=${e.Title}`}
                          >
                            {e.Title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="menu-links">
                <div className="d-flex align-items-center gap-15">
                  <NavLink className="text-hover" to="/">
                    Home
                  </NavLink>
                  <NavLink className="text-hover" to="/store">
                    Our Store
                  </NavLink>
                  <NavLink className="text-hover" to="/blogs">
                    Blogs
                  </NavLink>
                  <NavLink className="text-hover" to="/contact">
                    Contact
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
