import { createDb, migrate } from "postgres-migrations";
import { pgConfig } from "tools/db/config";
const { PGDATABASE, MIGRATION_PASSWORD } = process.env;

/**
 * @name Migrate PostgreSQL
 * @path /api/admin/migrate
 * @param req.body Object
 * @param req.body.password {String} required password to migrate
 * @response 200 + "Success."
 * @error 400 + "Failure."
 **/
export default async (req, res) => {
  if (req.body.password === MIGRATION_PASSWORD) {
    await createDb(PGDATABASE, pgConfig);
    await migrate(dbConfig, "tools/db/migrations");
    return res.status(200).send("Success.");
  }
  return res.status(400).send("Failure.");
};
