import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import pollRouter from "../routes/pollRouter.js";
import choiceRouter from "../routes/choiceRouter.js";
import voteRouter from "../routes/voteRouter.js";
import resultRouter from "../routes/resultRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

//Routes
app.use(pollRouter);
app.use(choiceRouter);
app.use(voteRouter);
app.use(resultRouter);

app.listen(process.env.PORT, () => {
  console.log(chalk.bold.green(`Server running on port ${process.env.PORT}`));
});
