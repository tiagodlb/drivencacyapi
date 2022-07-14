import { choiceSchema } from "../schemas/choiceSchema";

export function validateChoice(req, res, next) {
  const { error } = choiceSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log(error);
    return res.sendStatus(422);
  }
  next();
}
