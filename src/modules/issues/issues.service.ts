import { IIssuesFilters, IIssuesQueries, TIssueRegister } from "./issues.types";
import * as issueRepository from "./issues.repository";

export const registerIssue = async (payload: TIssueRegister) => {
  const data = await issueRepository.insertIssueIntoDb(payload);
  return data;
};

export const getIssues = async (queryParams: IIssuesQueries) => {
  const filters = {
    sort: queryParams.sort || "newest",
    type: queryParams.type || undefined,
    status: queryParams.status || undefined,
  } as IIssuesFilters;

  const data = await issueRepository.selectIssuesFromDb(filters);
  return data;
};
