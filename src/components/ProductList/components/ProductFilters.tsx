// src/components/ProductList/components/ProductFilters.tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  TextField,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import {
  ProductFilters as ProductFiltersType,
  PET_TYPES,
  PRODUCT_TYPES,
  ALLERGEN_OPTIONS,
} from "@/components/ProductList/types/product.types";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const theme = useTheme();

  // 로컬 상태 (적용 버튼 클릭 전까지 임시 저장)
  const [localFilters, setLocalFilters] = useState<ProductFiltersType>(filters);

  // 가격 입력 상자 상태
  const [minPriceInput, setMinPriceInput] = useState(
    filters.priceRange[0].toString()
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    filters.priceRange[1].toString()
  );

  // 필터가 외부에서 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setLocalFilters(filters);
    setMinPriceInput(filters.priceRange[0].toString());
    setMaxPriceInput(filters.priceRange[1].toString());
  }, [filters]);

  // 로컬 필터 업데이트
  const updateLocalFilter = (key: keyof ProductFiltersType, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 가격 슬라이더 변경
  const handlePriceSliderChange = (_: Event, newValue: number | number[]) => {
    const range = newValue as [number, number];
    updateLocalFilter("priceRange", range);
    setMinPriceInput(range[0].toString());
    setMaxPriceInput(range[1].toString());
  };

  // 가격 입력 상자 변경
  const handlePriceInputChange = (type: "min" | "max", value: string) => {
    const numValue = Math.max(0, Math.min(500000, Number(value) || 0));

    if (type === "min") {
      setMinPriceInput(value);
      const newRange: [number, number] = [numValue, localFilters.priceRange[1]];
      if (numValue <= localFilters.priceRange[1]) {
        updateLocalFilter("priceRange", newRange);
      }
    } else {
      setMaxPriceInput(value);
      const newRange: [number, number] = [localFilters.priceRange[0], numValue];
      if (numValue >= localFilters.priceRange[0]) {
        updateLocalFilter("priceRange", newRange);
      }
    }
  };

  // 평점 슬라이더 변경
  const handleRatingChange = (_: Event, newValue: number | number[]) => {
    updateLocalFilter("ratingRange", newValue as [number, number]);
  };

  // 초기화
  const handleReset = () => {
    const resetFilters: ProductFiltersType = {
      petType: null,
      productType: null,
      priceRange: [0, 500000],
      hasAllergens: null,
      ratingRange: [1, 5],
    };
    setLocalFilters(resetFilters);
    setMinPriceInput("0");
    setMaxPriceInput("500000");
  };

  // 적용
  const handleApply = () => {
    onFiltersChange(localFilters);
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString() + "원";
  };

  const formatRating = (value: number) => {
    return value + "점";
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        height: "fit-content",
        position: "sticky",
        top: 20,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: theme.palette.text.primary,
        }}
      >
        상품 필터
      </Typography>

      {/* 반려동물 종류 */}
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel
            component="legend"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1,
              "&.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
          >
            반려동물 종류
          </FormLabel>
          <RadioGroup
            value={localFilters.petType || ""}
            onChange={(e) =>
              updateLocalFilter("petType", e.target.value || null)
            }
          >
            <FormControlLabel
              value=""
              control={<Radio size="small" />}
              label="전체"
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
            />
            {PET_TYPES.map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio size="small" />}
                label={type}
                sx={{
                  "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 상품 유형 */}
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel
            component="legend"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1,
              "&.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
          >
            상품 유형
          </FormLabel>
          <RadioGroup
            value={localFilters.productType || ""}
            onChange={(e) =>
              updateLocalFilter("productType", e.target.value || null)
            }
          >
            {PRODUCT_TYPES.map((type) => (
              <FormControlLabel
                key={type}
                value={type === "전체" ? "" : type}
                control={<Radio size="small" />}
                label={type}
                sx={{
                  "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 알러지 유무 */}
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel
            component="legend"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1,
              "&.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
          >
            알러지 유발 성분
          </FormLabel>
          <RadioGroup
            value={
              localFilters.hasAllergens === null
                ? "all"
                : localFilters.hasAllergens.toString()
            }
            onChange={(e) => {
              const value =
                e.target.value === "all" ? null : e.target.value === "true";
              updateLocalFilter("hasAllergens", value);
            }}
          >
            {ALLERGEN_OPTIONS.map((option) => (
              <FormControlLabel
                key={option.label}
                value={option.value === null ? "all" : option.value.toString()}
                control={<Radio size="small" />}
                label={option.label}
                sx={{
                  "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 평점 범위 */}
      <Box sx={{ mb: 3 }}>
        <FormLabel
          component="legend"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 2,
            display: "block",
          }}
        >
          평점 범위
        </FormLabel>
        <Box sx={{ px: 2 }}>
          <Slider
            value={localFilters.ratingRange}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            valueLabelFormat={formatRating}
            min={1}
            max={5}
            step={0.5}
            marks={[
              { value: 1, label: "1점" },
              { value: 2, label: "2점" },
              { value: 3, label: "3점" },
              { value: 4, label: "4점" },
              { value: 5, label: "5점" },
            ]}
            sx={{
              color: theme.palette.primary.main,
              "& .MuiSlider-markLabel": {
                fontSize: "0.75rem",
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 1,
              color: theme.palette.text.secondary,
            }}
          >
            {formatRating(localFilters.ratingRange[0])} ~{" "}
            {formatRating(localFilters.ratingRange[1])}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 가격대 */}
      <Box sx={{ mb: 4 }}>
        <FormLabel
          component="legend"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 2,
            display: "block",
          }}
        >
          가격대
        </FormLabel>

        {/* 가격 슬라이더 */}
        <Box sx={{ px: 2, mb: 2 }}>
          <Slider
            value={localFilters.priceRange}
            onChange={handlePriceSliderChange}
            valueLabelDisplay="auto"
            valueLabelFormat={formatPrice}
            min={0}
            max={500000}
            step={1000}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 1,
              color: theme.palette.text.secondary,
            }}
          >
            {formatPrice(localFilters.priceRange[0])} ~{" "}
            {formatPrice(localFilters.priceRange[1])}
          </Typography>
        </Box>

        {/* 가격 입력 상자 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            label="최소"
            type="number"
            value={minPriceInput}
            onChange={(e) => handlePriceInputChange("min", e.target.value)}
            inputProps={{ min: 0, max: 500000 }}
            sx={{ flex: 1 }}
          />
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            ~
          </Typography>
          <TextField
            size="small"
            label="최대"
            type="number"
            value={maxPriceInput}
            onChange={(e) => handlePriceInputChange("max", e.target.value)}
            inputProps={{ min: 0, max: 500000 }}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>

      {/* 하단 버튼 */}
      <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleReset}
          sx={{
            textTransform: "none",
            borderColor: theme.palette.grey[300],
            color: theme.palette.text.secondary,
            "&:hover": {
              borderColor: theme.palette.grey[400],
              backgroundColor: theme.palette.grey[50],
            },
          }}
        >
          초기화
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleApply}
          sx={{
            textTransform: "none",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          적용
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductFilters;
