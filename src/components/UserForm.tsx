import Container from "@mui/material/Container";
import { FormControlLabel, Grid, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";
import AvatarEdit from "./Avatar";

const UserForm = ({ updateText, state, includeField, setAvatar }: any) => {
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
							{state.personalDetails.map(
								(
									el: {
										id: number;
										shouldInclude: boolean;
										content: string;
										fieldName: string;
									},
									i: string
								) => (
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
								)
							)}
						</Grid>
						<Grid
							container
							className="include"
							xs={12}
							gap={2}
							justifyContent="center"
							item
						>
							{state.skills.map(
								(
									el: {
										id: number;
										shouldInclude: boolean;
										content: string;
										fieldName: string;
									},
									i: number
								) => (
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
								)
							)}
						</Grid>
					</Grid>
					<Grid container md={4} item height="fit-content">
						<AvatarEdit getAvatar={setAvatar} />
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default UserForm;
