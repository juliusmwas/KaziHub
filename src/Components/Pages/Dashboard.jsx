import { useState, useEffect } from "react";
import { FiUsers, FiBarChart2, FiClock, FiTrendingUp, FiCalendar } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import ProjectColorPicker from "../ProjectColorPicker";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Work",
    priority: "Medium Priority",
    status: "Planning",
    startDate: "",
    endDate: "",
    color: "#60a5fa",
  });

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error("Error fetching projects:", error);
      else setProjects(data || []);
    };
    fetchProjects();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("projects_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        (payload) => {
          setProjects((prev) => {
            if (payload.eventType === "INSERT") return [payload.new, ...prev];
            if (payload.eventType === "UPDATE")
              return prev.map((p) => (p.id === payload.new.id ? payload.new : p));
            if (payload.eventType === "DELETE")
              return prev.filter((p) => p.id !== payload.old.id);
            return prev;
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setForm({
      name: "",
      description: "",
      category: "Work",
      priority: "Medium Priority",
      status: "Planning",
      startDate: "",
      endDate: "",
      color: "#60a5fa",
    });
  };

  // Submit project to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Please enter a project name.");

    const { data, error } = await supabase.from("projects").insert([
      {
        name: form.name,
        description: form.description,
        category: form.category,
        priority: form.priority,
        status: form.status,
        start_date: form.startDate, // match your table column names
        end_date: form.endDate,
        color: form.color,
        tasks_completed: 0,
        total_tasks: 0,
      },
    ]).select(); // select() ensures Supabase returns the inserted row

    if (error) {
      console.error("Error adding project:", error);
      alert("Failed to create project. Check console for details.");
    } else {
      // Add the new project to state immediately
      setProjects((prev) => [data[0], ...prev]);
      closeModal();
    }
  };

  const activeCount = projects.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-500 text-sm">Your productivity overview at a glance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Active Projects", value: activeCount, text: "currently managed", icon: <GrProjects /> },
          { title: "Task Completed", value: "0", text: "in the last 7 days", icon: <IoMdCheckmarkCircleOutline /> },
          { title: "Pending Tasks", value: "0", text: "overdue", icon: <LuClock4 /> },
          { title: "Overall Progress", value: "0%", text: "productivity rate", icon: <FiTrendingUp /> },
        ].map((card, i) => (
          <div key={i} className="bg-white shadow-sm rounded-xl p-4 items-center justify-between hover:shadow-md transition-shadow">
            <div className="py-1 flex items-center justify-between">
              <p className="text-black font-medium text-xs">{card.title}</p>
              <div className="text-blue-500 text-sm">{card.icon}</div>
            </div>
            <p className="py-2 text-lg font-bold text-black">{card.value}</p>
            <p className="text-xs font-normal text-gray-500">{card.text}</p>
          </div>
        ))}
      </div>

      {/* Recent + Deadlines */}
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
        <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex gap-2 items-center">
            <FiTrendingUp className="text-xs font-medium lg:text-sm" />
            <h1 className="text-lg font-medium lg:text-2xl">Recent Activity</h1>
          </div>
          <p className="text-xs font-normal text-gray-500">Your productivity in the last 7 days</p>

          <div className="gap-3 py-3 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
            <div className="bg-gray-100 grid text-center items-center rounded-xl p-7 hover:shadow-md transition-shadow">
              <h1 className="text-blue-500 font-medium">0</h1>
              <p className="text-xs font-normal text-gray-500">Tasks Completed</p>
            </div>
            <div className="bg-gray-100 grid text-center items-center rounded-xl p-7 hover:shadow-md transition-shadow">
              <h1 className="text-blue-500 font-medium">{activeCount}</h1>
              <p className="text-xs font-normal text-gray-500">Projects Created</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <FiCalendar className="text-xs font-medium lg:text-sm" />
            <h1 className="text-lg font-medium lg:text-2xl">Upcoming Deadlines</h1>
          </div>
          <p className="text-xs font-normal text-gray-500">Tasks that need your attention soon</p>

          <div className="py-7 grid justify-items-center">
            <FiCalendar className="text-3xl text-gray-500" />
            <p className="text-sm lg:text-xl text-gray-500">No upcoming deadlines</p>
          </div>
        </div>
      </div>

      {/* Quick Actions + Active Projects */}
      <div className="grid grid-cols-1 lg:gap-5 lg:grid-cols-3">
        <div className="col-span-1 bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-shadow">
          <h1 className="text-lg font-medium lg:text-2xl">Quick Actions</h1>
          <p className="text-xs font-normal text-gray-500">Get things done faster</p>
          <div className="py-3 gap-2 grid grid-cols-1">
            <button onClick={openModal} className="bg-blue-600 text-white flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-700">
              <span>+</span> Create New Project
            </button>
            <button className="bg-gray-100 text-black flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-green-600 hover:text-white">
              <span><LuClock4 /></span> View Reminders
            </button>
            <button className="bg-gray-100 text-black flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-green-600 hover:text-white">
              <span><IoBarChartOutline /></span> Analytics Dashboard
            </button>
          </div>
        </div>

        {/* Active Projects */}
        <div className="col-span-2 p-4 bg-white shadow-sm rounded-xl mt-4 lg:m-0 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-medium lg:text-2xl">Active Projects</h1>
              <p className="text-xs font-normal text-gray-500">Projects currently in progress</p>
            </div>
            <p onClick={openModal} className="flex items-center gap-2 text-xs font-normal text-gray-500 cursor-pointer hover:bg-green-600 hover:text-white p-1 px-2 rounded-sm">
              Add New <span><FaArrowRight /></span>
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="py-8 grid justify-items-center">
              <GrProjects className="text-3xl text-gray-500" />
              <p className="text-xs p-2 font-normal text-gray-500">No active Projects</p>
              <button onClick={openModal} className="bg-blue-600 text-white flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500">
                <span>+</span> Create New Project
              </button>
            </div>
          ) : (
            <div className="grid gap-3 mt-5">
              {projects.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition" style={{ borderLeft: `6px solid ${p.color}` }}>
                  <div>
                    <h1 className="text-sm font-bold text-gray-800">{p.name}</h1>
                    <p className="text-xs text-gray-500">{p.category} • {p.priority}</p>
                    <p className="text-xs text-gray-400 mt-1">{p.tasks_completed}/{p.total_tasks} tasks completed</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
          <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6 transform transition-all">
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-bold">Create new project</h1>
              <button onClick={closeModal} className="font-bold text-gray-500 hover:text-gray-700 ml-2" aria-label="Close">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input type="text" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} className="w-full text-sm font-normal text-gray-600 bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Enter project title..." required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} className="w-full text-sm font-normal text-gray-600 bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" rows={4} placeholder="Describe your project..." />
              </div>

              <div className="grid gap-3 grid-cols-2">
                <div>
                  <h1 className="text-sm font-bold text-gray-700 mb-1">Category</h1>
                  <select value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm">
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>Finance</option>
                    <option>Creative</option>
                    <option>Social</option>
                  </select>
                </div>

                <div>
                  <h1 className="text-sm font-bold text-gray-700 mb-1">Priority</h1>
                  <select value={form.priority} onChange={(e) => setForm((s) => ({ ...s, priority: e.target.value }))} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm">
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 grid-cols-1 mt-3">
                <div>
                  <h1 className="text-sm font-bold text-gray-700 mb-1">Status</h1>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm"
                  >
                    <option>Planning</option>
                    <option>Active</option>
                    <option>On Hold</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
   

              <div className="grid gap-3 grid-cols-2">
                <div>
                  <h1 className="text-sm font-bold text-gray-700 mb-1">Start Date</h1>
                  <input type="date" value={form.startDate} onChange={(e) => setForm((s) => ({ ...s, startDate: e.target.value }))} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm" />
                </div>

                <div>
                  <h1 className="text-sm font-bold text-gray-700 mb-1">Target End Date</h1>
                  <input type="date" value={form.endDate} onChange={(e) => setForm((s) => ({ ...s, endDate: e.target.value }))} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm" />
                </div>
              </div>

              <ProjectColorPicker onColorSelect={(color) => setForm((s) => ({ ...s, color }))} />

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" disabled={!form.name.trim()}>Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
