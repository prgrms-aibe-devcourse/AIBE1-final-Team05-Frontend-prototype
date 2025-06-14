// src/components/SellerDashboard/SellerInfo/FormComponents.tsx

import React from "react";
import {
    Box,
    Typography,
    TextField,
    Stack,
} from "@mui/material";
import { BRAND_COLORS, PrimaryButton, SecondaryButton } from "./constants";
import { FormField } from "./BasicComponents";

// ==================== 기본 정보 폼 데이터 타입 ====================
export interface BasicInfoFormData {
    workshopName: string;
    representativeName: string;
    businessNumber: string;
    businessAddress: string;
}

// ==================== 기본 정보 폼 ====================
interface BasicInfoFormProps {
    data: BasicInfoFormData;
    onChange: (field: keyof BasicInfoFormData, value: string) => void;
    onBusinessNumberVerify?: () => void;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
                                                                data,
                                                                onChange,
                                                                onBusinessNumberVerify
                                                            }) => (
    <Box>
        <Typography
            variant="h5"
            fontWeight="600"
            color={BRAND_COLORS.TEXT_PRIMARY}
            mb={3}
        >
            기본 정보 설정
        </Typography>
        <Stack spacing={3}>
            <FormField
                label="워크샵 이름"
                required
                placeholder="예: 냥멍이네 수제간식 공방"
                value={data.workshopName}
                onChange={(e) => onChange('workshopName', e.target.value)}
            />
            <FormField
                label="대표자명"
                placeholder="홍길동"
                value={data.representativeName}
                onChange={(e) => onChange('representativeName', e.target.value)}
            />
            <Box>
                <Typography
                    variant="body2"
                    fontWeight="500"
                    color={BRAND_COLORS.TEXT_PRIMARY}
                    mb={1}
                >
                    사업자 등록번호
                </Typography>
                <Box display="flex" gap={1}>
                    <TextField
                        fullWidth
                        placeholder="123-45-67890"
                        value={data.businessNumber}
                        onChange={(e) => onChange('businessNumber', e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                            }
                        }}
                    />
                    <SecondaryButton
                        onClick={onBusinessNumberVerify}
                        sx={{ minWidth: 120, whiteSpace: "nowrap" }}
                    >
                        인증요청
                    </SecondaryButton>
                </Box>
            </Box>
            <FormField
                label="사업자 주소"
                placeholder="서울특별시 강남구 테헤란로 123"
                value={data.businessAddress}
                onChange={(e) => onChange('businessAddress', e.target.value)}
            />
        </Stack>
    </Box>
);

// ==================== 폼 액션 버튼 ====================
interface FormActionsProps {
    onSave: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
                                                            onSave,
                                                            onCancel,
                                                            isLoading = false
                                                        }) => (
    <Box pt={4} borderTop={`1px solid ${BRAND_COLORS.BORDER}`} mt={4}>
        <Box display="flex" justifyContent="flex-end" gap={2} flexWrap="wrap">
            <SecondaryButton
                onClick={onCancel}
                disabled={isLoading}
                sx={{ minWidth: 120, px: 3, py: 1.5 }}
            >
                변경 취소
            </SecondaryButton>
            <PrimaryButton
                onClick={onSave}
                disabled={isLoading}
                sx={{ minWidth: 120, px: 3, py: 1.5 }}
            >
                저장하기
            </PrimaryButton>
        </Box>
    </Box>
);