import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import {
  Delete,
  Edit,
  ImageNotSupported,
  Close,
  LocalOffer,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelectore } from "../../Redux Toolkit/store";
import { useEffect, useState } from "react";
import {
  deleteDeal,
  getAllDeals,
  // updateDeal, // Make sure you import your update action here
} from "../../Redux Toolkit/features/admin/dealSlice";

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

// --- Main Table Component ---
export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deals } = useAppSelectore((store) => store.deal);

  // State for Modal
  const [open, setOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllDeals(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleDeleteDeal = (id: any) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      dispatch(deleteDeal(id));
    }
  };

  const handleEditClick = (deal: any) => {
    setSelectedDeal(deal);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDeal(null);
  };

  return (
    // Responsive Wrapper
    <div className="bg-white shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden">
      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 800 }} aria-label="deal table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">No</StyledTableCell>
              <StyledTableCell align="left">Preview</StyledTableCell>
              <StyledTableCell align="left">Category Name</StyledTableCell>
              <StyledTableCell align="center">Discount</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deals?.map((item, index) => (
              <StyledTableRow key={item._id}>
                {/* Index */}
                <StyledTableCell component="th" scope="row">
                  <span className="font-medium text-gray-500">
                    #{index + 1}
                  </span>
                </StyledTableCell>

                {/* Image */}
                <StyledTableCell align="left">
                  <div className="w-16 h-16 rounded-lg border border-gray-200 p-1 bg-white flex items-center justify-center overflow-hidden">
                    {item?.category?.image ? (
                      <img
                        className="w-full h-full object-cover rounded-md hover:scale-110 transition-transform duration-300"
                        src={item?.category?.image}
                        alt={item?.category?.name}
                      />
                    ) : (
                      <ImageNotSupported className="text-gray-300" />
                    )}
                  </div>
                </StyledTableCell>

                {/* Category */}
                <StyledTableCell align="left">
                  <span className="font-semibold text-gray-800 text-base">
                    {item?.category?.name || "N/A"}
                  </span>
                </StyledTableCell>

                {/* Discount */}
                <StyledTableCell align="center">
                  <Chip
                    label={`${item?.discount}% OFF`}
                    size="small"
                    sx={{
                      bgcolor: "#FFF1F2",
                      color: "#E11D48",
                      fontWeight: "bold",
                      border: "1px solid #FECDD3",
                    }}
                  />
                </StyledTableCell>

                {/* Actions */}
                <StyledTableCell align="center">
                  <div className="flex justify-center gap-2">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(item)}
                      sx={{
                        color: "#00927C",
                        bgcolor: "rgba(0,146,124,0.1)",
                        "&:hover": { bgcolor: "#00927C", color: "white" },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteDeal(item._id)}
                      size="small"
                      sx={{
                        color: "#EF4444",
                        bgcolor: "#FEF2F2",
                        "&:hover": { bgcolor: "#EF4444", color: "white" },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {(!deals || deals.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <p className="text-gray-500">
                    No active deals found. Create one to get started!
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- Edit Deal Modal --- */}
      {selectedDeal && (
        <EditDealModal
          open={open}
          handleClose={handleClose}
          deal={selectedDeal}
        />
      )}
    </div>
  );
}

// --- Component: Edit Deal Modal ---
const EditDealModal = ({ open, handleClose, deal }: any) => {
  const theme = useTheme();
  // Responsive: Full screen on mobile
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Local state for editing
  const [discount, setDiscount] = useState(deal.discount);

  const handleUpdate = () => {
    // 1. Dispatch update action here
    // dispatch(updateDeal({ id: deal._id, discount: Number(discount) }));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          bgcolor: "#F9FAFB",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "white",
          borderBottom: "1px solid #E5E7EB",
          p: 3,
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-gray-800">Edit Deal</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Update discount percentage
          </p>
        </div>
        <IconButton onClick={handleClose} size="small">
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3, pt: 4 }}>
        <div className="flex flex-col gap-4">
          {/* Category Preview (Read-only) */}
          <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
              <img
                src={deal.category?.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Category
              </p>
              <p className="font-semibold text-gray-800">
                {deal.category?.name}
              </p>
            </div>
          </div>

          {/* Discount Input */}
          <TextField
            fullWidth
            label="Discount Percentage"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            variant="outlined"
            sx={{ bgcolor: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOffer fontSize="small" className="text-gray-400" />
                </InputAdornment>
              ),
              endAdornment: <span className="text-gray-500 font-bold">%</span>,
            }}
          />
        </div>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid #E5E7EB",
          bgcolor: "white",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "gray",
            fontWeight: 600,
            textTransform: "none",
            mr: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            bgcolor: "#00927C",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 4px 14px 0 rgba(0, 146, 124, 0.39)",
            padding: "8px 24px",
            "&:hover": { bgcolor: "#007a68" },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

