import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import env from "../config/env";
import { TUserJwt } from "../modules/auth/auth.types";
import createHttpError from "http-errors";

export const hashPassword = async (password: string): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, env.bcrypt_salt);
  return hashPassword;
};

export const generateUserToken = (
  userInfo: TUserJwt,
  secretKey: string,
  expiresTime: number | string,
): string => {
  const token = jwt.sign(userInfo, secretKey, {
    expiresIn: expiresTime,
  } as SignOptions);
  return token;
};

export const verifyUserToken = (token: string, secretKey: string) => {
  const decode = jwt.verify(token, secretKey);
  if (!decode) {
    throw createHttpError(401, "Token Invalid");
  }
  return decode;
};
