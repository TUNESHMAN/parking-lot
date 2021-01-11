import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCar = (props) => {
  const formik = useFormik({
    initialValues: {
      regNumber: "",
      parkingLot: "",
      phoneNumber: "",
    },
    onSubmit: (values, tools) => {
      console.log(`HHY`, values);
      localStorage.setItem("carDetails", JSON.stringify(values));
    },
    validationSchema: Yup.object().shape({
      regNumber: Yup.string().required("Registration Number"),
      parkingLot: Yup.string().required("Parking Lot Number"),
      phoneNumber: Yup.string().required("Please enter user phone number"),
    }),
  });

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={formik.handleSubmit}>
        <h1>Add Car</h1>

        <input
          type="text"
          placeholder="Registration Number"
          name="regNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.regNumber}
        />
        {formik.touched.regNumber && formik.errors.regNumber ? (
          <span className="error-message">{formik.errors.regNumber}</span>
        ) : null}

        <input
          type="text"
          placeholder="Parking Lot Number"
          name="parkingLot"
          onChange={formik.handleChange}
          onBlur={formik.parkingLot}
          value={formik.values.parkingLot}
        />

        {formik.touched.parkingLot && formik.errors.parkingLot ? (
          <span className="error-message">{formik.errors.parkingLot}</span>
        ) : null}
        <input
          type="text"
          placeholder="User's phone number"
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <span className="error-message">{formik.errors.phoneNumber}</span>
        ) : null}
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};
export default AddCar;
