import { apiClient } from "@/lib/api-client";
import { ContactFormPayload, ContactFormResponse } from "./contact.type";

export async function submitContactForm(payload: ContactFormPayload) {
  return apiClient<ContactFormResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
