import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import Main from "./main";
import { renderWithContext } from "../../tests/helpers/renderWithContext";
import "@testing-library/jest-dom";

jest.mock("react-apexcharts", () => () => <div>ApexChart</div>);

describe("Main component", () => {
	test("renders Expense tracker heading", () => {
		{
			renderWithContext(<Main />);
		}
		expect(screen.getByText(/Expense tracker/i)).toBeInTheDocument();
	});

	test("renders Add New Transaction button", () => {
		{
			renderWithContext(<Main />);
		}
		expect(
			screen.getByRole("button", { name: /Add New Transaction/i })
		).toBeInTheDocument();
	});

	test("renders Summary component", () => {
		{
			renderWithContext(<Main />);
		}
		expect(screen.getByTestId("summary-box")).toBeInTheDocument();
	});

	test("renders Income section", () => {
		{
			renderWithContext(<Main />);
		}
		expect(screen.getByTestId("expenseView-income")).toBeInTheDocument();
	});

	test("renders Expense section", () => {
		{
			renderWithContext(<Main />);
		}
		expect(screen.getByTestId("expenseView-expense")).toBeInTheDocument();
	});

	test("open modal on button click", () => {
		{
			renderWithContext(<Main />);
		}
		const button = screen.getByRole("button", { name: /Add New Transaction/i });
		fireEvent.click(button);
		expect(screen.getByTestId("modal-window")).toBeInTheDocument();
	});
});
