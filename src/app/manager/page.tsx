"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/services/authService";
import { useUserStore } from "@/store/userStore";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ManagerPage = () => {
  const router = useRouter();
  const { setUser, profile } = useUserStore();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error(error);
      return;
    }
    setUser(null);
    router.replace("/auth/sign-in");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm px-6">
        <Building2 className="size-16 text-brand-primary-red-600-d" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-brand-Text-950-d">
            Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
          </h1>
          <p className="text-brand-Text-500 text-base font-normal leading-6">
            Your manager account is active. The full manager dashboard is coming
            soon.
          </p>
        </div>
        <Button variant="outline" size="lg" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ManagerPage;
