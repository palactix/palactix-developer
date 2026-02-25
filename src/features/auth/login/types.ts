export type LoginInput = {
  email: string;
  password: string;
};

export type AuthUser = Record<string, unknown> | null;

export type LoginResponse = {
  user: AuthUser;
};