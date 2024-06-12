import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, updateTaskStatus, deleteTask } from "../api";
import TaskModal from "../components/Modal/TaskModal.jsx";
import { Autocomplete, TextField } from "@mui/material";
import { convertDateFormat } from "../helper/formateDate.js";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [cachedTasks, setCachedTasks] = useState([]);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState({});
  const [close, setClose] = useState(false);

  const navigate = useNavigate();
  console.log(tasks);
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      

      const tasks = await getTasks(token);
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const handleClickTask = (task) => {
    console.log("hellooo click", task);
    setShowModal(true);
    setTaskSelected(task);
  };

  useEffect(() => {
    setClose(true);
    if (tasks.length > 0) {
      const filteredArray = filterArray(tasks, status, priority);
      setSortedTasks(filteredArray);
    } else {
      setSortedTasks([]);
    }
  }, [priority, status, tasks]);

  

 

  const handleTaskStatus = async (taskId) => {
    const token = localStorage.getItem("token");
    await updateTaskStatus(taskId, token);
    const tasks = await getTasks(token);
    setTasks(tasks);
  };
  const handleReset = () => {
    setStatus("status")
    setPriority("Priorty")
    setSortedTasks(tasks);
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token");
    await deleteTask(taskId, token);
    const tasks = await getTasks(token);
    setTasks(tasks);
  };
  const statusOptions = ["completed", "pending"];
  const filterArray = (arr, status, priority) => {
    return arr.filter((item) => {
      const statusMatch = !status || item.status === status;
      const priorityMatch = !priority || item.priority === priority;
      return statusMatch && priorityMatch;
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold flex-grow">Tasks</h1>
  <div className="flex items-center space-x-4">
  <span className="text-white">Filter:</span>
    <select
      id="priority"
      name="priority"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="appearance-none rounded-none relative block w-32 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <select
      id="status"
      name="status"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="appearance-none rounded-none relative block w-32 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    >
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>
    <button
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      onClick={handleReset}
    >
      Reset
    </button>
    <button
      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
      onClick={() => navigate("/task")}
    >
      Create Task
    </button>
  </div>
</div>

        <div className="overflow-x-auto h-[100vh] bg-white rounded-lg shadow-md p-6">
          <table className=" min-w-full bg-white text-gray-900">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left"> Actions</th>
              </tr>
              {/* <th>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded"
                      onClick={handleReset}
                    >
                      reset
                    </button>
                  </th> */}
            </thead>
            <tbody>
              {sortedTasks.length==0 ? (
                <h1>No tasks</h1>
              ) : (
                sortedTasks.map((task) => (
                  <tr key={task._id} className="border-b">
                    <td
                      className="py-3 px-4"
                      onClick={() => handleClickTask(task)}
                    >
                      {task.title}
                    </td>
                    <td className="py-3 px-4">{task.due_date.slice(0, 10)}</td>
                    {console.log(task.status)}
                    <Autocomplete
                    onChange={(e) => handleTaskStatus(task._id)}
                      size="small"
                      disablePortal
                      id="combo-box-demo"
                      options={statusOptions}
                      value={task.status}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params}  />
                      )}
                    />

                    <td
                      className={
                        task.priority === "high"
                          ? "py-3 px-4 text-red-600 font-bold"
                          : task.priority === "medium"
                          ? "py-3 px-4 text-yellow-500 font-bold"
                          : "py-3 px-4 text-lime-500 font-bold"
                      }
                    >
                      {task.priority}
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded"
                      onClick={() => handleClickTask(task)}
                        
                      >
                        Read More
                      </button>
                      <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded"
                        onClick={() => {
                        navigate(`/task/${task._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(task._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <TaskModal setShowModal={setShowModal} task={taskSelected} />
      )}
    </div>
  );
};

export default HomeScreen;
