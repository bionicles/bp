import { createDb, migrate } from "postgres-migrations";

const { PGHOST, PGDATABASE, PGPASSWORD } = process.env;

const migrate = async () => {
  const dbConfig = {
    database: PGDATABASE,
    password: PGPASSWORD,
    host: PGHOST,
    ssl: {
      rejectUnauthorized: false,
      ca: [awsCert, "ascii"]
    }
  };
  await createDb(PGDATABASE, dbConfig);
  await migrate(dbConfig, "../../migrations");
};

migrate();
