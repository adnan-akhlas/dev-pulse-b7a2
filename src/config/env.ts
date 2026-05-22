import dotenv from "dotenv";
import { env as processEnv } from "node:process";

dotenv.config({ quiet: true });

const env = {
  port: Number(processEnv.PORT),
  database_url: processEnv.DATABASE_URL,
  environment: processEnv.NODE_ENV,
  bcrypt_salt: Number(processEnv.BCRYPT_SALT),
  jwt_access_secret: processEnv.JWT_ACCESS_SECRET,
  jwt_refresh_secret: processEnv.JWT_REFRESH_SECRET,
};

export default env;
