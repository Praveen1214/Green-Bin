// contexts/ManagerContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { fetchManagers, addManager, updateManager, deleteManager, toggleManagerStatus } from '../../api/managerApi';

export const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingManager, setEditingManager] = useState(null);

  const loadManagers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchManagers();
      setManagers(data);
    } catch (error) {
      message.error("Failed to fetch managers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadManagers();
  }, [loadManagers]);

  const handleAddManager = async (managerData) => {
    try {
      await addManager(managerData);
      message.success("Manager added successfully");
      loadManagers();
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleUpdateManager = async (id, managerData) => {
    try {
      await updateManager(id, managerData);
      message.success("Manager updated successfully");
      loadManagers();
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeleteManager = async (id) => {
    try {
      await deleteManager(id);
      message.success("Manager deleted successfully");
      loadManagers();
    } catch (error) {
      message.error("Failed to delete manager");
    }
  };

  const handleToggleManagerStatus = async (id) => {
    try {
      const response = await toggleManagerStatus(id);
      message.success(response.data.message);
      loadManagers();
    } catch (error) {
      message.error("Failed to update manager status");
    }
  };

  return (
    <ManagerContext.Provider value={{
      managers,
      isLoading,
      editingManager,
      setEditingManager,
      handleAddManager,
      handleUpdateManager,
      handleDeleteManager,
      handleToggleManagerStatus
    }}>
      {children}
    </ManagerContext.Provider>
  );
};