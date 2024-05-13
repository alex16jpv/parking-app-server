import { loadingSequelize } from "./models/index.js";

export const openConnection = async () => {
  const sequelize = await loadingSequelize();
  return sequelize;
};

export const closeConnection = async (sequelize) => {
  await sequelize?.close();
  console.log("Connection has been closed successfully.");
};
