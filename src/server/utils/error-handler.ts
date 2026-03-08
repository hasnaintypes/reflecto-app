import { TRPCError } from "@trpc/server";

export const handleServiceError = (
  error: unknown,
  fallbackMessage: string,
): TRPCError => {
  if (error instanceof TRPCError) return error;

  const err = error instanceof Error ? error : new Error(String(error));
  console.error(`[Service Error]: ${fallbackMessage}`, err.message, err.stack);

  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: fallbackMessage,
    cause: error,
  });
};
