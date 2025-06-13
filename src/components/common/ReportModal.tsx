// src/components/ProductDetail/ProductReviews/ReportModal.tsx

import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    styled
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";

interface ReportModalProps {
    open: boolean;
    onClose: () => void;
    type: "product" | "review";
    targetId: string;
    targetName?: string;
}

// ✅ component prop 제거 - MUI v7에서는 지원되지 않음
const StyledUploadBox = styled(Box)(({ theme }) => ({
    border: "2px dashed #ddd",
    borderRadius: 8,
    padding: theme.spacing(4),
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#fafafa",
    "&:hover": {
        borderColor: theme.palette.primary.main,
        backgroundColor: "#f5f5f5",
    },
}));

const ReportModal: React.FC<ReportModalProps> = ({
                                                     open,
                                                     onClose,
                                                     type,
                                                     targetId,
                                                     targetName
                                                 }) => {
    const [reportReason, setReportReason] = useState("");
    const [reportContent, setReportContent] = useState("");
    const [attachedFiles, setAttachedFiles] = useState<FileList | null>(null);

    const reportReasons = [
        "선택하세요",
        "스팸/홍보",
        "욕설/비방",
        "음란물",
        "개인정보 노출",
        "저작권 침해",
        "기타"
    ];

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setAttachedFiles(files);
        }
    };

    const handleSubmit = () => {
        if (!reportReason || reportReason === "선택하세요") {
            alert("신고 사유를 선택해주세요.");
            return;
        }

        if (!reportContent.trim()) {
            alert("상세 내용을 입력해주세요.");
            return;
        }

        // 신고 제출 로직
        console.log("신고 제출:", {
            type,
            targetId,
            targetName,
            reason: reportReason,
            content: reportContent,
            files: attachedFiles
        });

        // 성공 알림 및 모달 닫기
        alert("신고가 접수되었습니다. 검토 후 조치하겠습니다.");
        handleClose();
    };

    const handleClose = () => {
        setReportReason("");
        setReportContent("");
        setAttachedFiles(null);
        onClose();
    };

    const getCharacterCount = () => {
        return reportContent.length;
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight: "90vh"
                }
            }}
        >
            {/* 헤더 */}
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 2,
                    borderBottom: "1px solid #f0f0f0"
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {type === "product" ? "상품" : "리뷰"} 신고하기
                </Typography>
                <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}>
                    <Close />
                </IconButton>
            </DialogTitle>

            {/* 내용 */}
            <DialogContent sx={{ pt: 3 }}>
                {/* 신고 사유 선택 */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                    >
                        신고 사유를 선택해주세요. (필수)
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            displayEmpty
                            sx={{
                                backgroundColor: "#f5f5f5",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "transparent",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                            }}
                        >
                            {reportReasons.map((reason) => (
                                <MenuItem key={reason} value={reason}>
                                    {reason}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* 상세 내용 입력 */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                    >
                        상세 내용을 입력해주세요. (필수)
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        placeholder="상품평과 관계 없는 글 (비방, 욕설, 광고, 잘못된 정보 등)을 신고해주시면, 관리자 확인 후 해당 상품평의 노출이 제한될 수 있습니다. 타당한 사유 없이 허위 신고 시 신고자에 대한 활동 제한이 가해질 수 있으니, 신고 전에 신중하게 재고해주시기 바랍니다."
                        inputProps={{ maxLength: 500 }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f5f5f5",
                                "& fieldset": {
                                    borderColor: "transparent",
                                },
                                "&:hover fieldset": {
                                    borderColor: "primary.main",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 1,
                            textAlign: "right",
                            color: "text.secondary",
                            fontSize: "0.75rem"
                        }}
                    >
                        {getCharacterCount()} / 500자
                    </Typography>
                </Box>

                {/* 첨부파일 업로드 */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                    >
                        첨부파일 업로드 (선택사항)
                    </Typography>
                    <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        {/* ✅ component="div" 제거 - 이제 Box는 기본적으로 div로 렌더링됨 */}
                        <StyledUploadBox>
                            <CloudUpload sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                파일을 드래그 앤 드롭하거나
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "primary.main", fontWeight: 500 }}
                            >
                                클릭해서 업로드
                            </Typography>
                        </StyledUploadBox>
                    </label>
                    {attachedFiles && attachedFiles.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                첨부된 파일: {Array.from(attachedFiles).map(file => file.name).join(", ")}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>

            {/* 버튼 영역 */}
            <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                        flex: 1,
                        height: 48,
                        color: "text.secondary",
                        borderColor: "grey.300",
                        "&:hover": {
                            borderColor: "grey.400",
                            backgroundColor: "grey.50",
                        },
                    }}
                >
                    취소
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        flex: 1,
                        height: 48,
                        backgroundColor: "#4caf50",
                        "&:hover": {
                            backgroundColor: "#45a049",
                        },
                    }}
                >
                    제출하기
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReportModal;