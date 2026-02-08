import { TRPCError } from "@trpc/server";

export const handleServiceError = (
  error: unknown,
  fallbackMessage: string,
): TRPCError => {
  if (error instanceof TRPCError) return error;

  console.error(`[Service Error]: ${fallbackMessage}`, error);

  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: fallbackMessage,
    cause: error,
  });
};
