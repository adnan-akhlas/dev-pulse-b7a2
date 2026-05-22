export const UserRoles = {
  CONTRIBUTOR: "contributor",
  MAINTAINER: "maintainer",
} as const;

export type TUserRoles = (typeof UserRoles)[keyof typeof UserRoles];

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: TUserRoles;
  created_at: string;
  updated_at: string;
}
