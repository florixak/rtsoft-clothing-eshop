import { seedUserProfiles } from "@/data/user-profiles";
import { delayFor } from "./network";
import type { User, UserProfile } from "@/types";
import { normalizeProfile } from "./user-utils";
import { USER_PROFILES_STORAGE_KEY } from "@/constants";

type StoredProfiles = Record<User["id"], UserProfile>;

const readStoredProfiles = (): StoredProfiles => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(
      localStorage.getItem(USER_PROFILES_STORAGE_KEY) ?? "{}",
    ) as StoredProfiles;
  } catch {
    return {};
  }
};

const readProfiles = (): StoredProfiles => ({
  ...seedUserProfiles,
  ...readStoredProfiles(),
});

const writeStoredProfile = (userId: User["id"], profile: UserProfile) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const stored = readStoredProfiles();
    stored[userId] = profile;
    localStorage.setItem(USER_PROFILES_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    console.warn("Failed to persist user profile to localStorage");
  }
};

export const getUserProfileSync = (userId: User["id"]): UserProfile | null => {
  const profiles = readProfiles();
  return profiles[userId] ?? null;
};

export const saveUserProfile = async (
  userId: User["id"],
  profile: UserProfile,
): Promise<UserProfile> => {
  await delayFor("userProfile");

  const normalizedProfile = normalizeProfile(profile);
  writeStoredProfile(userId, normalizedProfile);

  return normalizedProfile;
};

export const saveUserProfileFromShipping = (
  userId: User["id"],
  shipping: UserProfile,
) => {
  const normalizedProfile = normalizeProfile(shipping);
  writeStoredProfile(userId, normalizedProfile);
};
