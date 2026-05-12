import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
  InputAdornment,
  MenuItem,
  GridLegacy as Grid,
} from "@mui/material";
import {
  Close,
  Edit,
  Inventory2,
  Category,
  Description,
} from "@mui/icons-material";
import { useAppSelectore } from "../../Redux Toolkit/store";
import { useState } from "react";

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

// --- Main Table Component ---
export default function ProductTable() {
  const { sellerProduct } = useAppSelectore((store) => store);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ width: "100%", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 800 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align="right">MRP</StyledTableCell>
              <StyledTableCell align="right">Selling Price</StyledTableCell>
              <StyledTableCell align="center">Stock Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct.products.map((item: any) => (
              <StyledTableRow key={item.id}>)
                {/* Product Info */}
                <StyledTableCell component="th" scope="row">
                  <div className="flex items-center gap-2 sm:gap-4 min-w-[180px] sm:min-w-[250px]">
                    <div className="relative w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0">
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                      />
                      {item.images?.length > 1 && (
                        <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gray-800 text-white text-[7px] sm:text-[9px] w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border border-white">
                          +{item.images.length - 1}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span
                        className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-1"
                        title={item.title}
                      >
                        {item.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        ID: #{item.id?.slice(-6).toUpperCase() || "N/A"}
                      </span>
                    </div>
                  </div>
                </StyledTableCell>

                {/* Pricing */}
                <StyledTableCell align="right">
                  <span className="text-gray-400 line-through text-xs font-medium">
                    ₹{item.mrpPrice}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <span className="font-bold text-gray-800 text-xs sm:text-sm">
                    ₹{item.sellingPrice}
                  </span>
                </StyledTableCell>

                {/* Stock Status */}
                <StyledTableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      borderColor: "#10B981",
                      color: "#047857",
                      bgcolor: "#ECFDF5",
                      "&:hover": {
                        bgcolor: "#D1FAE5",
                        borderColor: "#10B981",
                      },
                    }}
                  >
                    In Stock
                  </Button>
                </StyledTableCell>

                {/* Actions */}
                <StyledTableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(item)}
                    sx={{
                      color: "#00927C",
                      bgcolor: "rgba(0, 146, 124, 0.1)",
                      "&:hover": { bgcolor: "#00927C", color: "white" },
                      transition: "all 0.2s",
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

      {/* --- Edit Product Modal --- */}
      {selectedProduct && (
        <EditProductModal
          open={open}
          handleClose={handleClose}
          product={selectedProduct}
        />
      )}
    </>
  );
}

// --- Component: Edit Product Modal ---
const EditProductModal = ({ open, handleClose, product }: any) => {
  const theme = useTheme();
  // Check if screen is small (mobile)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile} // This makes it full screen on mobile devices
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3, // Remove corners on mobile
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
          p: isMobile ? 2 : 3, // Smaller padding on mobile
        }}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Edit Product
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            #{product.id?.slice(-6).toUpperCase()}
          </p>
        </div>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: isMobile ? 2 : 4 }}>
        {/* Image Preview Strip */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {product.images?.map((img: string, idx: number) => (
            <div
              key={idx}
              className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg border border-gray-200 overflow-hidden bg-white"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {/* Add Image Placeholder */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:border-[#00927C] hover:text-[#00927C] transition-colors">
            <span className="text-2xl">+</span>
          </div>
        </div>

        <Grid container spacing={isMobile ? 2 : 3}>
          {/* Product Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Title"
              defaultValue={product.title}
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{ bgcolor: "white" }}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              defaultValue={product.description || "No description available."}
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{ bgcolor: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description fontSize="small" sx={{ mb: 8 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Pricing Row */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="MRP Price"
              defaultValue={product.mrpPrice}
              type="number"
              size={isMobile ? "small" : "medium"}
              sx={{ bgcolor: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Selling Price"
              defaultValue={product.sellingPrice}
              type="number"
              size={isMobile ? "small" : "medium"}
              sx={{ bgcolor: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Stock & Category */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock Quantity"
              defaultValue={product.quantity || 10}
              type="number"
              size={isMobile ? "small" : "medium"}
              sx={{ bgcolor: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Inventory2 fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Category"
              defaultValue={product.category?.name || "Men"}
              size={isMobile ? "small" : "medium"}
              sx={{ bgcolor: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Category fontSize="small" />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Men">Men's Fashion</MenuItem>
              <MenuItem value="Women">Women's Fashion</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Footer Actions */}
      <DialogActions
        sx={{
          p: isMobile ? 2 : 3,
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
          onClick={handleClose}
          sx={{
            bgcolor: "#00927C",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 4px 14px 0 rgba(0, 146, 124, 0.39)",
            padding: "8px 24px",
            "&:hover": { bgcolor: "#007a68" },
          }}
        >
          Update Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};



