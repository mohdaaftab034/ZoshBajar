import { Edit, Email, Phone, Person, Storefront } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  GridLegacy as Grid,
  Paper,
} from "@mui/material";
import { useAppSelectore } from "../../Redux Toolkit/store";

const SellerProfile = () => {
  const { seller }: { seller: any } = useAppSelectore((store) => store);

  return (
    // Responsive Container:
    // - Mobile: p-0 (Full width)
    // - Tablet/Desktop: p-5 or p-10 (Centered Card)
    <div className="p-0 sm:p-5 lg:p-10 w-full flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-none sm:shadow-md rounded-none sm:rounded-2xl overflow-hidden border-gray-200 sm:border">
        {/* --- 1. Cover Area --- */}
        <div className="h-32 sm:h-48 bg-gradient-to-r from-[#00927C] to-[#007563] relative">
          {/* Edit Cover Button (Optional visual cue) */}
          <div className="absolute top-4 right-4">
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(255,255,255,0.5)",
                textTransform: "none",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
              startIcon={<Edit />}
              size="small"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* --- 2. Profile Header (Avatar + Name) --- */}
        <div className="px-6 pb-6 relative">
          {/* Floating Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 mb-6 gap-4">
            <div className="relative">
              <Avatar
                src={
                  seller.profile?.images?.[0] ||
                  "https://cdn.pixabay.com/photo/2023/02/14/18/55/animal-7790230_1280.jpg"
                }
                sx={{
                  width: { xs: 100, sm: 140 },
                  height: { xs: 100, sm: 140 },
                  border: "4px solid white",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
              <div className="absolute bottom-0 right-0 bg-gray-100 rounded-full border-2 border-white p-1 cursor-pointer hover:bg-gray-200 transition-colors">
                <Edit sx={{ fontSize: 16, color: "#555" }} />
              </div>
            </div>

            <div className="text-center sm:text-left flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {seller.profile?.sellerName || "Seller Name"}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mt-1">
                <Storefront fontSize="small" className="text-[#00927C]" />
                <span className="text-sm font-medium">Verified Seller</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm">Joined 2025</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* --- 3. Details Grid --- */}
          <div className="pt-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Person className="text-[#00927C]" /> Personal Information
            </h2>

            <Grid container spacing={3}>
              {/* Name */}
              <Grid item xs={12} md={6}>
                <ProfileDataRow
                  label="Full Name"
                  value={seller.profile?.sellerName}
                  icon={<Person fontSize="small" />}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={6}>
                <ProfileDataRow
                  label="Email Address"
                  value={seller.profile?.email}
                  icon={<Email fontSize="small" />}
                />
              </Grid>

              {/* Mobile */}
              <Grid item xs={12} md={6}>
                <ProfileDataRow
                  label="Phone Number"
                  value={seller.profile?.mobile}
                  icon={<Phone fontSize="small" />}
                />
              </Grid>

              {/* Business Name (Example Extra Field) */}
              <Grid item xs={12} md={6}>
                <ProfileDataRow
                  label="Business Name"
                  value={
                    seller.profile?.businessDetails?.businessName ||
                    "Zosh Bazaar Store"
                  }
                  icon={<Storefront fontSize="small" />}
                />
              </Grid>
            </Grid>
          </div>

          {/* --- 4. Address Section (Optional visual filler) --- */}
          <div className="pt-8 pb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Business Address
            </h2>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#F9FAFB",
                p: 3,
                borderRadius: 2,
                border: "1px dashed #E5E7EB",
              }}
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                {seller.profile?.pickupAddress?.address ||
                  "No address provided."}{" "}
                <br />
                {seller.profile?.pickupAddress?.city || "City"},{" "}
                {seller.profile?.pickupAddress?.state || "State"} -{" "}
                {seller.profile?.pickupAddress?.pincode || "000000"}
              </p>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-component: Clean Data Row ---
const ProfileDataRow = ({ label, value, icon }: any) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#00927C]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default SellerProfile;

