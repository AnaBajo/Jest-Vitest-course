import { Container } from "react-bootstrap";
import OrderEntry  from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

// import SummaryForm from "./pages/summary/SummaryForm";
function App() {
  return (
    // <div>
    //   <h1>Sundaes on Demand</h1>
    //   <SummaryForm></SummaryForm>
    // </div>

    <Container>
      <OrderDetailsProvider></OrderDetailsProvider>
      <OrderEntry></OrderEntry>
    </Container>
  );
}

export default App;
