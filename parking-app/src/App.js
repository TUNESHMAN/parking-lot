import "./App.css";
import { Table, Tag, Space, Button } from "antd";

function App() {
  
  const dataSource = [
    {
      key: '1',
      phone: 'Mike',
      car: 32,
      parkingSpace: '10 Downing Street',
      checkedIn: '10 Downing Street',
      checkedOut: '10 Downing Street',
      fees: "500"
    },
    {
      key: '2',
      phone: 'Mike',
      car: 32,
      parkingSpace: '10 Downing Street',
      checkedIn: '10 Downing Street',
      checkedOut: '10 Downing Street',
      fees: "500"
    },
  ];
  
  const columns = [
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Car',
      dataIndex: 'car',
      key: 'car',
    },
    {
      title: 'Parking space',
      dataIndex: 'parkingSpace',
      key: 'parkingSpace',
    },
    {
      title: 'Checked In',
      dataIndex: 'checkedIn',
      key: 'checkedIn',
    },
    {
      title: 'Checked Out',
      dataIndex: 'checkedOut',
      key: 'checkedOut',
    },
    {
      title: 'Fees',
      dataIndex: 'fees',
      key: 'fees',
    },
  ];
  
  return (
    <div className="App">
    <Button type="primary">Button</Button>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default App;