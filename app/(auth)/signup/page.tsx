"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, CalendarDays, Eye, EyeOff } from "lucide-react";
import { signup } from "@/lib/auth-api/api";
import Button from "@/components/Button";

const Signup = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    role: role || "",
    password: "",
    re_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!role) {
      router.push("/join");
    }
  }, [role, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.re_password) {
      newErrors.re_password = "Please confirm your password";
    } else if (formData.password !== formData.re_password) {
      newErrors.re_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // We pass the raw object (formData), NOT a string
        const data = await signup(formData);

        // If we get here, it worked!
        console.log("Success:", data);
        setTimeout(() => {
          setIsSubmitting(false);
          router.push("/login");
        }, 3000);
      } catch (err: any) {
        // If the function threw an error, we catch it here and show the user
        console.log(err);
        if (typeof err === "object" && err !== null) {
          const messages = Object.values(err).flat() as string[];
          setFormErrors(messages);
        } else {
          // Fallback for network errors
          setFormErrors(["Something went wrong. Please try again."]);
        }
        setIsSubmitting(false);
      }
    }
    setIsSubmitting(false);
  };

  if (!role) {
    return null;
  }

  const roleConfig = {
    organizer: {
      icon: <CalendarDays className="w-8 h-8 text-[#FF5722]" />,
      title: "Create Your Organizer Account",
      subtitle:
        "Start managing events, selling tickets, and tracking attendees in minutes.",
    },
    attendee: {
      icon: <User className="w-8 h-8 text-[#FF5722]" />,
      title: "Create Your Attendee Account",
      subtitle:
        "Discover amazing events, book tickets instantly, and manage your bookings.",
    },
  };

  const config = roleConfig[role as keyof typeof roleConfig];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 pt-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {config.title}
          </h1>
          <p className="text-sm text-gray-600">{config.subtitle}</p>
        </div>

        {/* Form */}
        {formErrors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <div className="mt-2 text-[15px] text-red-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {/* 3. Map through the clean strings */}
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
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

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.username
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-[#FF5722]"
              } focus:outline-none transition-colors`}
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.first_name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-[#FF5722]"
                } focus:outline-none transition-colors`}
                placeholder="John"
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.last_name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-[#FF5722]"
                } focus:outline-none transition-colors`}
                placeholder="Doe"
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
              )}
            </div>
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="re_password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showRePassword ? "text" : "password"}
                id="re_password"
                name="re_password"
                value={formData.re_password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.re_password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-[#FF5722]"
                } focus:outline-none transition-colors pr-12`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showRePassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.re_password && (
              <p className="mt-1 text-sm text-red-500">{errors.re_password}</p>
            )}
          </div>

          {/* Submit Button */}
          {/* <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 rounded-full font-semibold bg-[#FF5722] disabled:bg-[#FF5722]/50 hover:bg-[#E64A19] hover:shadow-lg hover:scale-105 transition-all duration-300 text-white"
          ></button> */}
          <Button
            disabled={isSubmitting}
            type="primary"
            size="large"
            className="w-full rounded-full"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#FF5722] font-semibold hover:underline"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
