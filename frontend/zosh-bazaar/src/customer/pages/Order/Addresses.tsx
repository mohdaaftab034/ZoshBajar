import { useState, useEffect } from "react";
import {
  Add,
  DeleteOutline,
  Edit,
  Home,
  LocationOn,
  Phone,
  Work,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelectore } from "../../../Redux Toolkit/store";
import { fetchUserAddresses } from "../../../Redux Toolkit/features/customer/addressSlice";

const Address = () => {
  const dispatch = useAppDispatch();
  const { addresses, loading } = useAppSelectore((store) => store.address);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserAddresses(jwt));
    }
  }, [dispatch]);

  const handleRemove = () => {
    // TODO: Implement delete address API call
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              My Addresses
              <span className="text-sm font-normal text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                {addresses.length} Saved
              </span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm flex items-center gap-1">
              <LocationOn fontSize="small" className="text-[#00927C]" />
              Manage your delivery locations.
            </p>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<Add />}
            sx={{
              bgcolor: "#00927C",
              borderRadius: "10px",
              padding: "10px 24px",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 14px 0 rgba(0, 146, 124, 0.39)",
              "&:hover": { bgcolor: "#007a68" },
            }}
          >
            Add New Address
          </Button>
        </div>

        {/* Address Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              Loading addresses...
            </div>
          ) : addresses.length > 0 ? (
            addresses.map((addr: any) => (
              <AddressCard key={addr._id} address={addr} onRemove={handleRemove} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              <LocationOn sx={{ fontSize: 60, color: "#ccc" }} />
              <p className="mt-4 text-lg">No addresses saved yet</p>
              <p className="text-sm mt-2">Click "Add New Address" to add your first address</p>
            </div>
          )}

          {/* ADD NEW ADDRESS PLACEHOLDER */}
          <div
            onClick={() => setOpen(true)}
            className="group relative h-[240px] rounded-2xl border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#00927C] hover:shadow-lg hover:-translate-y-1"
          >
            {/* Hover Background Effect */}
            <div className="absolute inset-0 bg-[#00927C]/0 group-hover:bg-[#00927C]/5 rounded-2xl transition-colors duration-300" />

            <div className="relative z-10 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#00927C] group-hover:scale-110 shadow-sm">
              <Add
                sx={{ fontSize: 32 }}
                className="text-gray-400 group-hover:text-white transition-colors duration-300"
              />
            </div>

            <h3 className="relative z-10 font-bold text-gray-500 group-hover:text-[#00927C] transition-colors duration-300">
              Add New Address
            </h3>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <AddAddressModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

// --- Component: Individual Address Card ---
const AddressCard = ({ address, onRemove }: any) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#00927C]/50 transition-all duration-300 flex flex-col justify-between h-[240px] group relative overflow-hidden">
      {/* Top Section */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${
                address.type === "HOME"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-orange-50 text-orange-600"
              }`}
            >
              {address.type}
            </span>
          </div>
          {/* Actions - Visible on Hover (Desktop) or Always (Mobile) */}
          <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <IconButton
              size="small"
              className="hover:text-[#00927C] hover:bg-teal-50"
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => onRemove(address._id)}
              size="small"
              className="hover:text-red-500 hover:bg-red-50"
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-1">{address.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {address.address}, {address.locality}, <br />
          {address.city}, {address.state} -{" "}
          <span className="font-semibold">{address.pincode}</span>
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <Phone fontSize="small" className="text-[#00927C]" />
        <span className="font-medium text-gray-700">{address.mobile}</span>
      </div>

      {/* Decorative Icon Watermark */}
      <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
        {address.type === "HOME" ? (
          <Home sx={{ fontSize: 100 }} />
        ) : (
          <Work sx={{ fontSize: 100 }} />
        )}
      </div>
    </div>
  );
};

// --- Component: Add Address Modal ---
const AddAddressModal = ({ open, handleClose }: any) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: 3, padding: 1 } }}
    >
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#1f2937", pb: 1 }}
      >
        Add New Address
      </DialogTitle>

      <DialogContent>
        {/* Visual Strip */}
        <div className="w-full h-1 bg-gradient-to-r from-[#00927C] to-blue-500 rounded-full mb-6 opacity-80"></div>

        <Box
          component="form"
          className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2"
        >
          <div className="md:col-span-2">
            <TextField
              fullWidth
              label="Full Name"
              placeholder="Enter Name"
              variant="outlined"
            />
          </div>

          <TextField
            fullWidth
            label="Mobile Number"
            placeholder="10-digit number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
          />

          <TextField fullWidth label="Pincode" placeholder="Pincode" />

          <div className="md:col-span-2">
            <TextField
              fullWidth
              label="Address (House No, Building, Street)"
              multiline
              rows={2}
              placeholder="e.g. Flat 402, Skyline Apartments"
            />
          </div>

          <TextField fullWidth label="Locality / Town" />
          <TextField fullWidth label="City / District" />

          <TextField select fullWidth label="State" defaultValue="">
            <MenuItem value="UP">Uttar Pradesh</MenuItem>
            <MenuItem value="MH">Maharashtra</MenuItem>
            <MenuItem value="DL">Delhi</MenuItem>
          </TextField>

          <TextField select fullWidth label="Address Type" defaultValue="HOME">
            <MenuItem value="HOME">Home (All day delivery)</MenuItem>
            <MenuItem value="WORK">
              Work (Delivery between 10 AM - 5 PM)
            </MenuItem>
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "0 24px 24px 24px" }}>
        <Button
          onClick={handleClose}
          sx={{ color: "gray", textTransform: "none", fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          disableElevation
          sx={{
            bgcolor: "#00927C",
            fontWeight: "bold",
            padding: "10px 30px",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { bgcolor: "#007a68" },
          }}
        >
          Save Address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Address;

