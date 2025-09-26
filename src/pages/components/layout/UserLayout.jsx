import { Box, Container } from "@mui/material";
import React from "react";
import Navbar from "../ui/Navbar";

const UserLayout = (props) => {
  const { children } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        position: "relative",
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          top: "5%",
          left: "10%",
          width: "80%",
          height: "100%",
          background:
            "radial-gradient(circle at center, rgba(255, 140, 0, 0.77), rgba(255, 0, 0, 0.46), transparent 50%)",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "100px",
          left: "0%",
          width: "200%",
          height: "100%",
          background: "linear-gradient( rgba(0, 0, 0, 0.79), transparent 100%)",
          zIndex: 0,
          transform: "rotate(180deg)",
        },
      }}
    >
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default UserLayout;
