export type SignupType = "agency" | "developer";

export type SignupInput = {
  name: string;
  email: string;
  password: string;
  type: SignupType;
};

export type SignupFormValues = Omit<SignupInput, "type">;

export type SignupResponse = {
  status: true;
  data: {
    id: number | string;
    name: string;
  };
};
