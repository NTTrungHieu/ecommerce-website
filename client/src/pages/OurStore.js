import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Rating } from "react-simple-star-rating";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  getAllProductsPagination,
  getPopularProduct,
} from "../features/product/productSlice";
import { getAllColors } from "../features/color/colorSlice";
import ReactPaginate from "react-paginate";

const fields = {
  title: "Title[$regex]",
  o: "Title[$options]",
  category: "Category",
  instock: "Quantity[$gt]",
  outofstock: "Quantity",
  fromprice: "Price[$gte]",
  toprice: "Price[$lte]",
  color: "Color[$in]",
  sort: "sort",
  page: "page",
  limit: "limit",
};

const OurStore = () => {
  const title = "Our Store";
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);
  const [queryString, setQueryString] = useState("");
  const { productCategories } = useSelector((state) => state.category);
  const { products, popularProducts, totalProducts } = useSelector(
    (state) => state.product
  );
  const { colors } = useSelector((state) => state.color);
  const [searchParams] = useSearchParams();
  const [categoryActive, setCategoryActive] = useState(null);

  const handleChangeGrid = (element, grid) => {
    setGrid(grid);
  };

  useEffect(() => {
    dispatch(getPopularProduct("&limit=4"));
    dispatch(getAllColors());
  }, [dispatch]);

  useEffect(() => {
    const query = [];
    for (let [key, value] of searchParams.entries()) {
      query.push(`${fields[key.toLowerCase()]}=${value}`);
    }
    setQueryString(query.join("&"));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(
      getAllProductsPagination(queryString.length > 0 ? queryString : "")
    );
  }, [queryString, dispatch]);

  const handleSetSearchParams = (key, value, unique = false) => {
    const arr = [];
    let isExist = false;
    const queryArr = queryString.split("&");
    if (typeof key === "object") {
      queryArr.forEach((e) => {
        const pair = e.split("=");
        if (pair[0] === fields.color) return;
        arr.push(e);
      });
      for (let [k, v] of Object.entries(key)) {
        if (v) {
          arr.push(fields.color + "=" + colors[k].Value.replace("#", "%23"));
        }
      }
    } else {
      queryArr.forEach((e) => {
        const pair = e.split("=");
        if (key === fields.title || key === fields.o) return;
        if (`${key}=${value}` === e) {
          isExist = true;
          return;
        }
        if (unique && key === pair[0]) return;
        arr.push(e);
      });
      if (!isExist) arr.push(`${key}=${value}`);
    }
    if (arr.length > 0) {
      setQueryString(arr.join("&"));
    }
  };

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="store-wrapper home-wrapper">
        <div className="row">
          <div className="col-3 d-flex flex-column gap-20">
            <div className="filter-card card-shadow">
              <div className="filter-title">Shop By Categories</div>
              <ul className="d-flex flex-column gap-2 px-2">
                {productCategories &&
                  productCategories.map((e, i) => {
                    return (
                      <li
                        key={"product-cat-" + i}
                        onClick={() => {
                          handleSetSearchParams(fields.category, e.Title, true);
                          setCategoryActive(
                            categoryActive === e.Title ? "" : e.Title
                          );
                        }}
                      >
                        <Link
                          className={
                            categoryActive === e.Title
                              ? "text-danger fs-16"
                              : ""
                          }
                        >
                          {e.Title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="filter-card card-shadow">
              <div className="filter-title">Filter By</div>
              <div className="filter-subtitle">Availability</div>
              <ul className="d-flex flex-column gap-2 px-2">
                <li className="form-check m-0 d-flex gap-10 align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => handleSetSearchParams(fields.instock, 0)}
                    id="inStock"
                  />
                  <label className="form-check-label" htmlFor="inStock">
                    In Stock ({totalProducts})
                  </label>
                </li>
                <li className="form-check m-0 d-flex gap-10 align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="outOfStock"
                    onChange={(e) =>
                      handleSetSearchParams(fields.outofstock, 0)
                    }
                  />
                  <label className="form-check-label" htmlFor="outOfStock">
                    Out of stock (0)
                  </label>
                </li>
              </ul>
              <div className="filter-subtitle">Price</div>
              <ul className="d-flex gap-10 align-items-center p-0">
                <li className="form-floating">
                  <span>$</span>
                  <input
                    type="number"
                    className="form-control"
                    id="FromPrice"
                    placeholder="From"
                    onBlur={(e) =>
                      handleSetSearchParams(
                        fields.fromprice,
                        e.target.value,
                        true
                      )
                    }
                  />
                  <label htmlFor="FromPrice">From</label>
                </li>
                <li className="form-floating">
                  <span>$</span>
                  <input
                    type="number"
                    className="form-control"
                    id="ToPrice"
                    placeholder="To"
                    onBlur={(e) =>
                      handleSetSearchParams(
                        fields.toprice,
                        e.target.value,
                        true
                      )
                    }
                  />
                  <label htmlFor="ToPrice">To</label>
                </li>
              </ul>
              <div className="filter-subtitle">Color</div>
              {colors && (
                <Color
                  colors={colors}
                  multiple={true}
                  onClick={true}
                  click={(color) => handleSetSearchParams(color)}
                />
              )}
            </div>
            <div className="filter-card card-shadow">
              <div className="filter-title">Popular Products</div>
              <ul className="d-flex random-products gap-2 p-0 flex-wrap">
                {popularProducts &&
                  popularProducts.map((e, i) => {
                    return (
                      <li key={i} className="d-flex gap-10 w-100">
                        <div
                          className="position-relative col-4"
                          style={{ paddingBottom: "100px" }}
                        >
                          <img
                            className="position-absolute w-100 h-100 p-3 contain"
                            style={{ objectFit: "scale-down" }}
                            src={e.Images[0]}
                            alt={e.Title}
                          />
                        </div>
                        <div className="col-8 d-flex flex-column">
                          <div className="title text-ellipsis">{e.Title}</div>
                          <Rating
                            className="rating"
                            initialValue={e.AverageRating}
                            size={12}
                            readonly
                          />
                          <div className="price">${e.Price}</div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="col-9 d-flex flex-column gap-20">
            <div className="filter-sort-grid d-flex justify-content-between align-nav-item card-shadow">
              <div className="d-flex align-items-center gap-10">
                <div className="text-nowrap sortby">Sort By:</div>
                <select
                  name=""
                  id=""
                  className="form-control form-select"
                  onChange={(e) => {
                    handleSetSearchParams(fields.sort, e.target.value, true);
                  }}
                >
                  <option value="-createdAt">Featured</option>
                  <option value="-Sold">Best selling</option>
                  <option value="Title">Alphabetically, A-Z</option>
                  <option value="-Title">Alphabetically, Z-A</option>
                  <option value="Price">Price, low to high</option>
                  <option value="-Price">Price, high to low</option>
                  <option value="createdAt">Date, old to new</option>
                  <option value="-createdAt">Date, new to old</option>
                </select>
              </div>
              <div className="d-flex align-items-center gap-10">
                <div className="total-product">{totalProducts} products</div>
                <div className="d-flex align-items-center gap-10 grid">
                  <div
                    onClick={(e) => handleChangeGrid(e, 4)}
                    className={grid === 4 ? "active" : ""}
                    aria-current="page"
                  >
                    <img src="images/gr4.svg" alt="grid" />
                  </div>
                  <div
                    onClick={(e) => handleChangeGrid(e, 3)}
                    className={grid === 3 ? "active" : ""}
                  >
                    <img src="images/gr3.svg" alt="grid" />
                  </div>
                  <div
                    onClick={(e) => handleChangeGrid(e, 2)}
                    className={grid === 2 ? "active" : ""}
                  >
                    <img src="images/gr2.svg" alt="grid" />
                  </div>
                  <div
                    onClick={(e) => handleChangeGrid(e, 1)}
                    className={grid === 1 ? "active" : ""}
                  >
                    <img src="images/gr.svg" alt="grid" />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-list" style={{ "--amount-column": grid }}>
              {products &&
                products.map((e, i) => (
                  <ProductCard key={i} horizon={grid === 1} product={e} />
                ))}
            </div>
            <div className="w-100 card-shadow text-end">
              <ReactPaginate
                className="custom-pagination"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                nextLabel=">"
                onPageChange={(e) =>
                  handleSetSearchParams(fields.page, e.selected + 1, true)
                }
                pageRangeDisplayed={2}
                pageCount={totalProducts / 8}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination justify-content-center"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                hrefBuilder={(page, pageCount, selected) =>
                  page >= 1 && page <= pageCount ? `/page/${page}` : "#"
                }
                hrefAllControls
                forcePage={0}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
