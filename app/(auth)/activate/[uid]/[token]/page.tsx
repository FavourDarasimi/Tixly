"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { activateAccount, resendActivation } from "@/lib/auth-api/api";
import Button from "@/components/Button";

type ActivationStatus = "loading" | "success" | "error" | "expired";

const ActivateAccount = () => {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<ActivationStatus>("loading");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uid = params.uid as string;
  const token = params.token as string;

  useEffect(() => {
    if (!token || !uid) {
      setStatus("error");
      return;
    }

    // Activate account when component mounts
    activate(uid, token);
  }, [token, uid]);

  const activate = async (uid: string, token: string) => {
    try {
      const response = await activateAccount(uid, token); // This line is calling itself recursively

      // This condition will always be true if the recursive call doesn't throw an error
      setStatus("success");
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.log("Activation error:", error);
      setStatus("error");
    }
  };

  const resendActivationEmail = async () => {
    setIsSubmitting(true);
    try {
      const response = await resendActivation(email);
      setTimeout(() => {
        setIsSubmitting(false);
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.log("Failed to resend email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 pt-24">
      <div className="w-full max-w-md">
        {/* Loading State */}
        {status === "loading" && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-[#FF5722]/10 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#FF5722] animate-spin" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Activating Your Account
            </h1>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>

            {/* Debug info (remove in production) */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-xs text-gray-500 font-mono">UID: {uid}</p>
              <p className="text-xs text-gray-500 font-mono break-all">
                Token: {token}
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Account Activated!
            </h1>
            <p className="text-gray-600 mb-8">
              Your account has been successfully activated. You can now log in
              and start exploring events.
            </p>

            <div className="space-y-3">
              <Link href="/login">
                <button className="w-full py-4 rounded-full font-semibold bg-[#FF5722] hover:bg-[#E64A19] hover:shadow-lg hover:scale-105 transition-all duration-300 text-white">
                  Log In to Your Account
                </button>
              </Link>

              <p className="text-sm text-gray-500">
                Redirecting you to login in a few seconds...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Activation Failed
            </h1>
            <p className="text-gray-600 mb-8">
              We couldn't activate your account. The activation link may be
              invalid or expired.
            </p>

            {/* Resend Email Form */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#FF5722] mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Resend Activation Email
                </h3>
              </div>

              <div className="space-y-4">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF5722] focus:outline-none transition-colors"
                />

                <Button
                  disabled={isSubmitting}
                  onClick={resendActivationEmail}
                  type="primary"
                  size="medium"
                  className="w-full rounded-full py-3 font-semibold"
                >
                  {isSubmitting ? "Resending..." : "Resend Email"}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/join">
                <button className="w-full py-4 rounded-full font-semibold border-2 border-gray-300 hover:border-gray-400 hover:shadow-md hover:scale-105 transition-all duration-300 text-gray-700">
                  Create New Account
                </button>
              </Link>

              <Link href="/login">
                <p className="text-sm text-[#FF5722] font-semibold hover:underline">
                  Already have an account? Log in
                </p>
              </Link>
            </div>
          </div>
        )}

        {/* Expired State */}
        {status === "expired" && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-orange-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Link Expired
            </h1>
            <p className="text-gray-600 mb-8">
              This activation link has expired. Please request a new activation
              email.
            </p>

            {/* Resend Email Form */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#FF5722] mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Request New Link
                </h3>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF5722] focus:outline-none transition-colors"
                />

                <button
                  onClick={resendActivationEmail}
                  className="w-full py-3 rounded-full font-semibold bg-[#FF5722] hover:bg-[#E64A19] hover:shadow-lg hover:scale-105 transition-all duration-300 text-white"
                >
                  Send New Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a href="/contact" className="text-[#FF5722] hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
