import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import Row from "react-bootstrap/esm/Row"
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function Options({optionType}) {
    const [items, setItems] = useState([]);
    const [error, setError] =  useState(false)
    const {totals} = useOrderDetails();

    useEffect(() => {
        // optionType is either scoops or toppings
        axios
        .get(`http://localhost:3030/${optionType}`)
        .then((response) => setItems(response.data))
        .catch(error => {setError(true)});
    }, [optionType]);

    if (error) {
        return <AlertBanner />
    }

    // replace null with toppingOption 
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map((item) => 
        <ItemComponent 
            key={item.name} 
            name={item.name} 
            imagePath={item.imagePath}
        />)

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])}</p>
            <p>{title} total: {formatCurrency(totals[optionType])}</p>
            <Row>{optionItems}</Row>   
        </>
    )    
        
}