import { User } from "@/types/user";

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthUser = User | null;

export type LoginResponse = {
  user: AuthUser;
};