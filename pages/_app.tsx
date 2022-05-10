import "../styles/styles.scss";
import type { AppProps } from "next/app";

// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../themes";

// Redux
import { Provider } from "react-redux";
import { store } from "../store";

// System Notification
import { Notifications } from "../components/ui/notification";

// Animation
import "animate.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <CssBaseline />
        <Notifications />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
