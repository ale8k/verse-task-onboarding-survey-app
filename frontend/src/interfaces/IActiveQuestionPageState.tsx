import IQuestion from "./IQuestion";

export default interface IActiveQuestionPageState {
    totalQuestions: number;
    partitionedQuestions: { category: string, questions: IQuestion[] }[];
    currentQuestionCategoryIndex: number;
    currentQuestionIndex: number;
}
