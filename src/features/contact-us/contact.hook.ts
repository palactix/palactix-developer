import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactFormPayload } from "./contact.type";
import { submitContactForm } from "./contact.api";
import { notify } from "@/shared/notifications/notifier";

export const useSubmitContactForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (payload: ContactFormPayload) => submitContactForm(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["apps"] });
        notify.success("Message sent successfully! We'll get back to you soon.");
      },
      onError: () => {
        notify.error("Failed to send message. Please try again later.");
      },
    });
};
