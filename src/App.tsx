//

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 lg:pl-64 pt-20 lg:pt-8 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full min-w-0 bg-slate-50 dark:bg-slate-950">
        {activeTab === "Dashboard" && <Dashboard />}
        {activeTab === "All Tasks" && <Tasks />}
        {activeTab === "Profile" && <Profile />}
        {activeTab === "Settings" && <Settings />}
      </main>
    </div>
  );
}
