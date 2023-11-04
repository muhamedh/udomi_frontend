import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Auth } from "@aws-amplify/auth";
import { Box, Grid, Button, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

import AddPet from "../components/AddPetComponent/AddPet";
import EditProfile from "../components/EditProfileComponent/EditProfile";

import MyPetCard from "../components/MyPetComponent/MyPetComponent";

export default function Profile() {
  const [showAddPet, setShowAddPet] = useState(false);
  const [addPetExited, setAddPetExited] = useState(true);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editProfileExited, setEditProfileExited] = useState(true);

  const [myPets, setMyPets] = useState([]); // [ { pet1 }, { pet2 }, { pet3 }
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

  const getMyPetsMutation = useMutation({
    mutationFn: async () => {
      // send a POST request to /pets endpoint
      axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
      const response = await axios.get("/pets/my", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${await Auth.currentSession().then((data) =>
            data.getIdToken().getJwtToken()
          )}`,
        },
      });
      setMyPets(response.data);
    },
    onSuccess: () => {
      console.log("Vasi ljubimci");
    },
    onError: () => {},
  });

  useEffect(() => {
    getMyPetsMutation.mutate();
  }, []);
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
            />
            <EditProfile
              showEditProfile={showEditProfile}
              addPetExited={addPetExited}
              setEditProfileExited={setEditProfileExited}
              openEditProfile={openEditProfile}
            />
          </Grid>
          <Grid container marginBottom={4} justifyContent={"center"}>
            { getMyPetsMutation.isPending || getMyPetsMutation.isLoading ? (
                <Grid item>
                    <CircularProgress />
                </Grid>
            ) : (
              <></>
            )}
            {
              getMyPetsMutation.isSuccess && myPets.length === 0 ? (
                <Box display="flex" justifyContent={"center"}>
                  <Typography variant="h6">
                    Niste dodali nijednog ljubimca za udomljavanje
                  </Typography>
                </Box>
              ) : (
                myPets.map((pet) => {
                  return <MyPetCard key={pet.pet_id.S} pet={pet.data} />;
                })
              )
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
