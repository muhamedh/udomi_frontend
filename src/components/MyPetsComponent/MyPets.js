import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Auth } from "@aws-amplify/auth";
import axios from "axios";

import MyPetCard from "../MyPetComponent/MyPetComponent";

const fetchMyPets = async () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
  //console.log("Fetched my pets");
  const { data } = await axios.get("/pets/my", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${await Auth.currentSession().then((data) =>
        data.getIdToken().getJwtToken()
      )}`,
    },
  });
  return data;
};

export const MyPets = () => {
  const queryClient = useQueryClient();
  const { data, status, refetch } = useQuery({
    queryKey: ["myPetsKey"],
    queryFn: fetchMyPets,
    refetchOnWindowFocus: false,
    cacheTime: 150000,
    staleTime: Infinity,
    retry: 2,
  });
  return (
    <Grid container marginBottom={4} spacing={4} justifyContent={"center"}>
      {status === "pending" ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : (
        <></>
      )}
      {status === "success" && data.length === 0 ? (
        <Box display="flex" justifyContent={"center"}>
          <Typography variant="h6">
            Niste dodali nijednog ljubimca za udomljavanje
          </Typography>
        </Box>
      ) : (
        <></>
      )}

      {data ? (
        data.map((pet) => {
          return (
            <MyPetCard
              key={pet.pet_id.S}
              pet={pet.data}
              photos={pet.photos}
              pet_id={pet.pet_id.S}
              location={pet.location.S}
            />
          );
        })
      ) : (
        <></>
      )}
    </Grid>
  );
};
