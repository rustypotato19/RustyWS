// LoadingSpinner.tsx
import React from "react";
import { Ring } from "@uiball/loaders"; // You can use a library like @uiball/loaders for a loader component

const LoaderComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Ring size={40} speed={1.5} color="green" />
    </div>
  );
};

export default LoaderComponent;
