import createHttpError from "http-errors";
import query from "../../config/db";
import { IIssuesFilters, TIssueRegister } from "./issues.types";
import status from "http-status";

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

export const selectIssuesFromDb = async (filters: IIssuesFilters) => {
  const { sort, type, status } = filters;

  const conditions: string[] = [];
  const values: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  let sql = `SELECT * FROM issues`;

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  const orderDirection = sort === "oldest" ? "ASC" : "DESC";
  sql += ` ORDER BY created_at ${orderDirection};`;

  const res = await query(sql, values);
  const rawIssues = res.rows;

  if (rawIssues.length === 0) {
    return [];
  }

  const uniqueReporterIds = Array.from(
    new Set(rawIssues.map((issue) => issue.reporter_id)),
  );

  const placeholders = uniqueReporterIds
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  const userSql = `SELECT id, name, role FROM users WHERE id IN (${placeholders});`;

  const userRes = await query(userSql, uniqueReporterIds);
  const reporters = userRes.rows;

  const reporterMap = new Map();
  reporters.forEach((user) => {
    reporterMap.set(user.id, user);
  });

  const stitchedIssues = rawIssues.map((issue) => {
    const { reporter_id, ...issueData } = issue;

    return {
      ...issueData,
      reporter: reporterMap.get(reporter_id) || null,
    };
  });

  return stitchedIssues;
};

export const selectIssueFromDb = async (id: number) => {
  const sql = `SELECT * FROM issues WHERE id=$1`;

  const res = await query(sql, [id]);
  const rawIssue = res.rows;

  if (rawIssue.length === 0) {
    throw createHttpError(
      status.NOT_FOUND,
      "The requested issue could not be found.",
    );
  }

  const issues = { ...res.rows[0] };

  const userSql = `SELECT id, name, role FROM users WHERE id=$1;`;

  const userRes = await query(userSql, [issues.reporter_id]);
  const user = userRes.rows[0];

  delete issues.reporter_id;
  const stitchedIssues = { ...issues, reporter: user };

  return stitchedIssues;
};
