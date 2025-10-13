import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function ProjectDetails() {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setProject(data);
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

  if (!project) return <p className="p-4 text-gray-500">Loading project...</p>;

  const calculateProgress = () => {
    const total = project.total_tasks || 0;
    const completed = project.tasks_completed || 0;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-xs text-gray-500">
            {project.category} • {project.priority} • {project.status}
          </p>
        </div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit Project</button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl">
        <div>
          <p className="text-xs text-gray-500">Total Tasks</p>
          <p className="font-bold">{project.total_tasks || 0}</p>
          <p className="text-xs text-gray-500">{calculateProgress()}% completion rate</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Completed</p>
          <p className="font-bold">{tasks.filter(t => t.status === "Completed").length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">In Progress</p>
          <p className="font-bold">{tasks.filter(t => t.status === "In Progress").length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Overdue</p>
          <p className="font-bold">{tasks.filter(t => t.status === "Overdue").length}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="font-bold mb-2">Description</h2>
        <p className="text-sm text-gray-600">{project.description || "No description provided."}</p>
      </div>

      {/* Tasks Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold">Tasks</h2>
          <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Task</button>
        </div>

        {/* Search + Filters */}
        <div className="flex gap-2 mb-2">
          <input type="text" placeholder="Search tasks..." className="flex-1 p-2 border border-gray-300 rounded" />
          <select className="p-2 border border-gray-300 rounded">
            <option>All Status</option>
            <option>Planning</option>
            <option>Active</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>
          <select className="p-2 border border-gray-300 rounded">
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm mt-4">No tasks yet. Create your first task to get started!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Task</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(t => (
                  <tr key={t.id} className="border-b">
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
    </div>
  );
}
