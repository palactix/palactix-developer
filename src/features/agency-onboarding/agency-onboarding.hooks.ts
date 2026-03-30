import { useMutation } from "@tanstack/react-query";
import { checkUsernameAvailability, storeUsername } from "./agency-onboarding.api";

// ================= MUTATION HOOKS =================

export const useCheckUsername = () => {
  return useMutation({
    mutationFn: (username: string) => checkUsernameAvailability(username),
  });
};

export const useStoreUsername = () => {
  return useMutation({
    mutationFn: (username: string) => storeUsername(username),
  });
};
