import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsInstagram, BsFacebook } from "react-icons/bs";
import Container from "./Container";

const Footer = () => {
  return (
    <>
      <Container className="footer py-5 mt-5">
        <div className="row align-items-center">
          <div className="col-5">
            <div className="footer-top-data d-flex gap-30 align-items-baseline">
              <img src="/images/newsletter.png" alt="newsletter" />
              <h4 className="mb-0 text-white">Sign Up for Newsletter</h4>
            </div>
          </div>
          <div className="col-7">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Email"
                aria-label="Your Email"
                aria-describedby="basic-addon2"
              />
              <span
                className="input-group-text text-hover py-2 px-3 text-white"
                id="basic-addon2"
              >
                Subscribe
              </span>
            </div>
          </div>
        </div>
      </Container>
      <Container className="footer py-3">
        <div className="row">
          <div className="col-4">
            <h5 className="text-white mb-4">Contact Us</h5>
            <div>
              <div className="text-white">Hieseu Shop</div>
              <div className="address text-white mt-1">
                Address: 12 Trịnh Đình Thảo, Hoà Thạnh,
                <br />
                Tân Phú, Thành phố Hồ Chí Minh <br />
                PIN Code: 700000
              </div>
              <a
                className="mt-3 d-block text-hover mb-1 text-white"
                href="tel:+84 939629971"
              >
                +84 939629971
              </a>
              <a
                className="mt-4 d-block text-hover text-white"
                href="mailto:hieu82050@gmail.com"
              >
                hieu82050@gmail.com
              </a>
              <div className="social-icons d-flex align-items-center mt-4 gap-30">
                <a
                  className="text-white"
                  href="https://www.linkedin.com/in/hubert-nguyen/"
                >
                  <BsLinkedin className="fs-4 text-hover" />
                </a>
                <a className="text-white" href="https://www.instagram.com/">
                  <BsInstagram className="fs-4 text-hover" />
                </a>
                <a className="text-white" href="https://github.com/NTTrungHieu">
                  <BsGithub className="fs-4 text-hover" />
                </a>
                <a className="text-white" href="https://www.facebook.com/">
                  <BsFacebook className="fs-4 text-hover" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <h5 className="text-white mb-4">Information</h5>
            <div className="footer-links d-flex flex-column">
              <Link
                className="text-white text-hover mb-1 py-2"
                to="/pages/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-white text-hover mb-1 py-2"
                to="/pages/refund-policy"
              >
                Refund Policy
              </Link>
              <Link
                className="text-white text-hover mb-1 py-2"
                to="/pages/shipping-policy"
              >
                Shipping Policy
              </Link>
              <Link
                className="text-white text-hover mb-1 py-2"
                to="/pages/terms-of-service"
              >
                Terms Of Service
              </Link>
              <Link className="text-white text-hover mb-1 py-2" to="/blogs">
                Blogs
              </Link>
            </div>
          </div>
          <div className="col-3">
            <h5 className="text-white mb-4">Account</h5>
            <div className="footer-links d-flex flex-column">
              <Link className="text-white text-hover mb-1 py-2" to="">
                About Us
              </Link>
              <Link className="text-white text-hover mb-1 py-2" to="">
                FaQ
              </Link>
              <Link className="text-white text-hover mb-1 py-2" to="">
                Contact
              </Link>
            </div>
          </div>
          <div className="col-2">
            <h5 className="text-white mb-4">Quick Links</h5>
            <div className="footer-links d-flex flex-column">
              <Link className="text-white text-hover mb-1 py-2" to="">
                Laptops
              </Link>
              <Link className="text-white text-hover mb-1 py-2" to="">
                Headphones
              </Link>
              <Link className="text-white text-hover mb-1 py-2" to="">
                Tablets
              </Link>
              <Link className="text-white text-hover mb-1 py-2" to="">
                Watchs
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <Container className="footer py-4">
        <div className="row">
          <div className="col-12">
            <div className="text-left mb-0 text-white">
              &copy; {new Date().getFullYear()}. Hieseu Powered by Twentify
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Footer;
