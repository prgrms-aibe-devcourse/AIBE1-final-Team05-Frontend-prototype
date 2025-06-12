// src/components/product/ProductFilters.tsx

import React from "react";
import {
  Paper,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Slider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ProductFilters as ProductFiltersType,
  PET_TYPES,
  PRODUCT_TYPES,
  INGREDIENTS,
  HEALTH_BENEFITS,
  PetType,
  ProductType,
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

  const handlePetTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      petType: (event.target.value as PetType) || null,
    });
  };

  const handleProductTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFiltersChange({
      ...filters,
      productType: (event.target.value as ProductType) || null,
    });
  };

  const handleIngredientChange =
    (ingredient: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newIngredients = event.target.checked
        ? [...filters.ingredients, ingredient]
        : filters.ingredients.filter((item) => item !== ingredient);

      onFiltersChange({
        ...filters,
        ingredients: newIngredients,
      });
    };

  const handleHealthBenefitChange =
    (benefit: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newBenefits = event.target.checked
        ? [...filters.healthBenefits, benefit]
        : filters.healthBenefits.filter((item) => item !== benefit);

      onFiltersChange({
        ...filters,
        healthBenefits: newBenefits,
      });
    };

  const handlePriceRangeChange = (_: Event, newValue: number | number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: newValue as [number, number],
    });
  };

  const formatPrice = (value: number) => {
    return `₩${value.toLocaleString()}`;
  };

  const filterSections = [
    {
      title: "반려동물 종류",
      content: (
        <FormControl component="fieldset">
          <RadioGroup
            value={filters.petType || ""}
            onChange={handlePetTypeChange}
          >
            {PET_TYPES.map((petType) => (
              <FormControlLabel
                key={petType}
                value={petType}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.grey[200],
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {petType}
                  </Typography>
                }
                sx={{
                  py: 1.5,
                  px: 1.5,
                  m: 0,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ),
    },
    {
      title: "상품 유형",
      content: (
        <FormControl component="fieldset">
          <RadioGroup
            value={filters.productType || ""}
            onChange={handleProductTypeChange}
          >
            {PRODUCT_TYPES.map((productType) => (
              <FormControlLabel
                key={productType}
                value={productType}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.grey[200],
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {productType}
                  </Typography>
                }
                sx={{
                  py: 1.5,
                  px: 1.5,
                  m: 0,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ),
    },
    {
      title: "주요 원재료",
      content: (
        <FormGroup>
          {INGREDIENTS.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={filters.ingredients.includes(ingredient)}
                  onChange={handleIngredientChange(ingredient)}
                  sx={{
                    color: theme.palette.grey[200],
                    "&.Mui-checked": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  {ingredient}
                </Typography>
              }
              sx={{
                py: 1.5,
                px: 1.5,
                m: 0,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            />
          ))}
        </FormGroup>
      ),
    },
    {
      title: "건강 기능",
      content: (
        <FormGroup>
          {HEALTH_BENEFITS.map((benefit) => (
            <FormControlLabel
              key={benefit}
              control={
                <Checkbox
                  checked={filters.healthBenefits.includes(benefit)}
                  onChange={handleHealthBenefitChange(benefit)}
                  sx={{
                    color: theme.palette.grey[200],
                    "&.Mui-checked": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  {benefit}
                </Typography>
              }
              sx={{
                py: 1.5,
                px: 1.5,
                m: 0,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            />
          ))}
        </FormGroup>
      ),
    },
  ];

  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.background.paper,
        p: 3,
        borderRadius: 3,
        boxShadow:
          "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.05)",
        height: "fit-content",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.125rem",
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 3,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        필터
      </Typography>

      {filterSections.map((section, index) => (
        <Box
          key={section.title}
          sx={{ mb: index < filterSections.length - 1 ? 3 : 2 }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: theme.palette.text.secondary,
              mb: 1.5,
            }}
          >
            {section.title}
          </Typography>
          {section.content}
        </Box>
      ))}

      {/* 가격대 슬라이더 */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: theme.palette.text.secondary,
            mb: 1.5,
          }}
        >
          가격대
        </Typography>
        <Box sx={{ px: 1, pt: 1 }}>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
            step={1000}
            sx={{
              color: theme.palette.primary.main,
              height: 8,
              "& .MuiSlider-track": {
                backgroundColor: theme.palette.primary.main,
                border: "none",
              },
              "& .MuiSlider-thumb": {
                backgroundColor: theme.palette.primary.main,
                width: 20,
                height: 20,
                "&:hover": {
                  boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                },
              },
              "& .MuiSlider-rail": {
                backgroundColor: theme.palette.grey[100],
                opacity: 1,
              },
            }}
            valueLabelFormat={formatPrice}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.75rem",
              }}
            >
              ₩0
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.75rem",
              }}
            >
              ₩100,000
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductFilters;
