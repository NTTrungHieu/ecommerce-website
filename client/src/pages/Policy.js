import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useParams } from "react-router-dom";
import Container from "../components/Container";

const Policy = () => {
  let { policy } = useParams();
  const title = policy.split("-").join(" ");
  const list = new Array(5).fill("");

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="store-wrapper home-wrapper">
        <div className="d-flex flex-column gap-20 card-shadow p-4">
          {list.map((e, i) => {
            return (
              <div className="policy">
                <div
                  className="title text-primary mb-2"
                  style={{ "font-weight": "600", "font-size": "18px" }}
                >
                  The Standard Lorem Ipsum Passage
                </div>
                <div className="content">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Deleniti repellat ratione reiciendis veritatis accusamus,
                  quis, quam atque accusantium molestiae commodi dicta, quae
                  vitae est fugiat doloremque. Assumenda sapiente nesciunt
                  aliquam.
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Policy;
