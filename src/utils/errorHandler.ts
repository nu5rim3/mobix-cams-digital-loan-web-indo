/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleApiError = (error: any) => {
  if (error?.response) {
    // If the error is from the server (e.g., 4xx or 5xx response codes)
    const status = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    // Customize the error message based on the status code if needed
    switch (status) {
      case 400:
        return "Bad request. Please check the input data.";
      case 401:
        return "Unauthorized. Please log in again.";
      case 403:
        return "Forbidden. You do not have access to this resource.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Server error. Please try again later.";
      case 501:
        return "Not implemented. Please try again later.";
      case 502:
        return "Bad gateway. Please try again later.";
      case 503:
        return "Service unavailable. Please try again later.";
      case 504:
        return "Gateway timeout. Please try again later.";
      default:
        return message;
    }
  } else if (error?.message) {
    // If the error is from the client side (e.g., network error)
    return error.message;
  } else {
    // Fallback error message
    return "An unexpected error occurred. Please try again.";
  }
};
