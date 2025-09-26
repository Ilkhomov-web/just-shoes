import { Box, Button, Typography } from "@mui/material";
import React from "react";
import FeedbackMarquee from "../Marquee";
import { useTranslation } from "react-i18next";

const HeaderComponent = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: { xs: "30px 0", sm: "40px 0", md: "60px 0", lg: "80px 0" },
        gap: { xs: 3, md: 6 },
        flexDirection: { xs: "column", md: "row" },
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
            width: { xs: "100%", sm: 260, md: 300 },
            position: "relative",
            overflow: "hidden",
            color: "orange",
            padding: { xs: "8px 14px", md: "10px 20px" },
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

            "@keyframes rotate": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        >
          {t("allProducts")}
        </Button>

        <Typography
          sx={{ color: "white", fontSize: { xs: 26, sm: 32, md: 40, lg: 48 } }}
          variant="h2"
        >
          {t("heroTitle")}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "gray", fontSize: { xs: 14, sm: 16, md: 18 } }}
        >
          {t("heroSubtitle")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: "12px", sm: "16px", md: "20px" },
        }}
      >
        <FeedbackMarquee />
      </Box>
    </Box>
  );
};

export default HeaderComponent;
