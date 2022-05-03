import "../styles/styles.scss";
import type { AppProps } from "next/app";

// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../themes";

// Redux
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme} >
      <Provider store={store}>
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
