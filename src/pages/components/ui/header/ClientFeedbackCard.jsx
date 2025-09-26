import { Box, Typography, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";

const ClientFeedbackCard = (prop) => {
  const { item } = prop;
  console.log(item);

  return (
    <Box
      key={item.id}
      sx={{
        minWidth: { xs: 220, sm: 260, md: 280 },
        maxWidth: { xs: 240, sm: 300, md: 320 },
        bgcolor: "white",
        p: 2,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(19, 12, 12, 0.68)",
        mx: { xs: 1, sm: 1.5, md: 2 },
        background: "#6f6f6f42",
        backdropFilter: "blur(3px)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar
          src={item.avatar}
          alt={item.name}
          sx={{ mr: 2, width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}
        />
        <Typography
          variant="subtitle1"
          sx={{ color: "white", fontSize: { xs: 14, sm: 16 } }}
          fontWeight="bold"
        >
          {item.name}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 1,
          fontStyle: "italic",
          color: "gray",
          fontSize: { xs: 12, sm: 13, md: 14 },
        }}
      >
        "{item.feedback}"
      </Typography>
      <Box>
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            sx={{ color: "gold", fontSize: { xs: 16, sm: 18, md: 20 } }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ClientFeedbackCard;
