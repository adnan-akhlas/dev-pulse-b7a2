import query from "../../config/db";
import { TIssueRegister } from "./issues.types";

export const insertIssueIntoDb = async (issueInfo: TIssueRegister) => {
  const { title, description, type, reporter_id } = issueInfo;
  const sql = `
      INSERT INTO issues(title, description, type, reporter_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  const result = await query(sql, [title, description, type, reporter_id]);
  return result.rows[0];
};
