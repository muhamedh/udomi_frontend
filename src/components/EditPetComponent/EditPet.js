import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Auth from "@aws-amplify/auth";
import { useSnackbar } from "notistack";

import {
  Container,
  FormControlLabel,
  Radio,
  Grid,
  TextField,
  Button,
  Box,
  Grow,
  Typography,
  FormControl,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import ViewPhotos from "../ViewPhotosComponent/ViewPhotos";

import { useLocation } from "react-router";
export const EditPet = () => {
  const { state } = useLocation();
  const hiddenFilesUpload = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [petName, setPetName] = useState(state.pet.M.petName.S);
  const [petNameError, setPetNameError] = useState(false);
  const [petNameHelperText, setPetNameHelperText] = useState("");

  const [location, setLocation] = useState(state.pet.M.location.S);
  const [locationError, setLocationError] = useState(false);
  const [locationHelperText, setLocationHelperText] = useState("");

  const [vaccinatedStatus, setVaccinatedStatus] = useState(state.pet.M.vaccinatedStatus.S);
  const [chippedStatus, setChippedStatus] = useState(state.pet.M.chippedStatus.S);

  const [shortDescription, setShortDescription] = useState(state.pet.M.shortDescription.S);
  const [shortDescriptionError, setShortDescriptionError] = useState(false);
  const [shortDescriptionHelperText, setShortDescriptionHelperText] =
    useState("");

  const [petFiles, setPetFiles] = useState([...state.photos]);
  const [petFilesError, setPetFilesError] = useState(false);
  const [petFilesHelperText, setPetFilesHelperText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  const addPetMutation = useMutation({
    mutationFn: async (formData) => {
      // send a POST request to /pets endpoint
      axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
      console.log(formData);
      const response = await axios.post("/pets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${await Auth.currentSession().then((data) =>
            data.getIdToken().getJwtToken()
          )}`,
        },
      });
    },
    onSuccess: () => {
      const emptyArray = [];
      setPetFiles(emptyArray);
      //client.invalidateQueries({ queryKey: ["myPetsKey"]})
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
  const handleFilesUpload = (event) => {
    const emptyArray = [];
    setPetFiles(emptyArray);
    if (event.target.files.length > 5) {
      setPetFilesError(true);
      setPetFilesHelperText("Maksimalan broj slika je 5");
      return;
    }
    setPetFiles(Array.from(event.target.files));
  };
  return (
    <Box>
      <Grow in={true} unmountOnExit>
        <Container
          maxWidth="sm"
          sx={{ boxShadow: 2, marginTop: 2, paddingBottom: 5 }}
        >
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="h6">Uredi ljubimca</Typography>
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
              <Grid item xs={12} md={12}>
                {/**
                 * Slike 5 svaka ispod 3 MB - jedna slika obavezna
                 */}
                <Container>
                  <Button
                    color={petFilesError ? "error" : "primary"}
                    variant={petFilesError ? "contained" : "outlined"}
                    onClick={(e) => {
                      hiddenFilesUpload.current.click();
                    }}
                  >
                    {petFilesError ? petFilesHelperText : "Dodaj slike"}
                  </Button>
                  <input
                    type="file"
                    id="pet-image"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={handleFilesUpload}
                    ref={hiddenFilesUpload}
                    style={{ display: "none" }}
                  />
                </Container>
                <ViewPhotos petFiles={petFiles} />
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={addPetMutation.isPending ? true : false}
                  >
                    {addPetMutation.isPending
                      ? "Dodavanje u toku..."
                      : "Dodaj ljubimca"}
                  </Button>
                  <Button
                    variant="contained"
                    disabled={addPetMutation.isPending ? true : false}
                    color="error"
                    onClick={() => {}}
                  >
                    Odustani
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grow>
    </Box>
  );
};
