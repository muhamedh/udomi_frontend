import { useState, useRef } from "react";
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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Auth } from "@aws-amplify/auth";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";

import ViewPhotos from "../ViewPhotosComponent/ViewPhotos";

import { fetchLocations } from "../../helpers/fetchLocations";

function AddPet(props) {
  const { showAddPet, editProfileExited, setAddPetExited, openAddPet, client } =
    props;
  const [petName, setPetName] = useState("");
  const [petNameError, setPetNameError] = useState(false);
  const [petNameHelperText, setPetNameHelperText] = useState("");

  const [location, setLocation] = useState("Ostalo");

  const [vaccinatedStatus, setVaccinatedStatus] = useState("NOT_VACCINATED");
  const [chippedStatus, setChippedStatus] = useState("NOT_CHIPPED");

  const [shortDescription, setShortDescription] = useState("");
  const [shortDescriptionError, setShortDescriptionError] = useState(false);
  const [shortDescriptionHelperText, setShortDescriptionHelperText] =
    useState("");

  const [petFiles, setPetFiles] = useState([]);
  const [petFilesError, setPetFilesError] = useState(false);
  const [petFilesHelperText, setPetFilesHelperText] = useState("");

  const hiddenFilesUpload = useRef(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { data, status } = useQuery({
    queryKey: ["addPetLocations"],
    queryFn: fetchLocations,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: 2,
  });

  const addPetMutation = useMutation({
    mutationFn: async (formData) => {
      // send a POST request to /pets endpoint
      axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
      //console.log(formData);
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
      openAddPet();
      const emptyArray = [];
      setPetFiles(emptyArray);
      client.invalidateQueries({ queryKey: ["myPetsKey"] });
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
    }

    if (shortDescription === "") {
      setShortDescriptionError(true);
      setShortDescriptionHelperText("Polje ne može biti prazno");
      shouldSubmit.push(false);
    } else {
      setShortDescriptionError(false);
      setShortDescriptionHelperText("");
    }

    if (petFiles.length === 0) {
      setPetFilesError(true);
      setPetFilesHelperText("Morate dodati bar jednu sliku");
      shouldSubmit.push(false);
    } else {
      setPetFilesError(false);
      setPetFilesHelperText("");
    }

    if (petFiles.length > 5) {
      setPetFilesError(true);
      setPetFilesHelperText("Maksimalan broj slika je 5");
      shouldSubmit.push(false);
    }
    for (let i = 0; i < petFiles.length; i++) {
      if (petFiles[i].size > 3000000) {
        setPetFilesError(true);
        setPetFilesHelperText("Maksimalna veličina slike je 3 MB");
        shouldSubmit.push(false);
        break;
      }
    }

    if (shouldSubmit.includes(false)) {
      return;
    }

    addPetMutation.mutate({
      data: JSON.stringify({
        petName: petName,
        location: location,
        vaccinatedStatus: vaccinatedStatus,
        chippedStatus: chippedStatus,
        shortDescription: shortDescription,
      }),
      images: [...petFiles],
    });
  };
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="lokacija-input-label">Lokacija</InputLabel>
                  <Select
                    labelId="lokacija-input-label"
                    id="lokacija-select"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                    autoWidth
                    label="Lokacija"
                  >
                    {data ? (
                      data.map((location) => {
                        return (
                          <MenuItem key = {location[1]} value={location[1]}>{location[1]}</MenuItem>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Select>
                </FormControl>
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
                    onClick={() => openAddPet()}
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
}

export default AddPet;
