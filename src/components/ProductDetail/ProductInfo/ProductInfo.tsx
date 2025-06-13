// src/components/ProductDetail/ProductInfo/ProductInfo.tsx

import React from "react";
import { Box, Divider } from "@mui/material";
import { Product } from "../Product";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductSpecTable from "./ProductSpecTable";
import ProductMakerInfo from "./ProductMakerInfo";
import ProductSuggestions from "./ProductSuggestions";
import ProductPurchaseOptions from "./ProductPurchaseOptions";

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}>
            {/* 기본 정보 섹션 */}
            <ProductBasicInfo product={product} />

            {/* 상품 정보 테이블 */}
            <ProductSpecTable product={product} />

            {/* 제조사 정보 */}
            <ProductMakerInfo product={product} />

            {/* 추천 정보 */}
            <ProductSuggestions />

            <Divider sx={{ borderColor: "#f3eee7" }} />

            {/* 구매 옵션 및 버튼 */}
            <ProductPurchaseOptions product={product} />
        </Box>
    );
};

export default ProductInfo;