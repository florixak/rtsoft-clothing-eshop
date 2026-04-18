import { getCurrentUser } from "@/lib/auth";
import type { User } from "@/types";

const useUser = (): User | null => {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }

  return user;
};

export default useUser;
