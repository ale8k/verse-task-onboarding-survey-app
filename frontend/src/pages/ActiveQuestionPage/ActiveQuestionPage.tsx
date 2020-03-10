import React, { Component } from "react";
import IQuestion from "../../interfaces/IQuestion";
import { NextButton } from "../../components/NextButton/NextButton";

interface IActiveQuestionPageState {
    totalQuestions: number;
    partitionedQuestions: { category: string, questions: IQuestion[] }[];
    currentQuestionCategoryIndex: number;
    currentQuestionIndex: number;
}

export class ActiveQuestionPage extends Component<{ questions: IQuestion[] }, IActiveQuestionPageState> {
    public readonly state: IActiveQuestionPageState;
    private _partitonedQuestions = this.partitionQuestionsByCategory(this.props.questions);
    private _answerSelected: number = 0;
    private _categoryComplete: boolean = false;
    private _trackedAnswers: { category: number, questionAnswers: number[] }[] = [{ category: 0, questionAnswers: [] }];
    private _currentQuestion: number = 1;

    constructor(props: { questions: IQuestion[] }) {
        super(props);

        this.state = {
            totalQuestions: this.props.questions.length,
            partitionedQuestions: this._partitonedQuestions,
            currentQuestionCategoryIndex: 0,
            currentQuestionIndex: 0
        };

        console.log(this.state.partitionedQuestions);
    }

    public render() {
        const catIndex = this.state.currentQuestionCategoryIndex;
        const qusIndex = this.state.currentQuestionIndex;
        const qusContent = this.state.partitionedQuestions[catIndex].questions[qusIndex];

        const questionBlock = () => {
            return (
                <div>
                    <div>progress meters?</div>
                    <div>{this._currentQuestion++} of {this.state.totalQuestions}</div>
                    <div>{this.state.partitionedQuestions[catIndex].questions[qusIndex].question}</div>
                    <div onClick={() => this._answerSelected = 1}>{qusContent.opt1}</div>
                    <div onClick={() => this._answerSelected = 2}>{qusContent.opt2}</div>
                    <div onClick={() => this._answerSelected = 3}>{qusContent.opt3}</div>
                    <div onClick={() => this._answerSelected = 4}>{qusContent.opt4}</div>
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
         * Coming back from the updateQuestion() method,
         * this block simply displays the latest previous data
         * in a 'complete' format and provides us a way to proceed
         * to the next category.
         *
         * Now I don't actually know the logic involved in emissions...
         * So this is just a basic block displaying the answers that were provided? lol.
         */
        const completeBlock = () => {
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
                { this._categoryComplete ? completeBlock() : questionBlock()}
            </div>
        );
    }

    // this sucks, do it better
    /**
     * This may look a tad odd, but its fairly simple how it works:
     *  1)  The first if statement checks that our question category index (our total categories)
     *      isn't out of the array bounds. If it's not, then we can increase our question index and move
     *      to the next question. We also track the answer selected (opt1-4) and push it into our tracking array.
     *
     *  2)  If it is out of bounds, we know we've completed that category. So again, we track the last answer,
     *      set the category to complete (refer to render method as to why we do this) and update the component.
     */
    private updateQuestion() {
        // grab some local refs so that it isn't ridiculously long below
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
            this._answerSelected = 0;
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
            console.log(this._trackedAnswers[currentQusCatIndex].questionAnswers);
            this._categoryComplete = true;
            this.setState({});
            console.log("category complete");
        }
    }

    /**
     * Due to the design of the app, simply progressing our
     * category index will progress the survey
     */
    private progressToNextCategory() {
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
