import { useQuery } from "@tanstack/react-query";
import { listPlatforms } from "./platform.api";

export const usePlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const response = await listPlatforms();
      return response.data;
    },
  });
};