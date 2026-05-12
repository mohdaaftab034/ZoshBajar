import { CheckCircle, FiberManualRecord, Cancel } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const steps = [
  { name: "Order Placed", description: "Order verified", value: "PLACED" },
  {
    name: "Confirmed",
    description: "Seller has processed order",
    value: "CONFIRMED",
  },
  { name: "Shipped", description: "Out for delivery", value: "SHIPPED" },
  {
    name: "Delivered",
    description: "Item delivered successfully",
    value: "DELIVERED",
  },
];

const canceledSteps = [
  { name: "Order Placed", description: "Order verified", value: "PLACED" },
  {
    name: "Confirmed",
    description: "Seller has processed order",
    value: "CONFIRMED",
  },
  {
    name: "Order Canceled",
    description: "You canceled this order",
    value: "CANCELLED",
  },
];

const OrderStepper = ({ orderStatus }: any) => {
  const [activeSteps, setActiveSteps] = useState(steps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Determine if it's a normal flow or a canceled flow
    const isCancelled =
      orderStatus === "CANCELLED" || orderStatus === "CANCELED";
    const stepsToUse = isCancelled ? canceledSteps : steps;

    setActiveSteps(stepsToUse);

    // Find index of current status
    // If exact status isn't found, map it logic (e.g., ARRIVING maps to SHIPPED index)
    let index = stepsToUse.findIndex((s) => s.value === orderStatus);

    // Fallback logic if status strings don't match exactly in backend
    if (index === -1) {
      if (orderStatus === "ARRIVING") index = 2; // Treat as Shipped
      else index = 0; // Default to placed
    }
    setCurrentStepIndex(index);
  }, [orderStatus]);

  return (
    <Box className="w-full">
      {activeSteps.map((step, index) => {
        const isCompleted = index <= currentStepIndex;
        const isLast = index === activeSteps.length - 1;
        const isCancelledStep = step.value === "CANCELLED";

        return (
          <div key={index} className="flex group">
            {/* Left Timeline Indicator */}
            <div className="flex flex-col items-center mr-4">
              <div
                className={`
                    w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-300 border-2
                    ${
                      isCancelledStep
                        ? "bg-red-50 border-red-500 text-red-500"
                        : isCompleted
                        ? "bg-teal-50 border-[#00927C] text-[#00927C]"
                        : "bg-gray-50 border-gray-300 text-gray-300"
                    }
                `}
              >
                {isCancelledStep ? (
                  <Cancel fontSize="small" />
                ) : isCompleted ? (
                  <CheckCircle fontSize="small" />
                ) : (
                  <FiberManualRecord fontSize="small" sx={{ fontSize: 10 }} />
                )}
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div
                  className={`
                        w-[2px] h-12 my-1
                        ${
                          isCompleted && index < currentStepIndex
                            ? isCancelledStep
                              ? "bg-red-500"
                              : "bg-[#00927C]"
                            : "bg-gray-200"
                        }
                    `}
                />
              )}
            </div>

            {/* Right Text Content */}
            <div className={`pb-8 ${isLast ? "pb-0" : ""} pt-1`}>
              <p
                className={`font-bold text-sm ${
                  isCompleted ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
            </div>
          </div>
        );
      })}
    </Box>
  );
};

export default OrderStepper;

