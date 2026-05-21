/* eslint-disable no-console */
import http, { Server } from "node:http";
import app from "./app";
import env from "./config/env";
import { initDb } from "./db";

const server: Server = http.createServer(app);
const port = env.port;

(async function (): Promise<void> {
  try {
    server.listen(port, () =>
      console.log(`server is running on localhost:${port}`),
    );
    await initDb();
  } catch (error: unknown) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
})();
