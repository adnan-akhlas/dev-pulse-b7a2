import dotenv from "dotenv";
import { env as processEnv } from "node:process";

dotenv.config({ quiet: true });

const env = {
  port: processEnv.PORT,
  database_url: processEnv.DATABASE_URL,
  environment: processEnv.NODE_ENV,
};

export default env;
