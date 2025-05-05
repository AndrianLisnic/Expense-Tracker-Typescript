import { screen } from "@testing-library/react";
import React from "react";
import { renderWithContext } from "./tests/helpers/renderWithContext";
import App from "./App";

test("Main component renders successfully", () => {
	{
		renderWithContext(<App />);
	}

	const mainComponent = screen.getByTestId("main-component");
	expect(mainComponent).toBeInTheDocument();
});
