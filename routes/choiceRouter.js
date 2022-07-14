import { Router } from "express";

import { postChoice } from "../controllers/choiceController.js";
import { validateChoice } from "../middlewares/validateChoice.js";

const choiceRouter = Router();

choiceRouter.post("/choice", validateChoice, postChoice);

export default choiceRouter;
