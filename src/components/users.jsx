import React from "react";
import UserStats from "./users/UserStars";
import UserList from "./users/UserList";
import { UserProvider } from "./users/UserContext";

const Managers = () => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <header className="bg-green-800 p-5">
          <h1 className="text-white text-2xl">User Management</h1>
        </header>
        <main className="p-5 flex-grow bg-gray-50">
         
          <UserStats />
          <UserList />
        </main>
      </div>
    </UserProvider>
  );
};

export default Managers;
