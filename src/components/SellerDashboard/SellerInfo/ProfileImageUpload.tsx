// src/components/SellerDashboard/SellerInfo/ProfileImageUpload.tsx

import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { CameraAlt as CameraIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { BRAND_COLORS } from "./constants";

// ==================== 인터페이스 ====================
interface ProfileImageUploadProps {
    currentImage: string | null;
    onChange: (image: string | null) => void;
}

// ==================== 프로필 이미지 업로드 컴포넌트 ====================
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

export default ProfileImageUpload;