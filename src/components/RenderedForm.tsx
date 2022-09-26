import Paper from "@mui/material/Paper";
import "../styles/RenderedForm.css";
import removeAccents from "remove-accents";
import { Button, Grid, Typography, Container } from "@mui/material";
import Tile from "./Tile";
import jsPDF from "jspdf";

const generatePDF = () => {
	const domElement = document.getElementById("OnePagerResult")!;
	const pdf = new jsPDF({
		orientation: "landscape",
		hotfixes: ["px_scaling"],
		format: "a4",
	});

	pdf.html(domElement, {
		callback: function (pdf) {
			pdf.setFont("Roboto-Regular");
			pdf.save(`${new Date().toISOString()}.pdf`);
		},
		html2canvas: {
			windowHeight: 800,
			windowWidth: 1200,
			height: 800,
			width: 1200,
			scale: 0.25,
		},
		autoPaging: false,
		width: 1200,
		windowWidth: 1200,
		x: 0,
		y: 0,
	});
};

const OutputAvatar = ({ croppedArea, image }: any) => {
	const scale = 100 / croppedArea.width;
	const transform = {
		x: `${-croppedArea.x * scale}%`,
		y: `${-croppedArea.y * scale}%`,
		scale,
		width: "calc(100% + 0.5px)",
		height: "auto",
	};

	const imageStyle = {
		transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
		width: transform.width,
		height: transform.height,
		borderRadius: "50%",
	};

	return (
		<div
			className="output avatar-image"
			style={{
				borderRadius: "50%",
				width: "150px",
				height: "150px",
			}}
		>
			<img src={image} alt="" style={imageStyle} />
		</div>
	);
};

const RenderedForm = ({ state, croppedArea, image }: any) => {
	let name = state.personalDetails.find(
		(obj: { id: number }) => obj.id === 1
	).content;
	let surname = state.personalDetails.find(
		(obj: { id: number }) => obj.id === 2
	).content;
	let role = state.personalDetails.find(
		(obj: { id: number }) => obj.id === 3
	).content;

	return (
		<Container
			maxWidth="xl"
			sx={{
				height: "100%",
				maxHeight: 840,
				mb: 4,
			}}
		>
			<Paper
				id={"OnePagerResult"}
				sx={{
					borderRadius: 0,
					border: 1,
					borderColor: "lightgray",
					backgroundColor: "white",
					boxShadow: "none",
					color: "black",
					height: "800px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: 2,
					maxWidth: "xl",
					width: "100%",
				}}
			>
				<Grid
					container
					gap={2}
					alignItems="center"
					padding={2}
					sx={{ borderBottom: 4, borderBottomColor: "#1565C0" }}
				>
					<OutputAvatar croppedArea={croppedArea} image={image} />
					<Grid item xs={10} container direction={"column"}>
						<Typography variant="h2">
							{removeAccents.remove(name) + " " + removeAccents.remove(surname)}
						</Typography>
						<Typography color="rgb(5, 150, 255)" variant="h4">
							{removeAccents.remove(role)}
						</Typography>
					</Grid>
				</Grid>
				<Grid
					container
					gap={2}
					padding={2}
					sx={{
						fontSize: 12,
						flexGrow: 1,
						marginBottom: 1,
						marginTop: 1,
						maxHeight: 530,
						overflow: "hidden",
					}}
				>
					{state.skills.map((el: any, i: number) => (
						<Tile
							title={el.fieldName}
							display={el.shouldInclude}
							content={removeAccents.remove(el.content)}
							key={i}
						/>
					))}
				</Grid>
				<Grid
					padding={2}
					sx={{
						borderTop: 4,
						borderTopColor: "#1565C0",
					}}
				>
					<Typography
						sx={{
							fontSize: 12,
						}}
					>
						Atos helps you realize your future-proof efficiency, agility and
						improved topline. Our key to success is coupling the right strategy,
						process design and innovation with IT. We are motivated to work with
						you and your staff to achieve this challenge. Our clients view us as
						leaders in commitment to implementation.
					</Typography>
				</Grid>
			</Paper>

			<Button
				fullWidth
				variant="contained"
				onClick={() => generatePDF()}
				sx={{ mt: 4 }}
			>
				DOWNLOAD PDF
			</Button>
		</Container>
	);
};

export default RenderedForm;
