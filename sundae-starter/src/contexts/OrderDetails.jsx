import { createContext, useContext, useState } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// create custom hook to check if we  are inside the provider
export function useOrderDetails() {
    const contextValue = useContext(OrderDetails);

    if (!contextValue) {
        throw new Error ("useOrderDetails must be called from within an OrderDetailsProvider");
    }

    return contextValue
}

// order details: nr and type of scoops and toppings
// anybody using the context is sharing the state and its updatess
export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: {}, // example: {Chocolate: 1, Vanilla: 2}
        toppings: {} // example: {"Gummi Bears": 1, "Fudge": 2}
    })

    function updateItemCount(itemName, newItemCount, optionType) {
        // copy existing state
        const newOptionCounts = { ...optionCounts }

        //update the copy
        newOptionCounts[optionType][itemName] = newItemCount;

        // update the state with the updated copy
        setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
        setOptionCounts({scoops: {}, toppings: {}});
    }

    // utility function to derive totals from optionCounts state value
    function calculateTotal(optionType) {
        // get an [] of counts for the option type (for ex: [1,2])
        const countsArray = Object.values(optionCounts[optionType]);

        // total value in the array of counts
        const totalCount = countsArray.reduce((total, value) => total + value, 0); 

        // multiply the total nr of items by the price for this item type
        return totalCount * pricePerItem[optionType];
    }
    
    const totals = {
        scoops: calculateTotal("scoops"),
        toppings: calculateTotal("toppings")
    };

    const value = {optionCounts, totals, updateItemCount, resetOrder};
    return <OrderDetails.Provider value={value} {...props} />     
}

