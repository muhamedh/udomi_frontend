
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

  function AddPet(props) {
    const { showAddPet, editProfileExited, setAddPetExited } = props;
    const [petName, setPetName] = useState("");
    const [petNameError, setPetNameError] = useState(false);
    const [petNameHelperText, setPetNameHelperText] = useState("");
  
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState(false);
    const [locationHelperText, setLocationHelperText] = useState("");

    const editPetMutation = useMutation({
      mutationFn: (formData) => console.log("mutation"),
      onSuccess: () => {},
    });
    const handleSubmit = (event) => {
        event.preventDefault();
      };
    return (
        <Box>
        <Grow in={showAddPet && editProfileExited} onExited={() => {setAddPetExited(true)}} unmountOnExit>
          <Container
            maxWidth="sm"
            sx={{ boxShadow: 2, marginTop: 5, paddingBottom: 5 }}
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6">
                      Dodaj novog ljubimca
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <TextField
                      id="petname"
                      label="Ime ljubimca"
                      variant="standard"
                      onChange={(e) => setPetName(e.target.value)}
                      value={petName}
                      error={petNameError}
                      helperText={petNameHelperText}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <TextField
                      id="location"
                      label="Lokacija"
                      variant="standard"
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                      error={locationError}
                      helperText={locationHelperText}
                    />
                  </Box>
                </Grid>
                {/**
                 * Vaccinated Yes/No - nije obavezno
                 * Cipovan Yes/No - nije obavezno
                 * Starost - nije obavezno
                 * Kratki opis - obavezno
                 * Duzi opis - nije obavezno
                 * Slike 5 svaka ispod 3 MB - jedna slika obavezna
                 */}
                {editPetMutation.isError && (
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography
                        paragraph={true}
                        color="error"
                        fontWeight={"bold"}
                        textAlign={"center"}
                      >
                        {editPetMutation.error.message}
                      </Typography>
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button variant="contained" type="submit">
                      {editPetMutation.isPending
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
  