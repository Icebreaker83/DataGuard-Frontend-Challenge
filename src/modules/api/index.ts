import type { HttpRequest, ApiResponse } from "./types";
import { useAlerts } from "@/modules/alerts";
import { t } from "@/plugins/i18n";
import { AxiosStatic } from "axios";

export { ApiResponse };
export const useApis = (apiClient: AxiosStatic) => {
  const { showAlert } = useAlerts();
  const loading = ref(false);

  const handleResponse = (
    passedRequest: HttpRequest,
    response: ApiResponse
  ) => {
    const { onSuccess } = passedRequest;

    onSuccess?.callback?.(response);

    onSuccess?.message &&
      showAlert({
        type: "success",
        color: "green-lighten-4",
        message: onSuccess.message,
      });
  };

  const handleRequest = async (passedRequest: HttpRequest) => {
    const {
      method,
      url,
      data,
      headers,
      responseType,
      onError,
      finally: finallyCallback,
    } = passedRequest;

    loading.value = true;
    return apiClient({
      method,
      url,
      data,
      headers,
      responseType,
    })
      .then((response) => {
        handleResponse(passedRequest, response);
        return response;
      })
      .catch((error) => {
        console.log(1);
        if (apiClient.isCancel(error)) return;
        console.error(error);

        const message =
          error.status && error.message
            ? `${error.status} - ${error.message}`
            : null;
        const noAlert =
          typeof onError?.noAlert === "function"
            ? onError.noAlert(error)
            : onError?.noAlert;
        console.log("noAlert: ", noAlert);
        !noAlert &&
          showAlert({
            type: "error",
            message: onError?.message ?? message ?? t("misc.error"),
          });
        onError?.callback?.(error);
      })
      .finally(() => {
        finallyCallback?.();
        loading.value = false;
      });
  };

  let debounce: ReturnType<typeof setTimeout> | undefined;
  const sendRequest = async (passedRequest: HttpRequest) => {
    if (!passedRequest.debounce) return handleRequest(passedRequest);
    clearTimeout(debounce);
    const timer =
      typeof passedRequest.debounce === "boolean"
        ? import.meta.env.VITE_DEFAULT_DEBOUNCE
        : passedRequest.debounce;
    debounce = setTimeout(() => {
      handleRequest(passedRequest);
    }, timer);
  };

  return {
    loading,
    sendRequest,
  };
};
