"use client"

import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    TextField,
    Box,
    Alert,
    IconButton,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material"
import { Close, Warning } from "@mui/icons-material"

interface WithdrawalConfirmationModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

const WithdrawalConfirmationModal: React.FC<WithdrawalConfirmationModalProps> = ({ open, onClose, onConfirm }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [confirmText, setConfirmText] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    const steps = ["최종 확인", "탈퇴 처리 중", "완료"]

    // 탈퇴 처리 시작 시 타이머로 자동 진행
    useEffect(() => {
        let timer: NodeJS.Timeout

        if (currentStep === 1) {
            setIsProcessing(true)
            timer = setTimeout(() => {
                setIsProcessing(false)
                setCurrentStep(2)
            }, 3000)
        }

        return () => clearTimeout(timer)
    }, [currentStep, onConfirm])

    const handleClose = () => {
        if (!isProcessing) {
            setCurrentStep(0)
            setConfirmText("")
            onClose()
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth disableEscapeKeyDown={isProcessing}>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
                <Box>
                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Warning color="error" />
                        회원 탈퇴 확인
                    </Typography>
                </Box>
                {!isProcessing && (
                    <IconButton onClick={handleClose} size="small">
                        <Close />
                    </IconButton>
                )}
            </DialogTitle>

            <Box sx={{ px: 3, pb: 2 }}>
                <Stepper activeStep={currentStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Step 콘텐츠 분기 */}
            {currentStep === 0 && (
                <>
                    <DialogContent>
                        <Alert severity="error" sx={{ mb: 3 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                                정말로 탈퇴하시겠습니까?
                            </Typography>
                            <Typography variant="body2">
                                이 작업은 되돌릴 수 없습니다. 모든 데이터가 영구적으로 삭제됩니다.
                            </Typography>
                        </Alert>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                계속 진행하려면 아래 입력란에 <strong>'회원탈퇴'</strong>를 입력하세요.
                            </Typography>
                            <TextField
                                fullWidth
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="회원탈퇴"
                                error={confirmText !== "" && confirmText !== "회원탈퇴"}
                                helperText={confirmText !== "" && confirmText !== "회원탈퇴" ? "정확히 입력해주세요" : ""}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        <Button onClick={handleClose} variant="outlined">
                            취소
                        </Button>
                        <Button
                            onClick={() => setCurrentStep(1)}
                            variant="contained"
                            color="error"
                            disabled={confirmText !== "회원탈퇴"}
                        >
                            탈퇴 진행
                        </Button>
                    </DialogActions>
                </>
            )}

            {currentStep === 1 && (
                <>
                    <DialogContent sx={{ textAlign: "center", py: 4 }}>
                        <Box sx={{ mb: 3 }}>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        </Box>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            회원 탈퇴를 처리하고 있습니다...
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            잠시만 기다려주세요.
                        </Typography>
                    </DialogContent>
                </>
            )}

            {currentStep === 2 && (
                <>
                    <DialogContent sx={{ textAlign: "center", py: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, color: "success.main" }}>
                            회원 탈퇴가 완료되었습니다
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            그동안 이용해 주셔서 감사합니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 0, justifyContent: "center" }}>
                        <Button onClick={() => {
                            onConfirm()  // 완료 시점에 호출
                            handleClose() // 모달 닫기
                        }} variant="contained">
                            확인
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    )
}

export default WithdrawalConfirmationModal
