import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  Grow,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Auth } from "@aws-amplify/auth";
import { useSnackbar } from "notistack";

function AddPet(props) {
  const { showAddPet, editProfileExited, setAddPetExited, openAddPet } = props;
  const [petName, setPetName] = useState("");
  const [petNameError, setPetNameError] = useState(false);
  const [petNameHelperText, setPetNameHelperText] = useState("");

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [locationHelperText, setLocationHelperText] = useState("");

  const [vaccinatedStatus, setVaccinatedStatus] = useState("NOT_VACCINATED");
  const [chippedStatus, setChippedStatus] = useState("NOT_CHIPPED");

  const [shortDescription, setShortDescription] = useState("");
  const [shortDescriptionError, setShortDescriptionError] = useState(false);
  const [shortDescriptionHelperText, setShortDescriptionHelperText] =
    useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const addPetMutation = useMutation({
    mutationFn: async (formData) => {
      // send a POST request to /pets endpoint
      axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
      await axios.post("/pets", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${await Auth.currentSession().then((data) =>
            data.getIdToken().getJwtToken()
          )}`,
        },
      });
    },
    onSuccess: () => {
      openAddPet();
      enqueueSnackbar("Uspešno ste dodali novog ljubimca", {
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
    let shouldSubmit = [];
    if (petName === "") {
      setPetNameError(true);
      setPetNameHelperText("Polje ne može biti prazno");
      shouldSubmit.push(false);
    } else {
      setPetNameError(false);
      setPetNameHelperText("");
      shouldSubmit.push(true);
    }
    if (location === "") {
      setLocationError(true);
      setLocationHelperText("Polje ne može biti prazno");
      shouldSubmit.push(false);
    } else {
      setLocationError(false);
      setLocationHelperText("");
      shouldSubmit.push(true);
    }

    if (shortDescription === "") {
      setShortDescriptionError(true);
      setShortDescriptionHelperText("Polje ne može biti prazno");
      shouldSubmit.push(false);
    } else {
      setShortDescriptionError(false);
      setShortDescriptionHelperText("");
      shouldSubmit.push(true);
    }
    if (shouldSubmit.includes(false)) {
      return;
    }

    addPetMutation.mutate({
      petName: petName,
      location: location,
      vaccinatedStatus: vaccinatedStatus,
      chippedStatus: chippedStatus,
      shortDescription: shortDescription,
    });
  };
  return (
    <Box>
      <Grow
        in={showAddPet && editProfileExited}
        onExited={() => {
          setAddPetExited(true);
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
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="h6">Dodaj novog ljubimca</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Container>
                  <TextField
                    id="petname"
                    label="Ime ljubimca"
                    variant="standard"
                    onChange={(e) => setPetName(e.target.value)}
                    value={petName}
                    error={petNameError}
                    helperText={petNameHelperText}
                  />
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                  <TextField
                    id="location"
                    label="Lokacija"
                    variant="standard"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    error={locationError}
                    helperText={locationHelperText}
                  />
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                  <FormControl>
                    <FormLabel id="vaccinated-status-radio-buttons-group">
                      Da li je ljubimac vakcinisan?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="vaccinated-status-radio-buttons-group"
                      defaultValue="NOT_VACCINATED"
                      name="vaccinated-buttons-group"
                      value={vaccinatedStatus}
                      onChange={(event) => {
                        setVaccinatedStatus(event.target.value);
                      }}
                      row={true}
                    >
                      <FormControlLabel
                        id="vaccinated_status"
                        value="VACCINATED"
                        control={<Radio />}
                        label="Da"
                      />
                      <FormControlLabel
                        value="NOT_VACCINATED"
                        control={<Radio />}
                        label="Ne"
                      />
                    </RadioGroup>
                  </FormControl>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                  <FormControl>
                    <FormLabel id="chipped-status-radio-buttons-group">
                      Da li je ljubimac čipovan?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="chipped-status-radio-buttons-group"
                      defaultValue="NOT_CHIPPED"
                      name="chipped-buttons-group"
                      value={chippedStatus}
                      onChange={(event) => {
                        setChippedStatus(event.target.value);
                      }}
                      row={true}
                    >
                      <FormControlLabel
                        value="CHIPPED"
                        control={<Radio />}
                        label="Da"
                      />
                      <FormControlLabel
                        value="NOT_CHIPPED"
                        control={<Radio />}
                        label="Ne"
                      />
                    </RadioGroup>
                  </FormControl>
                </Container>
              </Grid>
              <Grid item xs={12} md={12}>
                <Container>
                    <TextField
                      id="outlined-multiline-static"
                      label="Kratki opis ljubimca"
                      multiline
                      rows={4}
                      placeholder="Unesite kartki opis o ljubimcu"
                      onChange={(e) => setShortDescription(e.target.value)}
                      value={shortDescription}
                      error={shortDescriptionError}
                      helperText={shortDescriptionHelperText}
                      style={{ width: "100%" }}
                    />
                </Container>
              </Grid>
              {/**
               * Slike 5 svaka ispod 3 MB - jedna slika obavezna
               */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button variant="contained" type="submit" disabled={addPetMutation.isPending ? true : false}>
                    {addPetMutation.isPending
                      ? "Dodavanje u toku..."
                      : "Dodaj ljubimca"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grow>
    </Box>
  );
}

export default AddPet;
