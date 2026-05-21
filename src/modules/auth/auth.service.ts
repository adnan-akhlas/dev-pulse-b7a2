import { hashPassword } from "../../utils/auth.util";
import { TUserInput, TUserResponse } from "./auth.types";
import * as authRepository from "./auth.repository";

export const register = async (
  userInfo: TUserInput,
): Promise<TUserResponse> => {
  const password = await hashPassword(userInfo.password);
  const newUser = { ...userInfo, password };
  const result = await authRepository.createUser(newUser);
  return result;
};
