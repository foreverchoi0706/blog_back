const pgp = require("pg-promise")();
// const db = pgp("postgres://postgres:6007@localhost:5432/postgres");
const db = pgp("postgres://postgres:6007@52.78.180.169:5432/postgres");

export default db;
