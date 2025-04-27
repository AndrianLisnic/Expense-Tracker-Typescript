import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals.js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import GlobalState from "./components/context/index.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GlobalState children={undefined}>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</GlobalState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
