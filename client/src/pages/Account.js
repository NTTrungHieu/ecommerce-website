import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { updateUserInfo } from "../features/user/userSlice";

const accountSchema = yup.object({
  FirstName: yup.string().required("First Name is required"),
  LastName: yup.string().required("First Name is required"),
  Email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  Mobile: yup.string().required("Phone Number is required"),
});

const Account = () => {
  const title = "My Account";
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
    },
    validationSchema: accountSchema,
    onSubmit: (values) => {
      dispatch(updateUserInfo(values));
    },
  });
  useEffect(() => {
    formik.setFieldValue("FirstName", user.FirstName);
    formik.setFieldValue("LastName", user.LastName);
    formik.setFieldValue("Email", user.Email);
    formik.setFieldValue("Mobile", user.Mobile);
  }, [user]);
  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="pt-5">
        <div className="login-card text-center card-shadow mx-auto">
          <h5 className="">Change Account Informations</h5>
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
              <label htmlFor="FirstName">First Name</label>
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
              <label htmlFor="LastName">Last Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                id="Mobile"
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
              <label htmlFor="Mobile">Phone Number</label>
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
              <label htmlFor="Email">Email</label>
            </div>
            <div className="form-floating text-end">
              <Link to="/change-password">Change Password</Link>
            </div>
            <div className="d-flex align-items-center gap-20 justify-content-center">
              <button type="submit" className="button border-0">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Account;
