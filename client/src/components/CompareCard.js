import React from "react";
import { Link } from "react-router-dom";
import Color from "./Color";
import { useDispatch } from "react-redux";
import { addToCompare, addToWishlist } from "../features/user/userSlice";

const CompareCard = ({ compare = true, product }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (compare) {
      dispatch(addToCompare(product));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  return (
    <>
      <div
        className={`compare-product-card position-relative ${
          !compare ? "wishlist-card" : ""
        }`}
      >
        <div className="position-absolute cross" onClick={() => handleClick()}>
          <img src="/images/cross.svg" alt="cross" />
        </div>
        <Link className="product-card-image" to={`/products/${product.Slug}`}>
          <img src={product.Images[0]} alt="" />
        </Link>
        <div className="product-card-details">
          <Link
            className="title text-ellipsis"
            to={`/products/${product.Slug}`}
          >
            {product.Title}
          </Link>
          <div className="price">${product.Price}</div>
        </div>
        {compare && (
          <div className="product-compare-group d-flex flex-column">
            <div className="compare-label">
              <span>Brand:</span>
              <span>{product.Brand}</span>
            </div>
            <div className="compare-label">
              <span>Type:</span>
              <span>{product.Category}</span>
            </div>
            <div className="compare-label">
              <span>Availability:</span>
              <span>{product.Quantity > 0 ? "In Stock" : "Out Of Stock"}</span>
            </div>
            <div className="compare-label">
              <span>Color:</span>
              <span>
                <Color colors={product.Color} clickable={false} />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompareCard;
