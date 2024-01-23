import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";

const registerSchema = yup.object({
  FirstName: yup.string().required("First Name is required"),
  LastName: yup.string().required("First Name is required"),
  Email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  Mobile: yup.string().required("Phone Number is required"),
  Password: yup.string().required("Password is required"),
});

const Register = () => {
  const title = "Create Account";
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      Password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });
  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="store-wrapper home-wrapper">
        <div className="login-card text-center card-shadow mx-auto">
          <h5 className="">Create Account</h5>
          <form
            onSubmit={formik.handleSubmit}
            className={`d-flex gap-10 flex-column mt-3 needs-validation `}
          >
            <div className="form-floating">
              <input
                type="text"
                id="FirstName"
                placeholder="First Name"
                autoComplete="off"
                className={`form-control ${
                  formik.touched.FirstName &&
                  (formik.errors?.FirstName ? "is-invalid" : "is-valid")
                }`}
                value={formik.values.FirstName}
                onChange={formik.handleChange("FirstName")}
                onBlur={formik.handleBlur("FirstName")}
              />
              <label for="FirstName">First Name</label>
              <div className={`error invalid-feedback`}>
                {formik.touched.FirstName && formik.errors.FirstName}
              </div>
            </div>
            <div className="form-floating">
              <input
                type="text"
                id="LastName"
                autoComplete="off"
                placeholder="Last Name"
                className={`form-control ${
                  formik.touched.LastName &&
                  (formik.errors?.LastName ? "is-invalid" : "is-valid")
                }`}
                value={formik.values.LastName}
                onChange={formik.handleChange("LastName")}
                onBlur={formik.handleBlur("LastName")}
              />
              <div className={`error invalid-feedback`}>
                {formik.touched.LastName && formik.errors.LastName}
              </div>
              <label for="LastName">Last Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                autoComplete="off"
                className={`form-control ${
                  formik.touched.Mobile &&
                  (formik.errors.Mobile ? "is-invalid" : "is-valid")
                }`}
                value={formik.values.Mobile}
                onChange={formik.handleChange("Mobile")}
                onBlur={formik.handleBlur("Mobile")}
              />
              <div className={`error invalid-feedback`}>
                {formik.touched.Mobile && formik.errors.Mobile}
              </div>
              <label for="phone">Phone Number</label>
            </div>
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
              <label for="Password">Password</label>
            </div>
            <div className="d-flex align-items-center gap-20 justify-content-center">
              <button type="submit" className="button border-0">
                Create
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Register;
