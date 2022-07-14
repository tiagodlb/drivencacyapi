import { Router } from "express";

import { postPoll, getPoll } from "../controllers/pollController.js";
import { ValidatePoll } from "../middlewares/validatePoll.js";

const pollRouter = Router();

pollRouter.post("/poll", ValidatePoll, postPoll);
pollRouter.get("/poll", getPoll);

export default pollRouter;
