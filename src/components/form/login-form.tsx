import { useState } from "react";
import {
  PREPARED_USERS_HINT_ID,
  PreparedUsersHint,
} from "@/components/auth/prepared-users-hint";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { MockUser } from "@/data/users";
import { login } from "@/lib/auth";
import { InvalidCredentialsError } from "@/lib/errors";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { getSafeReturnPath } from "@/lib/return-path";
import toast from "react-hot-toast";
import { Trans, useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { MIN_PASSWORD_LENGTH } from "@/constants";
import { showInfoToast } from "@/lib/toasts";

type FieldErrors = {
  email?: string;
  password?: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation([TRANSLATION_NAMESPACES.auth, "common"]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const { redirect: redirectParam } = useSearch({ from: "/{-$locale}/login" });

  const { mutateAsync: loginAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success(t("login.toast.success"));
      const returnPath = getSafeReturnPath(redirectParam);
      if (returnPath) {
        await navigate({ href: returnPath });
        return;
      }
      await navigate({ to: "/{-$locale}/account" });
    },
    onError: (error) => {
      toast.error(
        error instanceof InvalidCredentialsError
          ? t("login.toast.invalidCredentials")
          : t("login.toast.error"),
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const rememberMe = formData.get("rememberMe") === "on";

    const result = loginSchema.safeParse({ email, password, rememberMe });

    if (!result.success) {
      const errors: FieldErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;

        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }

      setFieldErrors(errors);
      return;
    }

    await loginAsync(result.data);
  };

  const sendComingSoonToast = () => {
    showInfoToast(t("common:toast.comingSoon"));
  };

  const fillPreparedUser = (user: MockUser) => {
    setEmail(user.email);
    setPassword(user.password);
    setFieldErrors({});
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit} noValidate>
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
                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("login.fields.email.placeholder")}
                    required
                    value={email}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? "login-email-error" : undefined
                    }
                    className={fieldErrors.email ? "border-destructive" : ""}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          email: undefined,
                        }));
                      }
                    }}
                  />
                  {fieldErrors.email && (
                    <em
                      id="login-email-error"
                      className="text-destructive text-sm"
                      role="alert"
                    >
                      {t("common:" + fieldErrors.email)}
                    </em>
                  )}
                </div>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    {t("login.fields.password.label")}
                  </FieldLabel>
                  <a
                    href={`#${PREPARED_USERS_HINT_ID}`}
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {t("login.fields.forgotPassword")}
                  </a>
                </div>
                <div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder={t("login.fields.password.placeholder")}
                    value={password}
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={
                      fieldErrors.password ? "login-password-error" : undefined
                    }
                    className={fieldErrors.password ? "border-destructive" : ""}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (fieldErrors.password) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          password: undefined,
                        }));
                      }
                    }}
                  />
                  {fieldErrors.password && (
                    <em
                      id="login-password-error"
                      className="text-destructive text-sm"
                      role="alert"
                    >
                      {t("common:" + fieldErrors.password, {
                        min: MIN_PASSWORD_LENGTH,
                      })}
                    </em>
                  )}
                </div>
              </Field>
              <Field>
                <label className="inline-flex items-center justify-end gap-2">
                  <Checkbox name="rememberMe" />
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

              <PreparedUsersHint onFill={fillPreparedUser} />

              <FieldDescription className="text-center">
                {t("login.doesNotHaveAccount")}{" "}
                <a
                  href={`#${PREPARED_USERS_HINT_ID}`}
                  className="hover:underline"
                >
                  {t("login.register")}
                </a>
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
            terms: (
              <Link
                to="."
                className="underline"
                onClick={sendComingSoonToast}
              />
            ),
            privacy: (
              <Link
                to="."
                className="underline"
                onClick={sendComingSoonToast}
              />
            ),
          }}
        />
      </FieldDescription>
    </div>
  );
}
