import query from "../../config/db";
import { TUserInput, TUserResponse } from "./auth.types";

export const createUser = async (
  userInfo: TUserInput,
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
