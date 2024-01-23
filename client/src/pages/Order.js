import React, { useEffect } from "react";
import { getUserOrder } from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import moment from "moment";
import { Link } from "react-router-dom";
import Color from "../components/Color";

const Status = {
  "Not Processed": "warning",
  Processing: "info",
  Cancelled: "danger",
  Delivered: "success",
};

const Order = () => {
  const title = "My Orders";
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrder());
  }, []);

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="pt-5">
        <form className="">
          <table className="table cart-items">
            <thead
              className="sticky-top bg-white border-0"
              style={{ top: 166, boxShadow: "inset 0 -2px 0 #000000" }}
            >
              <tr>
                <th scope="col">ID</th>
                <th scope="col">METHOD</th>
                <th scope="col" className="">
                  STATUS
                </th>
                <th scope="col" className="">
                  TIME
                </th>
                <th className="text-end pe-md-4" scope="col">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.map((e, i) => {
                  return (
                    <>
                      <tr className="table-active">
                        <td className="align-middle">{e.PaymentIntent.id}</td>
                        <td className="align-middle">
                          {e.PaymentIntent.method}
                        </td>
                        <td className="align-middle">
                          <div
                            className={`btn btn-${
                              Status[e.PaymentIntent.status]
                            }`}
                          >
                            {e.PaymentIntent.status}
                          </div>
                        </td>
                        <td className="align-middle">
                          {moment(e.PaymentIntent.created).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                        </td>
                        <td className="text-end pe-md-4 align-middle fs-6 fw-600 text-primary">
                          ${Math.round(e.PaymentIntent.amount * 100) / 100}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5" className="border" style={{}}>
                          <table class="table mb-0 fs-12">
                            <tr style={{ boxShadow: "inset 0 -1px 0 #000000" }}>
                              <td colSpan={2} scope="col">
                                PRODUCT
                              </td>
                              <td className="text-end pe-md-4" scope="col">
                                PRICE
                              </td>
                              <td scope="col" className="text-end ps-md-5">
                                QUANTITY
                              </td>
                              <td className="text-end pe-md-4" scope="col">
                                TOTAL
                              </td>
                            </tr>
                            {e?.Products?.map((product, ind) => {
                              return (
                                <tr className="cart-item">
                                  <td
                                    colSpan={1}
                                    className="cart-item-image pe-0"
                                    style={{ "--img-w": "50px" }}
                                  >
                                    <img
                                      src={product.Product.Images[0]}
                                      className="border"
                                      alt={product.Product.Title}
                                    />
                                  </td>
                                  <td
                                    colSpan={1}
                                    className="cart-item-details ps-md-4"
                                  >
                                    <Link
                                      className="title py-0 pt-1 text-primary"
                                      style={{ fontSize: "13px" }}
                                    >
                                      {product.Product.Title}
                                    </Link>
                                    <div className="product-options py-0 pb-1 d-flex flex-column gap-1">
                                      <div className="d-flex gap-10 align-items-center">
                                        <span>Color:</span>
                                        <span>
                                          <Color
                                            className="m-0"
                                            colors={[product.Color]}
                                            clickable={false}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    colSpan={1}
                                    className="text-primary text-end px-md-4 align-middle"
                                  >
                                    ${product.Product.Price}
                                  </td>
                                  <td colSpan={1} className="text-end ps-md-5">
                                    {product.Quantity}
                                  </td>
                                  <td
                                    colSpan={1}
                                    className="text-primary text-end pe-md-4"
                                  >
                                    $
                                    {Math.round(
                                      product.Quantity *
                                        product.Product.Price *
                                        100
                                    ) / 100}
                                  </td>
                                </tr>
                              );
                            })}
                          </table>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </form>
      </Container>
    </>
  );
};

export default Order;
