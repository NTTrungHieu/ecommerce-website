import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import moment from "moment";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogCategories } from "../features/category/categorySlice";
import { getBlog } from "../features/blog/blogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogCategories } = useSelector((state) => state.category);
  const { blog } = useSelector((state) => state.blog);
  const title = blog.Title;

  useEffect(() => {
    dispatch(getBlog(id));
    dispatch(getAllBlogCategories());
  }, [id, dispatch]);

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={""} />
      <Container className="store-wrapper home-wrapper">
        <div className="row">
          <div className="col-3 d-flex flex-column gap-20">
            <div className="filter-card card-shadow">
              <div className="filter-title">Shop By Categories</div>
              <ul className="d-flex flex-column gap-2 px-2">
                {blogCategories &&
                  blogCategories.map((e, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          navigate(`/blogs?category=${e.Title}`);
                        }}
                      >
                        <Link className="">{e.Title}</Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="col-9 single-blog-wrapper">
            <div className="single-blog-content mb-4">
              <div className="title fs-4 text-primary">{title}</div>
              <div className="image overflow-hidden my-4">
                <img src={blog.Image} alt={title} className="w-100" />
              </div>
              <p
                className="content"
                dangerouslySetInnerHTML={{ __html: blog.Description }}
              ></p>
              <div className="info d-flex">
                <div className="time pe-3 me-3">
                  {moment(blog.createdAt).format("DD MMM, YYYY")}
                </div>
                <div className="author">{blog.Author}</div>
              </div>
            </div>
            <div className="back py-4">
              <Link
                to="/blogs"
                className="d-flex w-fc gap-15 align-item-center fs-5"
              >
                <HiOutlineArrowLeft />
                <div className="">Back to blog</div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
