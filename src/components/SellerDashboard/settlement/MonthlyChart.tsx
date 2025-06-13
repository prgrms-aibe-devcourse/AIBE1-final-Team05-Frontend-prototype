// src/components/SellerDashboard/settlement/components/MonthlyChart.tsx
import { Box, Typography, Tooltip, useTheme } from '@mui/material';

interface MonthlyChartData {
    month: string;
    amount: number;
}

interface MonthlyChartProps {
    data: MonthlyChartData[];
}

const MonthlyChart = ({ data }: MonthlyChartProps) => {
    const theme = useTheme();
    const maxAmount = Math.max(...data.map(item => item.amount));

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'space-between',
            gap: 0.5,
            height: 200,
            px: 2,
            py: 1,
            width: '100%',
            overflowX: 'hidden'
        }}>
            {data.map((item, index) => {
                const height = maxAmount > 0 ? (item.amount / maxAmount) * 160 : 0;
                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                            gap: 0.5,
                            minWidth: 0
                        }}
                    >
                        <Tooltip title={`${item.month}: ₩${item.amount.toLocaleString()}`}>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.6rem',
                                    color: theme.palette.primary.main,
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    lineHeight: 1,
                                    minHeight: '12px'
                                }}
                            >
                                {item.amount > 0 ? (
                                    item.amount > 1000
                                        ? `₩${Math.floor(item.amount/1000)}K`
                                        : `₩${item.amount}`
                                ) : ''}
                            </Typography>
                        </Tooltip>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 28,
                                height: `${Math.max(height, 5)}px`,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: '3px 3px 0 0',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                mx: 'auto',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                    transform: 'scaleY(1.05)'
                                }
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.65rem',
                                color: theme.palette.text.secondary,
                                textAlign: 'center',
                                lineHeight: 1,
                                fontWeight: 500
                            }}
                        >
                            {item.month}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default MonthlyChart;