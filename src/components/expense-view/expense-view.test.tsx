import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import ExpenseView from "./expense-view";

//mock ApexChart
jest.mock("react-apexcharts", () => () => (
	<div data-testid={"apex-chart"}>ApexChart</div>
));

//mock data
const incomeMockData = [
	{ description: "Salary", amount: 1000 },
	{ description: "Devidents", amount: 500 },
];
const expenseMockData = [
	{ description: "Gym", amount: 500 },
	{ description: "Courses", amount: 400 },
];

describe("Income / Expense component", () => {
	test("renders Income heading", () => {
		render(<ExpenseView type={"income"} data={incomeMockData} />);
		expect(screen.getByTestId("expense-heading")).toHaveTextContent("Income");
	});

	test("renders corect number of Income records", () => {
		render(<ExpenseView type={"income"} data={incomeMockData} />);
		const incomeItems = screen.getAllByTestId("expense-item");
		expect(incomeItems.length).toEqual(incomeMockData.length);
	});

	test("renders corect income descriptions and amounts", () => {
		render(<ExpenseView type={"income"} data={incomeMockData} />);
		incomeMockData.forEach((item) => {
			expect(screen.getByText(item.description)).toBeInTheDocument();
			expect(
				screen.getByText((content) => content.includes(String(item.amount)))
			).toBeInTheDocument();
		});
	});

	test("renders Expense heading", () => {
		render(<ExpenseView type={"expense"} data={expenseMockData} />);
		expect(screen.getByTestId("expense-heading")).toHaveTextContent("Expense");
	});

	test("renders corect number of Expense records", () => {
		render(<ExpenseView type={"expense"} data={expenseMockData} />);
		const incomeItems = screen.getAllByTestId("expense-item");
		expect(incomeItems.length).toEqual(expenseMockData.length);
	});

	test("renders corect expense descriptions and amounts", () => {
		render(<ExpenseView type={"expense"} data={expenseMockData} />);
		expenseMockData.forEach((item) => {
			expect(screen.getByText(item.description)).toBeInTheDocument();
			expect(
				screen.getByText((content) => content.includes(String(item.amount)))
			).toBeInTheDocument();
		});
	});
});
