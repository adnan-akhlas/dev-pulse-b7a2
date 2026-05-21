import dotenv from "dotenv";
import { env as processEnv } from "node:process";

dotenv.config({ quiet: true });

const env = {
  port: processEnv.PORT,
  database_url: processEnv.DATABASE_URL,
};

export default env;
