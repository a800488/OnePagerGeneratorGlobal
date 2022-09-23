import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import UserForm from "./components/UserForm";
import RenderedForm from "./components/RenderedForm";
import Header from "./components/Header";
import data from "./components/data";

const App = () => {
	const [state, setState] = useState(data);
	const theme = createTheme();
	const [croppedArea, setcroppedArea] = useState<any>("");
	const [image, setImage] = useState<string>("");

	const updateText = (e: any, id: number, section: string) => {
		let newState: any = state;
		newState[section].forEach((el: any) => {
			if (el.id === id) {
				el.content = e;
			}
		});
		setState({ ...newState });
	};

	const includeField = (e: any, id: number, section: string) => {
		let newState: any = state;
		newState[section].forEach((el: any) => {
			if (el.id === id) {
				el.shouldInclude = !el.shouldInclude;
			}
		});
		setState({ ...newState });
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header />

			<Container component="main" sx={{ mb: 4 }}>
				<UserForm
					updateText={updateText}
					state={state}
					includeField={includeField}
				/>

				<RenderedForm state={state} croppedArea={croppedArea} image={image} />
			</Container>
		</ThemeProvider>
	);
};

export default App;
