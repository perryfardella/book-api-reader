import { render, screen, act } from "@testing-library/react";
import React from "react";
import BooksFetcher from "../Components/BooksFetcher";
import userEvent from "@testing-library/user-event";

beforeAll(() => jest.spyOn(window, "fetch"));
describe("BooksFetcher", () => {
  function Component() {
    render(<BooksFetcher />);
    screen.getByTestId("Component-BookFetcher");
  }

  it("Should render the book information as table rows, when they have been received from the API", async () => {
    Component();

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          Title: "The Murder at the Vicarage",
          BookCategory: "Crime",
          Cost: 16.25,
        },
      ],
    });

    userEvent.click(screen.getByTestId("Button-Fetch"));

    expect(
      await screen.findByText("The Murder at the Vicarage")
    ).toBeInTheDocument();
  });
  it("Should show an error message when an error is received as part of the API fetching", async () => {
    Component();

    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => [],
    });

    userEvent.click(screen.getByTestId("Button-Fetch"));

    expect(await screen.findByText("Error")).toBeInTheDocument();
  });
});
