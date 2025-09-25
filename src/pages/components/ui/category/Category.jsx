import { Box, Typography } from "@mui/material";
import React from "react";
import CategoryCard from "./CategoryCard";

const Category = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
        Category Tanlang
      </Typography>
      <CategoryCard />
    </Box>
  );
};

export default Category;
