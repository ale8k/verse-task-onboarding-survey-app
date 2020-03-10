import { Router } from "express";
import DbConn from "../models/dbconn";
const router = Router();

// could add route to fetch all questions if wanted, but I dislike that style

/**
 * This is the default export for now as we only have this route...
 * @optional pass category to find specific question categories
 */
export default router.get("/questions", async (req, res) => {
    const dbconn = new DbConn();
    // let category = req.params.category;
    // category = category.charAt(0).toUpperCase() + category.substring(1);

    await dbconn.fetchAllQuestionsByCategory().then((data) => {
            if (!data) {
                res.send("DB Query returned empty");
            } else {
                res.send(data);
            }
        });
    // we don't care about waiting for it to close
    dbconn.closeConnection();
});
