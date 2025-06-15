"use client"

import {Box, Typography, Paper, Alert} from "@mui/material"


const CancelRefundNotice = () => {
    return (
        <Paper style={{padding: 24}}>
            <Alert severity="error" style={{marginBottom: 24}}>
                <Typography variant="body2" style={{fontWeight: 600}}>
                    취소/환불 신청전 확인해주세요!
                </Typography>
            </Alert>

            <Box style={{marginBottom: 24}}>
                <Typography variant="subtitle2" style={{fontWeight: 600, marginBottom: 8}}>
                    취소
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{marginBottom: 8}}>
                    • 취소수수료를 확인하여 2일 이내(주말,공휴일 제외) 처리결과를 안내해드립니다.(공휴 경우 기준 마감시간 오후
                    4시)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    • 취소 상품은 구매일 당일 취소 신청 시 취소수수료가 발생되지 않습니다.
                </Typography>
            </Box>

            <Box style={{marginBottom: 24}}>
                <Typography variant="subtitle2" style={{fontWeight: 600, marginBottom: 8}}>
                    환불
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{marginBottom: 8}}>
                    • 상품 수령 후 7일 이내 신청하여 주세요.
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{marginBottom: 8}}>
                    • 상품의 불량된 이유에는 택배 완료 후, 환불 상품을 폐기합니다.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    • 절차상품/주문제작 상품 등은 고객변심에서는 환불 신청이 불가능합니다.
                </Typography>
            </Box>
        </Paper>
    )
}
export default CancelRefundNotice