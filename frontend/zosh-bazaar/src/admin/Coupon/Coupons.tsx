import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, Chip, Typography } from "@mui/material";
import { Delete, ContentCopy } from "@mui/icons-material";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import { useEffect } from "react";
import {
  fetchAllcoupon,
  deleteCoupon,
} from "../../Redux Toolkit/features/admin/couponSlice";
import { useNavigate } from "react-router-dom";

// --- Styled Components ---
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F9FAFB",
    color: "#374151",
    fontWeight: "bold",
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "16px 24px",
    borderBottom: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "16px 24px",
    color: "#4B5563",
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

export default function Coupon() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { coupons, loading } = useAppSelectore((store) => store.adminCoupon);

  useEffect(() => {
    dispatch(fetchAllcoupon(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleDelete = (id: string) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && id) {
      dispatch(deleteCoupon({ id, jwt }));
    }
  };

  // Helper to check status
  const getStatus = (endDate: string) => {
    const isExpired = new Date(endDate) < new Date();
    return isExpired ? (
      <Chip label="Expired" size="small" color="error" variant="outlined" />
    ) : (
      <Chip
        label="Active"
        size="small"
        color="success"
        sx={{ bgcolor: "#D1FAE5", color: "#065F46" }}
      />
    );
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Coupons</h1>
            <p className="text-sm text-gray-500">
              Manage discounts and promo codes
            </p>
          </div>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/add-coupons")}
            sx={{
              bgcolor: "#00927C",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#007a68" },
            }}
          >
            Add New Coupon
          </Button>
        </div>

        {/* Table Container */}
        <div className="bg-white shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden">
          <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ minWidth: 900 }} aria-label="coupon table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Coupon Code</StyledTableCell>
                  <StyledTableCell>Discount</StyledTableCell>
                  <StyledTableCell>Min Order</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                      <Typography variant="body1" color="textSecondary">
                        Loading coupons...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : coupons && coupons.length > 0 ? (
                  coupons.map((row: any) => (
                    <StyledTableRow key={row._id || row.code}>
                      {/* Code */}
                      <StyledTableCell component="th" scope="row">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#00927C] bg-teal-50 px-2 py-1 rounded border border-teal-100">
                            {row.code}
                          </span>
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigator.clipboard.writeText(row.code)
                            }
                          >
                            <ContentCopy
                              fontSize="inherit"
                              className="text-gray-400"
                            />
                          </IconButton>
                        </div>
                    </StyledTableCell>
                    {/* Discount */}
                    <StyledTableCell>
                      <span className="font-bold text-gray-800">
                        {row.discountPercentage}% OFF
                      </span>
                    </StyledTableCell>
                    {/* Min Order */}
                    <StyledTableCell>
                      <span className="text-gray-600">
                        ₹{row.minimumOrderValue}
                      </span>
                    </StyledTableCell>
                    {/* Start Date */}
                    <StyledTableCell>
                      <span className="text-sm text-gray-600">
                        {formatDate(row.validityStartDate)}
                      </span>
                    </StyledTableCell>
                    {/* End Date */}
                    <StyledTableCell>
                      <span className="text-sm text-gray-600">
                        {formatDate(row.validityEndDate)}
                      </span>
                    </StyledTableCell>
                    {/* Status */}
                    <StyledTableCell align="center">
                      {getStatus(row.validityEndDate)}
                    </StyledTableCell>
                    {/* Delete */}
                    <StyledTableCell align="center">
                      <IconButton
                        onClick={() => handleDelete(row._id)}
                        size="small"
                        className="hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                      <Typography variant="body1" color="textSecondary">
                        No coupons found. Create one to get started!
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

