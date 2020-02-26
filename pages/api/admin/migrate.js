import { createDb, migrate } from "postgres-migrations";
import { pgConfig } from "tools/db/config";

/** @namespace */
var Admin = {};

/**
 * @memberof Admin
 * @path {POST} /api/admin/migrate
 * @example
 * ```js
 * const migrationResponse = await fetch(
 * `${url}/api/admin/migrate/`, {
 * method: 'POST',
 * body: { adminPassword: process.env.ADMIN_PASSWORD }
 * });
 * console.log(migrationResponse.status) => 200
 * ```
 * @body {string} password - db admin password
 * @code {400} Wrong Password
 * @code {200} Success
 * @code {500} Failure
 * @arg {object} req - request
 * @arg {object} res - response
 */
const handleMigrate = async (req, res) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    try {
      const createDbResponse = await createDb("bp", pgConfig);
      console.log("createDbResponse", createDbResponse);
      const migrateDbResponse = await migrate(pgConfig, "tools/db/migrations");
      console.log("migrateDbResponse", migrateDbResponse);
      return res.status(200).send("Success.");
    } catch (e) {
      console.log("Error", e);
      return res.status(500).json("Error", e);
    }
  }
  return res.status(400).send("Wrong password.");
};

export default handleMigrate;
