import { formOptions } from "@tanstack/react-form";
import type { UserProfile } from "@/types";
import { userProfileSchema, type UserProfileInput } from "./validators";

const emptyProfile: UserProfileInput = {
  phone: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const getProfileDefaultValues = (
  profile?: UserProfile | null,
): UserProfileInput => ({
  ...emptyProfile,
  phone: profile?.phone ?? "",
  streetAddress: profile?.streetAddress ?? "",
  city: profile?.city ?? "",
  postalCode: profile?.postalCode ?? "",
  country: profile?.country ?? "",
});

export const profileFormOpts = formOptions({
  defaultValues: getProfileDefaultValues(),
  validators: {
    onChange: userProfileSchema,
    onBlur: userProfileSchema,
    onSubmit: userProfileSchema,
  },
});
