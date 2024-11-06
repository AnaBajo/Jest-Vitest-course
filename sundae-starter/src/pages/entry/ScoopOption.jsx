import Col from "react-bootstrap/esm/Col"
import { useOrderDetails } from "../../contexts/OrderDetails"
import Form from "react-bootstrap/Form"; 
import Row from "react-bootstrap/Row";

export default function ScoopOption({name, imagePath}) {
    const {updateItemCount} = useOrderDetails();
    const handleChange = (e) => updateItemCount(name, parseInt(e.target.value), "scoops")

    return (
    <Col xs={12} sm={6} m={4} l={3} style={{textAlign: 'center'}} >
        <img style={{width: '75%'}} src={`http://localhost:3030${imagePath}`} alt={`${name} scoop`} />
        <Form.Group controlId={`${name}-count`} as={Row} style={{marginTop: "10px"}} >
            <Form.Label column xs="6" style={{textAlign: "right"}} >{name}</Form.Label>
            <Col xs="5" style={{textAlign: "left"}} >
                <Form.Control type="number" defaultValue={0} onChange={handleChange} ></Form.Control>
            </Col>
        </Form.Group>
    </Col>
    ) 
}