import { SetStateAction, useState } from "react";
import Container from "@mui/material/Container";
import { FormControlLabel, Grid, TextField } from "@mui/material";

import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import AvatarEdit from "./Avatar";
import { ionSave } from "../App";

interface iUserForm {
	onSave: ({
		name,
		surname,
		why,
		education,
		core,
		relevant,
		role,
		fieldsToInclude,
		croppedArea,
		image,
	}: ionSave) => void;
}

const UserForm = ({ updateText, state, includeField }: any) => {
	const [name, setName] = useState<any>("");
	const [surname, setSurname] = useState<any>("");
	const [why, setWhy] = useState<string>("");
	const [education, setEducation] = useState<string>("");
	const [core, setCore] = useState<string>("");
	const [relevant, setRelevant] = useState<string>("");
	const [role, setRole] = useState<string>("");
	const [softSkills, setSoftSkills] = useState<string>("");
	const [languages, setLanguages] = useState<string>("");

	const [includeWhy, setIncludeWhy] = useState<boolean>(true);
	const [includeCore, setIncludeCore] = useState<boolean>(true);
	const [includeEducation, setIncludeEducation] = useState<boolean>(true);
	const [includeRelevant, setIncludeRelevant] = useState<boolean>(true);
	const [includeSoftSkills, setIncludeSoftSkills] = useState<boolean>(true);
	const [includeLanguages, setIncludeLanguages] = useState<boolean>(true);

	const [croppedArea, setcroppedArea] = useState<any>();
	const [image, setImage] = useState<string>("");

	const getAvatar = (croppedArea: any, image: string) => {
		setcroppedArea(croppedArea);
		setImage(image);
	};

	return (
		<Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
			<Grid
				container
				spacing={1}
				sx={{
					mb: 2,
					mt: 2,
				}}
				gap={2}
			>
				<Grid container spacing={2} gap={2} justifyContent="center">
					<Grid container md={7} item>
						<Grid item xs={12} sx={{ mb: 0, mt: 0 }}>
							{state.personalDetails.map((el: any, i: string) => (
								<TextField
									fullWidth
									margin="normal"
									value={el.content}
									key={el.id}
									label={el.fieldName}
									variant="outlined"
									onChange={(e) =>
										updateText(e.target.value, el.id, "personalDetails")
									}
								/>
							))}
						</Grid>
						<Grid
							container
							className="include"
							xs={12}
							gap={2}
							justifyContent="center"
							item
						>
							{state.skills.map((el: any, i: number) => (
								<Grid item xs={12} sm={5} key={i}>
									<FormControlLabel
										control={
											<Switch
												onChange={(e) =>
													includeField(e.currentTarget, el.id, "skills")
												}
												checked={el.shouldInclude}
											/>
										}
										label="Include in PDF"
									/>
									<TextField
										fullWidth
										value={el.content}
										label={el.fieldName}
										multiline
										maxRows={5}
										helperText={el.fieldName}
										onChange={(e) =>
											updateText(e.target.value, el.id, "skills")
										}
									/>
								</Grid>
							))}
						</Grid>
					</Grid>
					<Grid container md={4} item>
						<AvatarEdit getAvatar={getAvatar} />
					</Grid>
				</Grid>
			</Grid>
			<Grid position={"relative"} item xs={12}>
				<Button
					fullWidth
					variant="contained"
					// onClick={() =>
					// 	onSave({
					// 		name,
					// 		surname,
					// 		why,
					// 		education,
					// 		core,
					// 		relevant,
					// 		role,
					// 		softSkills,
					// 		languages,
					// 		fieldsToInclude: [
					// 			includeWhy,
					// 			includeCore,
					// 			includeEducation,
					// 			includeRelevant,
					// 			includeSoftSkills,
					// 			includeLanguages,
					// 		],
					// 		croppedArea,
					// 		image,
					// 	})
					// }
				>
					Display preview
				</Button>
			</Grid>
		</Container>
	);
};

export default UserForm;
