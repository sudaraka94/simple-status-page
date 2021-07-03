import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Router from "./components/Router"
import AlertContainer from "./containers/AlertContainer";

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Inter var",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color emoji"
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AlertContainer />
      <Router />
    </ThemeProvider>
  );
}

export default App;
