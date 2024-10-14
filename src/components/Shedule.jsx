// Schedules.js
import React from "react";
import { ScheduleProvider } from "./Requests/ResidetntsRequests/ScheduleContext";
import ScheduleForm from "./Requests/ResidetntsRequests/ScheduleForm";
import ScheduleStats from "./Requests/ResidetntsRequests/ScheduleStats";
import ScheduleList from "./Requests/ResidetntsRequests/ScheduleList";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Schedules = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <ScheduleProvider>
      <div className="flex flex-col min-h-screen">
        <header className="bg-blue-800 p-5">
          <h1 className="text-white text-2xl">Schedule Management</h1>
        </header>
        <main className="p-5 flex-grow bg-gray-50">
          
          <ScheduleForm visible={isModalVisible} onCancel={() => setIsModalVisible(false)} />
          <ScheduleStats/>
          <ScheduleList/>
        </main>
      </div>
    </ScheduleProvider>
  );
};

export default Schedules;