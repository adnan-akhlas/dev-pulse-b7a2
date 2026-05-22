import { IIssuesFilters, IIssuesQueries, TIssueRegister } from "./issues.types";
import * as issueRepository from "./issues.repository";

export const registerIssue = async (payload: TIssueRegister) => {
  const data = await issueRepository.insertIssueIntoDb(payload);
  return data;
};

export const getIssues = async (queries: IIssuesQueries) => {
  const filters = {
    sort: queries.sort || "newest",
    type: queries.type || undefined,
    status: queries.status || undefined,
  } as IIssuesFilters;

  const data = await issueRepository.selectIssuesFromDb(filters);
  return data;
};

export const getIssue = async (id: number) => {
  const data = await issueRepository.selectIssueFromDb(id);
  return data;
};
