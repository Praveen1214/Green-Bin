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
        <header className="bg-blue-800 p-5">
          <h1 className="text-white text-2xl">Garbage Request Management</h1>
        </header>
        <main className="p-5 flex-grow bg-gray-50">
            <GarbageRequestForm />
          <GarbageRequestStats />
          <GarbageRequestList />
        </main>
      </div>
    </GarbageRequestProvider>
  );
};

export default GarbageRequests;