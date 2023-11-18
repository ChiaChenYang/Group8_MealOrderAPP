import { env } from "../utils/env.js";
import { Sequelize } from "sequelize";

export const connection = new Sequelize({
  dialect: "mysql",
  host: env.DB_HOST,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  logging: false,
});
