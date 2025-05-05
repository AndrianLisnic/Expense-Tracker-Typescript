import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import TransactionForm from "./add-transaction";
import { GlobalContext } from "../context/global-state";

//mock ApexChart
jest.mock("react-apexcharts", () => () => <div>ApexChart</div>);

//mock functions
const mockSetValue = jest.fn();
const mockSetFormData = jest.fn();
const mockHandleFormSubmit = jest.fn();
const mockOnClose = jest.fn();

//mock Context value
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
};

function renderModal(isOpenProps = true) {
	render(
		<GlobalContext value={mockContextValue}>
			<TransactionForm onClose={mockOnClose} isOpen={isOpenProps} />
		</GlobalContext>
	);
}

describe("Transaction Form component", () => {
	test("renders Transaction Form heading", () => {
		renderModal();
		expect(screen.getByText(/Add New Transaction/i)).toBeInTheDocument();
	});

	test("renders Transaction Form heading", () => {
		renderModal();
		expect(screen.getByText(/Enter Description/i)).toBeInTheDocument();
	});

	test("renders Transaction Form heading", () => {
		renderModal();
		expect(screen.getByText(/Enter Amount/i)).toBeInTheDocument();
	});

	test("renders Transaction Form radio group", () => {
		renderModal();
		expect(screen.getByRole("radio", { name: "Income" })).toBeInTheDocument();
		expect(screen.getByRole("radio", { name: "Expense" })).toBeInTheDocument();
	});

	test("renders Transaction Form Cancel and Add buttons", () => {
		renderModal();
		expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
	});

	test("not render modal when isOpen is false", () => {
		renderModal(false);
		expect(screen.queryByTestId("modal-window")).not.toBeInTheDocument();
	});

	test("calls setFormData when description is changed", () => {
		renderModal();

		const input = screen.getByPlaceholderText("Enter transaction description");
		fireEvent.change(input, { target: { name: "description", value: "desc" } });

		expect(mockSetFormData).toHaveBeenCalledWith({
			...mockContextValue.formData,
			description: "desc",
		});
	});

	test("calls setFormData when amount is changed", () => {
		renderModal();

		const input = screen.getByPlaceholderText("Enter transaction amount");
		fireEvent.change(input, { target: { name: "amount", value: "123" } });

		expect(mockSetFormData).toHaveBeenCalledWith({
			...mockContextValue.formData,
			amount: "123",
		});
	});

	test("calls setFormData when radio button is changed", () => {
		renderModal();

		const expenseRadio = screen.getByTestId("radio-expense");
		fireEvent.click(expenseRadio);

		expect(mockSetFormData).toHaveBeenCalledWith({
			...mockContextValue.formData,
			type: "expense",
		});
	});

	test("calls handleFormSubmit on form submission", () => {
		renderModal();

		const form = screen.getByTestId("modal-window");
		fireEvent.submit(form);
		expect(mockHandleFormSubmit).toHaveBeenCalledWith(
			mockContextValue.formData
		);
	});

	test("calls onClose when Close button is clicked", () => {
		renderModal();

		const cancelButton = screen.getByText("Cancel");
		fireEvent.click(cancelButton);
		expect(mockOnClose).toHaveBeenCalled();
	});

	test("calls onClose when Add button is clicked", () => {
		renderModal();

		const addButton = screen.getByText("Add");
		fireEvent.click(addButton);
		expect(mockOnClose).toHaveBeenCalled();
	});
});
