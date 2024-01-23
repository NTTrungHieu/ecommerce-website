import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useSelector } from "react-redux";

const Cart = () => {
  const title = "Your Shopping Cart";
  const { cart } = useSelector((state) => state.cart);

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="pt-5">
        <form className="">
          <table className="table cart-items">
            <thead>
              <tr>
                <th colSpan={2} scope="col">
                  PRODUCT
                </th>
                <th className="text-end pe-md-4" scope="col">
                  PRICE
                </th>
                <th scope="col" className="ps-md-5">
                  QUANTITY
                </th>
                <th className="text-end pe-md-4" scope="col">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.Products?.map((e, i) => {
                  return (
                    <CartItem
                      product={e.Product}
                      color={e.Color}
                      quant={e.Quantity}
                    />
                  );
                })}
            </tbody>
          </table>
        </form>
        <div className="cart-footer pt-5 text-end">
          <div className="d-flex flex-column ms-auto gap-20">
            <div className="totals d-flex align-items-baseline gap-20 justify-content-end">
              <div className="fs-16 totals-subtotal">Subtotal</div>
              <div className="fs-5 totals-subtotal-value text-primary fw-600">
                ${cart.CartTotal}
              </div>
            </div>
            <div className="fs-15">
              Taxes and shipping calculated at checkout
            </div>
            <Link to="/checkout" className="fs-14 button text-center">
              Check Out
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
