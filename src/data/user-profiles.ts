import type { UserProfile } from "@/types";

export const seedUserProfiles: Record<string, UserProfile> = {
  "user-42": {
    phone: "+420 777 123 456",
    streetAddress: "Václavské náměstí 1",
    city: "Praha",
    postalCode: "11000",
    country: "Česká republika",
  },
  "user-43": {
    phone: "+420 777 123 457",
    streetAddress: "Václavské náměstí 2",
    city: "Praha",
    postalCode: "11000",
    country: "Česká republika",
  },
};
