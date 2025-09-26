import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Cart(props) {
  const { open, onClose, items, onRemove, onClear } = props;
  const total = items.reduce(
    (sum, it) =>
      sum + it.qty * (it.price * (1 - (it.discountPercent || 0) / 100)),
    0
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 380 }, bgcolor: "#111", color: "white" },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Your Cart</Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: "#222" }} />
      <Box
        sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
      >
        {items.length === 0 && (
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            Cart is empty
          </Typography>
        )}
        {items.map((it) => (
          <Stack
            key={it.id}
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ bgcolor: "#1a1a1a", p: 1.5, borderRadius: 2 }}
          >
            <Box
              component="img"
              src={it.img}
              alt={it.name}
              sx={{
                width: 56,
                height: 56,
                objectFit: "contain",
                borderRadius: 1,
                bgcolor: "#0f0f0f",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" noWrap>
                {it.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#bbb" }}>
                x{it.qty}
              </Typography>
            </Box>
            <Typography variant="subtitle2">
              $
              {(
                it.qty *
                (it.price * (1 - (it.discountPercent || 0) / 100))
              ).toFixed(2)}
            </Typography>
            <IconButton
              onClick={() => onRemove(it.id)}
              size="small"
              sx={{ color: "#f44336" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Box>
      <Divider sx={{ borderColor: "#222" }} />
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="subtitle1">Total: ${total.toFixed(2)}</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="inherit" onClick={onClear}>
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "orange",
              color: "black",
              "&:hover": { bgcolor: "#ffa726" },
            }}
          >
            Checkout
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
