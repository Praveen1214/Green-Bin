// api/garbageRequestApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/requestitem';

export const fetchGarbageRequests = () => axios.get(`${API_URL}/getallrequestitems`).then(res => res.data);

export const updateGarbageRequest = (id, garbageRequestData) => axios.put(`${API_URL}/updaterequest/${id}`, garbageRequestData);

export const deleteGarbageRequest = (id) => axios.delete(`${API_URL}/deleterequest/${id}`);


export const toggleGarbageRequestStatus = (id) => axios.put(`${API_URL}/cancelrequest/${id}`);


export const fetchGarbageRequestById = (id) => axios.get(`${API_URL}/get/${id}`).then(res => res.data);

export const fetchGarbageRequestsByStatus = (status) => axios.get(`${API_URL}/getbystatus/${status}`).then(res => res.data);

export const fetchGarbageRequestsByType = (type) => axios.get(`${API_URL}/getbytype/${type}`).then(res => res.data);