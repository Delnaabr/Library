import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddBooksPopup from '../page'

describe("AddBooksPopup Component Tests", () => {
  it("renders without crashing", () => {
    const { getByText, getByLabelText } = render(
      <AddBooksPopup
        open={true}
        onClose={() => {}}
        onAddBook={() => {}}
        books={[]}
      />
    );

    // Assert that important elements are present in the rendered component.
    expect(getByText("Add New Book")).toBeInTheDocument();
    expect(getByLabelText("Book Name")).toBeInTheDocument();
    expect(getByLabelText("Author")).toBeInTheDocument();
    expect(getByLabelText("Stock")).toBeInTheDocument();
    expect(getByLabelText("Category")).toBeInTheDocument();
  });
});
