import { FiUsers, FiBarChart2, FiClock, FiTrendingUp } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, Julius 👋
        </h1>
        <p className="text-gray-500 text-sm">Here’s your activity summary today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Active Projects", value: "12", icon: <FiBarChart2 /> },
          { title: "Team Members", value: "8", icon: <FiUsers /> },
          { title: "Hours Tracked", value: "37h", icon: <FiClock /> },
          { title: "Performance", value: "+18%", icon: <FiTrendingUp /> },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-lg font-semibold text-gray-800">{card.value}</p>
            </div>
            <div className="text-blue-500 text-2xl">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white shadow-sm rounded-2xl p-6 h-64 flex flex-col justify-center items-center text-gray-400">
        <p className="text-sm">📊 Chart Placeholder</p>
        <p className="text-xs text-gray-400">Integrate Recharts or Chart.js later</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm rounded-2xl p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>✅ Completed design review with team</li>
          <li>🕒 Updated project timeline for "HabitFlow"</li>
          <li>💬 Received 3 new collaboration requests</li>
          <li>📈 Analytics report updated successfully</li>
        </ul>
      </div>
    </div>
  );
}
