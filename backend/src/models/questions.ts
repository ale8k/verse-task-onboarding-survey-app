import mongoose, { Schema } from "mongoose";

/**
 * Generic question schema with a questionCategory, we use the category to
 * fetch all question records relating to this category
 */
const questionSchema = new Schema({
    questionCategory: String,
    question: String,
    opt1: String,
    opt2: String,
    opt3: String,
    opt4: String
});

const questionModel = mongoose.model("questions", questionSchema);
export default questionModel;
