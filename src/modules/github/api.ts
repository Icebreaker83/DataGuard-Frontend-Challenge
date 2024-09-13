import axios from "axios";
import { useApis, ApiResponse } from "@/modules/api";

axios.defaults.baseURL = import.meta.env.VITE_GITHUB_BASE_URL;

export const useEndpoints = () => {
  const { loading, sendRequest } = useApis(axios);

  const getRepositoriesBySearchQuery = (
    query: string,
    successCallback: (response: ApiResponse) => void,
    finallyCallback?: () => void
  ) => {
    return sendRequest({
      method: "get",
      url: `search/repositories?${query}`,
      onSuccess: {
        callback: successCallback,
      },
      ...(finallyCallback && { finally: finallyCallback }),
    });
  };

  return {
    loading,
    getRepositoriesBySearchQuery,
  };
};
