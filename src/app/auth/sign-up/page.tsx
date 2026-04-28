import SignUpView from "@/features/auth/views/SignUpView";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SignUpView />
    </Suspense>
  );
};

export default page;
