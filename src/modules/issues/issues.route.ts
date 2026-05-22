import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { UserRoles } from "../users/users.types";
import * as issueController from "./issues.controller";

const issuesRouter: Router = Router();

issuesRouter.post(
  "/",
  auth(UserRoles.CONTRIBUTOR, UserRoles.MAINTAINER),
  issueController.createIssue,
);

issuesRouter.get("/", issueController.getIssues);

issuesRouter.get("/:id", issueController.getIssue);
issuesRouter.delete(
  "/:id",
  auth(UserRoles.CONTRIBUTOR, UserRoles.MAINTAINER),
  issueController.deleteIssue,
);

issuesRouter.put(
  "/:id",
  auth(UserRoles.CONTRIBUTOR, UserRoles.MAINTAINER),
  issueController.updateIssue,
);

export default issuesRouter;
