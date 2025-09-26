import React from "react";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductGrid(props) {
  const { products, onAddToCart } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 2, sm: 2.5, md: 3 },
      }}
    >
      {products.map((p) => (
        <Box
          key={p.id}
          sx={{
            flex: "1 0 auto",
            flexBasis: { xs: "100%", sm: "50%", md: "33.333%", lg: "22%" },
            maxWidth: { xs: "100%", sm: "50%", md: "33.333%", lg: "22%" },
            display: "flex",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <ProductCard product={p} onAddToCart={onAddToCart} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
