"use client";

import React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import DashboardSidebar from "@/components/DashboardSidebar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-60px)]">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <DashboardSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <div className="flex h-full items-center justify-center p-6 bg-gray-100 dark:bg-gray-800">
              <Outlet /> {/* This is where the nested dashboard routes will render */}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Dashboard;