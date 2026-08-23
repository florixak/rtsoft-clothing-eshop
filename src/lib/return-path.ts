const LOGIN_PATH_SEGMENT = /(?:^|\/)login(?:\/|$|\?)/;

const hasControlChars = (value: string) => {
  for (const char of value) {
    if (char.charCodeAt(0) < 32) {
      return true;
    }
  }

  return false;
};

export const getSafeReturnPath = (value?: string | null): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.includes("://") ||
    trimmed.includes("\\") ||
    hasControlChars(trimmed) ||
    LOGIN_PATH_SEGMENT.test(trimmed)
  ) {
    return null;
  }

  return trimmed;
};
