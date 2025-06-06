import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function ExpenseView({ type, data }) {
	return (
		<Box
			data-testid={`expenseView-${type}`}
			flex={1}
			width={"full"}
			bg={"white"}
			mt={"4"}
			p={"5"}
			pb={"4"}
			border={"1px solid"}
			borderColor={"gray.100"}
			borderRadius={"12"}
		>
			<Flex justifyContent={"space-between"} alignItems={"center"}>
				<Heading data-testid={"expense-heading"} size={"md"} color={"red.700"}>
					{type === "income" ? "Income" : "Expense"}
				</Heading>
			</Flex>
			{data.map((item, index) => (
				<Flex
					key={index}
					data-testid={"expense-item"}
					bg={type === "expense" ? "red.50" : "blue.50"}
					mt={"4"}
					justifyContent={"space-between"}
					alignItems={"center"}
					border={"1px solid"}
					borderColor={type === "expense" ? "red.100" : "blue.100"}
					p={"4"}
					borderRadius={"8"}
				>
					<Flex alignItems={"center"} justifyContent={"center"}>
						<Text ml={"3"} fontWeight={"bold"} color={"gray.600"}>
							{item.description}
						</Text>
					</Flex>
					<Text>${item.amount}</Text>
				</Flex>
			))}
		</Box>
	);
}
