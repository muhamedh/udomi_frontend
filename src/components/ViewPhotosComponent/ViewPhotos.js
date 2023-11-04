import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@mui/material";

function ViewPhotos(props) {
  const { petFiles } = props;
  return petFiles?.length > 0 ? (
    (console.log(petFiles),
    (
      <Carousel
        autoPlay={false}
        animation="fade"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        swipe={true}
      >
        {petFiles.map((file) => {
          return (
            <CardMedia
              key={file.name}
              maxwidth="280"
              height="250"
              component="img"
              sx={{
                padding: "1em 1em 0 1em",
                objectFit: "contain",
              }}
              image={URL.createObjectURL(file)}
            ></CardMedia>
          );
        })}
      </Carousel>
    ))
  ) : (
    <></>
  );
}

export default ViewPhotos;