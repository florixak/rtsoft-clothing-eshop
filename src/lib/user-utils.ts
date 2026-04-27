import { users } from "@/data";
import type { MockUser } from "@/data/users";
import type { User } from "@/types";

export const getUserById = (id: string) => {
  return users.find((user) => user.id === id) ?? null;
};

export const getUserByEmail = (email?: string | null) => {
  if (!email) {
    return null;
  }

  const normalizedEmail = email.toLowerCase();

  return (
    users.find((user) => user.email.toLowerCase() === normalizedEmail) ?? null
  );
};

export const toPublicUser = ({ password, ...user }: MockUser): User => {
  void password;

  return user;
};
