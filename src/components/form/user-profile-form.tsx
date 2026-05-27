import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { QUERY_KEYS } from "@/constants";
import { useProfileForm } from "@/hooks/form";
import { createUserProfileQueryOptions } from "@/hooks/query-options";
import useUser from "@/hooks/use-user";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import {
  getProfileDefaultValues,
  profileFormOpts,
} from "@/lib/user-profile-form";
import { saveUserProfile } from "@/lib/user-profile-storage";
import type { UserProfile } from "@/types";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const UserProfileForm = () => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.account,
    TRANSLATION_NAMESPACES.common,
    TRANSLATION_NAMESPACES.checkout,
  ]);
  const user = useUser();
  const queryClient = useQueryClient();

  const { data: profile } = useSuspenseQuery(
    createUserProfileQueryOptions(user!.id),
  );

  const { mutateAsync: saveProfile } = useMutation({
    mutationFn: (values: UserProfile) => saveUserProfile(user!.id, values),
    onSuccess: (savedProfile) => {
      queryClient.setQueryData(QUERY_KEYS.userProfile(user!.id), savedProfile);
      toast.success(t("common:toast.savedChanges"));
    },
    onError: () => {
      toast.error(t("common:toast.genericError"));
    },
  });

  const form = useProfileForm({
    ...profileFormOpts,
    defaultValues: getProfileDefaultValues(profile),
    onSubmit: async ({ value }) => {
      await saveProfile(value);
    },
  });

  if (!user) {
    return null;
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      noValidate
    >
      <form.AppForm>
        <FieldGroup>
          <FieldDescription>{t("profile.description")}</FieldDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="firstName">
                {t("checkout:deliveryInfo.fields.firstName.label")}
              </FieldLabel>
              <Input id="firstName" value={user.firstName} disabled readOnly />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">
                {t("checkout:deliveryInfo.fields.lastName.label")}
              </FieldLabel>
              <Input id="lastName" value={user.lastName} disabled readOnly />
            </Field>
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="email">
                {t("checkout:deliveryInfo.fields.email.label")}
              </FieldLabel>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                readOnly
              />
            </Field>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-base font-semibold mb-4">
              {t("profile.addressTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <form.AppField
                  name="phone"
                  children={(field) => (
                    <field.TextField
                      label={t("checkout:deliveryInfo.fields.phone.label")}
                      placeholder={t(
                        "checkout:deliveryInfo.fields.phone.placeholder",
                      )}
                      type="tel"
                      inputMode="tel"
                      pattern="\+?[0-9()\s-]{6,25}"
                      maxLength={25}
                      minLength={6}
                    />
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <form.AppField
                  name="streetAddress"
                  children={(field) => (
                    <field.TextField
                      label={t("checkout:deliveryInfo.fields.street.label")}
                      placeholder={t(
                        "checkout:deliveryInfo.fields.street.placeholder",
                      )}
                      required
                    />
                  )}
                />
              </div>

              <form.AppField
                name="city"
                children={(field) => (
                  <field.TextField
                    label={t("checkout:deliveryInfo.fields.city.label")}
                    placeholder={t(
                      "checkout:deliveryInfo.fields.city.placeholder",
                    )}
                    required
                  />
                )}
              />

              <form.AppField
                name="postalCode"
                children={(field) => (
                  <field.TextField
                    label={t("checkout:deliveryInfo.fields.postalCode.label")}
                    placeholder={t(
                      "checkout:deliveryInfo.fields.postalCode.placeholder",
                    )}
                    type="text"
                    inputMode="text"
                    pattern="^[0-9A-Za-z\s-]{3,10}$"
                    maxLength={10}
                    minLength={3}
                    required
                  />
                )}
              />

              <div className="md:col-span-2">
                <form.AppField
                  name="country"
                  children={(field) => (
                    <field.TextField
                      label={t("checkout:deliveryInfo.fields.country.label")}
                      placeholder={t(
                        "checkout:deliveryInfo.fields.country.placeholder",
                      )}
                      required
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <Field>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? t("profile.actions.saving")
                    : t("profile.actions.save")}
                </Button>
              )}
            </form.Subscribe>
          </Field>
        </FieldGroup>
      </form.AppForm>
    </form>
  );
};

export default UserProfileForm;
