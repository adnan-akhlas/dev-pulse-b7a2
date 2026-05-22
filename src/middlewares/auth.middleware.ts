import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import status from "http-status";
import { verifyUserToken } from "../utils/auth.util";
import env from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { findUserByEmail } from "../modules/auth/auth.repository";
import { IUser, TUserRoles } from "../modules/users/users.types";

const auth =
  (...roles: TUserRoles[]) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw createHttpError(status.UNAUTHORIZED, "Please Login to continue.");
      }

      const decode = verifyUserToken(
        token,
        env.jwt_access_secret as string,
      ) as JwtPayload;

      const { password: _, ...user } = (await findUserByEmail(
        decode.email,
      )) as IUser;

      if (!roles.includes(user.role)) {
        throw createHttpError(status.FORBIDDEN, "Access forbidden.");
      }

      req.user = user;
      next();
    } catch (error: unknown) {
      next(error);
    }
  };

export default auth;
