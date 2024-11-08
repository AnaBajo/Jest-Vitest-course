// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utls";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { describe, expect } from "vitest";
import OrderEntry from "../OrderEntry";

test("update scoop total when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />)

    // make total start with 0.00$
    const scoopsSubtotal = screen.getByText('Scoops total: $', {exact: false});
    expect(scoopsSubtotal).toHaveTextContent('0.00')

    // make vanilla scoop 1$
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    // update choco scoop to 2$
    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});

    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping total when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />)

    // make total start with 0.00$
    const toppingsTotal = screen.getByText('Toppings total: $', {exact: false});
    expect(toppingsTotal).toHaveTextContent('0.00')

    // add cherries and check subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries'});
    await user.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.50");

    // add hot fudge and check subtotal
    const hotFudgeCheckbox = screen.getByRole('checkbox', {name: 'Hot fudge'});
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("3.00");

    // remove hot fudge
    await userEvent.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50')
});

describe('grand total', () => {
  // no user evt, no axios calls so no need for async
  test('grand total starts at $0.00', () => {
    const {unmount} = render(<OrderEntry/>);
    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });

  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry/>);
    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/ });
    // add vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla"
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // add cherries topping and check grand total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries"
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry/>);

    // add cherries and check total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries"
    });
    await user.click(cherriesCheckbox);
    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("1.50");

    // update vanilla scoops to 2 and check total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla"
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry/>);

    // add cherries
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries"
    });
    await user.click(cherriesCheckbox);
    // grand total 1.50

    // update vanilla to 2 scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla"
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    // check total
    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");
    // remove cherries and check total
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});


