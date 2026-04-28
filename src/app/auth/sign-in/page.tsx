import SignInView from "@/features/auth/views/SignInView";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SignInView />
    </Suspense>
  );
};

export default page;
