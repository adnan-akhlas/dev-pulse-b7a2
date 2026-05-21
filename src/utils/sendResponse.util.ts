import { Response } from "express";

interface meta {
  limit: number;
  currentPage: number;
  totalPages: number;
  [key: string]: number;
}

interface responseData<T, K> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: meta;
  error?: K;
}

export const sendResponse = <T, K>(res: Response, data: responseData<T, K>) => {
  res.status(data.status).json({
    success: data.success,
    message: data.message,
    ...(data.data && { data: data.data }),
    ...(data.meta && { meta: data.meta }),
    ...(data.error && { error: data.error }),
  });
};
