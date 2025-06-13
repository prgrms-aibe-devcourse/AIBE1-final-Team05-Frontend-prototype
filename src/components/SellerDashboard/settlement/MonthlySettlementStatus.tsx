// src/components/SellerDashboard/settlement/components/MonthlySettlementStatus.tsx
import { Box, Typography, Button, useTheme } from '@mui/material';
import { SettlementItem } from '@/components/SellerDashboard/settlement';

interface MonthlySettlementStatusProps {
    data: SettlementItem[];
    onDownloadReport: () => void;
}

const MonthlySettlementStatus = ({ data, onDownloadReport }: MonthlySettlementStatusProps) => {
    const theme = useTheme();

    // 이번달 데이터 필터링
    const getThisMonthData = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return data.filter(item => {
            const itemDate = new Date(item.orderDate);
            return itemDate.getMonth() === currentMonth &&
                itemDate.getFullYear() === currentYear;
        });
    };

    const getThisMonthCompletedData = () => {
        return getThisMonthData().filter(item => item.status === '정산완료');
    };

    const getThisMonthPendingData = () => {
        return getThisMonthData().filter(item =>
            item.status === '대기중' || item.status === '처리중'
        );
    };

    const thisMonthTotal = getThisMonthData().reduce((sum, item) => sum + item.settlementAmount, 0);
    const thisMonthCompleted = getThisMonthCompletedData().reduce((sum, item) => sum + item.settlementAmount, 0);
    const thisMonthPending = getThisMonthPendingData().reduce((sum, item) => sum + item.settlementAmount, 0);

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{
                backgroundColor: 'rgba(232, 152, 48, 0.08)',
                p: 3,
                borderRadius: 2,
                border: `1px solid rgba(232, 152, 48, 0.2)`,
                mb: 2
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <span className="material-icons" style={{ fontSize: '20px', color: theme.palette.primary.main }}>
                        calendar_month
                    </span>
                    이번달 정산 현황 ({new Date().getMonth() + 1}월)
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {/* 이번달 총 정산금액 */}
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.875rem'
                                }}
                            >
                                이번달 총 정산금액
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.primary.main
                                }}
                            >
                                ₩{thisMonthTotal.toLocaleString()}
                            </Typography>
                        </Box>

                        {/* 이번달 정산완료 금액 */}
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.875rem'
                                }}
                            >
                                정산완료 금액
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: '#48bb78'
                                }}
                            >
                                ₩{thisMonthCompleted.toLocaleString()}
                            </Typography>
                        </Box>

                        {/* 이번달 대기중/처리중 금액 */}
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.875rem'
                                }}
                            >
                                대기중/처리중 금액
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: '#ed8936'
                                }}
                            >
                                ₩{thisMonthPending.toLocaleString()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* 이번달 정산내역 영수증 다운로드 버튼 */}
                    <Button
                        variant="contained"
                        size="large"
                        onClick={onDownloadReport}
                        sx={{
                            borderRadius: 6,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            backgroundColor: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                                transform: 'translateY(-2px)'
                            }
                        }}
                        startIcon={
                            <span className="material-icons" style={{ fontSize: '18px' }}>
                                receipt
                            </span>
                        }
                    >
                        이번달 정산내역 영수증
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MonthlySettlementStatus;