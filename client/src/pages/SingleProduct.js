import React, { useEffect, useRef, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Rating } from "react-simple-star-rating";
import { Link, useParams } from "react-router-dom";
import Color from "../components/Color";
import { FaPlus, FaMinus, FaCheck, FaHeart } from "react-icons/fa6";
import { CiDeliveryTruck, CiHeart } from "react-icons/ci";
import { LiaRandomSolid } from "react-icons/lia";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getRelativeProduct,
  rateProduct,
} from "../features/product/productSlice";
import { addToCompare, addToWishlist } from "../features/user/userSlice";
import Comment from "../components/Comment";
import { useFormik } from "formik";
import * as yup from "yup";
import { addToCart, getUserCart } from "../features/cart/cartSlice";

const commentSchema = yup.object({
  star: yup.string(),
  comment: yup.string(),
});

const productSchema = yup.object({
  Color: yup.string(),
  Quantity: yup.number().min(1),
});

const SingleProduct = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const mainImgRef = useRef(null);
  const subImgRef = useRef(null);
  const { product, relativeProducts } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const { wishlist: userWishlist, compareList } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      star: 0,
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: async (values) => {
      await dispatch(rateProduct({ id: product._id, body: values }));
      dispatch(getProduct(`Slug=${slug}`));
    },
  });

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [showReview, setShowReview] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const [compare, setCompare] = useState(false);
  const [mainImgWidth, setMainImgWidth] = useState(100);

  const handleAddToWishlist = (item) => {
    dispatch(addToWishlist(product._id));
  };

  const handleAddToCompare = (item) => {
    dispatch(addToCompare(product));
  };

  const handleAddToCart = () => {
    let index = 0;
    for (let i of Object.keys(color)) {
      if (color[i]) {
        index = i;
        break;
      }
    }
    const body = {
      _id: product._id,
      Quantity: quantity,
      Color: product.Color[index],
    };
    dispatch(addToCart(body));
    dispatch(getUserCart());
  };

  const imgProps = {
    zoomPosition: "original",
    zoomStyle: `cursor: move;`,
  };

  useEffect(() => {
    dispatch(getProduct(`Slug=${slug}`));
  }, [slug, dispatch]);

  useEffect(() => {
    dispatch(getRelativeProduct(product.Category));
    const arr = product?.Ratings?.filter((e) => e.PostedBy._id === user._id);
    if (arr?.length > 0) {
      formik.setFieldValue("star", arr[0].Star);
      formik.setFieldValue("comment", arr[0].Comment);
    } else {
      formik.setFieldValue("star", 0);
      formik.setFieldValue("comment", "");
    }
  }, [product, dispatch]);

  useEffect(() => {
    setMainImgWidth(mainImgRef.current?.offsetWidth);
  }, [mainImgRef.current]);

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
      {product?.Price && (
        <>
          <Meta title={product.Title + " - Hieseu"} />
          <BreadCrumb title={""} />
          <Container className="store-wrapper home-wrapper">
            <section className="d-flex flex-column flex-lg-row card-shadow p-3">
              <div className="col-lg-6 col-12 p-3 d-flex flex-column gap-20">
                <div className="main-product-image border p-5">
                  <div className="w-100 h-100" ref={mainImgRef}>
                    <ReactImageZoom
                      {...imgProps}
                      width={mainImgWidth}
                      zoomWidth={mainImgWidth}
                      img={product.Images[0]}
                    />
                  </div>
                </div>
                <div
                  className="product-images product-list"
                  style={{ "--amount-column": 2 }}
                >
                  {product.Images.length > 1 &&
                    product.Images.slice(1).map((e, i) => (
                      <div key={"product-image-" + i} className="border p-4">
                        <div className="w-100 h-100">
                          <ReactImageZoom
                            {...imgProps}
                            width={mainImgWidth / 2 - 10}
                            zoomWidth={mainImgWidth / 2 - 10}
                            img={e}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-lg-6 col-12 py-3 px-2">
                <div className="product-detail container--sticky">
                  <div className="title border-bottom">{product.Title}</div>
                  <div className="price">${product.Price}</div>
                  <div className="star d-flex align-items-center gap-10">
                    <Rating
                      className="rating"
                      initialValue={product.AverageRating}
                      size={20}
                      readonly
                    />{" "}
                    <div>({product?.Ratings?.length || 0} reviews)</div>
                  </div>
                  <div className="write-review border-bottom">
                    {user && <a href="#reviews">Write a review</a>}
                  </div>
                  <div className="content mt-3">
                    <div className="vendor">
                      <label>Brand:</label>
                      <span>
                        <Link>{product.Brand}</Link>
                      </span>
                    </div>
                    <div className="color">
                      <label>Color:</label>
                      <span>
                        <Color
                          colors={product.Color}
                          onClick={true}
                          click={(color) => setColor(color)}
                        />
                      </span>
                    </div>
                    <div className="quantity">
                      <label>Quantity</label>
                      <span>
                        <input
                          type="number"
                          className="form-control"
                          name="Quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          min="1"
                        />
                        <div className="quantity-action">
                          <div>
                            <FaPlus onClick={() => setQuantity(quantity + 1)} />
                          </div>
                          <div>
                            <FaMinus
                              onClick={() => setQuantity(quantity - 1)}
                            />
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className="form-button">
                      <div className="button" onClick={() => handleAddToCart()}>
                        Add to cart
                      </div>
                    </div>
                    <div className="action">
                      <div onClick={(e) => handleAddToWishlist()}>
                        {wishlist ? (
                          <FaHeart className="text-danger" size={25} />
                        ) : (
                          <CiHeart size={25} />
                        )}
                        <span>Add to wishlist</span>
                      </div>
                      <div onClick={(e) => handleAddToCompare()}>
                        {compare ? (
                          <FaCheck size={22} />
                        ) : (
                          <LiaRandomSolid size={22} />
                        )}
                        <span>Add to compare</span>
                      </div>
                    </div>
                  </div>
                  <div className="purchase-details">
                    <div className="item">
                      <label className="d-flex align-items-center gap-10 text-primary">
                        <CiDeliveryTruck size={25} />
                        <div>Shipping & Returns</div>
                      </label>
                      <span>
                        Free shipping and returns available on all orders! We
                        ship all US domestic orders within{" "}
                        <strong>5-10 business days</strong>!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-4 product-single">
              <div className="title">Description</div>
              <div
                className="body card-shadow"
                dangerouslySetInnerHTML={{ __html: product.Description }}
              ></div>
            </section>
            <section className="mt-4 product-single">
              <a href="#reviews" id="reviews" className="title">
                Reviews
              </a>
              <div className="body card-shadow reviews">
                <div className="reviews-head">
                  <div className="fs-5 text-primary">Customer Reviews</div>
                  <div className="d-flex align-items-center pb-4 mb-4 mt-2 border-bottom">
                    <div className="d-flex gap-10 align-items-center">
                      <Rating
                        className="rating"
                        initialValue={product.AverageRating}
                        size={15}
                        readonly
                      />
                      <div>Based on {product.Ratings?.length || 0} reviews</div>
                    </div>
                    {user && (
                      <div
                        className="text-decoration-underline cursor-pointer ms-auto text-primary"
                        onClick={(e) => setShowReview(!showReview)}
                      >
                        Write a review
                      </div>
                    )}
                  </div>
                  {user && (
                    <form
                      className={`${
                        showReview ? "d-flex" : "d-none"
                      } flex-column gap-10 pb-4 mb-4 border-bottom`}
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="fs-6">Write A Review</div>
                      <Rating
                        className="rating"
                        size={20}
                        initialValue={formik.values.star}
                        onClick={(rate) => formik.setFieldValue("star", rate)}
                      />
                      <textarea
                        className="form-control"
                        id="myReview"
                        rows="3"
                        placeholder="Write your comments here"
                        value={formik.values.comment}
                        onChange={formik.handleChange("comment")}
                      ></textarea>
                      <div className="text-end pt-1">
                        <button
                          type="submit"
                          className="button border-0 ms-auto"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                <div className="reviews-body d-flex flex-column">
                  {product?.Ratings?.map((e, i) => {
                    return <Comment key={"comments-" + i} comment={e} />;
                  })}
                </div>
              </div>
            </section>
            <section className="mt-4 product-single">
              <div className="title">You May Also Like</div>
              <div
                className="product-list mt-3"
                style={{ "--amount-column": 5 }}
              >
                {relativeProducts &&
                  relativeProducts
                    .filter((e) => e.Slug !== product.Slug)
                    .slice(0, 5)
                    .map((e, i) => {
                      return <ProductCard key={i} product={e} />;
                    })}
              </div>
            </section>
          </Container>
        </>
      )}
    </>
  );
};

export default SingleProduct;
