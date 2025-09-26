import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
} from "@mui/material";

export default function ProductCard(props) {
  const { product, onAddToCart } = props;

  const hasDiscount = product.discountPercent > 0;
  const finalPrice = hasDiscount
    ? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
    : product.price.toFixed(2);

  const stockColor =
    product.stockStatus === "in_stock"
      ? "success"
      : product.stockStatus === "out_of_stock"
      ? "error"
      : "warning";

  return (
    <Card
      sx={{
        height: { xs: 420, sm: 440, md: 440 },
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, rgba(32,32,32,0.95) 0%, rgba(18,18,18,0.98) 60%), radial-gradient(circle at 20% -10%, rgba(255,165,0,0.15), transparent 30%)",
        borderRadius: 3,
        color: "white",
        overflow: "hidden",
        border: "1px solid rgba(255,165,0,0.15)",
        transition:
          "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 28px rgba(255,165,0,0.12)",
          borderColor: "rgba(255,165,0,0.35)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={product.img}
          alt={product.name}
          sx={{ height: 200, objectFit: "contain", bgcolor: "#0f0f0f" }}
        />
        {hasDiscount && (
          <Chip
            label={`-${product.discountPercent}%`}
            color="error"
            size="small"
            sx={{ position: "absolute", top: 8, left: 8 }}
          />
        )}
      </Box>
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }} gutterBottom>
          {product.name}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
          {product.sizes.slice(0, 4).map((s) => (
            <Chip
              key={s}
              label={s}
              size="small"
              variant="outlined"
              sx={{ color: "#ccc", borderColor: "#333" }}
            />
          ))}
        </Stack>
        <Box
          sx={{
            color: "#bdbdbd",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40,
          }}
        >
          {product.description}
        </Box>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          pt: 0,
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${finalPrice}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="caption"
              sx={{ color: "#9e9e9e", textDecoration: "line-through" }}
            >
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={product.stockStatus.replace("_", " ")}
            color={stockColor}
            size="small"
            variant="outlined"
          />
          <Button
            size="small"
            variant="contained"
            onClick={() => onAddToCart(product)}
            disabled={product.stockStatus !== "in_stock"}
            sx={{
              bgcolor: "orange",
              color: "black",
              "&:hover": { bgcolor: "#ffa726" },
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
