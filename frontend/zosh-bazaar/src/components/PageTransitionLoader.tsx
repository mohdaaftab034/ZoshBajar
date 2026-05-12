import { Box, CircularProgress, Typography } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const PageTransitionLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // Short smooth transition

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        animation: "fadeIn 0.2s ease-in",
      }}
    >
      <Box sx={{ position: "relative", width: 60, height: 60 }}>
        <CircularProgress
          size={60}
          thickness={3}
          sx={{
            color: "#00927C",
            position: "absolute",
          }}
        />
        <ShoppingBag
          sx={{
            fontSize: 30,
            color: "#00927C",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ color: "#6b7280", fontWeight: 500 }}>
        Loading...
      </Typography>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default PageTransitionLoader;

