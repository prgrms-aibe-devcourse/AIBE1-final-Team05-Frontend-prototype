// src/pages/ProductListPage.tsx

import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  alpha,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  Breadcrumb,
  ProductSorting,
  ProductFilters,
  ProductGrid,
  MobileBottomNav,
} from "@/components/ProductList";
import type { ProductFilters as ProductFiltersType } from "@/components/ProductList/types/product.types";
import { mockProducts, getTotalProductCount } from "../data/mockProducts";

const PRODUCTS_PER_PAGE = 8;

const ProductListPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 상태 관리
  const [filters, setFilters] = useState<ProductFiltersType>({
    petType: "강아지",
    productType: "간식",
    ingredients: [],
    healthBenefits: [],
    priceRange: [0, 100000],
    isHandmadeOnly: true,
  });

  const [sortBy, setSortBy] = useState("sales");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  // 브레드크럼 데이터
  const breadcrumbItems = [{ label: "강아지 간식" }];

  // 필터링된 상품 목록
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // 반려동물 종류 필터
    if (filters.petType) {
      result = result.filter((product) => product.petType === filters.petType);
    }

    // 상품 유형 필터
    if (filters.productType) {
      // 실제로는 product.type 같은 필드가 있어야 하지만 임시로 생략
    }

    // 원재료 필터
    if (filters.ingredients.length > 0) {
      result = result.filter((product) =>
        filters.ingredients.some((ingredient) =>
          product.ingredients.includes(ingredient)
        )
      );
    }

    // 건강 기능 필터
    if (filters.healthBenefits.length > 0) {
      result = result.filter((product) =>
        filters.healthBenefits.some((benefit) =>
          product.healthBenefits.includes(benefit)
        )
      );
    }

    // 가격 범위 필터
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // 정렬
    switch (sortBy) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "latest":
        // 실제로는 등록일 기준 정렬
        result.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "sales":
      default:
        // 실제로는 판매량 기준 정렬, 임시로 리뷰 수로 정렬
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // 페이지 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // 이벤트 핸들러
  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFavoriteToggle = (productId: string) => {
    // 실제로는 API 호출이나 상태 관리 라이브러리 사용
    console.log("Toggle favorite for product:", productId);
  };

  const handleMobileFilterOpen = () => {
    setIsFilterDialogOpen(true);
  };

  const handleMobileFilterClose = () => {
    setIsFilterDialogOpen(false);
  };

  const handleMobileSortClick = () => {
    // 실제로는 정렬 다이얼로그를 열거나 바텀시트 표시
    console.log("Open sort dialog");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 브레드크럼 */}
      <Breadcrumb items={breadcrumbItems} />

      {/* MUI v7 Grid - size prop 사용 */}
      <Grid container spacing={4}>
        {/* 데스크톱 필터 사이드바 */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <ProductFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </Grid>

        {/* 메인 컨텐츠 */}
        <Grid size={{ xs: 12, md: 9 }}>
          {/* 상품 정렬 및 제목 */}
          <ProductSorting
            sortBy={sortBy}
            isHandmadeOnly={filters.isHandmadeOnly}
            totalCount={getTotalProductCount()}
            onSortChange={handleSortChange}
            onHandmadeToggle={(isHandmadeOnly) =>
              setFilters({ ...filters, isHandmadeOnly })
            }
          />

          {/* 모바일 필터 버튼 */}
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleMobileFilterOpen}
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
              mb: 3,
              borderColor: theme.palette.grey[200],
              color: theme.palette.text.primary,
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "none",
              py: 1.5,
              "&:hover": {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
              },
            }}
          >
            필터 보기
          </Button>

          {/* 상품 그리드 */}
          <ProductGrid
            products={currentProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </Grid>
      </Grid>

      {/* 모바일 필터 다이얼로그 */}
      <Dialog
        open={isFilterDialogOpen}
        onClose={handleMobileFilterClose}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: isMobile ? 0 : 2,
            maxHeight: isMobile ? "100%" : "80vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            color: theme.palette.text.primary,
          }}
        >
          <span>필터</span>
          <IconButton
            onClick={handleMobileFilterClose}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.text.primary,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ p: 3 }}>
            <ProductFilters
              filters={filters}
              onFiltersChange={(newFilters) => {
                handleFiltersChange(newFilters);
                if (!isMobile) {
                  handleMobileFilterClose();
                }
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* 모바일 하단 네비게이션 */}
      <MobileBottomNav
        onSortClick={handleMobileSortClick}
        onFilterClick={handleMobileFilterOpen}
      />
    </Container>
  );
};

export default ProductListPage;
