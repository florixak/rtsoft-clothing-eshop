import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { Trans, useTranslation } from "react-i18next";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.auth);
  const navigate = useNavigate();

  const { mutateAsync: loginAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success(t("login.toast.success"));
      await navigate({ to: "/{-$locale}/account" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? t(error.message) : t("login.toast.error"),
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("rememberMe") === "on";

    await loginAsync({ email, password, rememberMe });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t("login.title")}</h1>
                <p className="text-balance text-muted-foreground">
                  {t("login.subtitle")}
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">
                  {t("login.fields.email.label")}
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("login.fields.email.placeholder")}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    {t("login.fields.password.label")}
                  </FieldLabel>
                  <Link
                    to="."
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {t("login.fields.forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder={t("login.fields.password.placeholder")}
                />
              </Field>
              <Field>
                <label className="inline-flex items-center justify-end gap-2">
                  <Input name="rememberMe" type="checkbox" className="size-4" />
                  <span className="text-sm">
                    {t("login.fields.rememberMe")}
                  </span>
                </label>
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending
                    ? t("login.actions.submitting")
                    : t("login.actions.submit")}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                {t("login.doesNotHaveAccount")}{" "}
                <Link to=".">{t("login.register")}</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        <Trans
          ns={TRANSLATION_NAMESPACES.auth}
          i18nKey="login.conditions"
          components={{
            terms: <Link to="." className="underline" />,
            privacy: <Link to="." className="underline" />,
          }}
        />
      </FieldDescription>
    </div>
  );
}
