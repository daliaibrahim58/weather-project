import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import { ResponseContext } from "../contexts/responseContext";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { Language } from "../contexts/langContext";

function Base() {
  // Use Context
  const { responseData, timeAndDate } = useContext(ResponseContext);
  const { currLang, setCurrLang } = useContext(Language);
  // == Use Context ==

  // Vars
  let direction = currLang == "ar" ? "rtl" : "ltr";
  // == Vars ==

  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(currLang);
    console.log("language changed");
  }, [currLang]);

  // Functions
  const handleChangeLang = () => {
    if (currLang == "ar") setCurrLang("en");
    else setCurrLang("ar");
  };
  // === Functions ===

  return (
    <Container maxWidth="md">
      {/* Card */}
      <div style={{ borderRadius: "20px", backgroundColor: "#4287f5" }}>
        {/* Card Content */}
        <div style={{ padding: "20px", color: "white" }}>
          {/* Country & Date */}
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "end",
            }}
            dir={direction}
          >
            <h2 style={{ marginRight: "10px" }}>{t("Egypt")}</h2>
            <p style={{ marginRight: "10px" }}>{timeAndDate}</p>
          </div>
          {/* === Country & Date ===*/}

          <hr style={{ color: "white" }} />

          {/* Details */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            dir={direction}
          >
            {/* Degree */}

            {/* Degree & Its icon */}
            <div style={{ margin: "0px 10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
                dir={direction}
              >
                <h1 style={{ margin: "20px 0" }}>{responseData.degree}</h1>
                <img
                  src={`https://openweathermap.org/img/wn/${responseData.icon}@2x.png`}
                  alt="weather_icon"
                />
              </div>

              {/*=== Degree & Its icon ===*/}

              <p style={{ margin: "0px 0 10px 0" }}>{t(responseData.desc)}</p>

              {/* Min & Max degree */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
                dir={direction}
              >
                <p>
                  {t("Min")}: {responseData.min}
                </p>
                <p style={{ margin: "0 15px" }}>|</p>
                <p>
                  {t("Max")}: {responseData.max}
                </p>
              </div>
              {/*=== Min & Max degree ===*/}
            </div>
            {/*=== Degree ===*/}

            {/* Cloud img */}
            <div
              style={{
                width: "400px",
                margin: "0 10px 0 20px",
                textAlign: "end",
              }}
            >
              <CloudIcon sx={{ fontSize: "200px", color: "white" }} />
            </div>
            {/*=== Cloud img ===*/}
          </div>
          {/*=== Details  ===*/}
        </div>
        {/*=== Card Content ===*/}
      </div>
      {/*=== Card ===*/}

      {/* Lang Btn */}
      <Button
        variant="text"
        sx={{ display: "flex", justifyContent: "start" }}
        onClick={() => handleChangeLang()}
      >
        {currLang == "ar" ? "انجليزي" : "Arabic"}
      </Button>
      {/*=== Lang Btn ===*/}
    </Container>
  );
}

export default Base;
