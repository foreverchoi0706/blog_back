import pgPromise, { IMain, IDatabase } from "pg-promise";

const pgp: IMain = pgPromise();

const db : IDatabase<any> = pgp("postgres://localhost:5432");

export default db;
