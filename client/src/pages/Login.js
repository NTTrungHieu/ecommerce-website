import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

const loginSchema = yup.object({
  Email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  Password: yup.string().required("Password is required"),
});

const Login = () => {
  const title = "Account";
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { user, userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Email: "demo@demo.com",
      Password: "demo",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (user && userToken) {
      navigate("/");
    }
  }, [user, userToken, navigate, dispatch]);

  useEffect(() => {
    if (searchParams.get("reset") === "success") {
      toast.success("Reset Password Successfully!");
    }
  }, [searchParams]);
  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="store-wrapper home-wrapper">
        <div className="login-card text-center card-shadow mx-auto">
          <h5 className="">Login</h5>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex gap-10 flex-column mt-3 needs-validation"
          >
            <div className="form-floating">
              <input
                type="email"
                id="Email"
                autoComplete="off"
                placeholder="Email"
                className={`form-control ${
                  formik.touched.Email &&
                  (formik.errors?.Email ? "is-invalid" : "is-valid")
                }`}
                value={formik.values.Email}
                onChange={formik.handleChange("Email")}
                onBlur={formik.handleBlur("Email")}
              />
              <div className={`error invalid-feedback`}>
                {formik.touched.Email && formik.errors.Email}
              </div>
              <label htmlFor="Email">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="Password"
                autoComplete="off"
                placeholder="Password"
                className={`form-control ${
                  formik.touched.Password &&
                  (formik.errors?.Password ? "is-invalid" : "is-valid")
                }`}
                value={formik.values.Password}
                onChange={formik.handleChange("Password")}
                onBlur={formik.handleBlur("Password")}
              />
              <div className={`error invalid-feedback`}>
                {formik.touched.Password && formik.errors.Password}
              </div>
              <label htmlFor="Password">Password</label>
            </div>
            <div className="text-start">
              <Link className="text-primary fs-14" to="/forgot-password">
                Forgot your password?
              </Link>
            </div>
            <div className="d-flex align-items-center gap-20 justify-content-center">
              <button type="submit" className="button border-0">
                Login
              </button>
              <Link className="button button-reverse border-0" to="/register">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
