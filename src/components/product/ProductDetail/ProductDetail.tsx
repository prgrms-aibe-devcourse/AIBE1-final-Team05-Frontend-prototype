// src/components/product/ProductDetail/ProductDetail.tsx
// 상품 상세 페이지의 메인 컴포넌트 (모든 섹션을 조합)

import React from "react";
import { Container, Grid, Box } from "@mui/material";
import { Product } from "../../../types/product";
import { Review, ReviewStats } from "../../../types/review";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

interface ProductDetailProps {
  product: Product;
  reviews: Review[];
  reviewStats: ReviewStats;
  relatedProducts: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  reviews,
  reviewStats,
  relatedProducts,
}) => {
  return (
    <Box sx={{ backgroundColor: "#fcfaf8", minHeight: "100vh" }}>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, md: 4 },
          px: { xs: 2, sm: 4, md: 8, lg: 10 },
        }}
      >
        {/* 메인 상품 섹션 - MUI 7 호환 Grid 문법으로 확실한 2열 레이아웃 */}
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          sx={{ mb: { xs: 6, md: 12 } }}
        >
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ProductImages images={product.images} productName={product.name} />
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ProductInfo product={product} />
          </Grid>
        </Grid>

        {/* 고객 리뷰 섹션 */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <ProductReviews reviews={reviews} stats={reviewStats} />
        </Box>

        {/* 추천 상품 섹션 */}
        <Box>
          <RelatedProducts products={relatedProducts} />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetail;
