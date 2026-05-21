/* eslint-disable no-console */
import query from "../config/db";

const createUsersTable = async () => {
  return await query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'contributor',
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
        type VARCHAR(20) NOT NULL,
        status VARCHAR(15) DEFAULT 'open',
        reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT check_issue_type CHECK(type IN ('bug', 'feature_request')),
        CONSTRAINT check_status_type CHECK(status IN ('open', 'in_progress', 'resolved')),
        CONSTRAINT check_description_length CHECK(LENGTH(description) >= 20)
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
