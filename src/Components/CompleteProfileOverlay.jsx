import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CompleteProfileOverlay({ user, onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    date_of_birth: "",
    phone_number: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  // Load existing profile if exists
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          username: data.username || "",
          date_of_birth: data.date_of_birth || "",
          phone_number: data.phone_number || "",
          address: data.address || "",
        });
      }
      if (error) console.error(error);
    };

    fetchProfile();
  }, [user.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", user.id);

    if (error) console.error(error);
    setLoading(false);

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Mark profile as complete
      await supabase
        .from("profiles")
        .update({ completed: true })
        .eq("id", user.id);
      onComplete(); // hide overlay
    }
  };

  const steps = [
    { id: 1, label: "Personal Information", key: "personal" },
    { id: 2, label: "Contact Information", key: "contact" },
    { id: 3, label: "Address Details", key: "address" },
    { id: 4, label: "Complete", key: "complete" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => {
            if (step === 4) onComplete();
          }}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-center mb-2">Complete Your Profile</h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Help us personalize your experience by providing some basic information.
        </p>

        {/* Step Progress */}
        <div className="flex justify-between mb-8">
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center text-center flex-1">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                  step === s.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : step > s.id
                    ? "bg-green-500 text-white border-green-500"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {s.id < step ? "✓" : s.id}
              </div>
              <p
                className={`text-xs mt-2 ${
                  step === s.id
                    ? "text-blue-600 font-semibold"
                    : step > s.id
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[200px]">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">First Name *</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 rounded-xl p-2 mt-1"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name *</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 rounded-xl p-2 mt-1"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-xl p-2 mt-1"
                  placeholder="johndoe"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <input
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-xl p-2 mt-1"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Phone Number *</label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 rounded-xl p-2 mt-1"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <p className="text-gray-500 text-xs">
                We'll use your phone number for:
                <ul className="list-disc list-inside">
                  <li>Account security verification</li>
                  <li>Important platform notifications</li>
                  <li>Task deadline reminders</li>
                </ul>
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-xl p-2 mt-1"
                  placeholder="City, Country"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-5xl">✓</div>
              <h3 className="text-lg font-semibold">Welcome to the Platform!</h3>
              <p className="text-gray-500 text-sm">
                Your account has been set up successfully. You can now start managing your projects and tasks.
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 && step < 4 && (
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setStep(step - 1)}
              disabled={loading}
            >
              ← Back
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={loading}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold"
          >
            {loading
              ? "Saving..."
              : step === 4
              ? "Get Started"
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
