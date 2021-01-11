import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCar = ({ setGarage, handleEnd }) => {
  var checkIn = new Date().toLocaleTimeString();

  const formik = useFormik({
    initialValues: {
      regNumber: "",
      parkingLot: "",
      phoneNumber: "",
    },
    onSubmit: (values, tools) => {
      const fetchedCars = JSON.parse(localStorage.getItem("carDetails"));
      const newCarDetails = [...fetchedCars, { ...values, checkIn }];
      localStorage.setItem("carDetails", JSON.stringify(newCarDetails));
      setGarage(newCarDetails);
      tools.resetForm();
    },
    validationSchema: Yup.object().shape({
      regNumber: Yup.string().required("Registration Number"),
      parkingLot: Yup.string().required("Parking Lot Number"),
      phoneNumber: Yup.number().required("Must be a number"),
    }),
  });

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Registration Number"
          name="regNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.regNumber}
          className="inp-space"
        />
        {formik.touched.regNumber && formik.errors.regNumber ? (
          <span className="error-message">{formik.errors.regNumber}</span>
        ) : null}

        <br />

        <input
          type="text"
          placeholder="Parking Lot Number"
          name="parkingLot"
          onChange={formik.handleChange}
          onBlur={formik.parkingLot}
          value={formik.values.parkingLot}
          className="inp-space"
        />

        {formik.touched.parkingLot && formik.errors.parkingLot ? (
          <span className="error-message">{formik.errors.parkingLot}</span>
        ) : null}
        <br />
        <input
          type="text"
          placeholder="User's phone number"
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          className="inp-space"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <span className="error-message">{formik.errors.phoneNumber}</span>
        ) : null}
        <br />
        <button type="submit" className="add-btn1" onClick={handleEnd}>
          Add Car
        </button>
      </form>
    </div>
  );
};
export default AddCar;
