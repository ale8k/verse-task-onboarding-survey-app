import React, { Component } from "react";
import IActiveQuestionPageState from "../../interfaces/IActiveQuestionPageState";
import IQuestion from "../../interfaces/IQuestion";
import { NextButton } from "../../components/NextButton/NextButton";
import { ProgressMeter } from "../../pages/ActiveQuestionPage/components/ProgressMeter";
import "./ActionQuestionPage.scss";

export class ActiveQuestionPage extends Component<{ questions: IQuestion[] }, IActiveQuestionPageState> {
    /**
     * Remove default TS readonly state type
     */
    public readonly state: IActiveQuestionPageState;
    /**
     * The partitioned questions in their respective categories
     */
    private _partitonedQuestions = this.partitionQuestionsByCategory(this.props.questions);
    /**
     * The current answer selected by the user (1-4)
     */
    private _answerSelected: number = 0;
    /**
     * A flag to indicate which block to render on state update (questions or completion blocks)
     */
    private _categoryComplete: boolean = false;
    /**
     * All the answers selected (numbers) shoved into a multi-dimensional array
     * along with the categories they belong to
     */
    private _trackedAnswers: { category: number, questionAnswers: number[] }[] = [{ category: 0, questionAnswers: [] }];
    /**
     * Simple tracker for the Question N of X
     */
    private _currentQuestion: number = 1;
    /**
     * Void array tracking the amount of data present in the progress bars
     */
    private _progressBarStates: number[][] = [];

    constructor(props: { questions: IQuestion[] }) {
        super(props);

        this.state = {
            totalQuestions: this.props.questions.length,
            partitionedQuestions: this._partitonedQuestions,
            currentQuestionCategoryIndex: 0,
            currentQuestionIndex: 0
        };

        /**
         * Get the amount of categories prior to updating the
         * answered values, prevent null/undefined errors
         */
        this._partitonedQuestions.forEach((questionGroup) => {
            this._progressBarStates.push([]);
        });
    }

    public render(): JSX.Element {
        const catIndex = this.state.currentQuestionCategoryIndex;
        const qusIndex = this.state.currentQuestionIndex;
        const qusContent = this.state.partitionedQuestions[catIndex].questions[qusIndex];

        /**
         * A method to force a state update, so that the conditional
         * classes on the questions update
         * @param ansNumber the answer number selected by the user
         */
        const updateAnswerSelected = (ansNumber: number): void => {
            this._answerSelected = ansNumber;
            this.setState({});
        };

        /**
         * The block resposible for all question related rendering
         */
        const questionBlock = (): JSX.Element => {
            return (
                <div className="ActionQuestionPage">
                    <div className="progress-meter-container">
                        {
                            this.state.partitionedQuestions.map((questionGroup, index) => {
                                return ProgressMeter(questionGroup, this._progressBarStates, index);
                            })
                        }
                    </div>
                    <div className="current-question-counter">Question {this._currentQuestion} of {this.state.totalQuestions}</div>
                    <h1 className="current-question-text">{this.state.partitionedQuestions[catIndex].questions[qusIndex].question}</h1>
                    <div className="question-option-container">
                        <div
                            className={`question-option ${this._answerSelected === 1 ? "active" : ""}`}
                            onClick={() => updateAnswerSelected(1)}>
                            {qusContent.opt1}
                        </div>
                        <div
                            className={"question-option " + (this._answerSelected === 2 ? "active" : "")}
                            onClick={() => updateAnswerSelected(2)}>
                            {qusContent.opt2}
                        </div>
                        <div
                            className={"question-option " + (this._answerSelected === 3 ? "active" : "")}
                            onClick={() => updateAnswerSelected(3)}>
                            {qusContent.opt3}
                        </div>
                        <div
                            className={"question-option " + (this._answerSelected === 4 ? "active" : "")}
                            onClick={() => updateAnswerSelected(4)}>
                            {qusContent.opt4}
                        </div>
                    </div>
                    {
                        /**
                         * The pictures on the figma don't show what to do when a user
                         * attempts to click "Next question" without an option selected
                         */
                    }
                    <NextButton
                        buttonText={"Next question"}
                        performAction={() => this._answerSelected !== 0 ? this.updateQuestion() : console.log("fail")}
                    />
                </div>
            );
        };

        /**
         * The block resposible for all completion rendering
         *
         * Now I don't actually know the logic involved in emissions...
         * So this is just a basic block displaying the answers that were provided
         */
        const completeBlock = (): JSX.Element => {
            const categoryCompleteName: string = this.state.partitionedQuestions[this.state.currentQuestionCategoryIndex].category;
            const previousAnswers: number[] = this._trackedAnswers[this.state.currentQuestionCategoryIndex].questionAnswers;
            let nextCategoryToComplete: string | undefined;
            // idk what's after completion...
            try {
                nextCategoryToComplete = this.state.partitionedQuestions[this.state.currentQuestionCategoryIndex + 1].category;
            } catch (e) {
                nextCategoryToComplete = "end of categories";
            }
            return (
                <div>
                    <div>{categoryCompleteName}</div>
                    <p>UK Nation average: 2.9 tons of CO2 produced per year</p>
                    <div>Your answers were: {previousAnswers}</div>
                    <p>You're using 3.2 Tons of CO2 / year, you also made a spelling mistake ;)</p>
                    <p>Lets take a look at how you look in the {nextCategoryToComplete} category...</p>
                    <NextButton
                        buttonText={"Continue"}
                        performAction={() => this.progressToNextCategory()}
                    />
                </div>
            );
        };

        return (
            <div>
                {this._categoryComplete ? completeBlock() : questionBlock()}
            </div>
        );
    }

    /**
     * This may look a tad odd, but its fairly simple how it works:
     *  1)  The first if statement checks that our question category index (our total categories)
     *      isn't out of the array bounds. If it's not, then we can increase our question index and move
     *      to the next question. We also track the answer selected (opt1-4) and push it into our tracking array.
     *
     *  2)  If it is out of bounds, we know we've completed that category. So again, we track the last answer,
     *      set the category to complete (refer to render method as to why we do this) and update the component.
     */
    private updateQuestion(): void {
        const currentQusCatIndex = this.state.currentQuestionCategoryIndex;
        const currentQusIndex = this.state.currentQuestionIndex;
        const partitionedQuestions = this.state.partitionedQuestions;

        // compare the current category's questions against the current qustion index,
        // if it's not equal we're ok (i.e., we haven't hit the final question)
        // as such, update the question index, push a the answer onto the _trackAnswers and reset the previous
        // answer selected
        if (partitionedQuestions[currentQusCatIndex].questions.length - 1 !== currentQusIndex) {
            this.setState({
                currentQuestionIndex: currentQusIndex + 1
            });
            this._trackedAnswers[currentQusCatIndex].questionAnswers.push(this._answerSelected);
            // we're updating the progress bars current category here,
            // doesn't matter what we push
            this._progressBarStates[currentQusCatIndex].push(0);
            console.log("progress bars:");
            console.log(this._progressBarStates);
            this._answerSelected = 0;
            this._currentQuestion++;
            // however, if it is equal, we have hit the final question
            // so we push the previous answer onto the previous category, but then push a brand
            // new completion object onto our answers array. Obviously this will fail if the index
            // goes out of bounds, but the task gives no info on what to do on completion
            // the _categoryComplete simply lets our render method decide between which JSX block
            // to render, either the competeBlock or questionBlock
        } else if (partitionedQuestions[currentQusCatIndex].questions.length - 1 === currentQusIndex) {
            this._trackedAnswers[currentQusCatIndex].questionAnswers.push(this._answerSelected);
            // idk what's after completion...
            this._trackedAnswers.push({ category: currentQusCatIndex + 1, questionAnswers: [] });
            this._progressBarStates[currentQusCatIndex].push(0);
            console.log("progress bars:");
            console.log(this._progressBarStates);
            this._categoryComplete = true;
            this._currentQuestion++;
            this.setState({});
            console.log("category complete");
        }
    }

    /**
     * Progresses the category index, so that upon next render
     * the questions block is aware of our state
     */
    private progressToNextCategory(): void {
        this._categoryComplete = false;
        this._answerSelected = 0;

        // idk what's after completion...
        try {
            this.setState({
                currentQuestionCategoryIndex: this.state.currentQuestionCategoryIndex + 1,
                currentQuestionIndex: 0
            });
        } catch (e) {
            throw e;
        }
    }

    /**
     * Partitions the questions into an array of objects pertaining to the category
     * @param questions the array full of the questions
     */
    // lodash would've worked well here, or doing this server-side.
    private partitionQuestionsByCategory(questions: IQuestion[]): { category: string, questions: IQuestion[] }[] {
        // filter the categories out of the questions and
        // store into a new array
        const categories: string[] = [];
        categories.push(questions[0].questionCategory);

        questions.forEach((question) => {
            if (!categories.includes(question.questionCategory)) {
                categories.push(question.questionCategory);
            }
        });

        // prepare a new multidimensional array,
        // with each category assigned already
        const partionedQuestions: { category: string, questions: IQuestion[] }[] = [];
        categories.forEach((newCategory) => {
            partionedQuestions.push({ category: newCategory, questions: [] });
        });

        // now we simply loop through each partion category and
        // assign the question to its respective questions array property
        partionedQuestions.forEach((categoryGroup) => {
            questions.forEach(question => {
                if (categoryGroup.category === question.questionCategory) {
                    categoryGroup.questions.push(question);
                }
            });
        });

        return partionedQuestions;
    }
}
