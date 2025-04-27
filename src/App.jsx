import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Base from "./components/base";
import { ResponseContext } from "./contexts/responseContext";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment"; // Import core
import "moment/dist/locale/ar"; // Import Arabic locale
import { Language } from "./contexts/langContext";

function App() {
  // Use States
  const [responseData, setResponseData] = useState({
    degree: null,
    min: null,
    max: null,
    icon: null,
    desc: null,
  });

  const [timeAndDate, setTimeAndDate] = useState("");
  const [currLang, setCurrLang] = useState("en");

  // == Use States ==

  // Local Date & Time 
  moment.locale(currLang); // set to arabic
  moment.locale(); // returns 'ar'
  console.log(moment.locale()); // Should now show "ar"
  // Local Date & Time

  // console.log(responseData); // Debug

  // Use Effect
  useEffect(() => {
    const source = axios.CancelToken.source(); // Create cancel token

    // Connect
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=dbd3c0322aba726f9fb3b082ebfeac12",
          {
            cancelToken: source.token, // Use cancel token in request
          }
        );
        // console.log(response.data);
        let DataObj = {
          degree: Math.round(response.data.main.temp - 272.15),
          min: Math.round(response.data.main.temp_min - 272.15),
          max: Math.round(response.data.main.temp_max - 272.15),
          icon: response.data.weather[0].icon,
          desc: response.data.weather[0].description,
        };
        setResponseData(DataObj);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    return () => {
      source.cancel("Component unmounted, request canceled.");
    };
  }, []);

  useEffect(() => {
    console.log(moment().format("MMMM Do YYYY, h:mm:ss a")); // Debug
    setTimeAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, [currLang]);
  // == Use Effect ==

  // Theme
  const theme = createTheme({
    typography: {
      fontFamily: ["Cairo"],
    },
  });
  // == Theme ==

  return (
    <>
      <ThemeProvider theme={theme}>
        <ResponseContext.Provider value={{ responseData, timeAndDate }}>
          <Language.Provider value={{ currLang, setCurrLang }}>
            <Base />
          </Language.Provider>
        </ResponseContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
