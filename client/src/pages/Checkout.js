import React, { useEffect } from "react";
import Meta from "../components/Meta";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Color from "../components/Color";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../features/user/userSlice";
import { getUserCart } from "../features/cart/cartSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { checkout } from "../features/order/orderSlice";

const shippingInfoSchema = yup.object({
  FirstName: yup.string().required("First Name is required"),
  LastName: yup.string().required("Last Name is required"),
  Address: yup.string().required("Address is required"),
  City: yup.string().required("City is required"),
  ZipCode: yup.string().required("ZipCode is required"),
  Other: yup.string(),
});

const Checkout = () => {
  const title = "Checkout";
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      if (userToken) {
        dispatch(getUserDetails());
      }
    }
    if (!cart?.Products) dispatch(getUserCart());
  }, [user, userToken, cart, dispatch]);

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Address: "",
      Other: "",
      City: "",
      ZipCode: "",
    },
    validationSchema: shippingInfoSchema,
    onSubmit: (values) => {
      dispatch(checkout(values));
      dispatch(getUserCart(values));
      navigator("/");
    },
  });

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <div
        className="checkout-wrapper d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >
        <header className="checkout-header border-bottom py-4">
          <div className="d-flex text-primary justify-content-between mx-auto px-4">
            <div className="logo fs-3">Hieseu</div>
            <Link to="/cart" className="cart">
              <IoBagHandleOutline size={25} />
            </Link>
          </div>
        </header>
        <div className="checkout-body mx-auto flex-grow-1">
          <form
            className="d-flex needs-validation"
            onSubmit={formik.handleSubmit}
            style={{ height: "calc(100vh - 74px)" }}
          >
            <div className="checkout-info border-end p-5 col-md-7 col-12 h-100">
              <div className="fs-4 text-primary fw-600">
                Contact Information
              </div>
              <div className="mt-2 fs-14">
                {`${user.FirstName} ${user.LastName} (${user.Email})`}
              </div>
              <div className="d-flex flex-column mt-3 gap-15">
                <div className="d-flex gap-15 justify-content-between align-items-center">
                  <div className="checkout-info-item w-100">
                    <input
                      type="text"
                      placeholder="First Name"
                      id="FirstName"
                      className={`form-control border-hover ${
                        formik.touched.FirstName &&
                        (formik.errors?.FirstName ? "is-invalid" : "is-valid")
                      }`}
                      value={formik.values.FirstName}
                      onChange={formik.handleChange("FirstName")}
                      onBlur={formik.handleBlur("FirstName")}
                    />
                    <div className={`error invalid-feedback`}>
                      {formik.touched.FirstName && formik.errors.FirstName}
                    </div>
                  </div>
                  <div className="checkout-info-item w-100">
                    <input
                      type="text"
                      placeholder="Last Name"
                      id="LastName"
                      className={`form-control border-hover ${
                        formik.touched.LastName &&
                        (formik.errors?.LastName ? "is-invalid" : "is-valid")
                      }`}
                      value={formik.values.LastName}
                      onChange={formik.handleChange("LastName")}
                      onBlur={formik.handleBlur("LastName")}
                    />
                    <div className={`error invalid-feedback`}>
                      {formik.touched.LastName && formik.errors.LastName}
                    </div>
                  </div>
                </div>
                <div className="checkout-info-item">
                  <input
                    type="text"
                    placeholder="Address"
                    id="Address"
                    className={`form-control border-hover ${
                      formik.touched.Address &&
                      (formik.errors?.Address ? "is-invalid" : "is-valid")
                    }`}
                    value={formik.values.Address}
                    onChange={formik.handleChange("Address")}
                    onBlur={formik.handleBlur("Address")}
                  />
                  <div className={`error invalid-feedback`}>
                    {formik.touched.Address && formik.errors.Address}
                  </div>
                </div>
                <div className="checkout-info-item">
                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc. (optional)"
                    className="form-control border-hover"
                    id="Other"
                    value={formik.values.Other}
                    onChange={formik.handleChange("Other")}
                  />
                </div>
                <div className="d-flex gap-15 justify-content-between align-items-center">
                  <div className="checkout-info-item w-100">
                    <input
                      type="text"
                      placeholder="City"
                      id="City"
                      className={`form-control border-hover ${
                        formik.touched.City &&
                        (formik.errors?.City ? "is-invalid" : "is-valid")
                      }`}
                      value={formik.values.City}
                      onChange={formik.handleChange("City")}
                      onBlur={formik.handleBlur("City")}
                    />
                    <div className={`error invalid-feedback`}>
                      {formik.touched.City && formik.errors.City}
                    </div>
                  </div>

                  <div className="checkout-info-item w-100">
                    <input
                      type="text"
                      placeholder="ZIP code"
                      id="ZipCode"
                      className={`form-control border-hover ${
                        formik.touched.ZipCode &&
                        (formik.errors?.ZipCode ? "is-invalid" : "is-valid")
                      }`}
                      value={formik.values.ZipCode}
                      onChange={formik.handleChange("ZipCode")}
                      onBlur={formik.handleBlur("ZipCode")}
                    />
                    <div className={`error invalid-feedback`}>
                      {formik.touched.ZipCode && formik.errors.ZipCode}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-between align-items-center">
                <div className="">
                  <Link
                    className="button button-transparent d-flex gap-15 align-items-center"
                    to="/cart"
                  >
                    <HiOutlineArrowLeft />
                    <div className="">Return to Cart</div>
                  </Link>
                </div>
                <div className="">
                  <button className="button" type="submit">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
            <div className="checkout-cart col-md-5 col-12 p-5">
              <div className="cart-items d-flex flex-column gap-15">
                {cart &&
                  cart.Products?.map((e, i) => {
                    return (
                      <div key={i} className="cart-item d-flex gap-15">
                        <div
                          className="image position-relative border flex-shrink-0"
                          style={{ height: 62, width: 62 }}
                        >
                          <img
                            className="w-75 h-75 position-absolute"
                            src={e.Product.Images[0]}
                            alt=""
                            style={{
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%,-50%)",
                              objectFit: "scale-down",
                            }}
                          />
                          <div className="quantity position-absolute">
                            {e.Quantity}
                          </div>
                        </div>
                        <div className="info d-flex flex-column">
                          <div className="text-primary fs-14">
                            {e.Product.Title}
                          </div>
                          <div className="d-flex align-items-center gap-10">
                            <div className="fs-12">Color:</div>
                            <Color colors={[e.Color]} clickable={false} />
                          </div>
                        </div>
                        <div className="fs-14 text-primary ms-auto align-self-center">
                          $
                          {Math.round(e.Quantity * e.Product.Price * 100) / 100}
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* <div className="d-flex gap-15 mt-3">
                <input
                  type="text"
                  className="form-control border-hover"
                  placeholder="Discount code"
                />
                <div className="button">Apply</div>
              </div> */}
              <div className="d-flex flex-column text-primary mt-3 pt-2 gap-1">
                {/* <div className="d-flex justify-content-between">
                  <div className="">Subtotal</div>
                  <div className="fw-600">${cart.CartTotal}</div>
                </div> */}
                {/* <div className="d-flex justify-content-between">
                  <div className="">Shipping</div>
                  <div className="">$30.00</div>
                </div> */}
                <div className="d-flex fs-17 justify-content-between">
                  <div className="fw-600">Total</div>
                  <div className="fw-600">${cart.CartTotal}</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
