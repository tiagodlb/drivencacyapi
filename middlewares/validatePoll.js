import { poolSchema } from "../schemas/pollSchema";

export function ValidatePoll(req, res, next) {
  const { error } = poolSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).send(error.details.map((detail) => detail.message));
    return;
  }

  next();
}
