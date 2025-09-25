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
        minWidth: 280,
        maxWidth: 320,
        bgcolor: "white",
        p: 2,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(19, 12, 12, 0.68)",
        mx: 2,
        background: "#6f6f6f42",
        backdropFilter: "blur(3px)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar src={item.avatar} alt={item.name} sx={{ mr: 2 }} />
        <Typography
          variant="subtitle1"
          sx={{ color: "white" }}
          fontWeight="bold"
        >
          {item.name}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 1, fontStyle: "italic", color: "gray" }}
      >
        "{item.feedback}"
      </Typography>
      <Box>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} sx={{ color: "gold", fontSize: 20 }} />
        ))}
      </Box>
    </Box>
  );
};

export default ClientFeedbackCard;
