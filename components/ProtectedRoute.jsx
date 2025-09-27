import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      } else if (requireAdmin && !isAdmin) {
        router.push("/products");
      }
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#0a0a0a",
        }}
      >
        <CircularProgress sx={{ color: "orange", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "white" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated || (requireAdmin && !isAdmin)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
