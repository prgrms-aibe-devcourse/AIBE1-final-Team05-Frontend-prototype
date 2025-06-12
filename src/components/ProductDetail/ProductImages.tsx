// src/components/product/ProductDetail/ProductImages.tsx
// 상품 이미지 섹션 - 목표 이미지와 정확히 동일한 600×600, 600×141 비율

import React, { useState } from "react";
import { Box } from "@mui/material";
import { Product } from "@/components/ProductDetail/Product.ts";

interface ProductImagesProps {
    product: Product; // Product 타입 전체를 받아서 images와 image 모두 활용
    productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({
                                                         product,
                                                         productName,
                                                     }) => {
    // images 배열이 있으면 사용하고, 없으면 기존 image를 배열로 만들어 사용
    const imageList = product.images && product.images.length > 0
        ? product.images
        : [product.image, product.image, product.image, product.image]; // 기본 이미지 4개로 복제

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <Box sx={{ width: "100%" }}>
            {/* 메인 이미지 - 600×600 비율 (정사각형) */}
            <Box
                sx={{
                    width: "100%",
                    aspectRatio: "1/1", // 600×600 정사각형 비율
                    maxWidth: "600px", // 최대 600px로 제한
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 2,
                    backgroundColor: "#FAFAFA",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <img
                    src={imageList[selectedImage]}
                    alt={productName}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>

            {/* 썸네일 컨테이너 - 600×141 비율 */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "600px", // 최대 600px로 제한
                    aspectRatio: "600/141", // 600×141 비율
                    display: "flex",
                    gap: "2px", // 썸네일 간격 최소화
                }}
            >
                {imageList.slice(0, 4).map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: "1 1 25%", // 4등분
                            aspectRatio: "1/1", // 141×141 정사각형
                            borderRadius: 1,
                            overflow: "hidden",
                            cursor: "pointer",
                            border:
                                selectedImage === index
                                    ? "2px solid #e89830"
                                    : "2px solid transparent",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                borderColor: "#e89830",
                                opacity: selectedImage !== index ? 0.8 : 1,
                            },
                        }}
                        onClick={() => setSelectedImage(index)}
                    >
                        <img
                            src={image}
                            alt={`${productName} ${index + 1}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ProductImages;