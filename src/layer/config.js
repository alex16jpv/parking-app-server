require("dotenv").config();

const basicConfig = {
  username: process.SEQ_USER,
  password: process.SEQ_PASSWORD,
  database: process.SEQ_DATABASE,
  port: process.env.SEQ_PORT,
  host: process.env.SEQ_HOST,
  dialect: "postgres",
  logging: false,
};

module.exports = {
  local: basicConfig,
};
