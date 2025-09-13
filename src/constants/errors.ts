export const AUTH_ERRORS = {
  INVALID_INPUT: "Please check your input and try again.",
  EMAIL_EXISTS:
    "This email is already registered. Please sign in or use another email.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  TOO_MANY_REQUESTS: "Too many requests. Please wait and try again.",
} as const;

export type AuthErrorKey = keyof typeof AUTH_ERRORS;
