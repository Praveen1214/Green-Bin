import React from "react";
import ManagerList from "./Managers/ManagerList";
import ManagerStats from "./Managers/ManagerStats";
import ManagerForm from "./Managers/ManagerForm";
import { ManagerProvider } from "./Managers/ManagerContext";

const Managers = () => {
  return (
    <ManagerProvider>
      <div className="flex flex-col min-h-screen">
        <header className="bg-green-800 p-5">
          <h1 className="text-white text-2xl">Manager Management</h1>
        </header>
        <main className="p-5 flex-grow bg-gray-50">
          <ManagerForm />
          <ManagerStats />
          <ManagerList />
        </main>
      </div>
    </ManagerProvider>
  );
};

export default Managers;
