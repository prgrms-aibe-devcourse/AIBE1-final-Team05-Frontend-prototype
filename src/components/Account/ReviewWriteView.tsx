"use client"

import type React from "react"
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    TextField,
    Rating,
} from "@mui/material"
import { ChevronRight, PhotoCamera } from "@mui/icons-material"

interface ReviewWriteViewProps {
    setDetailView: (view: string | null) => void
}

const ReviewWriteView: React.FC<ReviewWriteViewProps> = ({ setDetailView }) => {
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
                상품 후기 다루
            </Typography>

            <Typography variant="body1" sx={{ mb: 4 }}>
                이 상품의 품질에 대해서 얼마나 만족하시나요?
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
                    <Avatar src="/placeholder.svg?height=80&width=80" variant="rounded" sx={{ width: 80, height: 80 }} />
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                            티아시아가진 치킨 마누카 커리 170g + 게살 푸팟퐁 커리 170g + 비프 마살라 커리 170g + 스파이시 비프 마살라
                            커리 170g 세트, 1세트
                        </Typography>
                        <Rating size="large" defaultValue={0}
                                precision={0.5}
                                max={5}           // 최대 별 개수 (기본값: 5)
                                readOnly={false}  // 읽기 전용 여부
                                disabled={false}  // 비활성화 여부
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            (필수)*
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        상세리뷰
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        placeholder="다른 고객님에게 도움이 되도록 상품에 대한 솔직한 평가를 남겨주세요.
상품 품질과 관계 없는 배송, 포장, 절차 등에 대한 상품 가격 등은 판매자 서비스 평가에 남겨주세요."
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        상품 품질과 관련 없는 내용은 비공개 처리될 수 있습니다.
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                        {"작성된 리뷰는 상세 전까지 상품 리뷰에 공개되고, 마이쿠팡 > 리뷰 관리에서 수정 및 삭제가 가능합니다."}
                    </Typography>
                    <Box sx={{ textAlign: "right", mt: 1 }}>
                        <Typography variant="caption">0</Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        사진첨부
                    </Typography>
                    <Button variant="outlined" startIcon={<PhotoCamera />} sx={{ mb: 2 }}>
                        사진 첨부하기
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        0/10
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        한줄요약
                    </Typography>
                    <TextField fullWidth placeholder="한 줄 요약을 입력해 주세요" variant="outlined" sx={{ mb: 1 }} />
                    <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption">0/30</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <Button variant="outlined" size="large" sx={{ minWidth: 120 }}>
                        취소하기
                    </Button>
                    <Button variant="contained" size="large" sx={{ minWidth: 120 }}>
                        등록하기
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default ReviewWriteView