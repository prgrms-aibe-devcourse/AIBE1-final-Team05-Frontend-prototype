import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Avatar,
    useTheme
} from '@mui/material';
import { SalesRankingProps } from '../types';

const SalesRanking = ({
                          data,
                          title = "상품 판매 순위",
                          onDownloadReport
                      }: SalesRankingProps) => {
    const theme = useTheme();

    const getRankIcon = (index: number) => {
        const rank = index + 1;
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank.toString();
    };

    const getRankColor = (index: number) => {
        const rank = index + 1;
        if (rank === 1) return '#FFD700';
        if (rank === 2) return '#C0C0C0';
        if (rank === 3) return '#CD7F32';
        return theme.palette.primary.main;
    };

    return (
        <Card sx={{
            height: '100%',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: `1px solid ${theme.palette.grey[200]}`,
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transform: 'translateY(-4px)'
            }
        }}>
            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary
                    }}
                >
                    {title}
                </Typography>

                {/* 상품 순위 리스트 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    backgroundColor: index < 3
                                        ? 'rgba(232, 152, 48, 0.05)'
                                        : theme.palette.background.default,
                                    borderRadius: 2,
                                    border: index < 3
                                        ? `1px solid rgba(232, 152, 48, 0.2)`
                                        : `1px solid ${theme.palette.grey[200]}`,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                {/* 순위 아바타 */}
                                <Avatar
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: getRankColor(index),
                                        fontWeight: 700,
                                        fontSize: index < 3 ? '1.2rem' : '1rem',
                                        color: index < 3 ? '#000' : '#fff'
                                    }}
                                >
                                    {getRankIcon(index)}
                                </Avatar>

                                {/* 상품 정보 */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 0.5,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        {item.productName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </Box>

                                {/* 매출액 표시 */}
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.primary.main,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        ₩{item.amount.toLocaleString()}
                                    </Typography>
                                    {index < 3 && (
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: '#48bb78',
                                                fontWeight: 600,
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            TOP {index + 1}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{
                            textAlign: 'center',
                            py: 4,
                            color: theme.palette.text.secondary
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
                                inventory_2
                            </span>
                            <Typography variant="body2">
                                판매 데이터가 없습니다.
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* 리포트 다운로드 버튼 */}
                {data.length > 0 && (
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={onDownloadReport}
                            sx={{
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                py: 1.5,
                                textTransform: 'none',
                                borderRadius: 3,
                                '&:hover': {
                                    borderColor: theme.palette.primary.dark,
                                    backgroundColor: 'rgba(232, 152, 48, 0.04)',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                            startIcon={
                                <span className="material-icons" style={{ fontSize: '18px' }}>
                                    download
                                </span>
                            }
                        >
                            판매 성장 보고서 다운로드
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default SalesRanking;