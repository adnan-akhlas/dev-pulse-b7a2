interface IUserInfo {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export type TUserInput = Pick<
  IUserInfo,
  "name" | "email" | "password" | "role"
>;

export type TUserResponse = Omit<IUserInfo, "password">;
