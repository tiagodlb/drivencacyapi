import dayjs from "dayjs";

import db from "../src/db.js";
import { ObjectId } from "mongodb";

export async function postChoice(req, res) {
  const { title, poolId } = req.body;
  let now = dayjs();

  try {
    const pollExists = await db
      .collection("polls")
      .findOne({ _id: ObjectId(req.body.poolId) });

    if (!pollExists || pollExists === null) {
      return res.sendStatus(404);
    }

    const data = pollExists.expireAt;

    const pollExpires = now.add();

    if (pollExpires.diff(data, "day") >= 30) {
      return res.sendStatus(403);
    }

    console.log(pollExpires);

    const titleExists = await db
      .collection("choices")
      .findOne({ title: title });
    console.log(title, poolId);
    console.log(titleExists);
    if (titleExists) {
      return res.sendStatus(409);
    }

    await db.collection("choices").insertOne({ title: title, pollId: poolId });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao registrar uma escolha", error);
  }
}
