import NavBar from "@/components/layout/navbar";
import SideBar from "@/components/layout/sidebar";
import React from "react";




const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top NavBar */}
      <div className="flex-shrink-0">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 relative min-h-0 ">
        <SideBar />
        <main className="flex-1 overflow-y-auto min-w-0 py-6 px-4 sm:px-6 lg:ml-64 scrollbar-hidden">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
