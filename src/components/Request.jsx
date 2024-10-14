// GarbageRequests.js
import React from "react";
import GarbageRequestList from "./Requests/FactoryRequest/GarbageRequestList";
import GarbageRequestStats from "./Requests/FactoryRequest/GarbageRequestStats";
import { GarbageRequestProvider } from "./Requests/FactoryRequest/GarbageRequestContext";
import GarbageRequestForm from "./Requests/FactoryRequest/GarbageRequestForm";
const GarbageRequests = () => {
  return (
    <GarbageRequestProvider>
      <div className="flex flex-col min-h-screen">
        <header className="p-5 bg-green-800">
          <h1 className="text-2xl text-white">Garbage Request Management</h1>
        </header>
        <main className="flex-grow p-5 bg-gray-50">
          <GarbageRequestForm />
          <GarbageRequestStats />
          <GarbageRequestList />
        </main>
      </div>
    </GarbageRequestProvider>
  );
};

export default GarbageRequests;
