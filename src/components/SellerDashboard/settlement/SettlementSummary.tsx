// src/components/SellerDashboard/settlement/components/SettlementSummary.tsx
import { Box, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';

interface SettlementSummaryData {
    totalAmount: number;
    completedAmount: number;
    pendingAmount: number;
    totalCount: number;
    completedCount: number;
    pendingCount: number;
    completionRate: number;
}

interface SettlementSummaryProps {
    data: SettlementSummaryData;
    dateRangeLabel?: string;
}

const SettlementSummary = ({ data, dateRangeLabel }: SettlementSummaryProps) => {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 3 }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <span className="material-icons" style={{ fontSize: '20px', color: theme.palette.primary.main }}>
                    analytics
                </span>
                정산 분석 요약
                {dateRangeLabel && (
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 400,
                            ml: 1
                        }}
                    >
                        ({dateRangeLabel})
                    </Typography>
                )}
            </Typography>

            <Grid container spacing={2}>
                {/* 총 정산 건수 */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.grey[200]}`,
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }
                    }}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontSize: '0.875rem',
                                            mb: 0.5
                                        }}
                                    >
                                        총 정산 건수
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        {data.totalCount.toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        건
                                    </Typography>
                                </Box>
                                <span
                                    className="material-icons"
                                    style={{
                                        fontSize: '32px',
                                        color: theme.palette.grey[400],
                                        opacity: 0.7
                                    }}
                                >
                                    list_alt
                                </span>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* 정산완료 */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{
                        borderRadius: 3,
                        border: `1px solid rgba(72, 187, 120, 0.2)`,
                        background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.05) 0%, rgba(72, 187, 120, 0.1) 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(72, 187, 120, 0.2)'
                        }
                    }}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#48bb78',
                                            fontSize: '0.875rem',
                                            mb: 0.5,
                                            fontWeight: 500
                                        }}
                                    >
                                        정산완료
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#48bb78'
                                        }}
                                    >
                                        ₩{data.completedAmount.toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: '#48bb78',
                                            fontSize: '0.75rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        {data.completedCount}건 ({data.completionRate.toFixed(1)}%)
                                    </Typography>
                                </Box>
                                <span
                                    className="material-icons"
                                    style={{
                                        fontSize: '32px',
                                        color: '#48bb78',
                                        opacity: 0.7
                                    }}
                                >
                                    check_circle
                                </span>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* 대기중/처리중 */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{
                        borderRadius: 3,
                        border: `1px solid rgba(237, 137, 54, 0.2)`,
                        background: 'linear-gradient(135deg, rgba(237, 137, 54, 0.05) 0%, rgba(237, 137, 54, 0.1) 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(237, 137, 54, 0.2)'
                        }
                    }}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#ed8936',
                                            fontSize: '0.875rem',
                                            mb: 0.5,
                                            fontWeight: 500
                                        }}
                                    >
                                        대기중/처리중
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#ed8936'
                                        }}
                                    >
                                        ₩{data.pendingAmount.toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: '#ed8936',
                                            fontSize: '0.75rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        {data.pendingCount}건 ({(100 - data.completionRate).toFixed(1)}%)
                                    </Typography>
                                </Box>
                                <span
                                    className="material-icons"
                                    style={{
                                        fontSize: '32px',
                                        color: '#ed8936',
                                        opacity: 0.7
                                    }}
                                >
                                    schedule
                                </span>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* 평균 정산 금액 */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{
                        borderRadius: 3,
                        border: `1px solid rgba(232, 152, 48, 0.2)`,
                        background: 'linear-gradient(135deg, rgba(232, 152, 48, 0.05) 0%, rgba(232, 152, 48, 0.1) 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(232, 152, 48, 0.2)'
                        }
                    }}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '0.875rem',
                                            mb: 0.5,
                                            fontWeight: 500
                                        }}
                                    >
                                        평균 정산 금액
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.primary.main
                                        }}
                                    >
                                        ₩{data.totalCount > 0
                                        ? Math.round(data.totalAmount / data.totalCount).toLocaleString()
                                        : '0'
                                    }
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '0.75rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        건당 평균
                                    </Typography>
                                </Box>
                                <span
                                    className="material-icons"
                                    style={{
                                        fontSize: '32px',
                                        color: theme.palette.primary.main,
                                        opacity: 0.7
                                    }}
                                >
                                    trending_up
                                </span>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SettlementSummary;