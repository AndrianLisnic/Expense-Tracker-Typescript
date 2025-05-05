import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
} from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../context/global-state.tsx";
import React from "react";

interface TransactionFormProps {
	onClose: () => void;
	isOpen: boolean;
}

export default function TransactionForm({
	onClose,
	isOpen,
}: TransactionFormProps) {
	const { value, setValue, formData, setFormData, handleFormSubmit } =
		useContext(GlobalContext);

	function handleFormChange(event: React.ChangeEvent<HTMLImageElement>) {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		handleFormSubmit(formData);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} children={undefined}>
			<form onSubmit={handleSubmit} data-testid={"modal-window"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add New Transaction</ModalHeader>
					<ModalCloseButton></ModalCloseButton>
					<ModalBody>
						<FormControl>
							<FormLabel>Enter Description</FormLabel>
							<Input
								placeholder="Enter transaction description"
								name="description"
								type="text"
								onChange={handleFormChange}
							></Input>
						</FormControl>
						<FormControl>
							<FormLabel>Enter Amount</FormLabel>
							<Input
								placeholder="Enter transaction amount"
								name="amount"
								type="number"
								onChange={handleFormChange}
							></Input>
						</FormControl>
						<RadioGroup
							mt={"5"}
							value={value}
							onChange={setValue}
							children={undefined}
						>
							<Radio
								data-testid={"radio-income"}
								checked={formData.type === "income"}
								value="income"
								mr={"5"}
								name="type"
								colorScheme="green"
								onChange={handleFormChange}
							>
								Income
							</Radio>
							<Radio
								data-testid={"radio-expense"}
								checked={formData.type === "expense"}
								value="expense"
								name="type"
								colorScheme="red"
								onChange={handleFormChange}
							>
								Expense
							</Radio>
						</RadioGroup>
					</ModalBody>
					<ModalFooter>
						<Button mr={"5"} onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" onClick={onClose}>
							Add
						</Button>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	);
}
