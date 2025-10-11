import { useState, useEffect } from "react";
import { GrProjects } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import ProjectColorPicker from "../ProjectColorPicker";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Work",
    priority: "Medium Priority",
    color: "#60a5fa",
    tasksCompleted: 0,
    totalTasks: 10,
  });

  // ✅ Load projects from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  // ✅ Save projects to localStorage on every change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setForm({
      name: "",
      description: "",
      category: "Work",
      priority: "Medium Priority",
      color: "#60a5fa",
      tasksCompleted: 0,
      totalTasks: 10,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Please enter project title");
    const newProject = { id: Date.now(), ...form };
    setProjects((prev) => [...prev, newProject]);
    closeModal();
  };

  const calculateProgress = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white items-center p-2 shadow-sm rounded-xl flex justify-between">
        <div>
          <h1 className="text-lg text-blue-600 font-bold lg:text-2xl">KaziHub</h1>
          <p className="text-xs text-gray-500">Organize • Plan • Achieve</p>
        </div>

        <div className="flex gap-1 flex-col text-center">
          <p className="text-xs text-black font-medium p-1 bg-gray-300 rounded-sm">
            {projects.length} Active Projects
          </p>
          <p className="text-xs text-black font-medium p-1 bg-gray-300 rounded-sm">
            {projects.reduce((a, b) => a + b.tasksCompleted, 0)}/
            {projects.reduce((a, b) => a + b.totalTasks, 0)} Tasks Done
          </p>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gray-100 mt-3 p-2 lg:p-3 shadow-sm rounded-xl">
        <h1 className="flex items-center gap-5 justify-center text-lg text-black font-bold lg:text-2xl">
          <span><GrProjects /></span>Projects
        </h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3 items-center ">
        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 shadow-sm">
          <CiSearch className="text-gray-600 text-xl mr-2" />
          <input
            type="text"
            placeholder="Search projects here..."
            className="bg-transparent outline-none w-full placeholder-gray-500 text-gray-700 text-xs font-normal"
          />
        </div>

        <div className="bg-gray-50 border border-gray-300 p-2 rounded-xl shadow-sm text-xs font-normal">
          <select className="w-full bg-gray-50">
            <option>All Status</option>
            <option>Planning</option>
            <option>Active</option>
            <option>On Hold</option>
            <option>Complete</option>
          </select>
        </div>

        <div className="bg-gray-50 border border-gray-300 p-2 rounded-xl shadow-sm text-xs font-normal">
          <select className="w-full bg-gray-50">
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <button
          onClick={openModal}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white flex gap-4 justify-center items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:opacity-90"
        >
          <span>+</span> New Project
        </button>
      </div>

      {/* Projects Section */}
      {projects.length === 0 ? (
        <div className="grid justify-items-center bg-gray-50 p-10 shadow-sm rounded-xl mt-4">
          <div className="justify-items-center p-5 text-center">
            <GrProjects className="text-2xl text-gray-500" />
            <h1 className="text-lg font-medium p-1 lg:text-2xl">No projects yet</h1>
            <p className="text-xs font-normal p-1 text-gray-500">
              Create your first project to start organizing your goals!
            </p>
            <button
              onClick={openModal}
              className="bg-blue-600 mt-2 text-white flex gap-4 px-4 items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500"
            >
              + Create New Project
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition"
              style={{ borderLeft: `6px solid ${p.color}` }}
            >
              <h1 className="text-sm font-bold text-gray-800">{p.name}</h1>
              <p className="text-xs text-gray-500 mb-2">{p.category} • {p.priority}</p>
              <p className="text-xs text-gray-600 mb-3 line-clamp-3">{p.description}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${calculateProgress(p.tasksCompleted, p.totalTasks)}%`,
                    backgroundColor: p.color,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                {p.tasksCompleted}/{p.totalTasks} tasks completed
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Invite User Button */}
      <div className="group bg-gray-50 border border-gray-300 rounded-xl w-32 flex gap-3 items-center mt-5 p-2 cursor-pointer hover:bg-green-600 hover:text-white">
        <FiUserPlus className="text-sm font-bold text-gray-500 group-hover:text-white" />
        <p className="text-sm font-medium text-gray-500 group-hover:text-white">Invite User</p>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-bold">Create new project</h1>
              <button
                onClick={closeModal}
                className="font-bold text-gray-500 hover:text-gray-700 ml-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-sm bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter project title..."
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full text-sm bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  placeholder="Describe your project..."
                />
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm"
                  >
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm"
                  >
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </select>
                </div>
              </div>

              {/* Color Picker */}
              <ProjectColorPicker
                onColorSelect={(color) => setForm({ ...form, color })}
              />

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
