// src/components/product/ProductSorting.tsx

import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  SelectChangeEvent,
  useTheme,
  alpha,
} from "@mui/material";
import { SORT_OPTIONS } from "@/components/ProductList/types/product.types";

interface ProductSortingProps {
  sortBy: string;
  isHandmadeOnly: boolean;
  totalCount: number;
  onSortChange: (sortBy: string) => void;
  onHandmadeToggle: (isHandmadeOnly: boolean) => void;
}

const ProductSorting: React.FC<ProductSortingProps> = ({
  sortBy,
  isHandmadeOnly,
  totalCount,
  onSortChange,
  onHandmadeToggle,
}) => {
  const theme = useTheme();

  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  const handleProductTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      onHandmadeToggle(newValue === "handmade");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        mb: 3,
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: "2rem",
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 0.5,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          강아지 간식
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.875rem",
          }}
        >
          총 {totalCount.toLocaleString()}개 상품
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: { xs: 2, md: 0 },
        }}
      >
        {/* 상품 타입 토글 */}
        <Paper
          sx={{
            display: "flex",
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.grey[200]}`,
            borderRadius: 2,
            p: 0.25,
          }}
        >
          <ToggleButtonGroup
            value={isHandmadeOnly ? "handmade" : "all"}
            exclusive
            onChange={handleProductTypeChange}
            sx={{
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: 1.5,
                px: 1.5,
                py: 0.75,
                fontSize: "0.875rem",
                fontWeight: 500,
                color: theme.palette.text.secondary,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                },
              },
            }}
          >
            <ToggleButton value="handmade">수제품만 보기</ToggleButton>
            <ToggleButton value="all">완제품만 보기</ToggleButton>
          </ToggleButtonGroup>
        </Paper>

        {/* 정렬 선택 */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.grey[200],
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
                borderWidth: 1,
              },
              "& .MuiSelect-select": {
                fontSize: "0.875rem",
                py: 1,
              },
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ fontSize: "0.875rem" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export { ProductSorting };
