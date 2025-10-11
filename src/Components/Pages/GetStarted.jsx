import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); // 'signin' or 'signup'

  const handleSubmit = (e) => {
    e.preventDefault();
    // temporary fake auth
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-3">
        {/* Logo + Header */}
        <div className="text-center mb-6">
          <div className="flex gap-3 justify-center items-center">
            <img src="/Logo.png" alt="Logo" className="h-10 w-10 lg:h-14 lg:w-14 " />
            <h1 className="text-sm lg:text-2xl font-bold">KaziHub</h1>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Organize your projects, track your progress, and achieve your goals.
          </p>
        </div>

        {/* Page Title */}
        <h2 className="text-lg lg:text-2xl font-bold  text-center mb-4">
          Get Started
        </h2>

        {/* Segmented Sign In / Sign Up */}
        <div className="flex justify-center mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 py-1 text-xs lg:text-sm font-medium rounded-lg transition ${
              mode === "signin"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-xs lg:text-sm font-medium rounded-lg transition ${
              mode === "signup"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full  bg-gray-100 rounded-xl p-2.5 mt-1 text-xs lg:text-sm focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full  bg-gray-100 rounded-xl p-2.5 mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Create a password (min. 6 characters)"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-xs lg:text-sm text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
