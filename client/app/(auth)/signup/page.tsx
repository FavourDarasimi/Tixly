"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const signup = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();
  useEffect(() => {
    if (!role) {
      router.push("/join");
    }
  }, [role, router]);

  if (!role) {
    return null;
  }
  return <div>signup</div>;
};

export default signup;
