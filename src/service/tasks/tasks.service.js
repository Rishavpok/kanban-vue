import api from "@/service/api/axios.js";


export const getTasks = (status) => api.get(`/tasks?status=${status}`);
export const createTask = (data) => api.post(`/tasks`, data);
export const updateTask = (data) => api.patch(`/tasks/${data.id}`, data);
export const deleteTasks = (id) => api.delete(`/tasks/${id}`);