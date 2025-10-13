import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { GoProjectRoadmap } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
import { GiHazardSign } from "react-icons/gi";
import ProjectColorPicker from "./ProjectColorPicker";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    priority: "",
    status: "",
    startDate: "",
    endDate: "",
    color: "#60a5fa",
  });

  // ✅ Fetch project and its tasks
  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else {
        setProject(data);
        setForm({
          name: data.name || "",
          description: data.description || "",
          category: data.category || "Work",
          priority: data.priority || "Medium Priority",
          status: data.status || "Active",
          startDate: data.start_date || "",
          endDate: data.end_date || "",
          color: data.color || "#60a5fa",
        });
      }
    };

    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", id);
      if (error) console.error(error);
      else setTasks(data || []);
    };

    fetchProject();
    fetchTasks();
  }, [id]);

  const calculateProgress = () => {
    const total = project?.total_tasks || 0;
    const completed = project?.tasks_completed || 0;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  // ✅ Handle project update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("projects")
      .update({
        name: form.name,
        description: form.description,
        category: form.category,
        priority: form.priority,
        status: form.status,
        start_date: form.startDate,
        end_date: form.endDate,
        color: form.color,
      })
      .eq("id", id);

    if (error) {
      console.error("Update failed:", error);
      alert("Failed to update project");
    } else {
      alert("✅ Project updated successfully!");
      setProject((prev) => ({ ...prev, ...form }));
      setIsEditing(false);
    }
  };

  if (!project) return <p className="p-4 text-gray-500">Loading project...</p>;

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold break-words">{project.name}</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {project.category} • {project.priority} • {project.status}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          Edit Project
        </button>
      </div>

      {/* Project Stats */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-1 rounded-xl">
        {[
          {
            label: "Total Tasks",
            value: project.total_tasks || 0,
            sub: `${calculateProgress()}% completion rate`,
            icon: <GoProjectRoadmap className="text-xl font-bold p-1 text-blue-600" />,
          },
          {
            label: "Completed",
            value: tasks.filter((t) => t.status === "Completed").length,
            icon: <IoMdCheckmarkCircleOutline className="text-xl font-bold p-1 text-green-600" />,
          },
          {
            label: "In Progress",
            value: tasks.filter((t) => t.status === "In Progress").length,
            icon: <LuClock4 className="text-xl font-bold p-1 text-orange-500" />,
          },
          {
            label: "Overdue",
            value: tasks.filter((t) => t.status === "Overdue").length,
            icon: <GiHazardSign className="text-xl font-bold p-1 text-red-700" />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-xl p-2 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between gap-2">
              <p className="text-xs lg:text-sm text-gray-500">{stat.label}</p>
              <p className="text-sm font-bold p-1">{stat.icon}</p>
            </div>

            <p className="font-bold text-base">{stat.value}</p>
            {stat.sub && <p className="text-xs text-gray-500 truncate">{stat.sub}</p>}
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mt-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm">
        <h2 className="font-bold mb-2 text-sm sm:text-base">Description</h2>
        <p className="text-xs sm:text-sm text-gray-600 break-words">
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Tasks Section */}
      <div className="mt-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h2 className="font-bold text-sm sm:text-base">Tasks</h2>
          <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 w-full sm:w-auto">
            Add Task
          </button>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm mt-4">
            No tasks yet. Create your first task to get started!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Task</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Priority</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Progress</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{t.name}</td>
                    <td className="p-2">{t.status}</td>
                    <td className="p-2">{t.priority}</td>
                    <td className="p-2">{t.due_date}</td>
                    <td className="p-2">{t.progress || 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Edit Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsEditing(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-bold">Edit Project</h1>
              <button
                onClick={() => setIsEditing(false)}
                className="font-bold text-gray-500 hover:text-gray-700 ml-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  className="w-full text-sm bg-gray-100 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  rows={4}
                  className="w-full text-sm bg-gray-100 rounded px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm((s) => ({ ...s, priority: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm"
                  >
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((s) => ({ ...s, startDate: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((s) => ({ ...s, endDate: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2 text-sm"
                  />
                </div>
              </div>

              <ProjectColorPicker
                onColorSelect={(color) => setForm((s) => ({ ...s, color }))}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white flex gap-4 justify-center items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:opacity-90"
                >
                  Update Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
