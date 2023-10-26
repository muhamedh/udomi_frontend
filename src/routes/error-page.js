import { Stack, Typography, Box, Button } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  
  const errorMessages = {
    title: "Oops | 404",
    message: "Izvinjavamo se na greški.",
    action: "Vratite se na početnu stranicu."
  }
  console.error(error);

  return ( 
    <Stack direction="row" justifyContent="center" alignItems="center" 
    sx={{width:1, height: `calc(100vh - 56px)`}}>
        <Box>
        <Typography variant="h3" textAlign={"left"}>
            {errorMessages.title}
        </Typography>
        <Typography variant="h4" textAlign={"left"}>
            {errorMessages.message}
        </Typography>
        <Typography variant="h6" textAlign={"left"}>
        <Link to="/">
            <Button variant="text" sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>{errorMessages.action}</Button>
        </Link>
        </Typography>
        </Box>
    </Stack>
  );
}