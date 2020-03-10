import React, { Component }from "react";
import IQuestion from "../../interfaces/IQuestion";
import { NextButton } from "../../components/NextButton/NextButton";

interface IActiveQuestionPageState {
    totalQuestions: number;
    partitionedQuestions: { category: string, questions: IQuestion[]}[];
    currentQuestionCategoryIndex: number;
    currentQuestionIndex: number;
}

export class ActiveQuestionPage extends Component<{ questions: IQuestion[] }, IActiveQuestionPageState> {
    public readonly state: IActiveQuestionPageState;
    private _partitonedQuestions = this.partitionQuestionsByCategory(this.props.questions);
    private _answerSelected: number = 0;

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
        return (
            <div>
                <div>progress meters?</div>
                <div>{this.state.currentQuestionIndex + 1} of {this.state.totalQuestions}</div>
                <div>{this.state.partitionedQuestions[catIndex].questions[qusIndex].question}</div>
                <div onClick={() => this._answerSelected = 1}>{qusContent.opt1}</div>
                <div onClick={() => this._answerSelected = 2}>{qusContent.opt2}</div>
                <div onClick={() => this._answerSelected = 3}>{qusContent.opt3}</div>
                <div onClick={() => this._answerSelected = 4}>{qusContent.opt4}</div>
                <NextButton
                    buttonText={"gh"}
                    performAction={() => this._answerSelected !== 0 ? this.updateQuestion() : console.log("fail")}
                />
            </div>
        );
    }

    private updateQuestion() {
        console.log(this.state.partitionedQuestions[this.state.currentQuestionCategoryIndex].questions.length - 1);
        console.log(this.state.currentQuestionIndex);

        if (this.state.partitionedQuestions[this.state.currentQuestionCategoryIndex].questions.length - 1
            !== this.state.currentQuestionIndex) {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1
            });
            this._answerSelected = 0;
        } else if (this.state.partitionedQuestions[this.state.currentQuestionCategoryIndex].questions.length - 1
            === this.state.currentQuestionIndex) {
            console.log("category complete");
        }

        console.log("boop");
    }

    /**
     * Partitions the questions into an array of objects pertaining to the category
     * @param questions the array full of the questions
     */
    // lodash would've worked well here, or doing this server-side.
    private partitionQuestionsByCategory(questions: IQuestion[]): { category: string, questions: IQuestion[]}[] {
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
        const partionedQuestions: { category: string, questions: IQuestion[]}[] = [];
        categories.forEach((newCategory) => {
            partionedQuestions.push({ category: newCategory, questions: []});
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
