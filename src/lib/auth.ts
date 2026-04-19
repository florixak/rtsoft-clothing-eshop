import { getUserByEmail, getUserById, toPublicUser } from "@/data";
import type { MockUser } from "@/data/users";
import type { AuthSession, LoginInput, Role, User } from "@/types";

const AUTH_SESSION_STORAGE_KEY = "auth-session";

const isBrowser = () => typeof window !== "undefined";

const readSessionFromStorage = (storage: Storage): AuthSession | null => {
  try {
    const rawSession = storage.getItem(AUTH_SESSION_STORAGE_KEY);
    return rawSession ? (JSON.parse(rawSession) as AuthSession) : null;
  } catch {
    return null;
  }
};

const readSession = (): AuthSession | null => {
  if (!isBrowser()) {
    return null;
  }

  return (
    readSessionFromStorage(sessionStorage) ??
    readSessionFromStorage(localStorage)
  );
};

const writeSession = (session: AuthSession) => {
  if (!isBrowser()) {
    return;
  }

  const storage = session.rememberMe ? localStorage : sessionStorage;
  const fallbackStorage = session.rememberMe ? sessionStorage : localStorage;

  storage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  fallbackStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
};

const clearSession = () => {
  if (!isBrowser()) {
    return;
  }

  sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
};

const createSession = (user: MockUser, rememberMe: boolean): AuthSession => ({
  userId: user.id,
  rememberMe,
  createdAt: new Date().toISOString(),
});

export const login = async ({
  email,
  password,
  rememberMe = false,
}: LoginInput): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = getUserByEmail(email);

  if (!user || user.password !== password) {
    throw new Error("login.errors.invalidCredentials");
  }

  const session = createSession(user, rememberMe);
  writeSession(session);

  return toPublicUser(user);
};

export const logout = () => {
  clearSession();
};

export const getCurrentSession = () => {
  return readSession();
};

export const getCurrentUser = (): User | null => {
  const session = readSession();
  if (!session) {
    return null;
  }

  const user = getUserById(session.userId);
  return user ? toPublicUser(user) : null;
};

export const getCurrentUserId = () => {
  return getCurrentUser()?.id ?? null;
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export const hasRole = (role: Role) => {
  return getCurrentUser()?.role === role;
};
