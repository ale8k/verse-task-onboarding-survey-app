import React from "react";
import IQuestion from "../../../interfaces/IQuestion";
/**
 * Turns the amount of questions answered against the amount of questions
 * in a given questionGroup into a percentage. It's then divided by 2.4 to give us
 * a pixel perfect value for iPhone 5. (I could have used resposive values, but I hope this is OK)
 * @param questionGroup the partitioned question group, see ActiveQuestionPage.partitionQuestionsByCategory()
 * for more info
 * @param progBarStates the progress bar states updated in ActiveQuestionPage._progressBarStates
 * @param categoryIndex current index
 */
export const ProgressMeter = (questionGroup: { category: string; questions: IQuestion[] },
                        progBarStates: number[][],
                        categoryIndex: number): JSX.Element => {
    const questionAmount = questionGroup.questions.length;
    const amountAnswered = progBarStates[categoryIndex].length;
    const percentage = ((amountAnswered / questionAmount) * 100) / 2.4;

    return (
        <div className="progress-bar-container">
            <div style={{backgroundColor: percentage > 0 ? "pink" : ""}} className="progress-bar">
                <div style={{ width: percentage }} className="inner-progress-bar"></div>
            </div>
            <span className="progress-bar-text">{questionGroup.category}</span>
        </div>
    );
};
