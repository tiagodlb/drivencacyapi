import joi from "joi";

export const poolSchema = joi.object({
  title: joi.string().required(),
  expireAt: joi.string().allow("").default(now.format("YYYY-MM-DD HH:mm:ss")),
});
