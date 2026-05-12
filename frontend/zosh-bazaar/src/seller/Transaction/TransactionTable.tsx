import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Avatar, LinearProgress, Box } from "@mui/material";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import { useEffect } from "react";
import { fetchTransactionBySeller } from "../../Redux Toolkit/features/seller/transactionSlice";

// --- Styled Components ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F9FAFB", // Soft Gray Header
    color: "#374151", // Dark Gray Text
    fontWeight: "bold",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "12px 8px",
    borderBottom: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.875rem",
      padding: "16px 16px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "16px 24px",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.75rem",
    padding: "12px 8px",
    color: "#4B5563",
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.875rem",
      padding: "12px 16px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "16px 24px",
    },
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#F3F4F6",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  transition: "background-color 0.2s ease",
}));

export default function TransactionTable() {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelectore((store) => store.transaction);
  const { jwt } = useAppSelectore((store) => store.sellerAuth);

  useEffect(() => {
    if (jwt) {
      dispatch(fetchTransactionBySeller(jwt));
    }
  }, [dispatch, jwt]);

  // Helper for Status Chips
  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return { bg: "#D1FAE5", color: "#065F46", label: "Success" }; // Green
      case "PENDING":
        return { bg: "#FEF3C7", color: "#92400E", label: "Pending" }; // Yellow
      case "FAILED":
        return { bg: "#FEE2E2", color: "#991B1B", label: "Failed" }; // Red
      default:
        return { bg: "#E5E7EB", color: "#374151", label: status };
    }
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ width: "100%", overflowX: "auto" }}
    >
      {loading && <LinearProgress />}
      <Table sx={{ minWidth: 800 }} aria-label="transaction table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell>Transaction ID</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions && transactions.length > 0 ? (
            transactions.map((row: any) => {
              const statusStyle = getStatusColor(row.status || row.transactionStatus || "");
              return (
                <StyledTableRow key={row._id || row.id}>
                  {/* Date */}
                  <StyledTableCell component="th" scope="row">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {row.createdAt
                          ? new Date(row.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "-"}
                      </span>
                      {row.createdAt && (
                        <span className="text-xs text-gray-500">
                          {new Date(row.createdAt).getFullYear()}
                        </span>
                      )}
                    </div>
                  </StyledTableCell>

                  {/* Customer */}
                  <StyledTableCell>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar
                        sx={{
                          width: { xs: 24, sm: 32 },
                          height: { xs: 24, sm: 32 },
                          bgcolor: "#00927C",
                          fontSize: { xs: 12, sm: 14 },
                        }}
                      >
                        {(row.customerName || row.user?.fullName || "U")[0]}
                      </Avatar>
                      <span className="font-medium text-xs sm:text-sm line-clamp-1">
                        {row.customerName || row.user?.fullName || "Unknown"}
                      </span>
                    </div>
                  </StyledTableCell>

                  {/* ID */}
                  <StyledTableCell>
                    <span className="font-mono text-xs sm:text-xs bg-gray-100 px-1 sm:px-2 py-1 rounded text-gray-600 line-clamp-1">
                      {row.transactionId || row._id?.slice(-8) || "-"}
                    </span>
                  </StyledTableCell>

                  {/* Amount */}
                  <StyledTableCell>
                    <span className="font-bold text-gray-800 text-xs sm:text-sm">₹{row.amount || row.totalAmount || 0}</span>
                  </StyledTableCell>

                  {/* Status */}
                  <StyledTableCell align="center">
                    <Chip
                      label={statusStyle.label || row.status || row.transactionStatus || "-"}
                      size="small"
                      sx={{
                        bgcolor: statusStyle.bg,
                        color: statusStyle.color,
                        fontWeight: "bold",
                        fontSize: "0.65rem",
                        height: "20px",
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                <Box className="text-gray-500 font-medium">No transactions found</Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

