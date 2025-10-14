import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // import your supabase client

export default function GetStarted() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        // Create profile record
        await supabase.from("profiles").insert([{ id: data.user.id }]);
        navigate("/app");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        navigate("/app");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-3">
        <div className="text-center mb-6">
          <div className="flex gap-3 justify-center items-center">
            <img src="/Logo.png" alt="Logo" className="h-10 w-10 lg:h-14 lg:w-14" />
            <h1 className="text-sm lg:text-2xl font-bold">KaziHub</h1>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Organize your projects, track your progress, and achieve your goals.
          </p>
        </div>

        <h2 className="text-lg lg:text-2xl font-bold text-center mb-4">
          Get Started
        </h2>

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

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-100 rounded-xl p-2.5 mt-1 text-xs lg:text-sm focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-100 rounded-xl p-2.5 mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Create a password (min. 6 characters)"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-xs lg:text-sm text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-blue-600 font-medium hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
