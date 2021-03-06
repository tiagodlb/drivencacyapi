import db from "../src/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function getPollIdChoice(req, res) {
  const id = req.params.id;

  if (/[0-9a-fA-F]{24}/.test(id) === false) return res.sendStatus(404); //Checks if the value is an hexadecimal number

  try {
    const polls = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(id) });
    if (!polls) {
      return res.sendStatus(404);
    }

    const voteOptions = await db
      .collection("choices")
      .find({ pollId: id })
      .toArray();
    res.send(voteOptions);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao obter as opções de voto");
  }
}

export async function postChoiceIdVote(req, res) {
  const id = req.params.id;
  let now = dayjs();

  if (/[0-9a-fA-F]{24}/.test(id) === false) return res.sendStatus(404); //Checks if the value is an hexadecimal number

  try {
    let voteExists = await db
      .collection("choices")
      .findOne({ _id: ObjectId(id) });
    if (!voteExists) {
      return res.sendStatus(404);
    }

    const pollExists = await db
      .collection("polls")
      .findOne({ _id: ObjectId(voteExists.pollId) });

    const data = pollExists.expireAt;
    console.log(data);

    if (now.diff(data, "day") >= 30) {
      return res.sendStatus(403);
    }

    let voteData = await db
      .collection("votes")
      .findOne({ choiceId: voteExists._id });
    await db.collection("votes").insertOne({
      title: 1,
      pollId: voteExists.pollId,
      choiceId: voteExists._id,
      createdAt: now.format("YYYY-MM-DD HH:mm:ss"),
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao votar");
  }
}
