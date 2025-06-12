"use client"

import type React from "react"
import { Box, Typography, Button, Paper, Avatar, Stepper, Step, StepLabel, Checkbox } from "@mui/material"
import { ChevronRight } from "@mui/icons-material"
import ArrowConnector from "./ArrowConnector"

interface ReturnRequestViewProps {
    setDetailView: (view: string | null) => void
}

const ReturnRequestView: React.FC<ReturnRequestViewProps> = ({ setDetailView }) => {
    return (
        <Box>
            <Button
                startIcon={<ChevronRight sx={{ transform: "rotate(180deg)" }} />}
                onClick={() => setDetailView(null)}
                sx={{ mb: 3 }}
            >
                뒤로가기
            </Button>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                교환, 반품 신청
            </Typography>

            <Stepper activeStep={0} alternativeLabel connector={<ArrowConnector />} sx={{ mb: 6 }}>
                <Step>
                    <StepLabel>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>
                                1
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                상품 선택
                            </Typography>
                        </Box>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                2
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                사유 선택
                            </Typography>
                        </Box>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                3
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                해결방법 선택
                            </Typography>
                        </Box>
                    </StepLabel>
                </Step>
            </Stepper>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}>
                상품을 선택해 주세요
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Checkbox defaultChecked color="primary" />
                    <Avatar src="/placeholder.svg?height=80&width=80" variant="rounded" sx={{ width: 80, height: 80 }} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                티아시아가진 치킨 마누카 커리 170g + 게살 푸팟퐁 커리 170g + 비프 마살라 커리 170g + 스파이시 비프
                                마살라 커리 170g 세트, 1세트
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "right" }}>
                            1개
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Box sx={{ textAlign: "center" }}>
                <Button variant="contained" size="large" sx={{ minWidth: 200 }}>
                    {"다음 단계 →"}
                </Button>
            </Box>
        </Box>
    )
}

export default ReturnRequestView