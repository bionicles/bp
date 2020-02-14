import { createDb, migrate } from "postgres-migrations";
import { pgConfig } from "tools/db/config";
const { PGDATABASE, ADMIN_PASSWORD } = process.env;

/**
 * @name Migrate
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
 * @body {string} req.body.password - db admin password
 * @code {400} Wrong Password
 * @code {200} Success
 * @code {500} Failure
 * @arg {object} req - request
 * @arg {object} res - response
 */
const migrationHandler = async (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    try {
      await createDb(PGDATABASE, pgConfig);
      await migrate(pgConfig, "tools/db/migrations");
      return res.status(200).send("Success.");
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  return res.status(400).send("Wrong password.");
};

export default migrationHandler;
