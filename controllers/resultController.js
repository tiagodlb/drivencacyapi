import { ObjectId } from "mongodb";
import db from "../src/db.js";

export async function getResult(req, res) {
  const id = req.params.id;

  if (/[0-9a-fA-F]{24}/.test(id) === false) return res.sendStatus(404); //Checks if the value is an hexadecimal number

  try {
    const polls = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(choices.pollId) });
    if (!polls) return res.sendStatus(404);
    const votes = await db.collection("votes").find({ pollId: id }).toArray();
    const specificVote = votes[0];
    const choices = await db
      .collection("choices")
      .findOne({ pollId: String(specificVote.pollId) });
    console.log(votes[0]);
    const results = await db.collection("results").insertOne({
      title: polls.title,
      expireAt: polls.expireAt,
      result: {
        title: choices.title,
        votes: votes.length,
      },
    });
    const result = await db
      .collection("results")
      .find({ title: polls.title })
      .toArray();
    result.reverse();
    console.log(result);
    res.send(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao pegar o resultado");
  }
}
