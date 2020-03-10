
import React, { FunctionComponent }from "react";
import "./NextButton.scss";

// performAction needs typing, google this
type ButtonProps = {
    buttonText: string;
    performAction: any;
};

export const NextButton: FunctionComponent<ButtonProps> = ({ buttonText, performAction }) => {
    return (
        <div className="NextButton">
            <button className="btn" onClick={performAction}>{buttonText}</button>
        </div>
    );
};
