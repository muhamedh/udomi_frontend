import { createTheme } from "@mui/material";

export const orangeTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ff9800',
      },
      secondary: {
        main: '#f50057',
      },
      text: {
        primary: '#000000',
        secondary: '#000000',
        disabled: 'rgba(0,0,0,0.88)',
      },
    },
});