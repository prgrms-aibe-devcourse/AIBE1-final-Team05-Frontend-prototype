// src/components/SellerDashboard/SellerInfo/AddressInputSection.tsx

import React, { useState } from "react";
import { Box, Typography, TextField, Stack } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { BRAND_COLORS, PrimaryButton } from "./constants";
import AddressSearchModal from "./AddressSearchModal";

// ==================== 인터페이스 ====================
interface AddressInputSectionProps {
    postalCode: string;
    roadAddress: string;
    detailAddress: string;
    onChange: (field: 'postalCode' | 'roadAddress' | 'detailAddress', value: string) => void;
}

// ==================== 주소 입력 섹션 컴포넌트 ====================
const AddressInputSection: React.FC<AddressInputSectionProps> = ({
                                                                     postalCode,
                                                                     roadAddress,
                                                                     detailAddress,
                                                                     onChange,
                                                                 }) => {
    const [addressModalOpen, setAddressModalOpen] = useState(false);

    const handleAddressSelect = (address: { postalCode: string; roadAddress: string }) => {
        onChange('postalCode', address.postalCode);
        onChange('roadAddress', address.roadAddress);
    };

    return (
        <>
            <Box>
                <Typography
                    variant="body2"
                    fontWeight="500"
                    color={BRAND_COLORS.TEXT_PRIMARY}
                    mb={1}
                >
                    사업자 주소
                    <Typography component="span" color="error" ml={0.5}>*</Typography>
                </Typography>
                <Stack spacing={2}>
                    <Box display="flex" gap={1}>
                        <TextField
                            placeholder="우편번호"
                            value={postalCode}
                            onChange={(e) => onChange('postalCode', e.target.value)}
                            sx={{
                                width: 120,
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                    borderRadius: 2,
                                }
                            }}
                            InputProps={{ readOnly: true }}
                        />
                        <PrimaryButton
                            startIcon={<SearchIcon />}
                            onClick={() => setAddressModalOpen(true)}
                            sx={{ minWidth: 100 }}
                        >
                            주소검색
                        </PrimaryButton>
                    </Box>
                    <TextField
                        fullWidth
                        placeholder="도로명 주소"
                        value={roadAddress}
                        onChange={(e) => onChange('roadAddress', e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                            }
                        }}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        placeholder="상세 주소를 입력하세요"
                        value={detailAddress}
                        onChange={(e) => onChange('detailAddress', e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                            }
                        }}
                    />
                </Stack>
            </Box>

            {/* 카카오 주소 검색 모달 */}
            <AddressSearchModal
                open={addressModalOpen}
                onClose={() => setAddressModalOpen(false)}
                onSelect={handleAddressSelect}
            />
        </>
    );
};

export default AddressInputSection;