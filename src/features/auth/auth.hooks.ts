import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthError } from "@/lib/errors";
import { getMe } from "./auth.api";

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
      router.replace("/login");
    }

  }, [query.error, pathname, router]);

  useEffect(() => {
    if(query.data ) {
      const { developer } = query.data;
      console.log("Developer data:", developer);  

      if(!developer?.has_apps && pathname !== "/developer/onboarding") { 
        router.replace("/developer/onboarding");
      }
    }
  }, [query.data, pathname, router]);

  return query;
};
