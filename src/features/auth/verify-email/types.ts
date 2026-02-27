export type ResendVerificationPayload = {
  email: string;
};

export type ValidationErrorResponse = {
  message?: string;
  errors?: {
    verified?: string[];
    [key: string]: string[] | undefined;
  };
};
