// src/components/SellerDashboard/SellerInfo/FormComponents.tsx

import React from "react";
import { Box, Typography, TextField, Stack, Grid } from "@mui/material";
import { BRAND_COLORS, PrimaryButton, SecondaryButton } from "./constants";
import { FormField } from "./BasicComponents";
import ProfileImageUpload from "./ProfileImageUpload";
import TagInput from "./TagInput";
import OperatingHours from "./OperatingHours";
import AddressInputSection from "./AddressInputSection";

// ==================== 확장된 폼 데이터 타입 ====================
export interface BasicInfoFormData {
    workshopName: string;
    representativeName: string;
    businessNumber: string;
    postalCode: string;
    roadAddress: string;
    detailAddress: string;
    tags: string[];
    operatingHours: {
        start: string;
        end: string;
        breakTime?: string;
        holidayInfo: string;
    };
    profileImage: string | null;
}

// ==================== 향상된 기본 정보 폼 ====================
interface BasicInfoFormProps {
    data: BasicInfoFormData;
    onChange: (field: keyof BasicInfoFormData, value: any) => void;
    onBusinessNumberVerify?: () => void;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
                                                                data,
                                                                onChange,
                                                                onBusinessNumberVerify
                                                            }) => {
    const handleAddressChange = (field: 'postalCode' | 'roadAddress' | 'detailAddress', value: string) => {
        onChange(field, value);
    };

    return (
        <Box>
            <Stack spacing={4}>
                {/* 프로필 이미지 */}
                <ProfileImageUpload
                    currentImage={data.profileImage}
                    onChange={(image) => onChange('profileImage', image)}
                />

                {/* 워크샵 이름 */}
                <FormField
                    label="워크샵 이름"
                    required
                    placeholder="예: 냥멍이네 수제간식 공방"
                    value={data.workshopName}
                    onChange={(e) => onChange('workshopName', e.target.value)}
                />

                {/* 대표자명과 사업자 등록번호 */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FormField
                            label="대표자명"
                            required
                            placeholder="홍길동"
                            value={data.representativeName}
                            onChange={(e) => onChange('representativeName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography
                                variant="body2"
                                fontWeight="500"
                                color={BRAND_COLORS.TEXT_PRIMARY}
                                mb={1}
                            >
                                사업자 등록번호
                                <Typography component="span" color="error" ml={0.5}>*</Typography>
                            </Typography>
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
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box>
                            <Typography
                                variant="body2"
                                fontWeight="500"
                                color="transparent"
                                mb={1}
                                sx={{ height: '20px' }}
                            >
                                {/* 버튼 정렬을 위한 투명 레이블 */}
                                사업자 등록번호
                            </Typography>
                            <SecondaryButton
                                fullWidth
                                onClick={onBusinessNumberVerify}
                                sx={{ height: 56 }}
                            >
                                인증요청
                            </SecondaryButton>
                        </Box>
                    </Grid>
                </Grid>

                {/* 주소 입력 섹션 */}
                <AddressInputSection
                    postalCode={data.postalCode}
                    roadAddress={data.roadAddress}
                    detailAddress={data.detailAddress}
                    onChange={handleAddressChange}
                />

                {/* 태그 입력 */}
                <TagInput
                    tags={data.tags}
                    onChange={(tags) => onChange('tags', tags)}
                />

                {/* 운영시간 */}
                <OperatingHours
                    hours={data.operatingHours}
                    onChange={(hours) => onChange('operatingHours', hours)}
                />
            </Stack>
        </Box>
    );
};

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