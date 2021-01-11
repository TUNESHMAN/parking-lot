import "./App.css";
import { Modal } from "antd";
import AddCar from "./AddCar";
import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";

function App() {
  const [garage, setGarage] = useState([]);
  const [searchParameter, setSearchParameter] = useState("regNumber");
  const [input, setInput] = useState("");

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem("carDetails"));
    setGarage(cars);
    if (!cars) {
      localStorage.setItem("carDetails", JSON.stringify([]));
    }
  }, []);
  const [show, setShow] = useState(false);

  const handleButton = () => {
    setShow(true);
  };

  function handleEnd() {
    setShow(false);
  }
  let checkout = new Date().toLocaleString();
  let checkedIn = new Date().toLocaleString();
  // let checkoutTime = checkout.toLocaleTimeString();

  const timeFormatter = (start, end) => {
    console.log(end,start)
    const startTime = Date.parse(start);
    const endTime = Date.parse(end);
    const diff = (endTime - startTime) / 3600000;
    console.log(startTime, endTime, diff);
    return Math.round(diff * 2) ;
  };
  const checkOut = (regNumber,end,start) => {
    console.log(regNumber,end,start)
    let cars = JSON.parse(localStorage.getItem("carDetails"));
    let carToCheckout = cars.find((car) => car.regNumber === regNumber);
    carToCheckout.checkOut = checkout;
    // carToCheckout.fee = timeFormatter(start,end)
    const otherCars = cars.filter((car) => car.regNumber !== regNumber);
    const updatedCars = [carToCheckout, ...otherCars];
    localStorage.setItem("carDetails", JSON.stringify(updatedCars));
    setGarage(updatedCars);
  };

  const toggleFormula = () => {
    setShow(!show);
  };
  const filteredCars = garage?.filter((car) =>
    car[searchParameter].toLowerCase().includes(input.toLowerCase())
  );

  const handleFilter = (e) => {
    setSearchParameter(e.target.value);
    setInput("");
  };

  return (
    <div className="App">
      <Button color="primary" onClick={handleButton} className="add-btn">
        Add New Car
      </Button>
      <select
        defaultValue="no-value"
        name="searchParameter"
        onChange={handleFilter}
      >
        <option value="no-value" disabled>
          Filter By
        </option>
        <option value="regNumber">Registration Number</option>
        <option value="parkingLot">Parking Lot</option>
      </select>
      <input
        name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Table dark>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Car Registration Number</th>
            <th>Parking Space</th>
            <th>Checked In</th>
            <th>Checked Out</th>
            <th>Fees</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars?.map((car) => (
            <tr key={car.regNumber}>
              <th scope="row">{car.phoneNumber}</th>
              <td>{car.regNumber}</td>
              <td>{car.parkingLot}</td>
              <td>{car.checkedIn.split(",")[1]}</td>
              <td>
                {car.checkOut ? (
                  car.checkOut.split(",")[1]
                ) : (
                  <Button
                    color="danger"
                    onClick={() => checkOut(car.regNumber,)}
                  >
                    Check Out
                  </Button>
                )}
              </td>
              <td>
                {car.checkOut ? timeFormatter(car.checkedIn,car.checkOut)
                  : "Not yet calculated"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Modal
          title="Add a new car"
          visible={show}
          footer={null}
          destroyOnClose={true}
          onCancel={handleEnd}
        >
          <AddCar
            toggleFormula={toggleFormula}
            handleEnd={handleEnd}
            setGarage={setGarage}
            checkedIn={checkedIn}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
