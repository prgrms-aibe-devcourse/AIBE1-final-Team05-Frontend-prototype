// src/components/SellerDashboard/SellerInfo/BasicComponents.tsx

import React from "react";
import {
    Box,
    Typography,
    CircularProgress,
    TextField,
    TextFieldProps,
    Divider,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { BRAND_COLORS, PrimaryButton } from "./constants";

// ==================== 진행률 원형 차트 ====================
interface ProgressCircleProps {
    value: number;
    size?: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
                                                                  value,
                                                                  size = 128
                                                              }) => (
    <Box position="relative" display="inline-flex">
        <CircularProgress
            variant="determinate"
            value={100}
            size={size}
            thickness={3}
            sx={{ color: BRAND_COLORS.PROGRESS_BG }}
        />
        <CircularProgress
            variant="determinate"
            value={value}
            size={size}
            thickness={3}
            sx={{
                color: BRAND_COLORS.PRIMARY,
                position: "absolute",
                left: 0,
                "& .MuiCircularProgress-circle": { strokeLinecap: "round" }
            }}
        />
        <Box sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography variant="h4" color={BRAND_COLORS.PRIMARY} fontWeight="bold">
                {value}%
            </Typography>
        </Box>
    </Box>
);

// ==================== 재사용 가능한 폼 필드 ====================
interface FormFieldProps extends Omit<TextFieldProps, 'label'> {
    label: string;
    required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
                                                        label,
                                                        required,
                                                        ...props
                                                    }) => (
    <Box>
        <Typography
            variant="body2"
            fontWeight="500"
            color={BRAND_COLORS.TEXT_PRIMARY}
            mb={1}
        >
            {label}
            {required && (
                <Typography component="span" color="error" ml={0.5}>*</Typography>
            )}
        </Typography>
        <TextField
            fullWidth
            {...props}
            sx={{
                "& .MuiOutlinedInput-root": {
                    backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                    borderRadius: 2,
                    "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                },
                ...props.sx
            }}
        />
    </Box>
);

// ==================== 페이지 헤더 ====================
interface PageHeaderProps {
    title: string;
    onCustomerViewClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
                                                          title,
                                                          onCustomerViewClick
                                                      }) => (
    <>
        <Box sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2
        }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                color={BRAND_COLORS.TEXT_PRIMARY}
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
                {title}
            </Typography>
            {onCustomerViewClick && (
                <PrimaryButton
                    startIcon={<EditIcon />}
                    onClick={onCustomerViewClick}
                    sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        px: { xs: 2, sm: 3 },
                        py: 1.5
                    }}
                >
                    고객화면에서 보기
                </PrimaryButton>
            )}
        </Box>
        <Divider sx={{ mb: 4, borderColor: BRAND_COLORS.BORDER }} />
    </>
);