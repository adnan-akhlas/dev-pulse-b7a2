import bcrypt from "bcryptjs";
import { generateUserToken, hashPassword } from "../../utils/auth.util";
import * as authRepository from "./auth.repository";
import { TUserLogin, TUserRegister, TUserResponse } from "./auth.types";
import env from "../../config/env";

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
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const isValidPassword = bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const { password: _, ...secureUser } = user;
  const accessToken = generateUserToken(
    { email: user.email, role: user.role },
    env.jwt_access_secret as string,
    "7d",
  );
  return { user: secureUser, accessToken };
};
