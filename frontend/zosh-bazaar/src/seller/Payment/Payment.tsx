import { Card, Divider, Button, CircularProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import TransactionTable from "../Transaction/TransactionTable";
import { AccountBalanceWallet, TrendingUp } from "@mui/icons-material";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import { fetchTransactionBySeller } from "../../Redux Toolkit/features/seller/transactionSlice";

const Payment = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelectore((store) => store.transaction);
  const { jwt } = useAppSelectore((store) => store.sellerAuth);

  useEffect(() => {
    if (jwt) {
      dispatch(fetchTransactionBySeller(jwt));
    }
  }, [dispatch, jwt]);

  const { totalEarnings, lastPayoutAmount, lastPayoutDate } = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { totalEarnings: 0, lastPayoutAmount: 0, lastPayoutDate: "-" };
    }

    const total = transactions.reduce((sum: number, tx: any) => {
      const amt = Number(tx.amount || tx.totalAmount || 0);
      return sum + (isNaN(amt) ? 0 : amt);
    }, 0);

    const sorted = [...transactions].sort((a: any, b: any) =>
      new Date(b.createdAt || b.date || 0).getTime() -
      new Date(a.createdAt || a.date || 0).getTime()
    );
    const latest: any = sorted[0];
    const latestDate = latest?.createdAt || latest?.date;

    return {
      totalEarnings: total,
      lastPayoutAmount: Number(latest?.amount || latest?.totalAmount || 0) || 0,
      lastPayoutDate: latestDate
        ? new Date(latestDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "-",
    };
  }, [transactions]);

  return (
    // Responsive Container: p-0 on mobile, p-10 on desktop
    <div className="p-0 sm:p-5 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Title (Hidden on small mobile if needed, or kept for context) */}
        <div className="px-4 sm:px-0 pt-4 sm:pt-0">
          <h1 className="text-2xl font-bold text-gray-800">
            Payments & Wallet
          </h1>
          <p className="text-sm text-gray-500">
            Manage your earnings and payouts
          </p>
        </div>

        {/* Earning Summary Card */}
        <div className="px-4 sm:px-0">
          <Card className="rounded-2xl p-0 overflow-hidden shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Total Earning */}
              <div className="p-6 md:p-8 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-teal-50 rounded-lg text-[#00927C]">
                    <AccountBalanceWallet />
                  </div>
                  <h2 className="text-gray-500 font-medium uppercase text-xs tracking-wider">
                    Total Earnings
                  </h2>
                </div>
                <h1 className="font-bold text-4xl text-gray-800 mb-2">
                  ₹{totalEarnings.toLocaleString()}
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <TrendingUp fontSize="small" /> Live from transaction history
                </p>
                {loading && (
                  <div className="pt-2 flex items-center gap-2 text-gray-500 text-sm">
                    <CircularProgress size={18} thickness={5} />
                    Updating...
                  </div>
                )}
              </div>

              {/* Right: Last Payment Info */}
              <div className="p-6 md:p-8 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center">
                <h3 className="text-gray-500 font-medium text-sm mb-4">
                  Payment Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last Payout</span>
                    <span className="font-bold text-gray-800">
                      ₹{lastPayoutAmount.toLocaleString()}
                    </span>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Next Payout Date</span>
                    <span className="font-medium text-[#00927C]">
                      {lastPayoutDate}
                    </span>
                  </div>
                  <div className="pt-4">
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ textTransform: "none" }}
                    >
                      View Payout History
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Transactions Section */}
        <div className="space-y-4">
          <h2 className="px-4 sm:px-0 font-bold text-lg text-gray-800">
            Recent Transactions
          </h2>

          {/* Table Container: Full width on mobile, Rounded on Desktop */}
          <div className="bg-white shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden">
            <TransactionTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

