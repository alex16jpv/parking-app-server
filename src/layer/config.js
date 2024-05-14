require("dotenv").config();

const basicConfig = {
  username: process.env.SEQ_USER,
  password: process.env.SEQ_PASSWORD,
  database: process.env.SEQ_DATABASE,
  port: process.env.SEQ_PORT,
  host: process.env.SEQ_HOST,
  dialect: "postgres",
  logging: false,
};

module.exports = {
  local: basicConfig,
  development: basicConfig,
};
