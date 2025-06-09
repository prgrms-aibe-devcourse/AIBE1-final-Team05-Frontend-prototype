import { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    Container,
    Grid,
    useTheme
} from '@mui/material';
import SettlementTable from './SettlementTable';
import SalesChart from './SalesChart';
import SalesRanking from './SalesRanking';
import { SettlementFilters, SettlementItem, SalesData, SalesRecommendation } from '../types';

// 더미 데이터에 더 많은 날짜 샘플 추가
const settlementData: SettlementItem[] = [
    {
        id: '#12345',
        productName: '닭가슴살 간식',
        orderAmount: 25000,
        commission: 2500,
        settlementAmount: 22500,
        status: '대기중',
        orderDate: '2024-06-01'
    },
    {
        id: '#12346',
        productName: '고단백 면역 간식',
        orderAmount: 15000,
        commission: 1500,
        settlementAmount: 13500,
        status: '정산완료',
        orderDate: '2024-06-02'
    },
    {
        id: '#12347',
        productName: '강아지 소고기 젤리',
        orderAmount: 30000,
        commission: 3000,
        settlementAmount: 27000,
        status: '대기중',
        orderDate: '2024-06-03'
    },
    {
        id: '#12348',
        productName: '고단백 첨가 육류미르크',
        orderAmount: 12000,
        commission: 1200,
        settlementAmount: 10800,
        status: '정산완료',
        orderDate: '2024-06-04'
    },
    {
        id: '#12349',
        productName: '강아지 맘마기쁨',
        orderAmount: 20000,
        commission: 2000,
        settlementAmount: 18000,
        status: '대기중',
        orderDate: '2024-06-05'
    },
    // 추가 더미 데이터 (다양한 날짜)
    {
        id: '#12350',
        productName: '고양이 참치 간식',
        orderAmount: 18000,
        commission: 1800,
        settlementAmount: 16200,
        status: '정산완료',
        orderDate: '2024-05-28'
    },
    {
        id: '#12351',
        productName: '강아지 치킨 스낵',
        orderAmount: 22000,
        commission: 2200,
        settlementAmount: 19800,
        status: '대기중',
        orderDate: '2024-05-25'
    },
    {
        id: '#12352',
        productName: '연어 큐브',
        orderAmount: 35000,
        commission: 3500,
        settlementAmount: 31500,
        status: '정산완료',
        orderDate: '2024-05-20'
    },
    {
        id: '#12353',
        productName: '야채 믹스 간식',
        orderAmount: 16000,
        commission: 1600,
        settlementAmount: 14400,
        status: '대기중',
        orderDate: '2024-05-15'
    },
    {
        id: '#12354',
        productName: '프리미엄 덴탈 츄',
        orderAmount: 28000,
        commission: 2800,
        settlementAmount: 25200,
        status: '정산완료',
        orderDate: '2024-05-10'
    }
];

const salesChartData: SalesData[] = [
    { month: '1월', amount: 150 },
    { month: '2월', amount: 80 },
    { month: '3월', amount: 120 },
    { month: '4월', amount: 200 },
    { month: '5월', amount: 180 },
    { month: '6월', amount: 220 },
    { month: '7월', amount: 160 }
];

const salesRecommendations: SalesRecommendation[] = [
    {
        id: '#12345',
        productName: '닭가슴살 간식',
        description: '총 판매액 ₩25,000',
        amount: 25000
    },
    {
        id: '#12346',
        productName: '강아지 소고기 젤리',
        description: '총 판매액 ₩20,000',
        amount: 20000
    },
    {
        id: '#12347',
        productName: '고단백 면역 간식',
        description: '총 판매액 ₩15,000',
        amount: 15000
    }
];

const SettlementTab = () => {
    const theme = useTheme();
    const [filters, setFilters] = useState<SettlementFilters>({
        paymentFilter: '전체',
        deliveryFilter: '배송완료',
        confirmFilter: '구매확정',
        settlementFilter: '정산일',
        periodFilter: '구매 확정일 기준',
        startDate: '',
        endDate: ''
    });

    const handleFiltersChange = (newFilters: Partial<SettlementFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handlePeriodFilterChange = (event: SelectChangeEvent) => {
        setFilters(prev => ({ ...prev, periodFilter: event.target.value }));
    };

    const handleSettlementRequest = () => {
        console.log('정산 신청 요청');
        // TODO: 정산 신청 API 호출

        // 선택된 기간 정보 로그
        if (filters.startDate || filters.endDate) {
            console.log('선택된 기간:', {
                시작일: filters.startDate || '없음',
                종료일: filters.endDate || '없음'
            });
        }
    };

    const handleDownloadReport = () => {
        console.log('보고서 다운로드 요청');

        // 현재 필터 상태 로그
        console.log('현재 필터 상태:', filters);

        // TODO: 보고서 다운로드 기능 구현
        // 날짜 범위가 설정되어 있다면 해당 기간의 데이터만 포함하여 보고서 생성
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            {/* 정산 현황 섹션 */}
            <Box sx={{ mb: 6 }}>
                <SettlementTable
                    data={settlementData}
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onSettlementRequest={handleSettlementRequest}
                />
            </Box>

            {/* 매출 내역 섹션 */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary
                        }}
                    >
                        매출 내역
                        {(filters.startDate || filters.endDate) && (
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    ml: 2,
                                    fontSize: '0.875rem'
                                }}
                            >
                                ({filters.startDate || '시작일'} ~ {filters.endDate || '종료일'})
                            </Typography>
                        )}
                    </Typography>

                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <Select
                            value={filters.periodFilter}
                            onChange={handlePeriodFilterChange}
                            displayEmpty
                        >
                            <MenuItem value="구매 확정일 기준">구매 확정일 기준</MenuItem>
                            <MenuItem value="결제일 기준">결제일 기준</MenuItem>
                            <MenuItem value="배송완료일 기준">배송완료일 기준</MenuItem>
                            <MenuItem value="정산일 기준">정산일 기준</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* 필터 상태 표시 */}
                {(filters.startDate || filters.endDate) && (
                    <Box sx={{
                        mb: 3,
                        p: 2,
                        backgroundColor: 'rgba(232, 152, 48, 0.05)',
                        borderRadius: 2,
                        border: `1px solid rgba(232, 152, 48, 0.2)`
                    }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.primary,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontWeight: 500
                            }}
                        >
                            <span className="material-icons" style={{ fontSize: '16px', color: theme.palette.primary.main }}>
                                info
                            </span>
                            매출 차트와 순위는 선택된 기간({filters.startDate || '시작일'} ~ {filters.endDate || '종료일'})을 기준으로 표시됩니다.
                        </Typography>
                    </Box>
                )}

                <Grid container spacing={4}>
                    {/* 월간 매출 차트 */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <SalesChart
                            data={salesChartData}
                            title="기간별 매출액"
                        />
                    </Grid>

                    {/* 상품별 판매 순위 */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <SalesRanking
                            data={salesRecommendations}
                            title="상품 판매 순위"
                            onDownloadReport={handleDownloadReport}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* 분석 요약 섹션 */}
            <Box sx={{
                mt: 4,
                p: 3,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                border: `1px solid ${theme.palette.grey[200]}`
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontWeight: 600,
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
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 700,
                                    mb: 0.5
                                }}
                            >
                                {settlementData.length}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary
                                }}
                            >
                                총 주문 건수
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#48bb78',
                                    fontWeight: 700,
                                    mb: 0.5
                                }}
                            >
                                {settlementData.filter(item => item.status === '정산완료').length}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary
                                }}
                            >
                                정산 완료
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#ed8936',
                                    fontWeight: 700,
                                    mb: 0.5
                                }}
                            >
                                {settlementData.filter(item => item.status === '대기중').length}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary
                                }}
                            >
                                정산 대기
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 700,
                                    mb: 0.5
                                }}
                            >
                                ₩{settlementData.reduce((sum, item) => sum + item.settlementAmount, 0).toLocaleString()}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary
                                }}
                            >
                                총 정산 예정 금액
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SettlementTab;