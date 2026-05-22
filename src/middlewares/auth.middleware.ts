import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import status from "http-status";
import { verifyUserToken } from "../utils/auth.util";
import env from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { findUserByEmailForLogin } from "../modules/auth/auth.repository";
import { IUser, TUserRoles } from "../modules/users/users.types";

const auth =
  (...roles: TUserRoles[]) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw createHttpError(
          status.UNAUTHORIZED,
          "Authentication required. Please log in to continue.",
        );
      }

      const decode = verifyUserToken(
        token,
        env.jwt_access_secret as string,
      ) as JwtPayload;

      const user = (await findUserByEmailForLogin(decode.email)) as IUser;

      if (!roles.includes(user.role)) {
        throw createHttpError(
          status.FORBIDDEN,
          "You do not have permission to perform this action.",
        );
      }

      req.user = user;
      next();
    } catch (error: unknown) {
      next(error);
    }
  };

export default auth;
