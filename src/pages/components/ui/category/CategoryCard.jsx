import { Box, Typography } from "@mui/material";
import React from "react";

const CategoryCard = () => {
  return (
    <Box
      sx={{
        background: "#6f6f6f42",
        width: "300px",
        height: "300px",
        backdropFilter: "blur(3px)",
      }}
    >
      <Typography variant="h6" sx={{ color: "white" }}>
        Nike
      </Typography>
    </Box>
  );
};

export default CategoryCard;
