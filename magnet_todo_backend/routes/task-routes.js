import { Router } from 'express'; 
import { taskController } from '../controller/taskController.js';
import { authMiddleware } from '../middleware/auth.js';

export const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter.route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);

    taskRouter.route('/:id')
    .get(taskController.getTask)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

    taskRouter.post('/:id/status', taskController.toggleTaskStatus);

