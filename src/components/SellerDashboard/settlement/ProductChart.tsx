// src/components/SellerDashboard/settlement/components/ProductChart.tsx
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    useTheme
} from '@mui/material';
import { ReactNode } from 'react';

interface ProductSalesData {
    salesCount: ReactNode;
    productName: string;
    amount: number;
    percentage: number;
    color: string;
}

interface ProductChartProps {
    data: ProductSalesData[];
    startDate: string;
    endDate: string;
    onDatePickerOpen: (event: React.MouseEvent<HTMLElement>) => void;
    onDateRangeChange: (startDate: string, endDate: string) => void;
}

const ProductChart = ({
                          data,
                          startDate,
                          endDate,
                          onDatePickerOpen,
                          onDateRangeChange
                      }: ProductChartProps) => {
    const theme = useTheme();
    const maxProductAmount = Math.max(...data.map(item => item.amount));

    const getDateRangeLabel = (): string => {
        if (!startDate && !endDate) return '기간 선택';
        if (startDate && endDate) {
            const formatShortDate = (dateStr: string) => {
                const date = new Date(dateStr);
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
            };
            return `${formatShortDate(startDate)} ~ ${formatShortDate(endDate)}`;
        }
        if (startDate) {
            const formatShortDate = (dateStr: string) => {
                const date = new Date(dateStr);
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
            };
            return `${formatShortDate(startDate)} ~`;
        }
        return '기간 선택';
    };

    return (
        <Box sx={{ height: '100%', overflow: 'hidden' }}>
            {/* 상품별 매출 전용 기간 선택 */}
            <Box sx={{
                p: 2,
                pb: 1,
                borderBottom: `1px solid ${theme.palette.grey[200]}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2
            }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <span className="material-icons" style={{ fontSize: '16px', color: theme.palette.primary.main }}>
                        inventory
                    </span>
                    상품별 매출 분석
                </Typography>

                <TextField
                    size="small"
                    value={getDateRangeLabel()}
                    onClick={onDatePickerOpen}
                    placeholder="기간 선택"
                    sx={{
                        minWidth: 200,
                        maxWidth: 250,
                        cursor: 'pointer',
                        '& .MuiInputBase-input': {
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }
                    }}
                    InputProps={{
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <span
                                    className="material-icons"
                                    style={{
                                        fontSize: '16px',
                                        color: theme.palette.text.secondary
                                    }}
                                >
                                    date_range
                                </span>
                            </InputAdornment>
                        ),
                        endAdornment: startDate || endDate ? (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDateRangeChange('', '');
                                    }}
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    <span className="material-icons" style={{ fontSize: '14px' }}>
                                        close
                                    </span>
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    }}
                />
            </Box>

            {/* 기간 선택 시 정보 표시 */}
            {(startDate || endDate) && (
                <Box sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: 'rgba(232, 152, 48, 0.05)',
                    borderBottom: `1px solid rgba(232, 152, 48, 0.1)`
                }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: theme.palette.text.primary,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontSize: '0.75rem'
                        }}
                    >
                        <span className="material-icons" style={{ fontSize: '12px', color: theme.palette.primary.main }}>
                            info
                        </span>
                        선택 기간: {startDate || '시작일'} ~ {endDate || '종료일'}
                    </Typography>
                </Box>
            )}

            {/* 상품 차트 내용 */}
            <Box sx={{ p: 2, height: 'calc(100% - 60px)', overflow: 'hidden' }}>
                {data.length > 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                        height: '100%',
                        overflowY: 'auto',
                        pr: 1
                    }}>
                        {data.map((item, index) => (
                            <Box key={index} sx={{
                                position: 'relative',
                                minHeight: 60,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                {/* 상품명과 매출액 */}
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    mb: 1,
                                    gap: 2
                                }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            color: theme.palette.text.primary,
                                            flex: 1,
                                            lineHeight: 1.3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            fontSize: '0.875rem'
                                        }}
                                        title={item.productName}
                                    >
                                        {item.productName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            color: theme.palette.primary.main,
                                            minWidth: 'fit-content',
                                            textAlign: 'right',
                                            fontSize: '0.875rem',
                                            flexShrink: 0
                                        }}
                                    >
                                        ₩{item.amount > 10000
                                        ? `${Math.floor(item.amount / 1000)}K`
                                        : item.amount.toLocaleString()}
                                    </Typography>
                                </Box>

                                {/* 프로그레스 바 */}
                                <Box sx={{
                                    width: '100%',
                                    height: 8,
                                    backgroundColor: theme.palette.grey[200],
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    mb: 0.5
                                }}>
                                    <Box
                                        sx={{
                                            width: `${(item.amount / maxProductAmount) * 100}%`,
                                            height: '100%',
                                            backgroundColor: item.color || theme.palette.primary.main,
                                            borderRadius: 4,
                                            transition: 'width 0.3s ease'
                                        }}
                                    />
                                </Box>

                                {/* 퍼센티지와 추가 정보 */}
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        전체의 {item.percentage.toFixed(1)}%
                                    </Typography>

                                    {/* 판매 횟수 표시 */}
                                    {item.salesCount && (
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontSize: '0.75rem',
                                                backgroundColor: theme.palette.grey[100],
                                                px: 1,
                                                py: 0.25,
                                                borderRadius: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5
                                            }}
                                        >
                                            <span className="material-icons" style={{ fontSize: '12px' }}>
                                                shopping_cart
                                            </span>
                                            {item.salesCount}회
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box sx={{
                        textAlign: 'center',
                        py: 4,
                        color: theme.palette.text.secondary,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <span
                            className="material-icons"
                            style={{
                                fontSize: '48px',
                                color: theme.palette.grey[200],
                                marginBottom: '16px',
                                display: 'block'
                            }}
                        >
                            bar_chart
                        </span>
                        <Typography variant="body2">
                            {(startDate || endDate)
                                ? '선택한 기간에 상품별 매출 데이터가 없습니다.'
                                : '상품별 매출 데이터가 없습니다.'
                            }
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProductChart;