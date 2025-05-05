import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { GlobalContext } from "../context/global-state";
import Summary from "./summary";

//mock ApexChart
jest.mock("react-apexcharts", () => () => (
	<div data-testid={"apex-chart"}>ApexChart</div>
));

//mock functions
const mockSetValue = jest.fn();
const mockSetFormData = jest.fn();
const mockHandleFormSubmit = jest.fn();
const mockOnClose = jest.fn();

// mock Context value
const mockContextValue = {
	value: "income",
	setValue: mockSetValue,
	formData: {
		description: "",
		amount: "",
		type: "income",
	},
	setFormData: mockSetFormData,
	handleFormSubmit: mockHandleFormSubmit,
	totalIncome: 1000,
	totalExpense: 400,
};

const renderComponent = () => {
	render(
		<GlobalContext value={mockContextValue}>
			<Summary onClose={mockOnClose} isOpen={false} />
		</GlobalContext>
	);
};

describe("Summary component", () => {
	test("renders Summary totals", () => {
		renderComponent();
		expect(screen.getByTestId("balance")).toHaveTextContent("Balance is $600");
	});

	test("renders total income", () => {
		renderComponent();
		expect(screen.getByTestId("total-income")).toHaveTextContent("$ 1000");
	});

	test("renders total expense", () => {
		renderComponent();
		expect(screen.getByTestId("total-expense")).toHaveTextContent("$ 400");
	});
});
