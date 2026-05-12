import { useState } from "react";
import DealTable from "./DealTable";
import DealCategoryTable from "./DealCategoryTable"; // Ensure this component exists
import CreateDealForm from "./CreateDealForm"; // Ensure this component exists
import { Button, Paper } from "@mui/material";
import { Add, Category, LocalOffer } from "@mui/icons-material";

const tabs = [
  {
    label: "Active Deals",
    value: "Deals",
    icon: <LocalOffer fontSize="small" />,
  },
  {
    label: "Deal Categories",
    value: "Categories",
    icon: <Category fontSize="small" />,
  },
  {
    label: "Create New Deal",
    value: "Create Deal",
    icon: <Add fontSize="small" />,
  },
];

const Deal = () => {
  const [activeTab, setActiveTab] = useState("Deals");

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Deals Management</h1>
          <p className="text-sm text-gray-500">
            Manage daily deals and category discounts
          </p>
        </div>

        {/* --- Tab Navigation --- */}
        <div className="flex flex-wrap gap-3 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-200 w-fit">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              startIcon={tab.icon}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "8px",
                px: 3,
                py: 1,
                bgcolor: activeTab === tab.value ? "#00927C" : "transparent",
                color: activeTab === tab.value ? "white" : "gray",
                "&:hover": {
                  bgcolor:
                    activeTab === tab.value
                      ? "#007a68"
                      : "rgba(0, 146, 124, 0.08)",
                  color: activeTab === tab.value ? "white" : "#00927C",
                },
              }}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* --- Content Area --- */}
        <div className="mt-5">
          {activeTab === "Deals" ? (
            <DealTable />
          ) : activeTab === "Categories" ? (
            // Placeholder if DealCategoryTable code isn't provided, use consistent wrapper
            <DealCategoryTable />
          ) : (
            <div className="flex justify-center">
              <Paper
                elevation={0}
                className="w-full max-w-2xl p-6 sm:p-10 rounded-2xl border border-gray-200 bg-white"
              >
                <CreateDealForm />
              </Paper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deal;

