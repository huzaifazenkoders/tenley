"use client";

import { createClient } from "@/features/supabase/client";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useUserStore();

  useEffect(() => {
    const supabase = createClient();

    // Fetch current session on mount
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    // Keep store in sync on sign-in / sign-out / token refresh
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return <>{children}</>;
}
