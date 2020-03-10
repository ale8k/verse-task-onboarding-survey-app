import React, { FunctionComponent }from "react";
import "./BasePage.scss";

// components
import { NextButton } from "../../components/NextButton/NextButton";

export const BasePage: FunctionComponent<any> = ({ history }) => {
    return (
        <div className="BasePage">
            <img src={require("../../initial-survey-img.PNG")} className="initial-survey-img" />
            <h1 className="initial-survey-header">Calculate your personal Pawprint</h1>
            <p className="initial-survey-paragraph">
                Next we have a short 2-3 minute survey covering Diet, Home,
                Travel, and Other that will let us calculate your personal
                carbon footprint (or Parprint as we like to call it).
            </p>
            <NextButton buttonText="Take the survey" performAction={() => history.push("/bob")} />
        </div>
    );
};
