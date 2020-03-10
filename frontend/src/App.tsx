import React, { Component } from "react";
import "./App.scss";

// components
import { NextButton } from "./components/NextButton/NextButton";

export default class App extends Component {


  public render() {
        return (
            <div className="App">
                <img src={require("./initial-survey-img.PNG")} className="initial-survey-img" />
                <h1 className="initial-survey-header">Calculate your personal Pawprint</h1>
                <p className="initial-survey-paragraph">Next we have a short 2-3 minute survey covering Diet, Home,
                Travel, and Other that will let us calculate your personal
                carbon footprint (or Parprint as we like to call it).
                </p>
                <NextButton buttonText="Take the survey" performAction={() => console.log("boo")}/>
            </div>
        );
    }
}

