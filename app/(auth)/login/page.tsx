"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";
import { login } from "@/lib/auth-api/api";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const data = await login(formData);
        console.log("Success:", data);
        setTimeout(() => {
          setIsSubmitting(false);
          router.push("/login");
        }, 3000);
      } catch (err: any) {
        console.log(err);
        const message = "Invalid credentials or account not verified.";
        setFormErrors(message);

        setIsSubmitting(false);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 pt-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">
            Log in to access your account and continue your journey
          </p>
        </div>

        {formErrors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <div className="mt-2 text-[15px] text-red-700">
                  <ul className="list-disc pl-5 space-y-1">{formErrors}</ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-[#FF5722]"
              } focus:outline-none transition-colors`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-[#FF5722]"
                } focus:outline-none transition-colors pr-12`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-[#FF5722] font-semibold hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <Button
            disabled={isSubmitting}
            type="primary"
            size="large"
            className="w-full rounded-full"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>

          {/* Divider */}

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            New to Tixly?
            <Link
              href="/signup"
              className="text-[#FF5722] font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>

        {/* Additional Help */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By continuing, you agree to Tixly's{" "}
          <a href="/terms" className="text-[#FF5722] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-[#FF5722] hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
