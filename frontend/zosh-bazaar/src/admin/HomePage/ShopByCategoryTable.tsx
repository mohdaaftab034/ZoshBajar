import { useAppSelectore } from "../../Redux Toolkit/store";
import { useState } from "react";
import {
  styled,
} from "@mui/material/styles";
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
  Button,
} from "@mui/material";
import { Edit, Close, Image as ImageIcon, Add } from "@mui/icons-material";
import ShopByCategoryForm from "./ShopByCategoryForm";

// --- Custom Styled Components ---
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

const ShopByCategoryTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const isMobile = false;

  const homeCategories = useAppSelectore(
    (store) => store.homeCategory.homeCategories
  ) as any;

  const categories: any[] = homeCategories?.shopByCategories || [];

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
      {/* Header with Add Button */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Shop By Categories</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedCategory(null); // Clear selection for create mode
            setOpen(true);
          }}
          sx={{
            bgcolor: "#00927C",
            "&:hover": { bgcolor: "#007a68" },
          }}
        >
          Add New Category
        </Button>
      </div>

      <div className="bg-white shadow-none sm:shadow-sm rounded-none sm:rounded-2xl border-y sm:border border-gray-200 overflow-hidden">
        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="shop by category table">
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
                  <StyledTableCell component="th" scope="row">
                    <span className="font-medium text-gray-500">
                      #{index + 1}
                    </span>
                  </StyledTableCell>

                  <StyledTableCell>
                    <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100 text-gray-600">
                      {item.categoryId}
                    </span>
                  </StyledTableCell>

                  <StyledTableCell>
                    <div className="w-16 h-16 rounded-lg border border-gray-200 p-1 bg-white">
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

                  <StyledTableCell>
                    <span className="font-semibold text-gray-800 text-base">
                      {item?.name}
                    </span>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => handleOpen(item)}
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
        fullScreen={isMobile}
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
          <span className="font-bold text-gray-800">
            {selectedCategory ? "Edit Shop by Category" : "Create Shop by Category"}
          </span>
          <IconButton onClick={handleClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {selectedCategory && (
            <div className="p-4 sm:p-6">
              <ShopByCategoryForm
                selectedCategory={selectedCategory}
                onClose={handleClose}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShopByCategoryTable;
