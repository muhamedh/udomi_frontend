import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Container, LinearProgress, Grid, Box } from "@mui/material";
import MyPetCard from "../components/MyPetComponent/MyPetComponent";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import ViewPetCard from "../components/ViewPetCardComponent/ViewPetCardComponent";
export default function HomePage() {
  async function fetchMorePets() {
    console.log("fetching more pets");
    axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
    const constructParams = {
      ...(keyId && { key_id: keyId }),
      ...(keyPetId && { key_pet_id: keyPetId }),
      limit: 10,
    };

    // console.log('FETCH START')
    // console.log(pets.length)
    // console.log(constructParams);
    // console.log("key_id", keyId);
    // console.log("key_pet_id", keyPetId);

    const { data } = await axios.get("/pets-public", {
      headers: {
        "Content-Type": "application/json",
      },
      params: constructParams,
    });
    // console.log(data);
    // console.log('FETCH END')
    setPets([...pets, ...data.pets]);
    setKeyId(data.key?.id.S);
    setKeyPetId(data.key?.pet_id.S);

    // console.log('FETCH START')
    // console.log(data)
    // console.log("key_id", keyId);
    // console.log("key_pet_id", keyPetId);
    // console.log('FETCH END')
    console.log(data);
    if (!data.key) {
      setHasMorePets(false);
      return data;
    }

    return data;
  }

  const [pets, setPets] = useState([]);
  const [hasMorePets, setHasMorePets] = useState(true);
  const [keyId, setKeyId] = useState(undefined);
  const [keyPetId, setKeyPetId] = useState(undefined);

  return (
    <Container>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMorePets}
        hasMore={hasMorePets}
        loader={
          <Box marginBottom={4}>
            <Container>
              <LinearProgress />
            </Container>
          </Box>
        }
      >
        <Grid
          container
          marginTop={4}
          marginBottom={4}
          spacing={4}
          justifyContent={"center"}
          key="all-pets-grid"
        >
          {pets ? (
            pets.map((pet, index) => <ViewPetCard key={pet.pet_id} pet={pet}></ViewPetCard>)
          ) : (
            <></>
          )}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
