export type SignupType = "agency" | "developer";

export type SignupInput = {
  name: string;
  email: string;
  password: string;
  type: SignupType;
};

export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  agreeToByok: boolean;
};

export type SignupResponse = {
  status: true;
  data: {
    id: number | string;
    name: string;
  };
};
