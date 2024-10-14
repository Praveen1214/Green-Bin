// GarbageRequestContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { fetchGarbageRequests, updateGarbageRequest, deleteGarbageRequest, toggleGarbageRequestStatus } from '../../../api/garbageRequestApi';

export const GarbageRequestContext = createContext();

export const GarbageRequestProvider = ({ children }) => {
  const [garbageRequests, setGarbageRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingGarbageRequest, setEditingGarbageRequest] = useState(null);

  const loadGarbageRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchGarbageRequests();
      setGarbageRequests(data);
    } catch (error) {
      message.error("Failed to fetch garbage requests");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGarbageRequests();
  }, [loadGarbageRequests]);

  

  const handleUpdateGarbageRequest = async (id, garbageRequestData) => {
    try {
      await updateGarbageRequest(id, garbageRequestData);
      message.success("Garbage request updated successfully");
      loadGarbageRequests();
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeleteGarbageRequest = async (id) => {
    try {
      await deleteGarbageRequest(id);
      message.success("Garbage request deleted successfully");
      loadGarbageRequests();
    } catch (error) {
      message.error("Failed to delete garbage request");
    }
  };

  const handleToggleGarbageRequestStatus = async (id) => {
    try {
      const response = await toggleGarbageRequestStatus(id);
      message.success(response.data.status);
      loadGarbageRequests(); // Reload requests after the update
    } catch (error) {
      message.error("Failed to update garbage request status");
    }
  };
  

  return (
    <GarbageRequestContext.Provider value={{
      garbageRequests,
      isLoading,
      editingGarbageRequest,
      setEditingGarbageRequest,
      handleUpdateGarbageRequest,
      handleDeleteGarbageRequest,
      handleToggleGarbageRequestStatus
    }}>
      {children}
    </GarbageRequestContext.Provider>
  );
};
