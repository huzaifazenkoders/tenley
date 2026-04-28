"use client";
import { acceptInvitation } from "@/features/auth/services";
import { createClient } from "@/features/supabase/client";
import { Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AcceptInvitationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";
  const name = searchParams.get("name") ?? "";
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Invalid invitation link.");
      return;
    }

    const handle = async () => {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        const callbackUrl = encodeURIComponent(window.location.href);
        router.replace(`/auth/sign-in?callbackUrl=${callbackUrl}`);
        return;
      }

      const { error: inviteError } = await acceptInvitation(token, email);

      if (inviteError) {
        // User has no account yet — send to sign-up with invite params pre-filled
        router.replace(
          `/auth/sign-up?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`
        );
        return;
      }

      router.replace(`/represented-company?token=${encodeURIComponent(token)}`);
    };

    handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col gap-4">
        <XCircle className="size-12 text-red-500" />
        <p className="text-brand-Text-500 text-base">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="size-10 animate-spin text-brand-primary-red-600-d" />
    </div>
  );
};

export default AcceptInvitationPage;
