import { useState, type JSX } from "react";
import "./App.css";
import CommanBarChart from "./component/CommanBarChart";
import Home from "./module/Home";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import Navbar from "./component/Navbar";

type ColorScheme = "light" | "dark";

function App(): JSX.Element {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <div style={{ width: "100vw" }}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Navbar
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
            IconSun={<IconSun stroke={1.5} color="black" />}
            IconMoon={<IconMoon stroke={1.5} color="white" />}
          />
          <div className="wrapper">
            <Home />
          </div>
          <div className="wrapper-graph">
            <CommanBarChart currentMode={colorScheme} />
          </div>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
