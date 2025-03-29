import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      en: string;
      es: string;
    }
  >
>;

const errorCodes = {
  USER_ALREADY_EXISTS: {
    en: "user already registered",
    es: "usuario ya registrada",
  },
} satisfies ErrorTypes;

export const getAuthErrorMessage = (code: string, lang: "en" | "es") => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "Something went wrong";
};
