/* eslint-disable no-console */
import http, { Server } from "node:http";
import app from "./app";
import env from "./config/env";

const server: Server = http.createServer(app);
const port = env.port;

(function (): void {
  server.listen(port, () =>
    console.log(`server is running on localhost:${port}`),
  );
})();
