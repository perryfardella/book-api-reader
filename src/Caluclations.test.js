import { calculateTax, calculateDiscount } from "./Calculations";

it("Should check to make sure the calculateTax method is calculating correctly.", () => {
  expect(calculateTax(15)).toEqual(1.5);
});

it("Should check to make sure the calculateDiscount method is calculating correctly.", () => {
  expect(calculateDiscount(20)).toEqual(1);
});
