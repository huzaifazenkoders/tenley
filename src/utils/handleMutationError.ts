import { isAxiosError } from "axios";
import { toast } from "sonner";

export const handleMutationError = (error: unknown) => {
  if (isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
    toast.error(message ?? "Something went wrong");
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Something went wrong");
  }
};
