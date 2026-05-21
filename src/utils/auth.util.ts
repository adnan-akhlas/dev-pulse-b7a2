import bcrypt from "bcryptjs";
import env from "../config/env";

export const hashPassword = async (password: string): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, env.bcrypt_salt);
  return hashPassword;
};
