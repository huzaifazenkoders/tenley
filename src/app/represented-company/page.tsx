"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RepresentedCompanyPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

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

export default RepresentedCompanyPage;
