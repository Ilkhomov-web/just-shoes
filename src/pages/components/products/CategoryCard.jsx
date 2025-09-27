import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

export default function CategoryCard(props) {
  const { category, isSelected, onClick } = props;

  return (
    <Card
      sx={{
        cursor: "pointer",
        background: isSelected
          ? "linear-gradient(135deg, rgba(255,165,0,0.2), rgba(255,165,0,0.1))"
          : "linear-gradient(135deg, rgba(32,32,32,0.8), rgba(18,18,18,0.9))",
        borderRadius: 3,
        color: "white",
        border: isSelected
          ? "2px solid orange"
          : "1px solid rgba(255,165,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(255,165,0,0.2)",
          borderColor: "orange",
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ position: "relative", height: 120, overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={category.image}
          alt={category.name}
          sx={{
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.7)",
            background: "linear-gradient(45deg, #ff6b35, #f7931e)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255,165,0,0.3), rgba(255,0,0,0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 700,
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {category.name}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "#bdbdbd" }}>
          {category.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
