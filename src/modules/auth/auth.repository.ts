import query from "../../config/db";
import { IUser } from "../users/users.types";
import { TUserRegister, TUserResponse } from "./auth.types";

export const createUser = async (
  userInfo: TUserRegister,
): Promise<TUserResponse> => {
  const { name, email, password, role } = userInfo;
  const sql = `
      INSERT INTO users(name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at, updated_at;
    `;
  const result = await query(sql, [name, email, password, role]);
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const sql = `
      SELECT * FROM users WHERE email = $1;
    `;
  const result = await query(sql, [email]);
  return result.rows[0];
};
