import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../features/user/userSlice";

const forgotPasswordSchema = yup.object({
  Email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
});

const ForgotPassword = () => {
  const title = "Account";
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values.Email));
    },
  });

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="store-wrapper home-wrapper">
        <div className="login-card text-center card-shadow mx-auto">
          <h5 className="mb-3">Reset Your Password</h5>
          <span className="">
            We will send you an email to reset your password
          </span>
          <form
            className="d-flex gap-10 flex-column mt-3"
            onSubmit={formik.handleSubmit}
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
              <label for="Email">Email</label>
            </div>
            <div className="d-flex align-items-center gap-20 justify-content-center">
              <button type="submit" className="button border-0">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
