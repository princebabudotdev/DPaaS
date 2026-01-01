import React from "react";

/**
 * DPaaS Global Spinner
 * No text • No icons • App-wide usage
 */

const DPaaSSpinner = () => {
  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex items-center justify-center">
      <div className="relative h-16 w-16 animate-spin-slow">
        
        {/* Segment 1 */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-2 rounded-sm bg-indigo-500" />

        {/* Segment 2 */}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-3 rounded-sm bg-neutral-700" />

        {/* Segment 3 */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 w-2 rounded-sm bg-neutral-700" />

        {/* Segment 4 */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-3 rounded-sm bg-neutral-700" />

        {/* Inner ring */}
        <div className="absolute inset-2 rounded-full border border-neutral-800" />
      </div>
    </div>
  );
};

export default DPaaSSpinner;


