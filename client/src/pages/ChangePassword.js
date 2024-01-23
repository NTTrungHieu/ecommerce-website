import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { updateUserPassword } from "../features/user/userSlice";

const passwordSchema = yup.object({
  CurrentPassword: yup.string().required("Current Password is required"),
  NewPassword: yup
    .string()
    .required("New Password is required")
    .notOneOf(
      [yup.ref("CurrentPassword"), null],
      "New Password must be different"
    ),
  ConfirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("NewPassword"), null], "Confirm Password must match"),
});

const ChangePassword = () => {
  const title = "Change Password";
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { user, userToken } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      CurrentPassword: "",
      NewPassword: "",
      ConfirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(
        updateUserPassword({
          Password: values.NewPassword,
          CurrentPassword: values.CurrentPassword,
        })
      );
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [user]);

  return (
    <>
      <Meta title={title + " - Hieseu"} />
      <BreadCrumb title={title} />
      <Container className="pt-5">
        <div className="login-card text-center card-shadow mx-auto">
          <h5 className="">Change Password</h5>
          <form
            onSubmit={formik.handleSubmit}
            className={`d-flex gap-10 flex-column mt-3 needs-validation `}
          >
            <div className="form-floating">
              <input
                type="password"
                id="CurrentPassword"
                autoComplete="off"
                placeholder="Current Password"
                className={`form-control ${
                  formik.touched.CurrentPassword &&
                  (formik.errors?.CurrentPassword ? "is-invalid" : "is-valid")
                }`}
                value={formik.values.CurrentPassword}
                onChange={formik.handleChange("CurrentPassword")}
                onBlur={formik.handleBlur("CurrentPassword")}
              />
              <div className={`error invalid-feedback`}>
                {formik.touched.CurrentPassword &&
                  formik.errors.CurrentPassword}
              </div>
              <label htmlFor="Password">Password</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="NewPassword"
                autoComplete="off"
                placeholder="New Password"
                className={`form-control ${
                  formik.touched.NewPassword &&
                  (formik.errors?.NewPassword ? "is-invalid" : "is-valid")
                }`}
                value={formik.values.NewPassword}
                onChange={formik.handleChange("NewPassword")}
                onBlur={formik.handleBlur("NewPassword")}
              />
              <div className={`error invalid-feedback`}>
                {formik.touched.NewPassword && formik.errors.NewPassword}
              </div>
              <label htmlFor="NewPassword">New Password</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                id="ConfirmPassword"
                autoComplete="off"
                placeholder="Confirm Password"
                className={`form-control ${
                  formik.touched.ConfirmPassword &&
                  (formik.errors?.ConfirmPassword ? "is-invalid" : "is-valid")
                }`}
                value={formik.values.ConfirmPassword}
                onChange={formik.handleChange("ConfirmPassword")}
                onBlur={formik.handleBlur("ConfirmPassword")}
              />
              <div className={`error invalid-feedback`}>
                {formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword}
              </div>
              <label htmlFor="ConfirmPassword">Confirm Password</label>
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

export default ChangePassword;
