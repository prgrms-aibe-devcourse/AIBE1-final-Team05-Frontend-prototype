// src/components/SellerDashboard/SellerInfo/FormComponents.tsx

import React, { useState, useRef } from "react";
import {
    Box,
    Typography,
    TextField,
    Stack,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Avatar,
    IconButton,
    Paper,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import {
    Search as SearchIcon,
    Add as AddIcon,
    CameraAlt as CameraIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import { BRAND_COLORS, PrimaryButton, SecondaryButton } from "./constants";
import { FormField } from "./BasicComponents";

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

// ==================== 주소 검색 모달 ====================
interface AddressSearchModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (address: { postalCode: string; roadAddress: string }) => void;
}

const AddressSearchModal: React.FC<AddressSearchModalProps> = ({
                                                                   open,
                                                                   onClose,
                                                                   onSelect,
                                                               }) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults] = useState([
        { postalCode: "06295", roadAddress: "서울특별시 강남구 테헤란로 123" },
        { postalCode: "06296", roadAddress: "서울특별시 강남구 테헤란로 125" },
        { postalCode: "06297", roadAddress: "서울특별시 강남구 테헤란로 127" },
    ]);

    const handleSelect = (address: { postalCode: string; roadAddress: string }) => {
        onSelect(address);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h6" fontWeight="600">
                    주소 검색
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <Box display="flex" gap={1}>
                        <TextField
                            fullWidth
                            placeholder="도로명, 건물명, 지번을 입력하세요"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                    borderRadius: 2,
                                }
                            }}
                        />
                        <PrimaryButton
                            startIcon={<SearchIcon />}
                            sx={{ minWidth: 100 }}
                        >
                            검색
                        </PrimaryButton>
                    </Box>
                </Box>

                <Stack spacing={1} sx={{ maxHeight: 300, overflow: "auto" }}>
                    {searchResults.map((result, index) => (
                        <Paper
                            key={index}
                            sx={{
                                p: 2,
                                cursor: "pointer",
                                border: `1px solid ${BRAND_COLORS.BORDER}`,
                                "&:hover": {
                                    backgroundColor: BRAND_COLORS.BACKGROUND_LIGHT,
                                    borderColor: BRAND_COLORS.PRIMARY,
                                }
                            }}
                            onClick={() => handleSelect(result)}
                        >
                            <Typography variant="body2" fontWeight="500">
                                [{result.postalCode}] {result.roadAddress}
                            </Typography>
                        </Paper>
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions>
                <SecondaryButton onClick={onClose}>
                    취소
                </SecondaryButton>
            </DialogActions>
        </Dialog>
    );
};

// ==================== 태그 입력 컴포넌트 ====================
interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
    const [inputValue, setInputValue] = useState("");

    const handleAddTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            onChange([...tags, trimmedValue]);
            setInputValue("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        onChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <Box>
            <Typography
                variant="body2"
                fontWeight="500"
                color={BRAND_COLORS.TEXT_PRIMARY}
                mb={1}
            >
                워크샵 태그
            </Typography>
            <Box display="flex" gap={1} mb={2}>
                <TextField
                    fullWidth
                    placeholder="태그를 입력하세요 (예: 수제간식, 무첨가, 강아지전용)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                            borderRadius: 2,
                            "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                        }
                    }}
                />
                <PrimaryButton
                    onClick={handleAddTag}
                    startIcon={<AddIcon />}
                    sx={{ minWidth: 100 }}
                >
                    추가
                </PrimaryButton>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={1}>
                {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={`#${tag}`}
                        onDelete={() => handleRemoveTag(tag)}
                        sx={{
                            backgroundColor: BRAND_COLORS.PRIMARY,
                            color: "white",
                            "& .MuiChip-deleteIcon": {
                                color: "white",
                                "&:hover": {
                                    color: BRAND_COLORS.BACKGROUND_LIGHT,
                                }
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

// ==================== 프로필 이미지 업로드 ====================
interface ProfileImageUploadProps {
    currentImage: string | null;
    onChange: (image: string | null) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
                                                                   currentImage,
                                                                   onChange,
                                                               }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onChange(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    };

    return (
        <Box>
            <Typography
                variant="body2"
                fontWeight="500"
                color={BRAND_COLORS.TEXT_PRIMARY}
                mb={1}
            >
                프로필 이미지
            </Typography>
            <Box
                sx={{
                    position: "relative",
                    width: 120,
                    height: 120,
                    borderRadius: 3,
                    border: `2px dashed ${BRAND_COLORS.BORDER}`,
                    backgroundColor: BRAND_COLORS.BACKGROUND_LIGHT,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    "&:hover": {
                        borderColor: BRAND_COLORS.PRIMARY,
                        backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                    }
                }}
                onClick={handleImageClick}
            >
                {currentImage ? (
                    <>
                        <img
                            src={currentImage}
                            alt="Profile"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        <IconButton
                            sx={{
                                position: "absolute",
                                top: 4,
                                right: 4,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                }
                            }}
                            size="small"
                            onClick={handleRemoveImage}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
                ) : (
                    <Box textAlign="center">
                        <CameraIcon
                            sx={{
                                fontSize: 32,
                                color: BRAND_COLORS.TEXT_SECONDARY,
                                mb: 1
                            }}
                        />
                        <Typography
                            variant="caption"
                            color={BRAND_COLORS.TEXT_SECONDARY}
                            display="block"
                        >
                            이미지 업로드
                        </Typography>
                    </Box>
                )}
            </Box>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <Typography
                variant="caption"
                color={BRAND_COLORS.TEXT_SECONDARY}
                mt={1}
                display="block"
            >
                권장 크기: 400x400px, 최대 5MB
            </Typography>
        </Box>
    );
};

// ==================== 운영시간 입력 ====================
interface OperatingHoursProps {
    hours: {
        start: string;
        end: string;
        breakTime?: string;
        holidayInfo: string;
    };
    onChange: (hours: {
        start: string;
        end: string;
        breakTime?: string;
        holidayInfo: string;
    }) => void;
}

const OperatingHours: React.FC<OperatingHoursProps> = ({ hours, onChange }) => {
    return (
        <Box>
            <Typography
                variant="body2"
                fontWeight="500"
                color={BRAND_COLORS.TEXT_PRIMARY}
                mb={1}
            >
                운영시간
                <Typography component="span" color="error" ml={0.5}>*</Typography>
            </Typography>
            <Grid container spacing={1.5} sx={{ alignItems: 'flex-end' }}>
                <Grid item xs={3} sm={3}>
                    <TextField
                        fullWidth
                        label="시작시간"
                        placeholder="09:00"
                        value={hours.start}
                        onChange={(e) => onChange({ ...hours, start: e.target.value })}
                        inputProps={{
                            pattern: "[0-9]{2}:[0-9]{2}",
                            placeholder: "HH:MM"
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={3} sm={3}>
                    <TextField
                        fullWidth
                        label="종료시간"
                        placeholder="18:00"
                        value={hours.end}
                        onChange={(e) => onChange({ ...hours, end: e.target.value })}
                        inputProps={{
                            pattern: "[0-9]{2}:[0-9]{2}",
                            placeholder: "HH:MM"
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <TextField
                        fullWidth
                        label="휴무정보"
                        placeholder="예: 주말 및 공휴일 휴무"
                        value={hours.holidayInfo}
                        onChange={(e) => onChange({ ...hours, holidayInfo: e.target.value })}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

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
    const [addressModalOpen, setAddressModalOpen] = useState(false);

    const handleAddressSelect = (address: { postalCode: string; roadAddress: string }) => {
        onChange('postalCode', address.postalCode);
        onChange('roadAddress', address.roadAddress);
    };

    return (
        <Box>
            <Stack spacing={4}>
                {/* 프로필 이미지 */}
                <ProfileImageUpload
                    currentImage={data.profileImage}
                    onChange={(image) => onChange('profileImage', image)}
                />

                {/* 워크샵 이름 - 저장하기 버튼까지의 너비로 확장 */}
                <FormField
                    label="워크샵 이름"
                    required
                    placeholder="예: 냥멍이네 수제간식 공방"
                    value={data.workshopName}
                    onChange={(e) => onChange('workshopName', e.target.value)}
                />

                {/* 대표자명과 사업자 등록번호 - 전체 너비 꽉 채움 */}
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
                                {/* 버튼 정렬을 위한 투명 레이블 - 높이 고정 */}
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

                {/* 주소 입력 - 저장하기 버튼까지의 너비로 확장 */}
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
                                value={data.postalCode}
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
                            value={data.roadAddress}
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
                            value={data.detailAddress}
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

                {/* 태그 입력 - 저장하기 버튼까지의 너비로 확장 */}
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

            {/* 주소 검색 모달 */}
            <AddressSearchModal
                open={addressModalOpen}
                onClose={() => setAddressModalOpen(false)}
                onSelect={handleAddressSelect}
            />
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