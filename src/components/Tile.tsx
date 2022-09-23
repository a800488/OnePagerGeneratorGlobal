import Paper from "@mui/material/Paper";
import "../styles/RenderedForm.css";
import { styled, Typography } from "@mui/material";

interface iTile {
	title: string;
	content: string;
	display: boolean;
}

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "left",
	boxShadow: "none",
	overflowWrap: "break-word",
	fontSize: "16px",
	width: "45%",
}));

const Tile = ({ content, title, display }: iTile) => {
	if (!display) {
		return null;
	}

	return (
		<Item>
			<Typography color="rgb(5, 150, 255)" variant="h5">
				{title}
			</Typography>
			<Item>{content}</Item>
		</Item>
	);
};

export default Tile;
