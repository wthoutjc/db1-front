import { createTheme } from "@mui/material";
import {} from "@mui/material/colors";

// Colors

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
    },
    primary: {
      main: "#dfe6e9",
    },
    secondary: {
      main: "#000",
    },
  },
});

export { darkTheme };
