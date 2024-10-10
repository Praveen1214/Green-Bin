// api/managerApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/managers';

export const fetchManagers = () => axios.get(`${API_URL}/getallmanagers`).then(res => res.data);

export const addManager = (managerData) => axios.post(`${API_URL}/addmanagers`, managerData);

export const updateManager = (id, managerData) => axios.post(`${API_URL}/updatemanager/${id}`, managerData);

export const deleteManager = (id) => axios.delete(`${API_URL}/deletemanager/${id}`);

export const toggleManagerStatus = (id) => axios.post(`${API_URL}/togglemanagerstatus/${id}`);