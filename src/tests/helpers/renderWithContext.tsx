import { render, RenderResult } from "@testing-library/react";
import GlobalState from "../../components/context/global-state";
import React, { ReactElement } from "react";

jest.mock("react-apexcharts", () => () => <div>ApexChart</div>);

export const renderWithContext = (component: ReactElement): RenderResult => {
	return render(<GlobalState children={undefined}>{component}</GlobalState>);
};
