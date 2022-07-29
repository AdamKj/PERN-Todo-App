const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "adamkj",
  host: "localhost",
  port: 5432,
  database: "todo",
});

module.exports = {
  query: (text, params) => client.query(text, params),
};
