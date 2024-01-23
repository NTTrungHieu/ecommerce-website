import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

const BreadCrumb = ({ title }) => {
  return (
    <Container className="breadcrumb mt-4">
      <div className="row">
        <div className="w-100 d-flex gap-10 justify-content-center">
          <Link className="text-dark d-inline-block" to="/">
            Home{" "}
          </Link>
          <div>/</div>
          <div className="fs-4 text-capitalize text-dark fw-bold">{title}</div>
        </div>
      </div>
    </Container>
  );
};

export default BreadCrumb;
