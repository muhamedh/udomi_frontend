import {
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Box, Grid, Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";

import { green } from "@mui/material/colors";
import { red } from "@mui/material/colors";

function MyPetCard(props) {
  const { pet, photos } = props;
  return (
    <Grid item xs={12} md={4}>
      <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <Card sx={{ maxWidth: 345 }}>
          <img src={photos[0]} alt="pet to addopt" width="340" height="240" style={{"objectFit": "cover"}}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pet.M.petName.S}
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              {pet.M.shortDescription.S}
            </Typography>
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              Lokacija: {pet.M.location.S}
            </Typography>
            <Box display={"flex"} alignItems={"center"} marginBottom={2}>
              <Typography variant="body2" color="text.secondary">
                Vakcinisan:{" "}
              </Typography>
              {pet.M.vaccinatedStatus.S === "NOT_VACCINATED" ? (
                <CancelIcon style={{ color: red[500] }}></CancelIcon>
              ) : (
                <DoneIcon style={{ color: green[500] }}></DoneIcon>
              )}
            </Box>
            <Box display={"flex"} alignItems={"center"} marginBottom={2}>
              <Typography variant="body2" color="text.secondary">
                Čipovan:{" "}
              </Typography>
              {pet.M.chippedStatus.S === "NOT_CHIPPED" ? (
                <CancelIcon style={{ color: red[500] }}></CancelIcon>
              ) : (
                <DoneIcon style={{ color: green[500] }}></DoneIcon>
              )}
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">Uredi ljubimca</Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
}

export default MyPetCard;
