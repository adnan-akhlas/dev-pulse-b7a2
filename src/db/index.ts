/* eslint-disable no-console */
import query from "../config/db";

const createUsersTable = async () => {
  return await query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'contributor',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT check_user_role CHECK(role IN ('contributor', 'maintainer'))
      );
    `);
};

const createIssuesTable = async () => {
  return await query(`
      CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'open',
        reported_id INT REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT check_issue_type CHECK(type IN ('bug', 'feature_request')),
        CONSTRAINT check_status_type CHECK(status IN ('open', 'in_progress', 'resolved'))
      );
    `);
};

export const initDb = async () => {
  try {
    console.log("Starting database initialization...");

    await createUsersTable();
    console.log("Created Users Table.");

    await createIssuesTable();
    console.log("Created Issues Table.");

    console.log("Database initialization completed successfully.");
  } catch (error: unknown) {
    console.error("Error initializing database:", error);
  }
};
