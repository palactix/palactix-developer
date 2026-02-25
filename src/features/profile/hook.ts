"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getProfile } from "./api";

export const useProfile = () => {
  const router = useRouter();

  const query = useQuery({
    queryKey: ["me"],
    queryFn: getProfile,
    retry: false,
  });

  useEffect(() => {
    if (query.error instanceof Error && query.error.message === "Unauthorized") {
      //router.replace("/login");
    }
  }, [query.error, router]);

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
