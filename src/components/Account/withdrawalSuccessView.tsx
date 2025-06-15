"use client"

import type React from "react"
import { Box, Typography, Button, Paper, Alert, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { CheckCircle, Info, Home } from "@mui/icons-material"

const WithdrawalSuccessView: React.FC = () => {
    const handleGoHome = () => {
        window.location.href = "/"
    }

    return (
        <Box sx={{ p: 3, textAlign: "center" }}>
            <Box sx={{ mb: 4 }}>
                <CheckCircle sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                    회원 탈퇴가 완료되었습니다
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    그동안 저희 서비스를 이용해 주셔서 감사합니다.
                </Typography>
            </Box>

            <Paper sx={{ p: 3, mb: 4, textAlign: "left", width: "50%", mx: "auto"}}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <Info color="primary" />
                    탈퇴 처리 완료 안내
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary="개인정보 삭제 완료" secondary="회원님의 모든 개인정보가 안전하게 삭제되었습니다." />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                            primary="서비스 이용 기록 삭제"
                            secondary="주문내역, 리뷰, 문의내역 등이 모두 삭제되었습니다."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary="쿠폰 및 적립금 소멸" secondary="보유하셨던 쿠폰과 적립금이 모두 소멸되었습니다." />
                    </ListItem>
                </List>
            </Paper>

            <Alert severity="info" sx={{ mb: 4, textAlign: "left" , width: "50%", mx: "auto"}}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    재가입 안내
                </Typography>
                <Typography variant="body2">
                    • 탈퇴 후 7일간 동일한 이메일로 재가입이 불가능합니다.
                    <br />• 재가입 시 기존 회원 혜택은 적용되지 않습니다.
                    <br />• 법정 보관 의무에 따라 일부 거래기록은 5년간 보관됩니다.
                </Typography>
            </Alert>

            <Button variant="contained" size="large" startIcon={<Home />} onClick={handleGoHome} sx={{ minWidth: 200 }}>
                홈페이지로 이동
            </Button>
        </Box>
    )
}

export default WithdrawalSuccessView
