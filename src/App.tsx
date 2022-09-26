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
	const theme = createTheme();

	const [state, setState] = useState<Object>(data);
	const [croppedArea, setCroppedArea] = useState<string>("");
	const [image, setImage] = useState<string>("");

	const updateText = (e: string, id: number, section: string) => {
		let newState: any = state;
		newState[section].forEach((el: { id: number; content: string }) => {
			if (el.id === id) {
				el.content = e;
			}
		});
		setState({ ...newState });
	};

	const includeField = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
		section: string
	) => {
		let newState: any = state;
		newState[section].forEach((el: { id: number; shouldInclude: boolean }) => {
			if (el.id === id) {
				el.shouldInclude = !el.shouldInclude;
			}
		});
		setState({ ...newState });
	};

	const setAvatar = (croppedArea: string, image: string) => {
		setCroppedArea(croppedArea);
		setImage(image);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			<Container component="main" sx={{ mb: 4, padding: 2 }}>
				<UserForm
					updateText={updateText}
					state={state}
					includeField={includeField}
					setAvatar={setAvatar}
				/>
				<RenderedForm state={state} croppedArea={croppedArea} image={image} />
			</Container>
		</ThemeProvider>
	);
};

export default App;
