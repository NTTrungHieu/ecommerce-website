import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import CompareCard from "../components/CompareCard";
import Container from "../components/Container";
import { useSelector } from "react-redux";

const CompareProduct = () => {
  const title = "Compare Products";
  const { compareList } = useSelector((state) => state.auth);

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="store-wrapper home-wrapper">
        <div className="product-list" style={{ "--amount-column": 6 }}>
          {compareList &&
            compareList.map((e, i) => {
              return <CompareCard key={"compare-" + i} product={e} />;
            })}
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
