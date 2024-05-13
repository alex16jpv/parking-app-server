import * as DataTypes from "sequelize";
import * as models from "./models.js";
import { Sequelize } from "sequelize";

const db = {} as any;
db.Sequelize = DataTypes;

export const loadingSequelize = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.SEQ_USER,
    password: process.env.SEQ_PASSWORD,
    database: process.env.SEQ_DATABASE,
    host: process.env.SEQ_HOST,
    port: process.env.SEQ_PORT,
  } as any);

  try {
    await sequelize.authenticate();

    Object.entries(models).forEach(([k, v]) => {
      db[k] = v(sequelize, DataTypes);
    });

    db.sequelize = sequelize;
    console.log("Connection has been established successfully.");
    return db;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default db;
