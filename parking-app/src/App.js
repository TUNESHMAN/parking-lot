import "./App.css";
import { Modal } from "antd";
import AddCar from "./AddCar";
import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";

function App() {
  
  const [garage,setGarage] = useState([])
  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem("carDetails"));
    setGarage(cars)
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

  let checkoutTime = new Date().toLocaleTimeString();
  const checkOut = (regNumber) => {
    let cars = JSON.parse(localStorage.getItem("carDetails"));
    let carToCheckout = cars.find((car) => car.regNumber === regNumber);
    carToCheckout.checkOut = checkoutTime
    const otherCars = cars.filter(car=>car.regNumber !== regNumber)
    const updatedCars = [carToCheckout,...otherCars]
    localStorage.setItem('carDetails',JSON.stringify(updatedCars))
    setGarage(updatedCars)
   
  };

  const toggleFormula = () => {
    setShow(!show);
  };

  return (
    <div className="App">
      <Button color="primary" onClick={handleButton}>
        Add Car
      </Button>
      <Table dark>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Car</th>
            <th>Parking Space</th>
            <th>Checked In</th>
            <th>Checked Out</th>
            <th>Fees</th>
          </tr>
        </thead>
        <tbody>
          {garage?.map((car) => (
            <tr key={car.id}>
              <th scope="row">{car.phoneNumber}</th>
              <td>{car.regNumber}</td>
              <td>{car.parkingLot}</td>
              <td>{car.checkIn}</td>
              <td>
              { car.checkOut ? car.checkOut : <Button color="danger" onClick={() => checkOut(car.regNumber)}>
                  Check Out
                </Button>}
              </td>
              <td>{car.checkIn}</td>
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
          <AddCar toggleFormula={toggleFormula} setGarage={setGarage}/>
        </Modal>
      </div>
    </div>
  );
}

export default App;
