import { users } from "@/data";
import type { MockUser } from "@/data/users";
import type { User, UserProfile } from "@/types";
import { delayFor } from "./network";
import { getUserProfileSync } from "./user-profile-storage";

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

export const getUserProfile = async (
  userId: User["id"],
): Promise<UserProfile | null> => {
  await delayFor("default");
  return getUserProfileSync(userId);
};

export const normalizeProfile = (profile: UserProfile): UserProfile => ({
  phone: profile.phone?.trim() || undefined,
  streetAddress: profile.streetAddress.trim(),
  city: profile.city.trim(),
  postalCode: profile.postalCode.trim(),
  country: profile.country.trim(),
});
