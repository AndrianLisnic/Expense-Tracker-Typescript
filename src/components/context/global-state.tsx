import { createContext, useState, ReactNode, React } from "react";
import { ITransaction } from "../DataTypes/Transaction";

interface GlobalContextTypes {
	formData: ITransaction;
	setFormData: (transaction: ITransaction) => void;
	value: string;
	setValue: (value: string) => void;
	totalExpense: number;
	setTotalExpense: (value: number) => void;
	totalIncome: number;
	setTotalIncome: (value: number) => void;
	allTransactions: ITransaction[];
	setAllTransactions: (transactions: ITransaction[]) => void;
	handleFormSubmit: (transaction: ITransaction) => void;
}

interface GlobalContextProps {
	children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextTypes | null>(null);

export default function GlobalState({ children }: GlobalContextProps) {
	const [formData, setFormData] = useState<ITransaction>({
		type: "expense",
		amount: 0,
		description: "",
	});
	const [value, setValue] = useState<string>("expense");
	const [totalExpense, setTotalExpense] = useState<number>(0);
	const [totalIncome, setTotalIncome] = useState<number>(0);
	const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);

	function handleFormSubmit(currentFormData: ITransaction) {
		if (!currentFormData.description || !currentFormData.amount) return;

		setAllTransactions([
			...allTransactions,
			{ ...currentFormData, id: Date.now() },
		]);
	}

	return (
		<GlobalContext.Provider
			value={{
				formData,
				setFormData,
				value,
				setValue,
				totalExpense,
				setTotalExpense,
				totalIncome,
				setTotalIncome,
				allTransactions,
				setAllTransactions,
				handleFormSubmit,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
