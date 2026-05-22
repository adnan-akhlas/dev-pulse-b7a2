export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export type TUserRegister = Pick<IUser, "name" | "email" | "password" | "role">;

export type TUserResponse = Omit<IUser, "password">;

export type TUserLogin = Pick<IUser, "email" | "password">;

export type TUserJwt = Pick<IUser, "email" | "role">;
