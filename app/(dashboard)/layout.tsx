import NavBar from "@/components/layout/navbar";
import SideBar from "@/components/layout/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      <SideBar />
      <main className=" flex-1 overflow-y-auto p-4 md:ml-64">{children}</main>
    </div>
  );
};

export default DashboardLayout;
