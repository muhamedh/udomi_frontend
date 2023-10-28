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
import axios from "axios";
import { Auth } from "@aws-amplify/auth";
import { useSnackbar } from "notistack";

function EditProfile(props) {
  const { showEditProfile, addPetExited, setEditProfileExited, openEditProfile } = props;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberHelperText, setPhoneNumberHelperText] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const editProfileMutation = useMutation({
    mutationFn: async (formData) => {
      // send a POST request to /users endpoint
      axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
      await axios.post("/users", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${await Auth.currentSession().then((data) =>
            data.getIdToken().getJwtToken()
          )}`,
        },
      });
    },
    onSuccess: () => {
      openEditProfile();
      enqueueSnackbar("Uspješno ste uredili profil.", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Došlo je do greške.", {
        variant: "error",
      });
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (phoneNumber === "") {
      setPhoneNumberError(true);
      setPhoneNumberHelperText("Broj telefona ne može biti prazan.");
    } else {
      setPhoneNumberError(false);
      setPhoneNumberHelperText("");
      editProfileMutation.mutate({
        phoneNumber,
      });
    }
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
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Container>
                  <Typography variant="h6">Uredi svoj profil</Typography>
                </Container>
              </Grid>

              <Grid item xs={12} md={6}>
                <Container>
                  <TextField
                    id="phoneNumber"
                    label="Broj telefona"
                    variant="standard"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    value={phoneNumber}
                    error={phoneNumberError}
                    helperText={phoneNumberHelperText}
                  />
                </Container>
              </Grid>
              <Grid item xs={12}>
                <Container>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={editProfileMutation.isPending ? true : false}
                  >
                    {editProfileMutation.isPending
                      ? "Spašavanje u toku"
                      : "Spasite broj telefona."}
                  </Button>
                </Container>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grow>
    </Box>
  );
}

export default EditProfile;
