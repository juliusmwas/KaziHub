import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-center">
    
      <img src="/public/Logo.png" alt="Logo" className="w-20 h-20 mb-4" />

      
      <h1 className=" text-lg lg:text-2xl font-bold text-gray-800 mb-2">Welcome to KaziHub</h1>

      {/* Description */}
      <p className="text-xs  lg:text-xl font-normal  text-gray-500">Please sign in to access your dashboard.</p>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/get-started")}
        className="bg-blue-600 mt-5 text-white items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500"
      >
        Sign In
      </button>
    </div>
  );
}
