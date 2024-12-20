import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import {useOrderDetails} from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  // setOrderPhase comes from the App component setter and allows to move to the next phase
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
    // in a real app we would get order details from context and send with POST
    .post(`http://localhost:3030/order`)
    .then((response) => {
      setOrderNumber(response.data.orderNumber);
    })
    .catch((error) => {
      // TODO: handle error here
    });
  }, []);

  function handleClick() {
    // clear order details
    resetOrder();

    // send back to order page
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <div style={{textAlign: "center"}}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{fontSize: "25%"}} >as per our terms and conditions, nothing will happen</p>
        <Button onClick={handleClick} >Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>
  }
}