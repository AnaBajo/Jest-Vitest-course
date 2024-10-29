import { render, screen, fireEvent } from "@testing-library/react";
import {describe} from 'vitest';
// import { logRoles } from "@testing-library/dom";
import App from "./App";
import { kebabToTitleCase } from "./helpers";


test('button click flow', () => { 
  // render the App
  render(<App />);

  // find the button element
  const btnEl = screen.getByRole("button", {name: /blue/i})

  // check initial color 
  expect(btnEl).toHaveClass("medium-violet-red")

  // click button
  fireEvent.click(btnEl)

  // check btn text
  expect(btnEl).toHaveTextContent(/red/i)

  // check btn color
  expect(btnEl).toHaveClass("midnight-blue")
});



test('checkbox flow', () => { 
  // render the App
  render(<App />);

  // find elements
  const btnEl = screen.getByRole("button", {name: /midnight-blue/i})
  const cbxEl = screen.getByRole("checkbox", {name: /disable button/i})

  // check initial conditions
  expect(btnEl).toBeEnabled();
  expect(cbxEl).not.toBeChecked();

  // click checkbox to disable button
  fireEvent.click(cbxEl);

  // verify checkbox is checked and button is disabled
  expect(cbxEl).toBeChecked();
  expect(btnEl).toBeDisabled();
  expect(btnEl).toHaveClass("gray");


  // click checkbox again to enable button
  fireEvent.click(cbxEl);

  // verify checkbox is unchecked and button is enabled
  expect(cbxEl).not.toBeChecked();
  expect(btnEl).toBeEnabled();
});

describe("kebabToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphen", () => {
    expect(kebabToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
}) 
