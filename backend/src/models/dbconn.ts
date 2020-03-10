import mongoose, { Document } from "mongoose";
import questionModel from "./question";

// just leave _id option, doesn't really matter
interface IQuestion {
    _id: string;
    questionCategory: string;
    question: string;
    opt1: string;
    opt2: string;
    opt3: string;
    opt4: string;
}

/**
 * DbConn class initialises db connection and holds basic
 * db access methods, in a larger app I'd probably have a separate class
 * and/or classes for different access means. But for simplicity, we're just fetching
 * all records.
 *
 * Please note all methods are async by nature, this allows us to await Mongoose's async responses
 * in our routes, i.e., make our actual route method async.
 */
export default class DbConn {

    constructor() {
        this.connect();
    }

    public async closeConnection(): Promise<void> {
        await mongoose.connection.close((err) => {
            err ? console.log(err) : console.log("Db connection closed successfully");
        });
    }

    /**
     * Simple Db fetch method
     * @param category the question category to fetch from,
     * it is optional however if opting to fetch all
     */
    public async fetchAllQuestionsByCategory(category?: String): Promise<IQuestion[] | undefined> {
        // we ensure the execution is performed prior so that we can return an 'actual' promise
        if (category !== undefined) {
            return await questionModel.find({
                questionCategory: category
            }, (err, res) => {
                if (err) {
                    console.log(err);
                }
            }).exec() as unknown as IQuestion[];
        } else {
            return await questionModel.find((err, res) => {
                if (err) {
                    console.log(err);
                }
            }).exec() as unknown as IQuestion[];
        }
    }

    /**
     * In a real world app, if the Db connection is continuously
     * unsuccessful, we may opt to actually throw a genuine error.
     * Again, for simplicity I'm just logging it failed.
     */
    private connect(): void {
        mongoose.connect(`mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
                {
                    useUnifiedTopology: true,
                    useNewUrlParser: true
                })
            .then(() => console.log("Db connection successful"))
            .catch(() => console.log("Db connection unsuccessful"));
    }

}
