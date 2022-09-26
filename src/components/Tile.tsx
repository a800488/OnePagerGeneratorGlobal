import Paper from "@mui/material/Paper";
import "../styles/RenderedForm.css";
import { Grid, styled, Typography } from "@mui/material";

interface iTile {
	title: string;
	content: string;
	display: boolean;
}

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "left",
	boxShadow: "none",
	overflowWrap: "break-word",
	fontSize: "14px",
	width: "100%",
}));

const Tile = ({ content, title, display }: iTile) => {
	if (!display) {
		return null;
	}

	return (
		<Grid container width="49%">
			<Typography color="rgb(5, 150, 255)" variant="h5">
				{title}
			</Typography>
			<Item>{content}</Item>
		</Grid>
	);
};

export default Tile;
