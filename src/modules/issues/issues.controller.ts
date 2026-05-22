import { Request, Response } from "express";
import status from "http-status";
import asyncHandler from "../../utils/asyncHandler.util";
import { sendResponse } from "../../utils/sendResponse.util";
import { IUser } from "../users/users.types";
import * as issuesService from "./issues.service";

export const createIssue = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const user = req.user as IUser;
  const payload = { ...body, reporter_id: user.id };
  const data = await issuesService.registerIssue(payload);
  sendResponse(res, {
    status: status.CREATED,
    success: true,
    message: "Issues has been registered successfully",
    data,
  });
});

export const getIssues = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const data = await issuesService.getIssues(query);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Issues retrieved successfully.",
    data,
  });
});

export const getIssue = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await issuesService.getIssue(id);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Issue retrieved successfully.",
    data,
  });
});

export const deleteIssue = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const id = Number(req.params.id);
  const data = await issuesService.deleteIssue(id, user.id);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Issue deleted successfully.",
    data,
  });
});

export const updateIssue = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = req.user as IUser;
  const payload = req.body;

  const data = await issuesService.updateIssue(id, user.id, user.role, payload);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Issue updated successfully.",
    data,
  });
});
