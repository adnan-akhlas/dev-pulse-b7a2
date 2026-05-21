import { Router } from "express";
import * as authController from "./auth.controller";

const authRouter: Router = Router();

authRouter.post("/signup", authController.signup);

export default authRouter;
