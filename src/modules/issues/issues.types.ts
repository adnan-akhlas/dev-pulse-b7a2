type TIssuesType = "bug" | "feature_request";
type TIssuesStatus = "open" | "in_progress" | "resolved";

export interface IIssue {
  id: number;
  title: string;
  description: string;
  type: TIssuesType;
  status: TIssuesStatus;
  reporter_id: number;
  created_at: string;
  updated_at: string;
}

export type TIssueRegister = Pick<
  IIssue,
  "title" | "description" | "type" | "reporter_id"
>;
