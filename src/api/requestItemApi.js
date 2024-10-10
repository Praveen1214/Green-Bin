// api/requestItemApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/requestitem';

export const fetchRequestItems = () => axios.get(`${API_URL}/requestitems`).then(res => res.data);

export const addRequestItem = (requestItemData) => axios.post(`${API_URL}/add`, requestItemData);

export const updateRequestItem = (id, requestItemData) => axios.patch(`${API_URL}/request-items/${id}`, requestItemData);

export const deleteRequestItem = (id) => axios.delete(`${API_URL}/request-items/${id}`);

export const updateRequestStatus = (id, status) => axios.patch(`${API_URL}/request-items/${id}/status`, { status });

export const fetchRequestItemById = (id) => axios.get(`${API_URL}/request-items/${id}`).then(res => res.data);

// If you need to fetch request items by a specific criteria, you can add more functions like:
export const fetchRequestItemsByStatus = (status) => axios.get(`${API_URL}/request-items/status/${status}`).then(res => res.data);

export const fetchRequestItemsByBeneficiary = (beneficiaryName) => axios.get(`${API_URL}/request-items/beneficiary/${beneficiaryName}`).then(res => res.data);