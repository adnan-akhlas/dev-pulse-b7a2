import { TIssueRegister } from "./issues.types";
import * as issueRepository from "./issues.repository";

export const registerIssue = async (payload: TIssueRegister) => {
  const data = await issueRepository.insertIssueIntoDb(payload);
  return data;
};
