import bcrypt from "bcryptjs";
import createError from "http-errors";
import status from "http-status";
import env from "../../config/env";
import { generateUserToken, hashPassword } from "../../utils/auth.util";
import * as authRepository from "./auth.repository";
import { TUserLogin, TUserRegister, TUserResponse } from "./auth.types";

export const register = async (
  userInfo: TUserRegister,
): Promise<TUserResponse> => {
  const password = await hashPassword(userInfo.password);
  const newUser = { ...userInfo, password };
  const result = await authRepository.createUser(newUser);
  return result;
};

export const loginUser = async ({
  email,
  password,
}: TUserLogin): Promise<{ user: TUserResponse; accessToken: string }> => {
  if (!email || !password) {
    throw createError(status.BAD_REQUEST, "INVALID_CREDENTIALS");
  }
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw createError(status.UNAUTHORIZED, "INVALID_CREDENTIALS");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createError(status.UNAUTHORIZED, "INVALID_CREDENTIALS");
  }
  const { password: _, ...secureUser } = user;
  const accessToken = generateUserToken(
    { email: user.email, role: user.role },
    env.jwt_access_secret as string,
    "7d",
  );
  return { user: secureUser, accessToken };
};
