import "./App.css";
import { Button, Modal } from "antd";
import AddCar from "./AddCar";
import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

function App() {
  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem("carDetails"));
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

  const toggleFormula = () => {
    setShow(!show);
  };

  console.log(`HELLO`, JSON.parse(localStorage.getItem("carDetails")));

  return (
    <div className="App">
      <Button type="primary" onClick={handleButton}>
        Button
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
          {JSON.parse(localStorage.getItem("carDetails")).map((car) => (
            <tr key={car.id}>
              <th scope="row">{car.phoneNumber}</th>
              <td>{car.regNumber}</td>
              <td>{car.parkingLot}</td>
              <td>{car.checkIn}</td>
              {/* <td>{car.checkIn}</td>
              <td>{car.checkIn}</td> */}
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
          <AddCar toggleFormula={toggleFormula} />
        </Modal>
      </div>
    </div>
  );
}

export default App;
