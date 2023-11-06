import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { orangeTheme } from "../../themes";
function ViewPhotos(props) {
  const { petFiles } = props;
  return petFiles?.length > 0 ? (
    (console.log(petFiles),
    (
      <Carousel
      navButtonsProps={{
        style: {
          backgroundColor: "transparent",
          borderRadius: 0,
        }
      }}
        NextIcon={<ArrowForward style={{ color : orangeTheme.palette.primary.main }} />}
        PrevIcon={<ArrowBack style={{ color : orangeTheme.palette.primary.main }} />}
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
              src={typeof file === "string" ? file : null}
              image={typeof file !== "string" ? URL.createObjectURL(file) : null}
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
