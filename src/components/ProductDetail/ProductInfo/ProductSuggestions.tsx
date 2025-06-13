// src/components/ProductDetail/ProductInfo/ProductSuggestions.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Pets } from "@mui/icons-material";

const ProductSuggestions: React.FC = () => {
    const handlePetInfoInput = () => {
        console.log("우리 아이 정보 입력하기");
    };

    return (
        <Box>
            <Typography
                variant="h3"
                sx={{
                    mb: 2,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#1b150e",
                }}
            >
                이런 아이에게 좋아요!
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#1b150e",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    • 모든 연령 및 견종의 강아지 (2개월 이상)
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#1b150e",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    • 소화기가 예민하거나 알러지가 있는 강아지
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#1b150e",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    • 훈련용 간식 또는 칭찬 간식으로 활용
                </Typography>
            </Box>

            <Button
                variant="text"
                startIcon={<Pets />}
                onClick={handlePetInfoInput}
                sx={{
                    mt: 2,
                    color: "#e89830",
                    textTransform: "none",
                    fontSize: "0.875rem",
                    p: "4px 8px",
                    borderRadius: 1,
                    "&:hover": {
                        backgroundColor: "rgba(232, 152, 48, 0.08)",
                    },
                }}
            >
                우리 아이 정보 입력하기
            </Button>
        </Box>
    );
};

export default ProductSuggestions;