import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthError } from "@/lib/errors";
import { getMe, logout } from "./auth.api";
import { loginRoute } from "./login";

export const useMe = () => {
  const router = useRouter();
  const pathname = usePathname();

  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await getMe();
      return response.data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  
  useEffect(() => {
    if (!query.error) return;
    if (pathname === "/login") return;

    const isUnauthorized = query.error instanceof AuthError && query.error.status === 401;
    if (isUnauthorized) {
      router.replace(loginRoute);
    }

  }, [query.error, pathname, router]);

  useEffect(() => {
    if(query.data ) {
      const { developer, signup_type } = query.data;

      // Agency owners skip the developer onboarding flow — they may not have apps yet
      if(signup_type !== "agency" && !developer?.has_apps && pathname !== "/developer/onboarding") {
        router.replace("/developer/onboarding");
      }
    }
  }, [query.data, pathname, router]);

  return query;
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } finally {
      queryClient.clear();
      router.replace(loginRoute);
    }
  };

  return { handleLogout, isLoading };
};
