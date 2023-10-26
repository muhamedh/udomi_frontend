import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  Grow,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

function EditProfile(props) {
  const { showEditProfile, addPetExited, setEditProfileExited } = props;
  const [petName, setPetName] = useState("");
  const [petNameError, setPetNameError] = useState(false);
  const [petNameHelperText, setPetNameHelperText] = useState("");

  const editPetMutation = useMutation({
    mutationFn: (formData) => console.log("mutation"),
    onSuccess: () => {},
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Box>
      <Grow
        in={showEditProfile && addPetExited}
        onExited={() => {
          setEditProfileExited(true);
        }}
        unmountOnExit
      >
        <Container
          maxWidth="sm"
          sx={{ boxShadow: 2, marginTop: 5, paddingBottom: 5 }}
        >
          <form autoComplete="off" onSubmit={() => {}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="h6">Uredi svoj profil</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <TextField
                    id="petname"
                    label="Ime ljubimca"
                    variant="standard"
                    onChange={(e) => {}}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button variant="contained" type="submit"></Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grow>
    </Box>
  );
}

export default EditProfile;
