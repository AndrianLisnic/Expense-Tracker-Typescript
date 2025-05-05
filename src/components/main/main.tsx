import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import Summary from "../summary/summary.tsx";
import ExpenseView from "../expense-view/expense-view.tsx";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/global-state.tsx";
import React from "react";
import { ITransaction } from "../DataTypes/Transaction.ts";

interface MainContextTypes {
	totalExpense: number;
	setTotalExpense: (value: number) => void;
	totalIncome: number;
	setTotalIncome: (value: number) => void;
	allTransactions: ITransaction[];
}

export default function Main() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		totalExpense,
		setTotalExpense,
		totalIncome,
		setTotalIncome,
		allTransactions,
	} = useContext(GlobalContext) as MainContextTypes;

	useEffect(() => {
		let income: number = 0;
		let expense: number = 0;

		allTransactions.forEach((item) => {
			item.type === "income"
				? (income = income + Number(item.amount))
				: (expense = expense + Number(item.amount));
		});

		setTotalExpense(expense);
		setTotalIncome(income);
	}, [allTransactions]);

	return (
		<Flex
			data-testid="main-component"
			textAlign={"center"}
			flexDirection={"column"}
			pr={"5"}
			pl={"5"}
		>
			<Flex alignItems={"center"} justifyContent={"space-between"} mt={"12"}>
				<Heading
					color={"blue.600"}
					display={["none", "block", "block", "block", "block"]}
				>
					Expense tracker
				</Heading>
				<Flex>
					<Button
						onClick={onOpen}
						bg={"blue.700"}
						color={"white"}
						ml={"4"}
						_hover={{ color: "black", bg: "rgba(49, 130, 206, 0.2)" }}
					>
						Add New Transaction
					</Button>
				</Flex>
			</Flex>

			<Summary onClose={onClose} isOpen={isOpen} />

			<Flex
				w={"full"}
				alignItems={"flex-start"}
				justifyContent={"space-evenly"}
				flexDirection={["column", "column", "column", "row", "row"]}
				gap={"12px"}
			>
				<ExpenseView
					type={"income"}
					data={allTransactions.filter((item) => item.type === "income")}
				/>
				<ExpenseView
					type={"expense"}
					data={allTransactions.filter((item) => item.type === "expense")}
				/>
			</Flex>
		</Flex>
	);
}
