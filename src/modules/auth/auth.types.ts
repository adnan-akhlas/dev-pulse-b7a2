import { IUser } from "../users/users.types";

export type TUserRegister = Pick<IUser, "name" | "email" | "password" | "role">;

export type TUserResponse = Omit<IUser, "password">;

export type TUserLogin = Pick<IUser, "email" | "password">;

export type TUserJwt = Pick<IUser, "email" | "role">;
