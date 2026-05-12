import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Chip,
  Menu,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import {
  fetchSellers,
  updateSllerAccountStatus,
} from "../../Redux Toolkit/features/seller/sellerSlice";
import { ExpandMore } from "@mui/icons-material";

// --- Status Config & Colors ---
const accountStatus = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    color: "warning",
  },
  { status: "ACTIVE", title: "Active", color: "success" },
  { status: "SUSPENDED", title: "Suspended", color: "error" },
  { status: "DEACTIVATED", title: "Deactivated", color: "default" },
  { status: "BANNED", title: "Banned", color: "error" },
  { status: "CLOSED", title: "Closed", color: "default" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F9FAFB", // Light Gray
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

export default function SellerTable() {
  const [status, setStatus] = useState<string>("ALL");
  const dispatch = useAppDispatch();
  const { sellers } = useAppSelectore((store) => store.seller); // Adjust based on your actual Redux state shape

  // Dropdown for "Update" Action (Optional, for future implementation)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(
    null
  );
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    sellerId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSellerId(sellerId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedSellerId(null);
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (!selectedSellerId) return;
    dispatch(updateSllerAccountStatus({ id: selectedSellerId, status: newStatus }));
    handleClose();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  useEffect(() => {
    dispatch(fetchSellers(status));
  }, [status, dispatch]);

  // Helper to get status chip color/label
  const getStatusChip = (currentStatus: string) => {
    const found = accountStatus.find((s) => s.status === currentStatus);
    const label = found ? found.title : currentStatus;

    let colorStyles = { bg: "#E5E7EB", text: "#374151" }; // Default Gray

    if (currentStatus === "ACTIVE")
      colorStyles = { bg: "#D1FAE5", text: "#065F46" }; // Green
    else if (currentStatus === "PENDING_VERIFICATION")
      colorStyles = { bg: "#FEF3C7", text: "#92400E" }; // Yellow
    else if (["SUSPENDED", "BANNED"].includes(currentStatus))
      colorStyles = { bg: "#FEE2E2", text: "#991B1B" }; // Red

    return (
      <Chip
        label={label}
        size="small"
        sx={{
          bgcolor: colorStyles.bg,
          color: colorStyles.text,
          fontWeight: "bold",
          fontSize: "0.75rem",
          borderRadius: "6px",
        }}
      />
    );
  };

  return (
    <div className="pb-10">
      {/* --- Filter Header --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-4 sm:px-0">
        <h1 className="text-xl font-bold text-gray-800">Sellers Management</h1>

        <FormControl size="small" sx={{ minWidth: 200, bgcolor: "white" }}>
          <InputLabel id="status-select-label">Filter by Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status}
            label="Filter by Status"
            onChange={handleChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="ALL">All Sellers</MenuItem>
            {accountStatus.map((st) => (
              <MenuItem key={st.status} value={st.status}>
                {st.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* --- Table Container --- */}
      <Paper
        elevation={0}
        className="shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden"
      >
        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 800 }} aria-label="seller table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Seller Name</StyledTableCell>
                <StyledTableCell>Business Name</StyledTableCell>
                <StyledTableCell>Contact Info</StyledTableCell>
                <StyledTableCell>GSTIN</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers?.map((item: any) => (
                <StyledTableRow key={item._id}>
                  {/* Name */}
                  <StyledTableCell component="th" scope="row">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#00927C] font-bold text-xs">
                        {item.sellerName?.[0] || "S"}
                      </div>
                      <span className="font-semibold text-gray-800">
                        {item.sellerName}
                      </span>
                    </div>
                  </StyledTableCell>

                  {/* Business Name */}
                  <StyledTableCell>
                    <span className="text-xs sm:text-sm line-clamp-1">
                      {item?.businessDetails?.businessName || "N/A"}
                    </span>
                  </StyledTableCell>

                  {/* Contact */}
                  <StyledTableCell>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-gray-800 line-clamp-1">
                        {item.email}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.mobile}
                      </span>
                    </div>
                  </StyledTableCell>

                  {/* GSTIN */}
                  <StyledTableCell>
                    <span className="font-mono text-xs bg-gray-50 px-1 sm:px-2 py-1 rounded border border-gray-100 line-clamp-1">
                      {item?.GSTIN || "N/A"}
                    </span>
                  </StyledTableCell>

                  {/* Status */}
                  <StyledTableCell>
                    {getStatusChip(item.accountStatus)}
                  </StyledTableCell>

                  {/* Action */}
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<ExpandMore fontSize="small" />}
                      onClick={(e) => handleClick(e, item._id)}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.75rem",
                        padding: "4px 8px",
                        color: "#555",
                        borderColor: "#E5E7EB",
                        "&:hover": {
                          borderColor: "#00927C",
                          color: "#00927C",
                          bgcolor: "rgba(0,146,124,0.04)",
                        },
                      }}
                    >
                      Update
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {accountStatus.map((st) => (
          <MenuItem key={st.status} onClick={() => handleStatusUpdate(st.status)}>
            {st.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

