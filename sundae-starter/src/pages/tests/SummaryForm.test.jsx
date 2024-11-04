import { expect } from "chai";
import SummaryForm from "../summary/SummaryForm";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test('Initial conditions', () => {
    // render the component
    render(<SummaryForm/>);
    screen.debug();

    // find the checkbox element
    const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    expect(checkbox).not.toBeChecked();

    // find the btn element
    const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
    expect(confirmBtn).toBeDisabled();

});

test("Checkbox enables button on first click and disables on second", async () => {
    const user = userEvent.setup();
    render(<SummaryForm/>);
    const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const confirmBtn = screen.getByRole("button", { name: /confirm order/i });

    // 1. click checkbox
    await user.click(checkbox);
    
    // check if the checkbox is checked
    expect(checkbox).toBeChecked();
    expect(confirmBtn).toBeEnabled();

    // 2. click checkbox
    await user.click(checkbox);
    
    // check if the checkbox is checked
    expect(checkbox).not.toBeChecked();
    expect(confirmBtn).toBeDisabled();
}) 

test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm/>);

    // popover starts hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument();

    // pop appears on mouseover
    const terms = screen.getByText(/terms and conditions/i)
    await user.hover(terms)
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // pop disappears on mouseaway
    await user.unhover(terms)
    expect(popover).not.toBeInTheDocument();
})