"use client";

import { createClient } from "@/features/supabase/client";
import { getMe } from "@/features/settings/services/settingsService";
import { queryKeys } from "@/query-keys";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setMe, setMeLoading } = useUserStore();
  const user = useUserStore((s) => s.user);
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  const { data: meResponse, isLoading: isMeLoading } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    enabled: Boolean(user) && !isAuthRoute,
  });

  useEffect(() => {
    const supabase = createClient();

    // Fetch current session on mount
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (!user) {
        setMe(null);
      }
    });

    // Keep store in sync on sign-in / sign-out / token refresh
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (!nextUser) {
        setMe(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setMe, setUser]);

  useEffect(() => {
    setMeLoading(isMeLoading);
  }, [isMeLoading, setMeLoading]);

  useEffect(() => {
    if (meResponse) {
      setMe(meResponse.data);
    }
  }, [meResponse, setMe]);

  return <>{children}</>;
}
