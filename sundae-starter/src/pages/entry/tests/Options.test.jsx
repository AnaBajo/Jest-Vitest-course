// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utls";
import Options from "../Options";
import { expect } from "vitest";

test('displays image for each scoop from the server', async () => {
    render(<Options optionType="scoops" />);

    // find images
    // $ indicates that the word scoop is at the end of the string in the reg exp.
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2); 

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);

});

test('displays image for each topping from the server', async () => {
    render(<Options optionType="toppings" />);

    const images = await screen.findAllByRole('img', { name: /topping$/i })
    expect(images).toHaveLength(3); 
    
    // confirm alt text of images
    const imageTitles = images.map((img) => img.alt);
    expect(imageTitles).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});