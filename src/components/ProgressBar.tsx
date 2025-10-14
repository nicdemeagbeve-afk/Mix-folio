"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white",
                currentStep === index + 1 ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600",
                currentStep > index + 1 && "bg-green-500"
              )}
            >
              {index + 1}
            </div>
            {/* <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Step {index + 1}</span> */}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={cn(
                "flex-grow h-1 mx-2",
                currentStep > index + 1 ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
              )}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;