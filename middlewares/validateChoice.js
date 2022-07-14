import { choiceSchema } from "../schemas/choiceSchema.js";

export function validateChoice(req, res, next) {
  const { error } = choiceSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log(error);
    return res.status(422).send(error.details.map((detail) => detail.message));
  }
  next();
}
