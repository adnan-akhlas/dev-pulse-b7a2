import createHttpError from "http-errors";
import * as issuesRepository from "./issues.repository";
import {
  IIssuesFilters,
  IIssuesQueries,
  IUpdateIssuePayload,
  TIssueRegister,
} from "./issues.types";
import status from "http-status";

export const registerIssue = async (payload: TIssueRegister) => {
  const data = await issuesRepository.insertIssueIntoDb(payload);
  return data;
};

export const getIssues = async (queries: IIssuesQueries) => {
  const filters = {
    sort: queries.sort || "newest",
    type: queries.type || undefined,
    status: queries.status || undefined,
  } as IIssuesFilters;

  const data = await issuesRepository.selectIssuesFromDb(filters);
  return data;
};

export const getIssue = async (id: number) => {
  const data = await issuesRepository.selectIssueFromDb(id);
  return data;
};

export const deleteIssue = async (id: number, userId: number) => {
  const data = await issuesRepository.deleteIssueFromDb(id, userId);
  if (data) {
    return;
  }

  const reporterId = await issuesRepository.getIssueReporterId(id);

  if (reporterId === null) {
    throw createHttpError(
      status.NOT_FOUND,
      "Cannot delete issue because it does not exist.",
    );
  }

  throw createHttpError(
    status.UNAUTHORIZED,
    "You are not authorized to delete this issue.",
  );
};

export const updateIssue = async (
  issueId: number,
  userId: number,
  userRole: "maintainer" | "contributor",
  payload: IUpdateIssuePayload,
) => {
  const { updateCount, data } = await issuesRepository.updateIssueInDb(
    issueId,
    userId,
    userRole,
    payload,
  );

  if (updateCount === 1) {
    return data;
  }

  const issueMeta = await issuesRepository.getIssueOwnershipAndStatus(issueId);

  if (!issueMeta) {
    throw createHttpError(
      status.NOT_FOUND,
      "Cannot update issue because it does not exist.",
    );
  }

  if (userRole === "contributor" && issueMeta.reporter_id !== userId) {
    throw createHttpError(
      status.UNAUTHORIZED,
      "You are not authorized to update this issue.",
    );
  }

  if (userRole === "contributor" && issueMeta.status !== "open") {
    throw createHttpError(
      status.BAD_REQUEST,
      `Cannot update issue because it is already '${issueMeta.status}'. Only open issues can be updated.`,
    );
  }

  throw createHttpError(
    status.INTERNAL_SERVER_ERROR,
    "An unexpected error occurred while modifying the issue.",
  );
};
