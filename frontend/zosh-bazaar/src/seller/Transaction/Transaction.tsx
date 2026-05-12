import TransactionTable from "./TransactionTable";
import { ReceiptLong } from "@mui/icons-material";

const Transaction = () => {
  return (
    // Responsive Container
    <div className="p-0 sm:p-5 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 px-4 pt-4 sm:px-0 sm:pt-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00927C] rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <ReceiptLong fontSize="small" className="sm:text-2xl" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              All Transactions
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              History of all your incoming payments
            </p>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="bg-white shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Transaction;

