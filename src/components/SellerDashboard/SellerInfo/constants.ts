// src/components/SellerDashboard/SellerInfo/constants.ts

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

// ==================== 브랜드 컬러 상수 ====================
export const BRAND_COLORS = {
    PRIMARY: "#ef9942",
    PRIMARY_HOVER: "#e08830",
    SECONDARY: "#f7f5f2",
    SECONDARY_HOVER: "#edeae6",
    TEXT_PRIMARY: "#2d2a27",
    TEXT_SECONDARY: "#5c5752",
    BORDER: "#F5EFEA",
    BACKGROUND_LIGHT: "#fafaf9",
    BACKGROUND_INPUT: "#fafafa",
    PROGRESS_BG: "#F5EFEA",
} as const;

// ==================== 스타일드 컴포넌트 ====================
export const PrimaryButton = styled(Button)({
    backgroundColor: BRAND_COLORS.PRIMARY,
    color: "white",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 600,
    "&:hover": { backgroundColor: BRAND_COLORS.PRIMARY_HOVER },
});

export const SecondaryButton = styled(Button)({
    backgroundColor: BRAND_COLORS.SECONDARY,
    color: BRAND_COLORS.TEXT_PRIMARY,
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 500,
    "&:hover": { backgroundColor: BRAND_COLORS.SECONDARY_HOVER },
});