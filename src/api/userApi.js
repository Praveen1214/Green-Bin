// api/managerApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/passenger';

export const fetchManagers = () => axios.get(`${API_URL}/getallusers`).then(res => res.data);


export const deleteUser = (id) => axios.delete(`${API_URL}/deleteuser/${id}`);

// api/managerApi.js
export const handlechangerole = (id) => {
    return axios.put(`${API_URL}/changerole/${id}`);
};
