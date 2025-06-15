"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Typography,
    Button,
    Paper,
    Alert,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material"
import { ExpandMore, Info, CheckCircle } from "@mui/icons-material"

interface AccountWithdrawalViewProps {
    onWithdrawalRequest: () => void
}

const AccountWithdrawalView: React.FC<AccountWithdrawalViewProps> = ({ onWithdrawalRequest }) => {
    const [withdrawalReason, setWithdrawalReason] = useState("")
    const [customReason, setCustomReason] = useState("")
    const [isAgreed, setIsAgreed] = useState(false)

    const withdrawalReasons = [
        "서비스 이용 빈도가 낮음",
        "다른 쇼핑몰 이용",
        "개인정보 보호 우려",
        "서비스 품질 불만족",
        "고객 서비스 불만족",
        "기타",
    ]

    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWithdrawalReason(event.target.value)
        if (event.target.value !== "기타") {
            setCustomReason("")
        }
    }

    const handleWithdrawal = () => {
        if (!withdrawalReason || !isAgreed) {
            alert("탈퇴 사유를 선택하고 주의사항에 동의해주세요.")
            return
        }
        onWithdrawalRequest()
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                회원 탈퇴
            </Typography>

            {/* 탈퇴 전 확인사항 */}
            <Alert severity="warning" sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    탈퇴 전 꼭 확인해주세요!
                </Typography>
                <Typography variant="body2">
                    회원 탈퇴 시 모든 개인정보와 서비스 이용 기록이 삭제되며, 복구가 불가능합니다.
                </Typography>
            </Alert>

            {/* 미처리 내역 확인 */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <Info color="primary" />
                    미처리 내역 확인
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary="진행 중인 주문" secondary="진행 중인 주문이 없습니다." />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary="환불 대기 내역" secondary="환불 대기 중인 내역이 없습니다." />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary="사용 가능한 쿠폰" secondary="3개의 쿠폰이 있습니다. (총 15,000원 할인)" />
                    </ListItem>
                </List>
            </Paper>

            {/* 탈퇴 사유 선택 */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    탈퇴 사유를 선택해주세요 (선택사항)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    더 나은 서비스 제공을 위해 탈퇴 사유를 알려주세요.
                </Typography>

                <FormControl component="fieldset">
                    <RadioGroup value={withdrawalReason} onChange={handleReasonChange}>
                        {withdrawalReasons.map((reason) => (
                            <FormControlLabel key={reason} value={reason} control={<Radio />} label={reason} />
                        ))}
                    </RadioGroup>
                </FormControl>

                {withdrawalReason === "기타" && (
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="기타 사유를 입력해주세요"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                )}
            </Paper>

            {/* 탈퇴 시 주의사항 */}
            <Accordion sx={{ mb: 4 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        회원 탈퇴 시 주의사항 (필독)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                            개인정보 및 서비스 이용 기록 삭제
                        </Typography>
                        <List dense>
                            <ListItem sx={{ pl: 0 }}>
                                <ListItemText
                                    primary="• 회원정보, 주문내역, 배송지 정보 등 모든 개인정보가 즉시 삭제됩니다."
                                    primaryTypographyProps={{ variant: "body2" }}
                                />
                            </ListItem>
                            <ListItem sx={{ pl: 0 }}>
                                <ListItemText
                                    primary="• 작성하신 리뷰, 문의내역 등이 모두 삭제됩니다."
                                    primaryTypographyProps={{ variant: "body2" }}
                                />
                            </ListItem>
                            <ListItem sx={{ pl: 0 }}>
                                <ListItemText
                                    primary="• 보유하신 쿠폰 및 적립금이 모두 소멸됩니다."
                                    primaryTypographyProps={{ variant: "body2" }}
                                />
                            </ListItem>
                        </List>

                        <Typography variant="body2" sx={{ mb: 2, mt: 3, fontWeight: 600 }}>
                            재가입 제한
                        </Typography>
                        <List dense>
                            <ListItem sx={{ pl: 0 }}>
                                <ListItemText
                                    primary="• 탈퇴 후 7일간 동일한 이메일로 재가입이 불가능합니다."
                                    primaryTypographyProps={{ variant: "body2" }}
                                />
                            </ListItem>
                            <ListItem sx={{ pl: 0 }}>
                                <ListItemText
                                    primary="• 재가입 시 기존 회원 혜택은 적용되지 않습니다."
                                    primaryTypographyProps={{ variant: "body2" }}
                                />
                            </ListItem>
                        </List>

                        <Typography variant="body2" sx={{ mb: 2, mt: 3, fontWeight: 600 }}>
                            법정 보관 의무
                        </Typography>
                        <List dense>
                            <ListItem sx={{ pl: 0 }}>
                                <ListItemText
                                    primary="• 전자상거래법에 따라 거래기록은 5년간 보관됩니다."
                                    primaryTypographyProps={{ variant: "body2" }}
                                />
                            </ListItem>
                            <ListItem sx={{ pl: 0 }}>
                                <ListItemText
                                    primary="• 개인정보보호법에 따라 일부 정보는 법정 기간 동안 보관될 수 있습니다."
                                    primaryTypographyProps={{ variant: "body2" }}
                                />
                            </ListItem>
                        </List>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* 동의 체크박스 */}
            <FormControlLabel
                control={<Radio checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} color="primary" />}
                label={<Typography variant="body2">위 주의사항을 모두 확인하였으며, 회원 탈퇴에 동의합니다.</Typography>}
                sx={{ mb: 4 }}
            />

            {/* 버튼 영역 */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button variant="outlined" size="large" sx={{ minWidth: 120 }} onClick={() => window.history.back()}>
                    취소
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    sx={{ minWidth: 120 }}
                    onClick={handleWithdrawal}
                    disabled={!isAgreed}
                >
                    회원 탈퇴
                </Button>
            </Box>
        </Box>
    )
}

export default AccountWithdrawalView
