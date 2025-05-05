import React from "react";
import { render, screen } from "@testing-library/react";
import { GlobalContext } from "./global-state";
import GlobalState from "./global-state";
import userEvent from "@testing-library/user-event";

const TestComponent = () => {
	const context = React.useContext(GlobalContext);

	if (!context) return null;

	const {
		formData,
		setFormData,
		value,
		setValue,
		allTransactions,
		handleFormSubmit,
		setTotalIncome,
		setTotalExpense,
		totalIncome,
		totalExpense,
	} = context;

	return (
		<div>
			<p data-testid="form-type">{formData.type}</p>
			<p data-testid="value">{value}</p>
			<p data-testid="transaction-count">{allTransactions.length}</p>
			<p data-testid="total-income">{totalIncome}</p>
			<p data-testid="total-expense">{totalExpense}</p>
			<button
				onClick={() =>
					setFormData({ type: "income", amount: 100, description: "Test" })
				}
			>
				Set Form Data
			</button>
			<button onClick={() => setValue("income")}>Set Value</button>
			<button onClick={() => handleFormSubmit(formData)}>Submit</button>
			<button onClick={() => setTotalIncome(500)}>Set Income</button>
			<button onClick={() => setTotalExpense(300)}>Set Expense</button>
		</div>
	);
};

describe("GlobalState", () => {
	it("renders children correctly", () => {
		render(
			<GlobalState children={undefined}>
				<p data-testid="child">Hello</p>
			</GlobalState>
		);
		expect(screen.getByTestId("child")).toHaveTextContent("Hello");
	});

	it("updates formData and value", async () => {
		render(
			<GlobalState children={undefined}>
				<TestComponent />
			</GlobalState>
		);

		await userEvent.click(screen.getByText("Set Form Data"));
		await userEvent.click(screen.getByText("Set Value"));

		expect(screen.getByTestId("form-type")).toHaveTextContent("income");
		expect(screen.getByTestId("value")).toHaveTextContent("income");
	});

	it("adds a transaction on form submission", async () => {
		render(
			<GlobalState children={undefined}>
				<TestComponent />
			</GlobalState>
		);

		await userEvent.click(screen.getByText("Set Form Data"));
		await userEvent.click(screen.getByText("Submit"));

		expect(screen.getByTestId("transaction-count")).toHaveTextContent("1");
	});

	it("sets total income and total expense correctly", async () => {
		render(
			<GlobalState children={undefined}>
				<TestComponent />
			</GlobalState>
		);

		await userEvent.click(screen.getByText("Set Income"));
		await userEvent.click(screen.getByText("Set Expense"));

		expect(screen.getByTestId("total-income")).toHaveTextContent("500");
		expect(screen.getByTestId("total-expense")).toHaveTextContent("300");
	});
});
