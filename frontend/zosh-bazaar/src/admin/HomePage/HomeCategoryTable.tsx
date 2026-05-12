import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Edit, Close, Image as ImageIcon } from "@mui/icons-material";
import { useState } from "react";
import EditHomeCategoryForm from "./EditHomeCategoryForm";

// --- Custom Styled Components ---
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
    backgroundColor: "#F3F4F6", // Light hover effect
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  transition: "background-color 0.2s ease",
}));

export default function HomeCategoryTable({ categories }: any) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = (category: any) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      {/* Wrapper for Card-like appearance */}
      <div className="bg-white shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden">
        {/* Scrollable Container for Mobile */}
        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="category table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Category ID</StyledTableCell>
                <StyledTableCell>Preview</StyledTableCell>
                <StyledTableCell>Category Name</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories?.map((item: any, index: number) => (
                <StyledTableRow key={item._id}>
                  {/* Index */}
                  <StyledTableCell component="th" scope="row">
                    <span className="font-medium text-gray-500">
                      #{index + 1}
                    </span>
                  </StyledTableCell>

                  {/* ID */}
                  <StyledTableCell>
                    <span className="font-mono text-xs bg-gray-50 px-1 sm:px-2 py-1 rounded border border-gray-100 text-gray-600 line-clamp-1">
                      {item._id?.slice(0, 8)}...
                    </span>
                  </StyledTableCell>

                  {/* Image */}
                  <StyledTableCell>
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg border border-gray-200 p-1 bg-white shrink-0">
                      {item?.image ? (
                        <img
                          className="w-full h-full object-cover rounded-md"
                          src={item?.image}
                          alt={item?.name}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md text-gray-300">
                          <ImageIcon fontSize="small" />
                        </div>
                      )}
                    </div>
                  </StyledTableCell>

                  {/* Name */}
                  <StyledTableCell>
                    <span className="font-semibold text-gray-800 text-xs sm:text-base line-clamp-2">
                      {item?.name}
                    </span>
                  </StyledTableCell>

                  {/* Action */}
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => handleOpen(item)}
                      size="small"
                      sx={{
                        color: "#00927C",
                        bgcolor: "rgba(0,146,124,0.1)",
                        "&:hover": { bgcolor: "#00927C", color: "white" },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* --- Edit Form Dialog --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile} // Full screen on mobile devices
        PaperProps={{
          sx: { borderRadius: isMobile ? 0 : 3 },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#F9FAFB",
            borderBottom: "1px solid #E5E7EB",
            p: 3,
          }}
        >
          <span className="font-bold text-gray-800">Edit Category</span>
          <IconButton onClick={handleClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {selectedCategory && (
            <div className="p-4 sm:p-6">
              <EditHomeCategoryForm
                selectedCategory={selectedCategory}
                onClose={handleClose}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

