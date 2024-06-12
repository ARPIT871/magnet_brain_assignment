import axios from 'axios';
import { axiosInstance } from './helper/axiosInstance';
const API_URL = 'http://localhost:9000/api';

// Function to register a user
export const register = async (userData) => {
    try {
        const response = await axiosInstance.post(`/users/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to log in a user
export const login = async (userData) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get tasks
export const getTasks = async (token) => {
    try {
        const response = await axiosInstance.get(`/tasks`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to update a task
export const updateTask = async (taskId, taskData, token) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/tasks/${taskId}`, taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to delete a task
export const deleteTask = async (taskId, token) => {
    try {
        await axiosInstance.delete(`/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        throw error.response.data;
    }
};

export const updateTaskStatus = async (taskId, token) => {
    try {
        const response = await axiosInstance.post(`/tasks/${taskId}/status`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const createTask = async (taskData, token) => {
    try {
        const response = await axiosInstance.post(`/tasks`, taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
export const getTaskStatus = async () => {
    try {
        const response = await axiosInstance.get(`/tasks/:id/status`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}