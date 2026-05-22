import express, { Application, NextFunction, Request, Response } from "express";
import env from "./config/env";
import authRouter from "./modules/auth/auth.route";
import status from "http-status";
import { globalErrorHandler } from "./middlewares/globalError.middleware";
import issuesRouter from "./modules/issues/issues.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRouter);

app.get("/", (_req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    message: "Welcome to the Dev-Pulse API Engine",
    environment: env.environment,
    endpoints: {},
  });
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    error: "Not Found",
    message: `The request path ${req.originalUrl} does not exist on the server.`,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

export default app;
