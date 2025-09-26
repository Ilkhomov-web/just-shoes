import {
  Box,
  Button,
  Container,
  Typography,
  Popover,
  Stack,
  Avatar,
} from "@mui/material";
import React from "react";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "lang-popover" : undefined;

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };
  return (
    <Box
      sx={{
        backgroundColor: "#0f151561",
        backdropFilter: "blur(10px)",
        padding: { xs: "14px 0", sm: "18px 0", md: "24px 0", lg: "30px 0" },
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
            gap: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            variant={"h3"}
            sx={{
              color: "white",
              fontSize: { xs: 20, sm: 24, md: 28, lg: 32 },
            }}
          >
            {t("brand")}
          </Typography>
          <Box
            sx={{ display: "flex", gap: { xs: "6px", sm: "8px", md: "10px" } }}
          >
            <Button
              sx={{
                position: "relative",
                overflow: "hidden",
                color: "orange",
                padding: { xs: "6px 10px", sm: "8px 14px", md: "10px 20px" },
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
              {t("callNumber")}
            </Button>
            <Button
              aria-describedby={id}
              onClick={handleOpen}
              sx={{ minWidth: { xs: 36, sm: 40 } }}
            >
              <GTranslateIcon />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  p: 1,
                  bgcolor: "#1b1b1b",
                  color: "white",
                  width: { xs: 200, sm: 220 },
                },
              }}
            >
              <Stack spacing={0.5} sx={{ minWidth: { xs: 180, sm: 200 } }}>
                <Button
                  onClick={() => handleChange("en")}
                  sx={{
                    justifyContent: "flex-start",
                    color: "white",
                    gap: 1,
                    py: { xs: 0.5, sm: 0.75 },
                  }}
                >
                  <Avatar
                    alt="EN"
                    src="https://flagcdn.com/w20/gb.png"
                    sx={{
                      width: { xs: 18, sm: 20 },
                      height: { xs: 18, sm: 20 },
                    }}
                  />{" "}
                  {t("language.english")}
                </Button>
                <Button
                  onClick={() => handleChange("ru")}
                  sx={{
                    justifyContent: "flex-start",
                    color: "white",
                    gap: 1,
                    py: { xs: 0.5, sm: 0.75 },
                  }}
                >
                  <Avatar
                    alt="RU"
                    src="https://flagcdn.com/w20/ru.png"
                    sx={{
                      width: { xs: 18, sm: 20 },
                      height: { xs: 18, sm: 20 },
                    }}
                  />{" "}
                  {t("language.russian")}
                </Button>
                <Button
                  onClick={() => handleChange("uz")}
                  sx={{
                    justifyContent: "flex-start",
                    color: "white",
                    gap: 1,
                    py: { xs: 0.5, sm: 0.75 },
                  }}
                >
                  <Avatar
                    alt="UZ"
                    src="https://flagcdn.com/w20/uz.png"
                    sx={{
                      width: { xs: 18, sm: 20 },
                      height: { xs: 18, sm: 20 },
                    }}
                  />{" "}
                  {t("language.uzbek")}
                </Button>
              </Stack>
            </Popover>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
