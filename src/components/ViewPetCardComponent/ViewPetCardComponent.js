import { Card, CardContent, Typography, CardActions } from "@mui/material";
import { Box, Grid, Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";

import { green } from "@mui/material/colors";
import { red } from "@mui/material/colors";

function ViewPetCard(props) {
  const { pet } = props;
  return (
    <Grid item xs={12} md={4}>
      <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <Card sx={{ maxWidth: 345 }}>
          <img
            src={pet.photos[0]}
            alt="pet to addopt"
            width="340"
            height="240"
            style={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pet.data.petName}
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              {pet.data.shortDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              Lokacija: {pet.location}
            </Typography>
            <Box display={"flex"} alignItems={"center"} marginBottom={2}>
              <Typography variant="body2" color="text.secondary">
                Vakcinisan:{" "}
              </Typography>
              {pet.vaccinatedStatus === "NOT_VACCINATED" ? (
                <CancelIcon style={{ color: red[500] }}></CancelIcon>
              ) : (
                <DoneIcon style={{ color: green[500] }}></DoneIcon>
              )}
            </Box>
            <Box display={"flex"} alignItems={"center"} marginBottom={2}>
              <Typography variant="body2" color="text.secondary">
                Čipovan:{" "}
              </Typography>
              {pet.chippedStatus === "NOT_CHIPPED" ? (
                <CancelIcon style={{ color: red[500] }}></CancelIcon>
              ) : (
                <DoneIcon style={{ color: green[500] }}></DoneIcon>
              )}
            </Box>
          </CardContent>
          <CardActions>
            <Button
              onClick={()=>{
                // navigate("/profile/pet/edit", {
                //   state: { pet: pet, photos: photos, pet_id: pet_id, location: location },
                console.log('Udomi me');
                console.log(pet.id);
                }}
            >Udomi me!</Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
}

export default ViewPetCard;
