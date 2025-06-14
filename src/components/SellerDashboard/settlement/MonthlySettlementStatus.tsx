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

    const thisMonthData = getThisMonthData();

    // 정산 확정 금액 계산 (정산완료 + 처리중)
    const getConfirmedAmount = () => {
        return thisMonthData
            .filter(item => item.status === '정산완료' || item.status === '처리중')
            .reduce((sum, item) => sum + item.settlementAmount, 0);
    };

    // 정산 예정 금액 계산 (대기중)
    const getScheduledAmount = () => {
        return thisMonthData
            .filter(item => item.status === '대기중')
            .reduce((sum, item) => sum + item.settlementAmount, 0);
    };

    // 각 상태별 건수 계산
    const getStatusCounts = () => {
        return {
            confirmed: thisMonthData.filter(item => item.status === '정산완료' || item.status === '처리중').length,
            scheduled: thisMonthData.filter(item => item.status === '대기중').length,
            completed: thisMonthData.filter(item => item.status === '정산완료').length,
            processing: thisMonthData.filter(item => item.status === '처리중').length
        };
    };

    const confirmedAmount = getConfirmedAmount();
    const scheduledAmount = getScheduledAmount();
    const statusCounts = getStatusCounts();
    const totalAmount = confirmedAmount + scheduledAmount;

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
                                ₩{totalAmount.toLocaleString()}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.75rem'
                                }}
                            >
                                총 {thisMonthData.length}건
                            </Typography>
                        </Box>

                        {/* 정산 확정 금액 */}
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.875rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}
                            >
                                <span className="material-icons" style={{ fontSize: '14px', color: '#48bb78' }}>
                                    verified
                                </span>
                                정산 확정 금액
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: '#48bb78'
                                }}
                            >
                                ₩{confirmedAmount.toLocaleString()}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#48bb78',
                                    fontSize: '0.75rem',
                                    fontWeight: 500
                                }}
                            >
                                {statusCounts.confirmed}건 (완료 {statusCounts.completed}건 + 처리중 {statusCounts.processing}건)
                            </Typography>
                        </Box>

                        {/* 정산 예정 금액 */}
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.875rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}
                            >
                                <span className="material-icons" style={{ fontSize: '14px', color: '#ed8936' }}>
                                    schedule
                                </span>
                                정산 예정 금액
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: '#ed8936'
                                }}
                            >
                                ₩{scheduledAmount.toLocaleString()}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#ed8936',
                                    fontSize: '0.75rem',
                                    fontWeight: 500
                                }}
                            >
                                {statusCounts.scheduled}건 (대기중 - 반품/교환 기간 중)
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

                {/* 정산 확정률 표시 */}
                <Box sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: `1px solid rgba(232, 152, 48, 0.2)`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: '0.875rem'
                            }}
                        >
                            정산 확정률:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.primary.main
                            }}
                        >
                            {thisMonthData.length > 0
                                ? ((statusCounts.confirmed / thisMonthData.length) * 100).toFixed(1)
                                : '0'
                            }%
                        </Typography>
                    </Box>

                    {/* 프로그레스 바 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
                        <Box sx={{
                            flex: 1,
                            height: 8,
                            backgroundColor: theme.palette.grey[200],
                            borderRadius: 4,
                            overflow: 'hidden'
                        }}>
                            <Box
                                sx={{
                                    width: `${thisMonthData.length > 0
                                        ? (statusCounts.confirmed / thisMonthData.length) * 100
                                        : 0}%`,
                                    height: '100%',
                                    backgroundColor: '#48bb78',
                                    borderRadius: 4,
                                    transition: 'width 0.3s ease'
                                }}
                            />
                        </Box>
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: '0.75rem',
                                minWidth: 'fit-content'
                            }}
                        >
                            {statusCounts.confirmed}/{thisMonthData.length}건
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* 정산 프로세스 안내 */}
            <Box sx={{
                p: 2,
                backgroundColor: theme.palette.grey[50],
                borderRadius: 2,
                border: `1px solid ${theme.palette.grey[200]}`
            }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <span className="material-icons" style={{ fontSize: '16px', color: theme.palette.primary.main }}>
                        info
                    </span>
                    정산 프로세스 안내
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.875rem',
                        lineHeight: 1.5
                    }}
                >
                    • <strong>대기중:</strong> 주문 후 7일 이내 - 반품/교환 기간 중<br/>
                    • <strong>처리중:</strong> 주문 후 7일 경과 - 정산 확정됨<br/>
                    • <strong>정산완료:</strong> 매월 1일 자동 정산 처리됨
                </Typography>
            </Box>
        </Box>
    );
};

export default MonthlySettlementStatus;