import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler.util";
import { sendResponse } from "../../utils/sendResponse.util";
import status from "http-status";
import * as issueService from "./issues.service";
import { IUser } from "../users/users.types";

export const createIssue = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const user = req.user as IUser;
  const payload = { ...body, reporter_id: user.id };
  const data = await issueService.registerIssue(payload);
  sendResponse(res, {
    status: status.CREATED,
    success: true,
    message: "Issues has been registered successfully",
    data,
  });
});

export const getIssues = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const data = await issueService.getIssues(query);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Issues retrieved successfully.",
    data,
  });
});
