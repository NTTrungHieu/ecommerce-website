import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import Container from "../components/Container";

const Contact = () => {
  const title = "Contact";

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="contact-wrapper home-wrapper">
        <div className="row">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4775761798983!2d106.6343342!3d10.7746873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea168a65c0b%3A0x2a4a7dc43e177de1!2zMTIgVHLhu4tuaCDEkMOsbmggVGjhuqNvLCBIb8OgIFRoYW5oLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1703499517863!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              title="mymap"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="contact-info mt-5 d-flex card-shadow">
            <div className="w-50">
              <div className="contact-title">Contact</div>
              <form className="d-flex gap-10 flex-column mt-4 p-0">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    id="Name"
                    placeholder="Name"
                  />
                  <label for="Name">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    autoComplete="off"
                    placeholder="Email"
                  />
                  <label for="Email">Email</label>
                </div>
                <div className="form-floating">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Phone Number"
                    autoComplete="off"
                    pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                  />
                  <label for="phone">Phone Number</label>
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="Comment"
                    autoComplete="off"
                    placeholder="Comment"
                  />
                  <label for="Comment">Comment</label>
                </div>
                <button className="button border-0">Send</button>
              </form>
            </div>
            <div className="w-50">
              <div className="contact-title">Get In Touch With Us</div>
              <ul className="mt-4">
                <li className="mb-3 fs-6 d-flex gap-10 align-items-center">
                  <AiOutlineHome />
                  <div>
                    12 Trịnh Đình Thảo, Hoà Thạnh, Tân Phú, Thành phố Hồ Chí
                    Minh
                  </div>
                </li>
                <li className="mb-3 fs-6 d-flex gap-10 align-items-center">
                  <BiPhoneCall />
                  <a href="tel:+84 939629971">+84 939629971</a>
                </li>
                <li className="mb-3 fs-6 d-flex gap-10 align-items-center">
                  <AiOutlineMail />
                  <a href="mailto:hieu82050@gmail.com">hieu82050@gmail.com</a>
                </li>
                <li className="mb-3 fs-6 d-flex gap-10 align-items-center">
                  <BiInfoCircle />
                  <div>Monday – Friday 10 AM – 8 PM</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
