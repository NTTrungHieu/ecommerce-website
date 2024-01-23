import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <>
      <div className="blog-card card-shadow">
        <Link to={"/blogs/" + blog._id} className="blog-image">
          <img
            src={blog.Image}
            alt="blog"
            className="w-100 cover"
            style={{ height: 200 }}
          />
        </Link>
        <div className="blog-content">
          <div className="date">
            {moment(blog.createdAt).format("DD MMM, YYYY")}
          </div>
          <Link to={"/blogs/" + blog._id} className="title">
            {blog.Title}
          </Link>
          <p
            className="desc text-ellipsis"
            dangerouslySetInnerHTML={{ __html: blog.Description }}
          ></p>
          <Link to={"/blogs/" + blog._id} className="button">
            READ MORE
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
