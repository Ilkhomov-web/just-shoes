import React from "react";
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Stack,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
} from "@mui/material";

export default function Filters(props) {
  const { values, onChange } = props;

  const handlePrice = (e, newValue) => onChange({ ...values, price: newValue });
  const handleSizes = (size) => {
    const exists = values.sizes.includes(size);
    onChange({
      ...values,
      sizes: exists
        ? values.sizes.filter((s) => s !== size)
        : [...values.sizes, size],
    });
  };
  const handleColors = (color) => {
    const exists = values.colors.includes(color);
    onChange({
      ...values,
      colors: exists
        ? values.colors.filter((c) => c !== color)
        : [...values.colors, color],
    });
  };
  const handleStatus = (e, status) => {
    onChange({ ...values, status: status || "all" });
  };

  const allSizes = [38, 39, 40, 41, 42, 43, 44];
  const allColors = [
    "black",
    "white",
    "red",
    "blue",
    "green",
    "orange",
    "gray",
    "navy",
    "yellow",
  ];

  return (
    <Box
      sx={{
        position: { md: "sticky" },
        top: 90,
        p: 2,
        borderRadius: 2,
        bgcolor: "#151515",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Filter
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Sort by
        </Typography>
        <Select
          size="small"
          fullWidth
          value={values.sort || "relevance"}
          onChange={(e) => onChange({ ...values, sort: e.target.value })}
          sx={{ bgcolor: "#101010", borderRadius: 1, color: "white" }}
        >
          <MenuItem value="relevance">Relevance</MenuItem>
          <MenuItem value="price_low_high">Price: Low to High</MenuItem>
          <MenuItem value="price_high_low">Price: High to Low</MenuItem>
          <MenuItem value="discount">Best Discount</MenuItem>
        </Select>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Price
        </Typography>
        <Slider
          value={values.price}
          onChange={handlePrice}
          valueLabelDisplay="auto"
          min={0}
          max={250}
          sx={{ color: "orange" }}
        />
        <FormGroup sx={{ mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(values.discountOnly)}
                onChange={(e) =>
                  onChange({ ...values, discountOnly: e.target.checked })
                }
                sx={{ color: "orange", "&.Mui-checked": { color: "orange" } }}
              />
            }
            label="Discounted items only"
          />
        </FormGroup>
      </Box>

      <Divider sx={{ borderColor: "#2a2a2a", my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Sizes
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {allSizes.map((s) => (
            <Chip
              key={s}
              label={s}
              onClick={() => handleSizes(s)}
              variant={values.sizes.includes(s) ? "filled" : "outlined"}
              sx={{
                bgcolor: values.sizes.includes(s) ? "orange" : "transparent",
                borderColor: "#333",
                color: values.sizes.includes(s) ? "black" : "#ddd",
              }}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ borderColor: "#2a2a2a", my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Colors
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {allColors.map((c) => (
            <Chip
              key={c}
              label={c}
              onClick={() => handleColors(c)}
              variant={values.colors.includes(c) ? "filled" : "outlined"}
              sx={{
                bgcolor: values.colors.includes(c) ? "orange" : "transparent",
                borderColor: "#333",
                color: values.colors.includes(c) ? "black" : "#ddd",
              }}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ borderColor: "#2a2a2a", my: 2 }} />

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Availability
        </Typography>
        <ToggleButtonGroup
          color="white"
          exclusive
          value={values.status}
          onChange={handleStatus}
          size="small"
        >
          <ToggleButton sx={{ color: "white" }} value="all">
            All
          </ToggleButton>
          <ToggleButton sx={{ color: "white" }} value="in_stock">
            In stock
          </ToggleButton>
          <ToggleButton sx={{ color: "white" }} value="out_of_stock">
            Out
          </ToggleButton>
          <ToggleButton sx={{ color: "white" }} value="coming_soon">
            Soon
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
