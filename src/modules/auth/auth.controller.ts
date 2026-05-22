import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler.util";
import * as authService from "./auth.service";
import { sendResponse } from "../../utils/sendResponse.util";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const data = await authService.register(body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "User signup successfully.",
    data: data,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { accessToken, user } = await authService.loginUser(body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "User login successfully.",
    data: { accessToken, user },
  });
});
