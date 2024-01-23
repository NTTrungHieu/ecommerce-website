import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsPagination } from "../features/blog/blogSlice";
import { getAllBlogCategories } from "../features/category/categorySlice";
import { Link, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const fields = {
  category: "Category",
  sort: "sort",
  page: "page",
  limit: "limit",
};

const Blogs = () => {
  const dispatch = useDispatch();
  const title = "Blogs";
  const [searchParams] = useSearchParams();

  const { blogs, totalBlogs } = useSelector((state) => state.blog);
  const { blogCategories } = useSelector((state) => state.category);
  const [queryString, setQueryString] = useState("");
  const [categoryActive, setCategoryActive] = useState("");

  useEffect(() => {
    dispatch(getAllBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    const query = [];
    for (let [key, value] of searchParams.entries()) {
      query.push(`${fields[key.toLowerCase()]}=${value}`);
    }
    setQueryString(query.join("&"));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(getAllBlogsPagination(queryString.length > 0 ? queryString : ""));
  }, [queryString, dispatch]);

  const handleSetSearchParams = (key, value, unique = false) => {
    const arr = [];
    let isExist = false;
    const queryArr = queryString.split("&");
    queryArr.forEach((e) => {
      const pair = e.split("=");
      if (`${key}=${value}` === e) {
        isExist = true;
        return;
      }
      if (unique && key === pair[0]) return;
      arr.push(e);
    });
    if (!isExist) arr.push(`${key}=${value}`);

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
              <div className="filter-title">Blog By Categories</div>
              <ul className="d-flex flex-column gap-2 px-2">
                {blogCategories &&
                  blogCategories.map((e, i) => {
                    return (
                      <li key={i}>
                        <Link
                          onClick={() => {
                            handleSetSearchParams(
                              fields.category,
                              e.Title,
                              true
                            );
                            setCategoryActive(
                              categoryActive === e.Title ? "" : e.Title
                            );
                          }}
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
          </div>
          <div className="col-9 d-flex flex-column gap-20">
            <div className="product-list" style={{ "--amount-column": 3 }}>
              {blogs && blogs.map((e, i) => <BlogCard key={i} blog={e} />)}
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
                pageCount={totalBlogs / 9}
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

export default Blogs;
