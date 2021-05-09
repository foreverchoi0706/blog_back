import config from "../config";

const pgp = require("pg-promise")();

const db = pgp(config.db.address);

export default db;
