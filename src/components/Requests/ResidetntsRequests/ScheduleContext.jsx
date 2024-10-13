// ScheduleContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { fetchSchedules, updateSchedule, deleteSchedule, toggleScheduleStatus, addSchedule } from '../../../api/requestItemApi';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const loadSchedules = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchSchedules();
      setSchedules(data);
    } catch (error) {
      message.error("Failed to fetch schedules");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const handleAddSchedule = async (scheduleData) => {
    try {
      await addSchedule(scheduleData);
      message.success("Schedule added successfully");
      loadSchedules();
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleUpdateSchedule = async (id, scheduleData) => {
    try {
      await updateSchedule(id, scheduleData);
      message.success("Schedule updated successfully");
      loadSchedules();
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await deleteSchedule(id);
      message.success("Schedule deleted successfully");
      loadSchedules();
    } catch (error) {
      message.error("Failed to delete schedule");
    }
  };

  const handleToggleScheduleStatus = async (id) => {
    try {
      const response = await toggleScheduleStatus(id);
      message.success(response.data.message);
      loadSchedules();
    } catch (error) {
      message.error("Failed to update schedule status");
    }
  };

  return (
    <ScheduleContext.Provider value={{
      schedules,
      isLoading,
      editingSchedule,
      setEditingSchedule,
      handleAddSchedule,
      handleUpdateSchedule,
      handleDeleteSchedule,
      handleToggleScheduleStatus
    }}>
      {children}
    </ScheduleContext.Provider>
  );
};