import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./Components/main";
import Slider from "./Components/slider";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./Components/cover.css"
import Legend from "./Components/legend";

function App() {
  const [date, setDate] = useState(new Date("2020-12-31"));
  const [isLoading, setIsLoading] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [predict, setPredict] = useState(false);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
		if (predict) {
      setDate(new Date("2025-01-01"))
    } else {
      setDate(new Date("2021-01-01"))
    }
	}, [predict]);


  return (
    <MantineProvider>
      <div className="App">
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
        <div className="logo-container">
            <img src="logo.png" alt="logo" className="logo" />
            <Legend />
        </div>
        <Slider date={date} onDateChange={handleDateChange} predict={predict} />
        {showCompare ? (
          <div className="container">
            <div id="divider">
              </div>
            <div className="left">
              <Main
                containerId="left"
                setIsLoading={setIsLoading}
                date={date}
                predict={predict}
                setPredict={setPredict}
                showCompare={showCompare}
                setShowCompare={setShowCompare}/>
            </div>
            <div className="right">
              <Main
                containerId="right"
                setIsLoading={setIsLoading}
                date={date}
                predict={predict}
                setPredict={setPredict}
                showCompare={showCompare}
                setShowCompare={setShowCompare}/>
            </div>
          </div>
          ) : (
          <div>
            <Main
              containerId="M"
              setIsLoading={setIsLoading}
              date={date}
              predict={predict}
              setPredict={setPredict}
              showCompare={showCompare}
              setShowCompare={setShowCompare}/>
          </div>
        )}
      </div> 
    </MantineProvider>
  );
}

export default App;


