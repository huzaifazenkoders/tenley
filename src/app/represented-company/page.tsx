"use client";
import { acceptInvitation } from "@/features/auth/services";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const RepresentedCompanyContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid invitation link.");
      setStatus("error");
      return;
    }

    acceptInvitation(token, email).then(({ error }) => {
      if (error) {
        setErrorMessage(error);
        setStatus("error");
      } else {
        setStatus("success");
      }
    });
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => router.replace("/"), 3000);
    return () => clearTimeout(timer);
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-10 animate-spin text-brand-primary-red-600-d" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-sm px-6">
          <XCircle className="size-16 text-red-500" />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-brand-Text-950-d">Something went wrong</h1>
            <p className="text-brand-Text-500 text-base font-normal leading-6">
              {errorMessage ?? "Failed to accept the invitation. Please try again."}
            </p>
          </div>
          <Button size="lg" onClick={() => router.replace("/")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm px-6">
        <CheckCircle2 className="size-16 text-green-500" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-brand-Text-950-d">
            You&apos;re In!
          </h1>
          <p className="text-brand-Text-500 text-base font-normal leading-6">
            You&apos;ve successfully accepted the invitation and joined the
            company. Redirecting you to the dashboard&hellip;
          </p>
        </div>
        <Button size="lg" onClick={() => router.replace("/")}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

const RepresentedCompanyPage = () => (
  <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="size-10 animate-spin text-brand-primary-red-600-d" /></div>}>
    <RepresentedCompanyContent />
  </Suspense>
);

export default RepresentedCompanyPage;
