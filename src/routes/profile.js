import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Auth } from "@aws-amplify/auth";
import { Box, Grid, Button, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import AddPet from "../components/AddPetComponent/AddPet";
import EditProfile from "../components/EditProfileComponent/EditProfile";
import { useQueryClient } from "@tanstack/react-query";
import MyPetCard from "../components/MyPetComponent/MyPetComponent";

const fetchMyPets = async () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
  console.log("Fetched my pets");
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

export default function Profile() {
  const queryClient = useQueryClient();
  const { data, status, refetch } = useQuery({
    queryKey: ["myPetsKey"],
    queryFn: fetchMyPets,
    refetchOnWindowFocus: false,
    cacheTime: 150000,
    staleTime: Infinity,
    retry: 2,
  });
  const [showAddPet, setShowAddPet] = useState(false);
  const [addPetExited, setAddPetExited] = useState(true);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editProfileExited, setEditProfileExited] = useState(true);

  const openAddPet = () => {
    setShowAddPet(!showAddPet);
    setAddPetExited(!addPetExited);
    setShowEditProfile(false);
  };
  const openEditProfile = () => {
    setShowEditProfile(!showEditProfile);
    setEditProfileExited(!editProfileExited);
    setShowAddPet(false);
  };

  return (
    <>
      <Box marginTop={5}>
        <Grid container>
          <Grid item xs={12} sm={6} marginTop={2}>
            <Box display="flex" justifyContent={"center"}>
              <Button variant="contained" onClick={openAddPet}>
                Dodaj ljubimca
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2}>
            <Box display="flex" justifyContent={"center"}>
              <Button variant="contained" onClick={openEditProfile}>
                Uredi profil
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} marginBottom={5}>
            <AddPet
              showAddPet={showAddPet}
              editProfileExited={editProfileExited}
              setAddPetExited={setAddPetExited}
              openAddPet={openAddPet}
              client={queryClient}
            />
            <EditProfile
              showEditProfile={showEditProfile}
              addPetExited={addPetExited}
              setEditProfileExited={setEditProfileExited}
              openEditProfile={openEditProfile}
            />
          </Grid>
          <Grid
            container
            marginBottom={4}
            spacing={4}
            justifyContent={"center"}
          >
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
                  />
                );
              })
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
