import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import AddPet from "../components/AddPetComponent/AddPet";
import EditProfile from "../components/EditProfileComponent/EditProfile";
import { useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router";

export default function Profile() {
  const queryClient = useQueryClient();
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
          
        </Grid>
      </Box>
    </>
  );
}
