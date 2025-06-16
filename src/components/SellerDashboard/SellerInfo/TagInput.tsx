// src/components/SellerDashboard/SellerInfo/TagInput.tsx

import React, { useState } from "react";
import { Box, Typography, TextField, Chip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { BRAND_COLORS, PrimaryButton } from "./constants";

// ==================== 인터페이스 ====================
interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
}

// ==================== 태그 입력 컴포넌트 ====================
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

export default TagInput;