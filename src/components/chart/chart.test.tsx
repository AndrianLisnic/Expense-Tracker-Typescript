import { render, screen } from "@testing-library/react";
import TransactionChartSummary from "./chart";
import React from "react";

//mock ApexChart
jest.mock("react-apexcharts", () => () => (
	<div data-testid={"apex-chart"}>ApexChart</div>
));

describe("Chart rendering", () => {
	test("renders chart", () => {
		render(<TransactionChartSummary income={500} expense={100} />);
		expect(screen.getByTestId("apex-chart")).toBeInTheDocument();
	});
});
