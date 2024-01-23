import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { addToCompare, addToWishlist } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaRandom } from "react-icons/fa";

const ProductCard = ({ horizon, product }) => {
  const productLink = "/products/" + product.Slug;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist: userWishlist, compareList } = useSelector(
    (state) => state.auth
  );
  const [wishlist, setWishlist] = useState(false);
  const [compare, setCompare] = useState(false);

  const handleAddToWishlist = (item) => {
    dispatch(addToWishlist(product._id));
  };

  const handleAddToCompare = (item) => {
    dispatch(addToCompare(product));
  };

  useEffect(() => {
    let tempArr = [];
    if (userWishlist) {
      tempArr = userWishlist.filter((e) => e._id == product?._id);
    }
    setWishlist(tempArr.length > 0);
  }, [userWishlist, product]);

  useEffect(() => {
    let tempArr = [];
    if (compareList) {
      tempArr = compareList.filter((e) => e._id == product?._id);
    }
    setCompare(tempArr.length > 0);
  }, [compareList, product]);

  return (
    <>
      <div className={`product-card card-shadow ${horizon ? "horizon" : ""}`}>
        <div className="product-image">
          {product.Images && (
            <img
              onClick={() => navigate(productLink)}
              src={product.Images[0]}
              alt="product"
            />
          )}
          {product.Images.length > 1 && (
            <img
              onClick={() => navigate(productLink)}
              src={product.Images[1]}
              alt="product"
            />
          )}
          <div className="wishlist-icon action-bar">
            <span onClick={() => handleAddToWishlist()}>
              {wishlist ? (
                <FaHeart className="text-danger" size={15} />
              ) : (
                <FaRegHeart size={15} />
              )}
            </span>
          </div>
          <div className="action-bar">
            <div className="d-flex flex-column">
              <span onClick={() => handleAddToCompare()}>
                {compare ? <FaCheck size={18} /> : <FaRandom size={15} />}
              </span>
              <span onClick={() => navigate(productLink)}>
                <img src="/images/add-cart.svg" alt="add cart" />
              </span>
            </div>
          </div>
        </div>
        <div className="product-details">
          <div className="brand">{product.Brand}</div>
          <Link to={productLink} className="title text-ellipsis">
            {product.Title}
          </Link>
          <Rating
            className="rating"
            initialValue={product.AverageRating}
            size={12}
            readonly
          />
          <div
            className={`description ${horizon && "show"}`}
            dangerouslySetInnerHTML={{ __html: product.Description }}
          ></div>
          <div className="price">${product.Price}</div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
