import { Pool } from "pg";
import env from "./env";

const connectionString = env.database_url;

const pool = new Pool({
  connectionString,
});

const query = (query: string, params: Array<string | number>) =>
  pool.query(query, params);

export default query;
