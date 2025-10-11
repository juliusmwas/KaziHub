import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd call your auth logic (Firebase, Supabase, etc)
    // For demo, just redirect
    navigate("/app");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-green-600 font-medium hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
