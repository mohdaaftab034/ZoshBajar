import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Menu, MenuItem, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import {
  fetchSellerOrders,
  updateOrdersStatus,
} from "../../Redux Toolkit/features/seller/sellerOrderSlice";
import { ExpandMore, FiberManualRecord } from "@mui/icons-material";

// --- Custom Styled Components ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F9FAFB",
    color: "#374151",
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

// --- Status Config ---
const orderStatus = [
  { color: "#F59E0B", label: "PENDING", bg: "#FEF3C7" },
  { color: "#3B82F6", label: "PLACED", bg: "#DBEAFE" },
  { color: "#6366F1", label: "CONFIRMED", bg: "#E0E7FF" },
  { color: "#8B5CF6", label: "SHIPPED", bg: "#EDE9FE" },
  { color: "#10B981", label: "DELIVERED", bg: "#D1FAE5" },
  { color: "#EF4444", label: "CANCELLED", bg: "#FEE2E2" },
];

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { orders } = useAppSelectore((store) => store.sellerOrder);

  const open = Boolean(anchorEl);

  const handleClick = (event: any, orderId: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleUpdateOrder = (status: any) => {
    if (selectedOrderId) {
      dispatch(
        updateOrdersStatus({
          orderId: selectedOrderId,
          orderStatus: status,
          jwt: localStorage.getItem("jwt"),
        })
      );
      handleClose();
    }
  };

  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt")));
  }, [dispatch]);

  // Helper to get status style
  const getStatusStyle = (status: string) => {
    const found = orderStatus.find((s) => s.label === status) || orderStatus[0];
    return {
      color: found.color,
      backgroundColor: found.bg,
    };
  };

  return (
    // overflowX: "auto" is crucial for horizontal scrolling on mobile
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ width: "100%", overflowX: "auto" }}
    >
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell>Shipping Address</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order: any) => (
            <StyledTableRow key={order._id}>
              {/* Order ID */}
              <StyledTableCell component="th" scope="row">
                <span className="font-mono font-medium text-[#00927C] bg-teal-50 px-2 py-1 rounded">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
              </StyledTableCell>

              {/* Products */}
              <StyledTableCell>
                {/* Min-width ensures this column doesn't collapse on mobile scroll */}
                <div className="space-y-2 sm:space-y-3 min-w-[200px] sm:min-w-[250px]">
                  {order?.orderItems?.map((item: any, index: number) => (
                    <div key={index} className="flex gap-2 sm:gap-4 items-start sm:items-center">
                      <Avatar
                        src={item?.product?.images[0]}
                        variant="rounded"
                        sx={{
                          width: { xs: 36, sm: 48 },
                          height: { xs: 36, sm: 48 },
                          bgcolor: "#f3f4f6",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <div className="flex flex-col flex-1">
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-1">
                          {item?.product?.title || "Product Title"}
                        </span>
                        <div className="flex gap-2 sm:gap-3 text-xs text-gray-500 mt-0.5 flex-wrap">
                          <span>
                            C:{" "}
                            <span className="font-medium text-gray-700">
                              {item.product?.color || "N/A"}
                            </span>
                          </span>
                          <span>
                            S:{" "}
                            <span className="font-medium text-gray-700">
                              {item.size || "M"}
                            </span>
                          </span>
                          <span>
                            Q:{" "}
                            <span className="font-medium text-gray-700">
                              {item.quantity}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </StyledTableCell>

              {/* Address */}
              <StyledTableCell>
                <div className="flex flex-col text-xs sm:text-sm min-w-[150px] sm:min-w-[200px]">
                  <span className="font-semibold text-gray-800 line-clamp-1">
                    {order?.shippingAddress?.name || "Customer Name"}
                  </span>
                  <span className="text-gray-500 mt-0.5 text-xs line-clamp-2">
                    {order?.shippingAddress?.address}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {order?.shippingAddress?.city},{" "}
                    {order?.shippingAddress?.pincode}
                  </span>
                </div>
              </StyledTableCell>

              {/* Order Status */}
              <StyledTableCell align="center">
                <Box
                  sx={{
                    ...getStatusStyle(order?.orderStatus),
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    letterSpacing: "0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <FiberManualRecord sx={{ fontSize: 10, color: "inherit" }} />
                  {order?.orderStatus}
                </Box>
              </StyledTableCell>

              {/* Action */}
              <StyledTableCell align="center">
                <Button
                  onClick={(e) => handleClick(e, order._id)}
                  variant="outlined"
                  size="small"
                  endIcon={<ExpandMore fontSize="small" />}
                  sx={{
                    borderColor: "#E5E7EB",
                    color: "#374151",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                    padding: "4px 8px",
                    "&:hover": {
                      borderColor: "#00927C",
                      color: "#00927C",
                      backgroundColor: "rgba(0, 146, 124, 0.04)",
                    },
                  }}
                >
                  Update
                </Button>

                {/* Status Menu */}
                <Menu
                  id="status-menu"
                  anchorEl={anchorEl}
                  open={open && selectedOrderId === order._id}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  PaperProps={{
                    elevation: 3,
                    sx: { borderRadius: 2, mt: 1, minWidth: 150 },
                  }}
                >
                  {orderStatus.map((status, statusIdx) => (
                    <MenuItem
                      key={`status-${statusIdx}`}
                      onClick={() => handleUpdateOrder(status.label)}
                      sx={{
                        fontSize: "0.875rem",
                        gap: 2,
                        "&:hover": { color: "#00927C", bgcolor: "#F0FDFA" },
                      }}
                    >
                      <FiberManualRecord
                        sx={{ fontSize: 12, color: status.color }}
                      />
                      {status.label}
                    </MenuItem>
                  ))}
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

