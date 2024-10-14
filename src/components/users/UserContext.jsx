// contexts/ManagerContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { fetchManagers, deleteUser, handlechangerole } from '../../api/userApi';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setusers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingManager, setEditingManager] = useState(null);

  const loadManagers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchManagers();
      setusers(data);
    } catch (error) {
      message.error("Failed to fetch managers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadManagers();
  }, [loadManagers]);

 

 
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      message.success("User deleted successfully");
      loadManagers();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handlechangerole = async (id) => {
    try {
      const response = await handlechangerole(id);
      message.success("Role updated successfully");
      loadManagers(); // Reload the list of managers after role change
    } catch (error) {
      message.error("Failed to update role");
    }
  };

  return (
    <UserContext.Provider value={{
      users,
      isLoading,
      editingManager,
      setEditingManager,
    
      handleDeleteUser,
      handlechangerole
    }}>
      {children}
    </UserContext.Provider>
  );
};
