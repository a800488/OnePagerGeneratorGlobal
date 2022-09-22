import Paper from "@mui/material/Paper";
import "../styles/RenderedForm.css";
import removeAccents from "remove-accents";
import { Button, ButtonBase, Grid, Stack, Typography } from "@mui/material";
import { ionSave } from "../App";
import Tile from "./Tile";
import jsPDF from "jspdf";
import { font } from "../fonts/roboto";

const generatePDF = () => {
	const domElement = document.getElementById("OnePagerResult")!;
	const pdf = new jsPDF({
		orientation: "landscape",
		userUnit: 300,
		hotfixes: ["px_scaling"], //check this
		format: "a4",
	});

	pdf.html(domElement, {
		callback: function (pdf) {
			pdf.addFileToVFS("Roboto-Regular-normal.ttf", font);
			pdf.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");
			pdf.setFont("Roboto-Regular");
			console.log(pdf.getFont());
			pdf.save(`${new Date().toISOString()}.pdf`);
		},
		html2canvas: {
			//check this
			windowHeight: 210,
			windowWidth: 297,
			height: 210,
			width: 297,
			scale: 0.25,
		},
		autoPaging: false,
		width: 297,
		windowWidth: 297,
		x: 0,
		y: 0,
	});
};

const Output = ({ croppedArea, image }: any) => {
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
			className="output"
			style={{
				paddingBottom: "100%",
				borderRadius: "50%",
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
		<Grid container item xs={8}>
			<Paper
				id={"OnePagerResult"}
				sx={{
					p: 2,
					borderRadius: 0,
					border: 0,
					margin: "auto",
					maxWidth: 1188,
					minWidth: 1188,
					maxHeight: 840,
					minHeight: 840,
					flexGrow: 1,
					backgroundColor: (theme) => "rgb(0,0,0)",
					color: "white",
				}}
			>
				<Grid spacing={2} rowSpacing={2} container>
					<Grid item xs={2}>
						<ButtonBase sx={{ width: 150, height: 150 }}>
							{
								<Output
									croppedArea={croppedArea}
									image={image}
									cropShape="round"
								/>
							}
						</ButtonBase>
					</Grid>
					<Grid item xs={4} container direction={"column"}>
						<Typography variant="h4">{removeAccents.remove(name)}</Typography>
						<Typography variant="h4">
							{removeAccents.remove(surname)}
						</Typography>
						<Typography color="rgb(5, 150, 255)" variant="h5">
							{removeAccents.remove(role)}
						</Typography>
					</Grid>
					<Grid item xs={2} className="display-linebreak">
						<Tile
							title={"Soft Skills"}
							display={fieldsToInclude[4]}
							content={removeAccents.remove(softSkills)}
						></Tile>
					</Grid>
					<Grid item xs={2} className="display-linebreak">
						<Tile
							title={"Languages"}
							display={fieldsToInclude[5]}
							content={removeAccents.remove(languages)}
						></Tile>
					</Grid>

					<Grid item xs={6} zeroMinWidth className="display-linebreak">
						<Stack spacing={2}>
							<Tile
								title={"Why " + removeAccents.remove(name) + "?"}
								display={fieldsToInclude[0]}
								content={removeAccents.remove(why)}
							></Tile>

							<Tile
								title={"Education, Trainings/Certification"}
								display={fieldsToInclude[1]}
								content={removeAccents.remove(education)}
							></Tile>
						</Stack>
					</Grid>
					<Grid item xs={6} className="display-linebreak">
						<Stack spacing={2}>
							<Tile
								title={"Core competencies/Technologies"}
								display={fieldsToInclude[2]}
								content={removeAccents.remove(core)}
							></Tile>
							<Tile
								title={"Relevant project experience"}
								display={fieldsToInclude[3]}
								content={removeAccents.remove(relevant)}
							></Tile>
						</Stack>
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
		</Grid>
	);
};

export default RenderedForm;
