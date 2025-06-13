"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Paper,
    InputAdornment,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    Divider,
} from "@mui/material"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CloseIcon from "@mui/icons-material/Close"

interface FilePreview {
    name: string
    url: string
}

const InquiryForm: React.FC = () => {
    const [fileList, setFileList] = useState<FilePreview[]>([])
    const [replyMethod, setReplyMethod] = useState<string>("inquiry")

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        const newFiles: FilePreview[] = []

        for (let i = 0; i < files.length; i++) {
            if (fileList.length + newFiles.length >= 3) break // 최대 3개까지만

            const file = files[i]
            if (file.size <= 20 * 1024 * 1024) {
                // 20MB 제한
                newFiles.push({
                    name: file.name,
                    url: URL.createObjectURL(file),
                })
            }
        }

        setFileList([...fileList, ...newFiles])
    }

    const handleRemoveFile = (index: number) => {
        const newFileList = [...fileList]
        URL.revokeObjectURL(newFileList[index].url)
        newFileList.splice(index, 1)
        setFileList(newFileList)
    }

    const handleReplyMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplyMethod(event.target.value)
    }

    return (
        <Box
            component={Paper}
            sx={{
                bgcolor: "white",
                p: { xs: 3, sm: 4 },
                borderRadius: 2,
                border: "1px solid #e8dbce",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
        >
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box
                    sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 2fr" }, gap: 2, alignItems: "flex-end" }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="inquiry-type-label" sx={{ color: "#1c140d" }}>
                            유형
                            <Box component="span" sx={{ color: "#ef4444" }}>
                                *
                            </Box>
                        </InputLabel>
                        <Select
                            labelId="inquiry-type-label"
                            id="inquiry-type"
                            label="유형*"
                            defaultValue=""
                            sx={{
                                height: 44,
                                borderRadius: 1,
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8dbce",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8dbce",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#f38b24",
                                },
                            }}
                        >
                            <MenuItem value="" disabled>
                                유형을 선택해주세요
                            </MenuItem>
                            <MenuItem value="product">제품 문의</MenuItem>
                            <MenuItem value="order">주문/결제 문의</MenuItem>
                            <MenuItem value="delivery">배송 문의</MenuItem>
                            <MenuItem value="refund">환불/교환 문의</MenuItem>
                            <MenuItem value="account">계정 문의</MenuItem>
                            <MenuItem value="etc">기타 문의</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
                        <TextField
                            fullWidth
                            id="order-details"
                            label="주문내역"
                            placeholder="선택된 주문내역이 없습니다."
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" sx={{ color: "#9c7349" }}>
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#e8dbce",
                                    },
                                },
                            }}
                            sx={{
                                "& .MuiInputLabel-root": {
                                    color: "#1c140d",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#f38b24",
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#f4ede7",
                                color: "#1c140d",
                                "&:hover": { bgcolor: "#e8dbce" },
                                height: 44,
                                borderRadius: 1,
                                whiteSpace: "nowrap",
                                fontSize: "0.875rem",
                            }}
                        >
                            주문상품 선택
                        </Button>
                    </Box>
                </Box>

                <TextField
                    fullWidth
                    required
                    id="inquiry-title"
                    label="제목"
                    placeholder="제목을 입력해주세요."
                    InputProps={{
                        sx: {
                            borderRadius: 1,
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e8dbce",
                            },
                        },
                    }}
                    sx={{
                        "& .MuiInputLabel-root": {
                            color: "#1c140d",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#f38b24",
                        },
                    }}
                />

                <Box>
                    <TextField
                        fullWidth
                        required
                        id="inquiry-content"
                        label="내용"
                        placeholder="문의하실 내용을 자세히 적어주세요."
                        multiline
                        rows={8}
                        InputProps={{
                            sx: {
                                borderRadius: 1,
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8dbce",
                                },
                            },
                        }}
                        sx={{
                            "& .MuiInputLabel-root": {
                                color: "#1c140d",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#f38b24",
                            },
                        }}
                    />
                    <Typography variant="caption" sx={{ mt: 1, display: "block", color: "#9c7349" }}>
                        ※ 외국어로 문의하실 경우, 답변은 자동 번역으로 제공될 수 있습니다. 번역이 정확하지 않을 수 있으니, 이 경우
                        다시 문의해 주시면 최대한 정확한 답변을 드리도록 노력하겠습니다.
                    </Typography>
                </Box>

                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                        <Typography
                            variant="body2"
                            fontWeight="medium"
                            sx={{ color: "#1c140d", display: "flex", alignItems: "center" }}
                        >
                            <CameraAltIcon sx={{ fontSize: "1.25rem", mr: 0.5, color: "#f38b24" }} />
                            이미지 첨부
                            <Typography variant="caption" sx={{ color: "#9c7349", ml: 0.5 }}>
                                (선택) JPG, PNG, GIF, BMP 파일 / 최대 20MB / 최대 3개
                            </Typography>
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#9c7349" }}>
                            {fileList.length}/3
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            px: 3,
                            py: 2.5,
                            border: "2px dashed #e8dbce",
                            borderRadius: 1,
                            bgcolor: "#fcfaf8",
                        }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CloudUploadIcon sx={{ fontSize: "2.5rem", color: "#d1c5b8", mb: 1 }} />
                            <Box sx={{ display: "flex", alignItems: "center", fontSize: "0.875rem", color: "#9c7349" }}>
                                <Button
                                    component="label"
                                    sx={{
                                        color: "#f38b24",
                                        "&:hover": { color: "#e07b1a", bgcolor: "transparent" },
                                        p: 0,
                                        minWidth: "auto",
                                        fontWeight: 500,
                                        textTransform: "none",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    파일 선택
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/jpeg,image/png,image/bmp,image/gif"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                <Typography variant="body2" sx={{ ml: 0.5 }}>
                                    또는 파일을 여기로 드래그하세요.
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: "#9c7349", mt: 0.5 }}>
                                이미지 파일을 첨부해주세요.
                            </Typography>
                        </Box>
                    </Box>

                    {fileList.length > 0 && (
                        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                            {fileList.map((file, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        p: 1,
                                        bgcolor: "#f4ede7",
                                        borderRadius: 1,
                                        fontSize: "0.875rem",
                                        color: "#1c140d",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {file.name}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveFile(index)}
                                        sx={{ color: "#9c7349", "&:hover": { color: "#1c140d" } }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    )}

                    <Typography variant="caption" sx={{ mt: 2, display: "block", color: "#9c7349" }}>
                        ※ 문의 내용 및 첨부 파일에 개인정보(계좌번호, 카드번호, 주민등록번호 등)가 포함되지 않도록 주의해주세요.
                    </Typography>
                </Box>

                <Divider sx={{ borderColor: "#e8dbce", my: 1 }} />

                <Box>
                    <Typography variant="body2" align="center" sx={{ color: "#1c140d", mb: 2 }}>
                        답변 받으실 방법을 선택해주세요.
                        <Typography variant="caption" component="span" sx={{ color: "#9c7349", ml: 0.5 }}>
                            (미선택 시 문의내역으로 답변)
                        </Typography>
                    </Typography>

                    <RadioGroup
                        row
                        value={replyMethod}
                        onChange={handleReplyMethodChange}
                        sx={{
                            justifyContent: "center",
                            gap: { xs: 2, sm: 3 },
                            mb: 2,
                        }}
                    >
                        <FormControlLabel
                            value="inquiry"
                            control={
                                <Radio
                                    sx={{
                                        color: "#e8dbce",
                                        "&.Mui-checked": {
                                            color: "#f38b24",
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography variant="body2" sx={{ color: "#1c140d" }}>
                                    문의내역
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            value="phone"
                            control={
                                <Radio
                                    sx={{
                                        color: "#e8dbce",
                                        "&.Mui-checked": {
                                            color: "#f38b24",
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography variant="body2" sx={{ color: "#1c140d" }}>
                                    전화
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            value="sms"
                            control={
                                <Radio
                                    sx={{
                                        color: "#e8dbce",
                                        "&.Mui-checked": {
                                            color: "#f38b24",
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography variant="body2" sx={{ color: "#1c140d" }}>
                                    문자
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            value="none"
                            control={
                                <Radio
                                    sx={{
                                        color: "#e8dbce",
                                        "&.Mui-checked": {
                                            color: "#f38b24",
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography variant="body2" sx={{ color: "#1c140d" }}>
                                    답변 불필요
                                </Typography>
                            }
                        />
                    </RadioGroup>

                    <Typography variant="caption" align="center" sx={{ display: "block", color: "#9c7349" }}>
                        ※ 추가적인 내용 확인 및 정보제공 동의가 필요한 경우 전화로 연락드릴 수 있습니다.
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            bgcolor: "#f38b24",
                            color: "white",
                            "&:hover": { bgcolor: "#e07b1a" },
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: "1rem",
                            fontWeight: 600,
                        }}
                    >
                        문의 등록
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default InquiryForm
