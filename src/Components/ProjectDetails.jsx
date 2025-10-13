import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { GoProjectRoadmap } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
import { GiHazardSign } from "react-icons/gi";
import ProjectColorPicker from "./ProjectColorPicker";
import DatePicker from "react-datepicker";
import { format, isBefore, parseISO } from "date-fns";
import { FiMoreVertical, FiUserPlus, FiTrash2, FiEdit } from "react-icons/fi";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isEditingProject, setIsEditingProject] = useState(false);

  // Add Task modal states
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium Priority",
    status: "Not Started",
    startDate: null,
    endDate: null,
    estimatedHours: 0,
    progress: 0,
    collaborators: [], // array of emails
    collInput: "", // email input
    notes: "",
  });

  // Edit Task states
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Project edit form
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    priority: "",
    status: "",
    startDate: null,
    endDate: null,
    color: "#60a5fa",
  });

  // menu open per task
  const [openMenuFor, setOpenMenuFor] = useState(null);

  // fetch project & tasks
  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("fetchProject error:", error);
      } else {
        setProject(data);
        setForm({
          name: data.name || "",
          description: data.description || "",
          category: data.category || "Work",
          priority: data.priority || "Medium Priority",
          status: data.status || "Active",
          startDate: data.start_date ? parseISO(data.start_date) : null,
          endDate: data.end_date ? parseISO(data.end_date) : null,
          color: data.color || "#60a5fa",
        });
      }
    };

    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("fetchTasks error:", error);
      } else {
        setTasks(data || []);
      }
    };

    fetchProject();
    fetchTasks();
  }, [id]);

  // --- helpers ---
  const calculateProgress = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const formatDate = (d) => {
    if (!d) return "";
    // d can be string or Date
    try {
      const date = typeof d === "string" ? parseISO(d) : d;
      return format(date, "MMM dd, yyyy");
    } catch {
      return d;
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const date = typeof dueDate === "string" ? parseISO(dueDate) : dueDate;
    const today = new Date();
    return isBefore(date, new Date(today.toDateString())) && // strictly before today
      // only mark overdue if not completed
      true;
  };

  // --- project update ---
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("projects")
      .update({
        name: form.name,
        description: form.description,
        category: form.category,
        priority: form.priority,
        status: form.status,
        start_date: form.startDate ? format(form.startDate, "yyyy-MM-dd") : null,
        end_date: form.endDate ? format(form.endDate, "yyyy-MM-dd") : null,
        color: form.color,
      })
      .eq("id", id);

    if (error) {
      console.error("Update failed:", error);
      alert("Failed to update project");
    } else {
      setProject((p) => ({ ...p, ...form }));
      setIsEditingProject(false);
      alert("Project updated");
    }
  };

  // --- TASK CRUD ---

  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert("Task title required");
      return;
    }

    const insertObj = {
      project_id: id,
      name: newTask.title,
      description: newTask.notes || "",
      status: newTask.status,
      priority: newTask.priority?.replace(" Priority", "") || "Medium",
      start_date: newTask.startDate ? format(newTask.startDate, "yyyy-MM-dd") : null,
      due_date: newTask.endDate ? format(newTask.endDate, "yyyy-MM-dd") : null,
      estimated_hours: parseInt(newTask.estimatedHours) || 0,
      progress: parseInt(newTask.progress) || 0,
      collaborators: newTask.collaborators.length ? newTask.collaborators : null,
    };

    const { data, error } = await supabase.from("tasks").insert([insertObj]).select();
    if (error) {
      console.error("create task error:", error);
      alert("Failed to create task");
      return;
    }
    // prepend created task and refresh
    setTasks((t) => [data[0], ...t]);
    setIsAddingTask(false);
    setNewTask({
      title: "",
      priority: "Medium Priority",
      status: "Not Started",
      startDate: null,
      endDate: null,
      estimatedHours: 0,
      progress: 0,
      collaborators: [],
      collInput: "",
      notes: "",
    });
  };

  // Open edit modal & populate
  const openEditTask = (task) => {
    setEditingTask({
      ...task,
      startDate: task.start_date ? parseISO(task.start_date) : null,
      endDate: task.due_date ? parseISO(task.due_date) : null,
      collaborators: task.collaborators || [],
    });
    setIsEditingTask(true);
    setOpenMenuFor(null);
  };

  // Save edits
  const handleSaveEditedTask = async (e) => {
    e.preventDefault();
    if (!editingTask.title && !editingTask.name) {
      alert("Task title required");
      return;
    }
    const updateObj = {
      name: editingTask.name || editingTask.title,
      description: editingTask.description || editingTask.notes || "",
      status: editingTask.status,
      priority: editingTask.priority?.replace(" Priority", "") || editingTask.priority,
      start_date: editingTask.startDate ? format(editingTask.startDate, "yyyy-MM-dd") : null,
      due_date: editingTask.endDate ? format(editingTask.endDate, "yyyy-MM-dd") : null,
      estimated_hours: parseInt(editingTask.estimated_hours || editingTask.estimatedHours || 0),
      progress: parseInt(editingTask.progress || 0),
      collaborators: editingTask.collaborators && editingTask.collaborators.length ? editingTask.collaborators : null,
    };

    const { data, error } = await supabase
      .from("tasks")
      .update(updateObj)
      .eq("id", editingTask.id)
      .select();

    if (error) {
      console.error("update task error:", error);
      alert("Failed to update task");
      return;
    }

    // update local list
    setTasks((prev) => prev.map((t) => (t.id === data[0].id ? data[0] : t)));
    setIsEditingTask(false);
    setEditingTask(null);
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!confirm("Delete this task? This cannot be undone.")) return;
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      console.error("delete task error:", error);
      alert("Failed to delete task");
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setOpenMenuFor(null);
  };

  // add collaborator to newTask list
  const addNewTaskCollaborator = () => {
    const email = (newTask.collInput || "").trim();
    if (!email) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Enter a valid email");
      return;
    }
    if (newTask.collaborators.includes(email)) {
      setNewTask((s) => ({ ...s, collInput: "" }));
      return;
    }
    setNewTask((s) => ({ ...s, collaborators: [...s.collaborators, email], collInput: "" }));
  };

  // add collaborator to editingTask list
  const addEditTaskCollaborator = () => {
    if (!editingTask) return;
    const email = (editingTask.collInput || "").trim();
    if (!email) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Enter a valid email");
      return;
    }
    if ((editingTask.collaborators || []).includes(email)) {
      setEditingTask((s) => ({ ...s, collInput: "" }));
      return;
    }
    setEditingTask((s) => ({
      ...s,
      collaborators: [...(s.collaborators || []), email],
      collInput: "",
    }));
  };

  // remove collaborator helpers
  const removeNewTaskCollaborator = (email) =>
    setNewTask((s) => ({ ...s, collaborators: s.collaborators.filter((c) => c !== email) }));

  const removeEditTaskCollaborator = (email) =>
    setEditingTask((s) => ({ ...s, collaborators: s.collaborators.filter((c) => c !== email) }));

  // small helper to display priority consistently
  const displayPriority = (p) => (p ? (p.includes("Priority") ? p : p + (p.length <= 6 ? " Priority" : "")) : "Medium Priority");

  return (
    <div className="p-1  md:p-6 w-full overflow-x-hidden">
      {/* Header */}
      <div className=" grid lg:flex gap-3">
        <div className="flex-1">
          <h1 className="text-lg lg:text-2xl font-bold break-words">{project?.name}</h1>
          <p className="text-xs  text-gray-600 mt-1">
            {project?.category} • {project?.priority} • {project?.status}
          </p>
        </div>
        <button onClick={() => setIsEditingProject(true)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 w-full sm:w-auto">
          Edit Project
        </button>
      </div>

      {/* Project Stats */}
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4  gap-3 bg-gray-50 p-1 rounded-xl">
        {[
          {
            label: "Total Tasks",
            value: tasks.length,
            sub: `${calculateProgress()}% completion rate`,
            icon: <GoProjectRoadmap className="text-xl font-bold p-1 text-blue-600" />,
          },
          {
            label: "Completed",
            value: tasks.filter((t) => t.status === "Completed").length,
            icon: <IoMdCheckmarkCircleOutline className="text-xl p-1 text-green-600" />,
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
          <div key={i} className="bg-white shadow-sm rounded-xl p-2 hover:shadow-md transition-shadow">
            <div className="flex justify-between gap-2">
              <p className="text-xs lg:text-sm text-gray-500">{stat.label}</p>
              <p className="text-sm font-bold">{stat.icon}</p>
            </div>
            <p className="font-bold text-base">{stat.value}</p>
            {stat.sub && <p className="text-xs text-gray-500 truncate">{stat.sub}</p>}
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mt-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm">
        <h2 className="font-bold mb-2 text-sm sm:text-base">Description</h2>
        <p className="text-xs sm:text-sm text-gray-600 break-words">{project?.description || "No description provided."}</p>
      </div>

      {/* Tasks */}
      <div className="mt-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h2 className="font-bold text-sm sm:text-base">Tasks</h2>
          <button onClick={() => setIsAddingTask(true)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 w-full sm:w-auto">
            Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm mt-4">No tasks yet. Create your first task!</p>
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
                  <th className="p-2"> </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => {
                  const overdue = t.due_date ? isBefore(parseISO(t.due_date), new Date()) && t.status !== "Completed" : false;
                  return (
                    <tr key={t.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{t.name}</td>
                      <td className="p-2">{t.status}</td>
                      <td className="p-2">{t.priority}</td>
                      <td className={`p-2 ${overdue ? "text-red-600 font-medium" : ""}`}>{t.due_date ? format(parseISO(t.due_date), "MMM dd, yyyy") : "-"}</td>
                      <td className="p-2">{(t.progress || 0) + "%"}</td>
                      <td className="p-2 relative">
                        <button
                          onClick={() => setOpenMenuFor(openMenuFor === t.id ? null : t.id)}
                          className="p-1 rounded hover:bg-gray-100"
                          aria-label="menu"
                        >
                          <FiMoreVertical />
                        </button>

                        {openMenuFor === t.id && (
                          <div className="absolute right-2 top-8 bg-white border rounded shadow-md z-20 w-40">
                            <button
                              onClick={() => openEditTask(t)}
                              className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 text-sm"
                            >
                              <FiEdit /> Edit Task
                            </button>
                            <button
                              onClick={() => handleDeleteTask(t.id)}
                              className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 text-sm text-red-600"
                            >
                              <FiTrash2 /> Delete Task
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---------------- Add Task Modal ---------------- */}
      {isAddingTask && (
        <div onClick={() => setIsAddingTask(false)} className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h1 className="text-xl font-bold mb-4">Create New Task</h1>

            <form onSubmit={handleCreateTask} className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 font-medium">Task Title *</label>
                <input required value={newTask.title} onChange={(e) => setNewTask((s) => ({ ...s, title: e.target.value }))} placeholder="Enter task title..." className="w-full border rounded px-3 py-2 bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Priority</label>
                  <select value={newTask.priority} onChange={(e) => setNewTask((s) => ({ ...s, priority: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-50">
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Status</label>
                  <select value={newTask.status} onChange={(e) => setNewTask((s) => ({ ...s, status: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-50">
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
                  <DatePicker
                    selected={newTask.startDate}
                    onChange={(date) => setNewTask((s) => ({ ...s, startDate: date }))}
                    placeholderText="Pick start date"
                    className="w-full border rounded px-3 py-2 bg-white cursor-pointer"
                    dateFormat="MMM dd, yyyy"
                    isClearable
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Date</label>
                  <DatePicker
                    selected={newTask.endDate}
                    onChange={(date) => setNewTask((s) => ({ ...s, endDate: date }))}
                    placeholderText="Pick end date"
                    className="w-full border rounded px-3 py-2 bg-white cursor-pointer"
                    dateFormat="MMM dd, yyyy"
                    isClearable
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Estimated Hours</label>
                  <input type="number" min="0" value={newTask.estimatedHours} onChange={(e) => setNewTask((s) => ({ ...s, estimatedHours: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-50" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Progress (%)</label>
                  <input type="number" min="0" max="100" value={newTask.progress} onChange={(e) => setNewTask((s) => ({ ...s, progress: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Invite Collaborators (Optional)</label>
                <div className="flex gap-2">
                  <input value={newTask.collInput} onChange={(e) => setNewTask((s) => ({ ...s, collInput: e.target.value }))} placeholder="Enter email address" className="flex-1 border rounded px-3 py-2 bg-gray-50" />
                  <button type="button" onClick={addNewTaskCollaborator} className="p-2 bg-blue-600 text-white rounded"><FiUserPlus /></button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newTask.collaborators.map((c) => (
                    <div key={c} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-2">
                      <span className="text-xs">{c}</span>
                      <button type="button" onClick={() => removeNewTaskCollaborator(c)} className="text-xs text-red-600">x</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Notes</label>
                <textarea value={newTask.notes} onChange={(e) => setNewTask((s) => ({ ...s, notes: e.target.value }))} rows={3} className="w-full border rounded px-3 py-2 bg-gray-50" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddingTask(false)} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
                <button type="submit" className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg px-4 py-2 hover:opacity-90">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- Edit Task Modal ---------------- */}
      {isEditingTask && editingTask && (
        <div onClick={() => { setIsEditingTask(false); setEditingTask(null); }} className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h1 className="text-xl font-bold mb-4">Edit Task</h1>

            <form onSubmit={handleSaveEditedTask} className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 font-medium">Task Title *</label>
                <input required value={editingTask.name || editingTask.title} onChange={(e) => setEditingTask((s) => ({ ...s, name: e.target.value }))} placeholder="Enter task title..." className="w-full border rounded px-3 py-2 bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Priority</label>
                  <select value={displayPriority(editingTask.priority)} onChange={(e) => setEditingTask((s) => ({ ...s, priority: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-50">
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Status</label>
                  <select value={editingTask.status} onChange={(e) => setEditingTask((s) => ({ ...s, status: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-50">
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
                  <DatePicker selected={editingTask.startDate} onChange={(d) => setEditingTask((s) => ({ ...s, startDate: d }))} className="w-full border rounded px-3 py-2 bg-white cursor-pointer" dateFormat="MMM dd, yyyy" isClearable />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Date</label>
                  <DatePicker selected={editingTask.endDate} onChange={(d) => setEditingTask((s) => ({ ...s, endDate: d }))} className="w-full border rounded px-3 py-2 bg-white cursor-pointer" dateFormat="MMM dd, yyyy" isClearable />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Invite Collaborators (Optional)</label>
                <div className="flex gap-2">
                  <input value={editingTask.collInput || ""} onChange={(e) => setEditingTask((s) => ({ ...s, collInput: e.target.value }))} placeholder="Enter email address" className="flex-1 border rounded px-3 py-2 bg-gray-50" />
                  <button type="button" onClick={addEditTaskCollaborator} className="p-2 bg-blue-600 text-white rounded"><FiUserPlus /></button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(editingTask.collaborators || []).map((c) => (
                    <div key={c} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-2">
                      <span className="text-xs">{c}</span>
                      <button type="button" onClick={() => removeEditTaskCollaborator(c)} className="text-xs text-red-600">x</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Notes</label>
                <textarea value={editingTask.description || editingTask.notes || ""} onChange={(e) => setEditingTask((s) => ({ ...s, description: e.target.value }))} rows={3} className="w-full border rounded px-3 py-2 bg-gray-50" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => { setIsEditingTask(false); setEditingTask(null); }} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- Edit Project Modal ---------------- */}
      {isEditingProject && (
        <div onClick={() => setIsEditingProject(false)} className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <h1 className="text-xl font-bold mb-4">Edit Project</h1>

            <form onSubmit={handleUpdateProject} className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 font-medium">Project Title *</label>
                <input required value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-100" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} rows={3} className="w-full border rounded px-3 py-2 bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Category</label>
                  <input value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-100" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Priority</label>
                  <select value={form.priority} onChange={(e) => setForm((s) => ({ ...s, priority: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-100">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Status</label>
                <select value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))} className="w-full border rounded px-3 py-2 bg-gray-100">
                  <option>Planning</option>
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Start Date</label>
                  <DatePicker selected={form.startDate} onChange={(d) => setForm((s) => ({ ...s, startDate: d }))} className="w-full border rounded px-3 py-2 bg-white cursor-pointer" dateFormat="MMM dd, yyyy" isClearable />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Date</label>
                  <DatePicker selected={form.endDate} onChange={(d) => setForm((s) => ({ ...s, endDate: d }))} className="w-full border rounded px-3 py-2 bg-white cursor-pointer" dateFormat="MMM dd, yyyy" isClearable />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Project Color</label>
                <ProjectColorPicker color={form.color} onChange={(c) => setForm((s) => ({ ...s, color: c }))} />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsEditingProject(false)} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium rounded-lg px-4 py-2 hover:opacity-90">Update Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
