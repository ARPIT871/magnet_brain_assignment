import { TaskModel as Task } from "../models/tasks.js";

export const taskController={
    
 getTasks : async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
},

 getTask: async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
},

 createTask: async (req, res) => {
    console.log('tasjs',req.body)
    const { title, description, due_date, priority ,status } = req.body;
    const task = new Task({ title, description, due_date, priority, user: req.user.id ,status});
    await task.save();
    res.status(201).json(task);
},

 updateTask: async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
},

 deleteTask: async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
},

 toggleTaskStatus: async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();
    res.json(task);
}
}

