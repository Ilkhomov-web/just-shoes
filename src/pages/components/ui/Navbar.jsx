import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import GTranslateIcon from "@mui/icons-material/GTranslate";

const Navbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0f151561",
        backdropFilter: "blur(10px)",
        padding: "30px 0px",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >
      <Container maxWidth={"xl"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: "white" }}>
            Just Shoes
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              sx={{
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
                  top: "-2px",
                  left: "-2px",
                  right: "-2px",
                  bottom: "-2px",
                  borderRadius: "inherit",
                  background: "conic-gradient(orange, red,  orange)",
                  animation: "rotate 4s linear infinite",
                  zIndex: -1,
                },
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "0.3s",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  right: "2px",
                  bottom: "2px",
                  backgroundColor: "#332c20",
                  borderRadius: "inherit",
                  zIndex: -1,
                },
                "@keyframes rotate": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            >
              +99890 311 22 11
            </Button>
            <Button>
              <GTranslateIcon />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
