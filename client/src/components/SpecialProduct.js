import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const SpecialProduct = () => {
  return (
    <div className="special-product-card card-shadow">
      <div className="d-flex justify-content-between">
        <div>
          <img className="img-fluid" src="/images/watch.jpg" alt="watch" />
        </div>
        <div className="special-product-content">
          <div className="brand">Havels</div>
          <div className="title text-ellipsis">
            Samsung Galaxy Note10+ Mobile Phone
          </div>
          <Rating className="rating" initialValue={5} size={12} readonly />
          <div className="price">
            <span className="red-price">$100</span>
            <strike>&200</strike>
          </div>
          <div className="discount-time d-flex align-items-center mt-1 gap-10">
            <div className="d-flex gap-1">
              <b>5</b> <span className="">Days</span>
            </div>
            <div className="d-flex gap-10 align-items-center ">
              <span className="rounded-circle badge p-2 bg-danger">10</span>:
              <span className="rounded-circle badge p-2 bg-danger">10</span>:
              <span className="rounded-circle badge p-2 bg-danger">10</span>
            </div>
          </div>
          <div className="product-quantity mt-3">
            <div>Products: 5</div>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: "25%" }}
                role="progressbar"
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
          <Link className="button mt-3">Add To Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
