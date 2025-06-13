// src/components/ProductDetail/ProductInfo/ProductSpecTable.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { Product } from "../Product";
interface ProductSpecTableProps {
    product: Product;
}

interface SpecRowProps {
    label: string;
    value: string;
}

const SpecRow: React.FC<SpecRowProps> = ({ label, value }) => (
    <Box sx={{ display: "flex", mb: 1 }}>
        <Typography
            variant="body2"
            sx={{
                color: "#97784e",
                fontWeight: 500,
                minWidth: "80px",
                mr: 2,
            }}
        >
            {label}:
        </Typography>
        <Typography variant="body2" sx={{ color: "#1b150e", flex: 1 }}>
            {value}
        </Typography>
    </Box>
);

const ProductSpecTable: React.FC<ProductSpecTableProps> = ({ product }) => {
    const getNutritionText = () => {
        if (product.nutritionInfo) {
            return `조단백질 ${product.nutritionInfo.protein || "70% 이상"}, 조지방 ${
                product.nutritionInfo.fat || "5% 이상"
            }, 조섬유 ${product.nutritionInfo.fiber || "2% 이하"}, 수분 ${
                product.nutritionInfo.moisture || "15% 이하"
            }`;
        }
        return "조단백질 70% 이상, 조지방 5% 이상, 조섬유 2% 이하, 수분 15% 이하";
    };

    const getIngredientsText = () => {
        if (Array.isArray(product.ingredients)) {
            return product.ingredients.join(", ");
        }
        return product.ingredients || "신선한 국내산 원재료를 사용합니다.";
    };

    return (
        <Box sx={{ backgroundColor: "#f7f3ef", p: 3, borderRadius: 2 }}>
            <Typography
                variant="h3"
                sx={{
                    mb: 2,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#1b150e",
                }}
            >
                상품 정보
            </Typography>

            {product.brand && (
                <SpecRow label="브랜드" value={product.brand} />
            )}

            <SpecRow label="원재료" value={getIngredientsText()} />
            <SpecRow label="영양성분" value={getNutritionText()} />

            {product.weight && (
                <SpecRow label="중량" value={product.weight} />
            )}

            <SpecRow
                label="알레르기 정보"
                value="일반적인 알러지 유발 물질 없음. 견과류를 처리하는 시설에서 생산될 수 있습니다."
            />
        </Box>
    );
};

export default ProductSpecTable;