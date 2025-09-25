import { Box, Button, Typography } from "@mui/material";
import React from "react";
import FeedbackMarquee from "../Marquee";

const HeaderComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "80px 0pc",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "left",
        }}
      >
        <Button
          sx={{
            width: "300px",
            position: "relative",
            overflow: "hidden",
            color: "orange",
            padding: "10px 20px",
            backgroundColor: "#332c20",
            borderRadius: "8px",
            zIndex: 1,
            transition: "0.3s",

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              padding: "5px",
              borderRadius: "inherit",
              background: "conic-gradient(from 0deg, orange, red, orange)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              animation: "rotate 3s linear infinite",
              zIndex: -1,
            },

            "&::after": {
              content: '""',
              position: "absolute",
              inset: "2px",
              backgroundColor: "#332c20",
              borderRadius: "inherit",
              zIndex: -1,
            },

            "&:hover": {
              transform: "scale(1.08)",
              transition: "0.3s",
            },

            // animatsiya
            "@keyframes rotate": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        >
          Barcha Mahsulotlar
        </Button>

        <Typography sx={{ color: "white" }} variant="h2">
          Jizzaxning eng ko‘rinadigan joylarida reklama qiling.
        </Typography>
        <Typography variant="h6" sx={{ color: "gray" }}>
          Joylashuv, dizayn va monitoring — barchasini biz bajaramiz!
        </Typography>
      </Box>
      <Box
        sx={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <FeedbackMarquee />
      </Box>
    </Box>
  );
};

export default HeaderComponent;
