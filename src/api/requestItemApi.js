import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/pickupgarbage';

export const fetchSchedules = async () => {
  const response = await axios.get(`${API_URL}/getallpickupgarbage`);
  return response.data;
};

export const addSchedule = async (scheduleData) => {
  const response = await axios.post(`${API_URL}/schedules`, scheduleData);
  return response.data;
};

export const updateSchedule = async (id, scheduleData) => {
  const response = await axios.put(`${API_URL}/schedules/${id}`, scheduleData);
  return response.data;
};

export const deleteSchedule = async (id) => {
  const response = await axios.delete(`${API_URL}/deletshedule/${id}`);
  return response.data;
};

export const toggleScheduleStatus = (id) => axios.put(`${API_URL}/cancelshedule/${id}`);