import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const options = {
	labels: ["Expense", "Income"],
	chart: {
		width: "50px",
	},
	states: {
		hover: {
			filter: {
				type: "none",
			},
		},
	},
	legend: {
		show: false,
	},
	dataLabels: {
		enabled: true,
	},
	hover: { mode: null },
	plotOptions: {
		donut: {
			expandOnClick: false,
			donut: {
				labels: {
					show: false,
				},
			},
		},
	},
	tooltip: {
		enabled: true,
		theme: "dark",
		styles: {
			fontSize: "12px",
			backgroundColor: "#000000",
		},
	},
};

export default function TransactionChartSummary({ income, expense }) {
	return (
		<Box width={"250px"} height={"250px"}>
			<Chart
				options={options}
				series={[expense, income]}
				type="pie"
				width={"100%"}
				height={"100%"}
			></Chart>
		</Box>
	);
}
