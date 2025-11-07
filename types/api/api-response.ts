
import ApiStatusCodes from "@/constants/api-status-codes";

export type ApiResponseServer<T> = {
  success: boolean;
  message: string;
  status: ApiStatusCodes;
  data?: T | null;
  error?: string | null;
};
