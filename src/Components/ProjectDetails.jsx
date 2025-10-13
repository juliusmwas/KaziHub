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
  const [isAddingTask, setIsAddingTask] = useState(false);

  // ✅ New Task Form
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium Priority",
    status: "Not Started",
    startDate: "",
    endDate: "",
    estimatedHours: 0,
    progress: 0,
    collaborators: "",
    notes: "",
  });

  // ✅ Project Edit Form
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

  // ✅ Fetch Project and Tasks
  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
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

  // ✅ Calculate Progress
  const calculateProgress = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  // ✅ Update Project
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

  // ✅ Create Task in Supabase
  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      alert("Task title is required!");
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        project_id: id, // FK reference to projects.id (UUID)
        name: newTask.title,
        description: newTask.notes || "",
        status:
          newTask.status === "Not Started"
            ? "Planning"
            : newTask.status,
        priority:
          newTask.priority?.replace(" Priority", "")?.trim() || "Medium",
        due_date: newTask.endDate || null,
        progress: parseInt(newTask.progress) || 0,
      },
    ]);

    if (error) {
      console.error("Error creating task:", error);
      alert("❌ Failed to create task.");
    } else {
      alert("✅ Task created successfully!");

      // Refresh tasks list
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", id);
      setTasks(data || []);

      // Reset form and close modal
      setIsAddingTask(false);
      setNewTask({
        title: "",
        priority: "Medium Priority",
        status: "Not Started",
        startDate: "",
        endDate: "",
        estimatedHours: 0,
        progress: 0,
        collaborators: "",
        notes: "",
      });
    }
  };

  if (!project)
    return <p className="p-4 text-gray-500">Loading project...</p>;

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold break-words">
            {project.name}
          </h1>
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
            value: tasks.length,
            sub: `${calculateProgress()}% completion rate`,
            icon: (
              <GoProjectRoadmap className="text-xl font-bold p-1 text-blue-600" />
            ),
          },
          {
            label: "Completed",
            value: tasks.filter((t) => t.status === "Completed").length,
            icon: (
              <IoMdCheckmarkCircleOutline className="text-xl p-1 text-green-600" />
            ),
          },
          {
            label: "In Progress",
            value: tasks.filter((t) => t.status === "In Progress").length,
            icon: <LuClock4 className="text-xl p-1 text-orange-500" />,
          },
          {
            label: "Overdue",
            value: tasks.filter((t) => t.status === "Overdue").length,
            icon: <GiHazardSign className="text-xl p-1 text-red-700" />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-xl p-2 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between gap-2">
              <p className="text-xs lg:text-sm text-gray-500">{stat.label}</p>
              <p className="text-sm font-bold">{stat.icon}</p>
            </div>
            <p className="font-bold text-base">{stat.value}</p>
            {stat.sub && (
              <p className="text-xs text-gray-500 truncate">{stat.sub}</p>
            )}
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

      {/* Tasks */}
      <div className="mt-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h2 className="font-bold text-sm sm:text-base">Tasks</h2>
          <button
            onClick={() => setIsAddingTask(true)}
            className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 w-full sm:w-auto"
          >
            Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm mt-4">
            No tasks yet. Create your first task!
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

      {/* ✅ Add Task Modal */}
      {isAddingTask && (
        <div
          onClick={() => setIsAddingTask(false)}
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6"
          >
            <h1 className="text-xl font-bold mb-4">Create New Task</h1>

            <form onSubmit={handleCreateTask} className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 font-medium">Task Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Enter task title..."
                  required
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  >
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) =>
                      setNewTask({ ...newTask, status: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Start Date</label>
                  <input
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, startDate: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Date</label>
                  <input
                    type="date"
                    value={newTask.endDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, endDate: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  />
                </div>
              </div>

              <div className=" gap-3">
                <div>
                  <label className="block mb-1 font-medium">Progress (%)</label>
                  <input
                    type="number"
                    value={newTask.progress}
                    onChange={(e) =>
                      setNewTask({ ...newTask, progress: e.target.value })
                    }
                    min="0"
                    max="100"
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Notes</label>
                <textarea
                  value={newTask.notes}
                  onChange={(e) =>
                    setNewTask({ ...newTask, notes: e.target.value })
                  }
                  placeholder="Add notes..."
                  rows={3}
                  className="w-full border rounded px-3 py-2 bg-gray-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg px-4 py-2 hover:opacity-90"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Edit Project Modal */}
      {isEditing && (
        <div
          onClick={() => setIsEditing(false)}
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6"
          >
            <h1 className="text-xl font-bold mb-4">Edit Project</h1>

            <form onSubmit={handleUpdate} className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 font-medium">Project Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter project name..."
                  required
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Add project description..."
                  rows={3}
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="gap-3">
                <div>
                  <label className="block mb-1 font-medium">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                  >
                    <option>Planning</option>
                    <option>Active</option>
                    <option>On Hold</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div className="mt-2">
                  <ProjectColorPicker
                    color={form.color}
                    onChange={(color) => setForm({ ...form, color })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                  />
                </div>
              </div>

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
                  className="bg-blue-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
