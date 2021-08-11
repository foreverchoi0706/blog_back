import config from "../config";

import pgPromise from "pg-promise";

const pgp = pgPromise();

const db = pgp(config.db.address);

export default db;
