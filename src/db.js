import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.BANCO);
  console.log(chalk.bold.blue(`MongoDB database connected successfully`));
} catch (error) {
  console.log("Error connecting to database");
  console.log(chalk.bold.red(process.env.MONGO_URL));
  console.log(chalk.bold.red(error));
}

export default db;
