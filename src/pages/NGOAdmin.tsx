
import React from "react";
import AdminDashboard from "@/components/donation/AdminDashboard";

const NGOAdmin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NGO Admin Dashboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage incoming food donation requests and volunteer assignments
          </p>
        </div>

        <AdminDashboard />
      </div>
    </div>
  );
};

export default NGOAdmin;
