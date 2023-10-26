import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
} from "@mui/material";
import AddPet from "../components/AddPetComponent/AddPet";
import EditProfile from "../components/EditProfileComponent/EditProfile";

export default function Profile() {
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
      <Box>
        <Container sx={{ marginTop: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent={"center"}>
                <Button variant="contained" onClick={openAddPet}>
                  Dodaj ljubimca
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent={"center"}>
                <Button variant="contained" onClick={openEditProfile}>
                  Uredi profil
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <AddPet
                showAddPet={showAddPet}
                editProfileExited={editProfileExited}
                setAddPetExited={setAddPetExited}
              />
              <EditProfile
                showEditProfile={showEditProfile}
                addPetExited={addPetExited}
                setEditProfileExited={setEditProfileExited}
              />
            </Grid>
            <Grid>{/** show my pets grid. */}</Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
