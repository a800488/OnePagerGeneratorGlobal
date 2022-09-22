import Paper from "@mui/material/Paper";
import "../styles/RenderedForm.css";
import removeAccents from "remove-accents";
import { Button, Grid, Stack, Typography, Container } from "@mui/material";
import { ionSave } from "../App";
import Tile from "./Tile";
import jsPDF from "jspdf";
import { font } from "../fonts/roboto";

const generatePDF = () => {
	const domElement = document.getElementById("OnePagerResult")!;
	const pdf = new jsPDF({
		orientation: "landscape",
		unit: "px",
		hotfixes: ["px_scaling"], //check this
		format: "a4",
	});

	pdf.html(domElement, {
		callback: function (pdf) {
			pdf.addFileToVFS("Roboto-Regular-normal.ttf", font);
			pdf.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");
			pdf.setFont("Roboto-Regular");
			pdf.save(`${new Date().toISOString()}.pdf`);
		},
		html2canvas: {
			windowHeight: 210,
			windowWidth: 1200,
			height: 210,
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

const RenderedForm = ({
	name,
	surname,
	why,
	education,
	core,
	relevant,
	role,
	softSkills,
	languages,
	fieldsToInclude,
	croppedArea,
	image,
}: ionSave) => {
	return (
		<Container
			maxWidth="xl"
			sx={{
				maxHeight: 840,
				mb: 4,
			}}
		>
			<Paper
				id={"OnePagerResult"}
				sx={{
					borderRadius: 0,
					backgroundColor: "white",
					color: "black",
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Grid container gap={2} alignItems="center">
					<OutputAvatar croppedArea={croppedArea} image={image} />
					<Grid item xs={4} container direction={"column"}>
						<Typography variant="h2">
							{removeAccents.remove(name)} {removeAccents.remove(surname)}
						</Typography>
						<Typography color="rgb(5, 150, 255)" variant="h4">
							{removeAccents.remove(role)}
						</Typography>
					</Grid>
				</Grid>
				<Grid container gap={2} justifyContent="space-between">
					<Tile
						title={"Why " + removeAccents.remove(name) + "?"}
						display={fieldsToInclude[0]}
						content={removeAccents.remove(why)}
					/>
					<Tile
						title={"Core competencies/Technologies"}
						display={fieldsToInclude[2]}
						content={removeAccents.remove(core)}
					/>
					<Tile
						title={"Education, Trainings/Certification"}
						display={fieldsToInclude[1]}
						content={removeAccents.remove(education)}
					/>
					<Tile
						title={"Relevant project experience"}
						display={fieldsToInclude[3]}
						content={removeAccents.remove(relevant)}
					/>
					<Grid container xs={6}>
						<Tile
							title={"Soft Skills"}
							display={fieldsToInclude[4]}
							content={removeAccents.remove(softSkills)}
						/>
						<Tile
							title={"Languages"}
							display={fieldsToInclude[5]}
							content={removeAccents.remove(languages)}
						/>
					</Grid>
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
