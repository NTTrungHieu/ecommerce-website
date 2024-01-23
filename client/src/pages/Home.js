import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getHotProduct,
  getPopularProduct,
} from "../features/product/productSlice";
import { getAllBlogs } from "../features/blog/blogSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, popularProducts, hotProducts } = useSelector(
    (state) => state.product
  );
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllProducts("limit=1"));
    dispatch(getHotProduct("&limit=4"));
    dispatch(getPopularProduct("&limit=4"));
    dispatch(getAllBlogs("limit=4"));
  }, [dispatch]);

  return (
    <>
      <Container className="home-wrapper">
        <div className="d-flex gap-15">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                className="img-fluid rounded-3"
                src="images/main-banner-1.jpg"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>{products[0]?.Title}.</h5>
                <p>From ${products[0]?.Price}.</p>
                <Link className="button" to={`/products/${products[0]?.Slug}`}>
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-20">
              <div className="sub-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-01.jpg"
                  alt="sub banner"
                />
                <div className="sub-banner-content position-absolute">
                  <h4>BEST SALE</h4>
                  <h5>Laptop Max.</h5>
                  <p>
                    From $1699.00 <br /> or $64.62/mo.
                  </p>
                </div>
              </div>
              <div className="sub-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-02.jpg"
                  alt="sub banner"
                />
                <div className="sub-banner-content position-absolute">
                  <h4>15% OFF</h4>
                  <h5>Smartwatch 7</h5>
                  <p>
                    Shop the latest band <br />
                    styles and colors
                  </p>
                </div>
              </div>
              <div className="sub-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-03.jpg"
                  alt="sub banner"
                />
                <div className="sub-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy IPad Air</h5>
                  <p>
                    From $599 <br /> or $49.91/mo.
                  </p>
                </div>
              </div>
              <div className="sub-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-04.jpg"
                  alt="sub banner"
                />
                <div className="sub-banner-content position-absolute">
                  <h4>FREE ENGRAVING</h4>
                  <h5>AirPods Max</h5>
                  <p>
                    High-fidelity playback <br />& ultra-low distortion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="home-wrapper mt-4">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              <div className="service hover-rotate">
                <img src="images/service.png" alt="services" />
                <div>
                  <h6>Free Shipping</h6>
                  <div>From all orders over $5</div>
                </div>
              </div>
              <div className="service hover-rotate">
                <img src="images/service-02.png" alt="services" />
                <div>
                  <h6>Daily Surprise Offers</h6>
                  <div>Save up to 25% off</div>
                </div>
              </div>
              <div className="service hover-rotate">
                <img src="images/service-03.png" alt="services" />
                <div>
                  <h6>Support 24/7</h6>
                  <div>Shop with an expert</div>
                </div>
              </div>
              <div className="service hover-rotate">
                <img src="images/service-04.png" alt="services" />
                <div>
                  <h6>Affordable Prices</h6>
                  <div>Get Factory direct price</div>
                </div>
              </div>
              <div className="service hover-rotate">
                <img src="images/service-05.png" alt="services" />
                <div>
                  <h6>Secure Payments</h6>
                  <div>100% Protected Payments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="home-wrapper new-products-wrapper">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our lastest Products</h3>
          </div>
          <div className="product-list" style={{ "--amount-column": 4 }}>
            {hotProducts &&
              hotProducts.map((e, i) => <ProductCard key={i} product={e} />)}
          </div>
        </div>
      </Container>

      <Container className="home-wrapper famous-wrapper">
        <div className="row gap-20">
          <div className="famous-card card-shadow luxury">
            <div className="famous-card-inner">
              <img src="/images/subbanner-01.jpg" alt="watch" />
            </div>
            <div className="famous-card-desc">
              <div className="label">Big Screen</div>
              <div className="title">Smart Watch Series 7</div>
              <div className="subtitle">From $399or $16.62/mo. for 24 mo.*</div>
            </div>
          </div>
          <div className="famous-card card-shadow">
            <div className="famous-card-inner">
              <img src="/images/laptop-02.jpg" alt="laptop" />
            </div>
            <div className="famous-card-desc">
              <div className="label">studio display</div>
              <div className="title">600 nits of brightness.</div>
              <div className="subtitle">27-inch 5K Retina display</div>
            </div>
          </div>
          <div className="famous-card card-shadow">
            <div className="famous-card-inner">
              <img src="/images/smartphone.jpg" alt="phone" />
            </div>
            <div className="famous-card-desc">
              <div className="label">smartphones</div>
              <div className="title">Smartphone 13 Pro.</div>
              <div className="subtitle">
                Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
              </div>
            </div>
          </div>
          <div className="famous-card card-shadow">
            <div className="famous-card-inner">
              <img src="/images/speaker-02.jpg" alt="speaker" />
            </div>
            <div className="famous-card-desc">
              <div className="label">home speakers</div>
              <div className="title">Room-filling sound.</div>
              <div className="subtitle">
                From $699 or $116.58/mo. for 12 mo.*
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="home-wrapper popular-wrapper">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="product-list" style={{ "--amount-column": 4 }}>
          {popularProducts &&
            popularProducts.map((e, i) => <ProductCard key={i} product={e} />)}
        </div>
      </Container>

      <Container className="home-wrapper marquee-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="/images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="/images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container className="home-wrapper blog-wrapper">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
          {blogs &&
            blogs.map((e, i) => {
              return (
                <div className="col-3">
                  <BlogCard blog={e} key={i} />
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
