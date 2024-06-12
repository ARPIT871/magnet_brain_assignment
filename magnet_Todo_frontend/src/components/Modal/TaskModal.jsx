import React from "react";

function TaskModal({ task, setShowModal }) {
  console.log("modaltask status:", task.status);
  console.log("modaltask title:", task.title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[80%] max-w-lg bg-gradient-to-br from-gray-900 to-black text-white rounded-lg shadow-lg p-6">
        <div
          className="absolute top-3 right-3 text-2xl cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          &times;
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">{task.title}</h1>
          </div>
          <div>
            <p className="text-xl">{task.description}</p>
          </div>
          <div>
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              task.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
            }`}>
              {task.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
