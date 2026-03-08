"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useSignup } from "./hook";
import { SIGNUP_BYOK_ACKNOWLEDGEMENT_TEXT } from "./constants";
import { signupSchema } from "./rules";
import type { SignupFormValues, SignupType } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/shared/FormMessage";
import { Button } from "@/components/ui/button";

type SignupFormProps = {
  type: SignupType;
};

export const SignupForm = ({ type }: SignupFormProps) => {
  const { submit, isPending } = useSignup(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeToByok: false,
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor="signup-name">Name</Label>
        <Input id="signup-name" type="text"  placeholder={ type === "developer" ?  "Your Name" : "Acme Digital Agency"} autoComplete="name" {...register("name")} />
        <FormMessage>{errors.name?.message}</FormMessage>
      </div>

     <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
           placeholder={ type === "developer" ?  "you@developer.com" : "you@agency.com"} 
          {...register("email")}
        />
        <FormMessage>{errors.email?.message}</FormMessage>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a strong password"
          {...register("password")}
        />
        <FormMessage>{errors.password?.message}</FormMessage>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <input
            id="signup-agree-byok"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border border-input"
            aria-invalid={Boolean(errors.agreeToByok)}
            {...register("agreeToByok")}
          />
          <Label htmlFor="signup-agree-byok" className="text-sm leading-6 font-normal">
            {SIGNUP_BYOK_ACKNOWLEDGEMENT_TEXT}
          </Label>
        </div>
        <FormMessage>{errors.agreeToByok?.message}</FormMessage>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" size="lg" disabled={isPending}>
        {isPending ? "Creating account..." : "Start 14-Day Evaluation"}
      </Button>
    </form>
  );
};
