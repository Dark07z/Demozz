export const API_BASE = "http://localhost:3001";

const AUTH_EMAIL_STORAGE_KEY = "nike-auth-email";
const AUTH_COUNTRY_STORAGE_KEY = "nike-auth-country";

const hasWindow = () => typeof window !== "undefined";

export const normalizeEmail = (value) => value.trim().toLowerCase();

export const saveEmail = (value) => {
  if (!hasWindow()) {
    return;
  }

  if (!value) {
    sessionStorage.removeItem(AUTH_EMAIL_STORAGE_KEY);
    return;
  }

  sessionStorage.setItem(AUTH_EMAIL_STORAGE_KEY, value);
};

export const readEmail = () => {
  if (!hasWindow()) {
    return "";
  }

  return sessionStorage.getItem(AUTH_EMAIL_STORAGE_KEY) || "";
};

export const saveCountry = (value) => {
  if (!hasWindow() || !value) {
    return;
  }

  sessionStorage.setItem(AUTH_COUNTRY_STORAGE_KEY, value);
};

export const readCountry = () => {
  if (!hasWindow()) {
    return "Vietnam";
  }

  return sessionStorage.getItem(AUTH_COUNTRY_STORAGE_KEY) || "Vietnam";
};
