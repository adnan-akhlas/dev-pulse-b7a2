import { Request, Response, NextFunction } from "express";
import status from "http-status";

interface IAppError extends Error {
  status?: number;
  statusCode?: number;
}

export const globalErrorHandler = (
  err: IAppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode =
    err.statusCode || err.status || status.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || "An unexpected server error occurred.";
  const errorType = err.name || "INTERNAL_SERVER_ERROR";

  res.status(statusCode).json({
    success: false,
    error: errorType,
    message: errorMessage,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
