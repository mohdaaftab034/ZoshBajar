import {
  Fab,
  ThemeProvider,
  Backdrop,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { Chat, Close, ShoppingBag } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Imports ---
import { customTheme } from "./theme/customTheme";
import ScrollToTop from "./components/ScrollToTop";
import { useAppDispatch, useAppSelectore } from "./Redux Toolkit/store";
import { fetchUserProfile } from "./Redux Toolkit/features/customer/userSlice";
import { fetchSellerProfile } from "./Redux Toolkit/features/seller/sellerSlice";
import { createHomeCategories } from "./Redux Toolkit/features/customer/homeCategorySlice";
import { homeCategories } from "./Data/homeCategoryData";
import { fetchWishlistItems } from "./Redux Toolkit/wishlist/wishlistSlice";
import { fetchCart } from "./Redux Toolkit/features/customer/cartSlice";

// --- Pages & Components ---
import SellerDashboard from "./seller/SellerDashboard/SellerDashboard";
import BecomeSeller from "./Auth/Bacome Seller/BecomeSeller";
import CustomerRoutes from "./Routes/CustomerRoutes";
import Auth from "./Auth/Login/Auth";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import Wishlish from "./customer/pages/Cart/wishlist/Wishlisht";
import Chatbot from "./customer/components/Chatbot";
import PageTransitionLoader from "./components/PageTransitionLoader";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelectore((store) => store);

  // Global Chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);

  // App ready state (FIX)
  const [appReady, setAppReady] = useState(false);

  // Fetch profiles
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      dispatch(fetchUserProfile(jwt));
      dispatch(fetchSellerProfile(jwt));
      dispatch(fetchCart(jwt));
      dispatch(fetchWishlistItems());
    }
  }, [dispatch]);

  // Mark app as ready when auth loading finishes (FIX)
  useEffect(() => {
    if (!auth.loading) {
      setAppReady(true);
    }
  }, [auth.loading]);

  // Create home categories
  useEffect(() => {
    dispatch(createHomeCategories(homeCategories));
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      {/* --- TOAST NOTIFICATION CONTAINER --- */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />

      {/* --- GLOBAL LOADER (FIXED) --- */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 999,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(4px)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        open={!appReady}
      >
        <Box sx={{ width: 80, height: 80, position: "relative" }}>
          <CircularProgress
            size={80}
            thickness={2}
            sx={{
              color: "#00927C",
              position: "absolute",
            }}
          />
          <ShoppingBag
            sx={{
              fontSize: 40,
              color: "#00927C",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ color: "#1f2937", fontWeight: "bold" }}>
          Zosh Bazaar
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280" }}>
          Loading your experience...
        </Typography>
      </Backdrop>

      {/* --- PAGE TRANSITION LOADER --- */}
      <PageTransitionLoader />

      {/* --- SCROLL TO TOP ON ROUTE CHANGE --- */}
      <ScrollToTop />

      {/* --- ROUTES --- */}
      <Routes>
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route
          path="/seller/*"
          element={
            <ProtectedRoute allowSellerJwt allowedRoles={["ROLE_SELLER"]} redirectTo="/login">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]} redirectTo="/login">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Auth />} />
        <Route path="/wishlist" element={<Wishlish />} />
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>

      {/* --- GLOBAL CHATBOT --- */}
      <div className="fixed bottom-6 right-6 z-999 flex flex-col items-end gap-4">
        {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}

        <Fab
          color="primary"
          aria-label="chat"
          onClick={() => setIsChatOpen(!isChatOpen)}
          sx={{
            bgcolor: "#00927C",
            width: 60,
            height: 60,
            boxShadow: "0 4px 20px rgba(0, 146, 124, 0.4)",
            "&:hover": { bgcolor: "#007a68" },
            transform: isChatOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "all 0.3s ease",
          }}
        >
          {isChatOpen ? (
            <Close sx={{ color: "white" }} />
          ) : (
            <Chat sx={{ color: "white" }} />
          )}
        </Fab>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.7; }
        }
      `}</style>
    </ThemeProvider>
  );
};

export default App;

