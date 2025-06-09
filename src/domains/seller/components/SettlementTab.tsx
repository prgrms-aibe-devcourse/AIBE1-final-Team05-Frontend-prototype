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

// 🚀 더 많은 더미 데이터 생성 (페이징 테스트용)
const generateSettlementData = (): SettlementItem[] => {
    const baseData = [
        { name: '닭가슴살 간식', category: 'dog' },
        { name: '고단백 면역 간식', category: 'dog' },
        { name: '강아지 소고기 젤리', category: 'dog' },
        { name: '고단백 첨가 육류미르크', category: 'dog' },
        { name: '강아지 맘마기쁨', category: 'dog' },
        { name: '고양이 참치 간식', category: 'cat' },
        { name: '강아지 치킨 스낵', category: 'dog' },
        { name: '연어 큐브', category: 'cat' },
        { name: '야채 믹스 간식', category: 'both' },
        { name: '프리미엄 덴탈 츄', category: 'dog' },
        { name: '고양이 연어 파우치', category: 'cat' },
        { name: '유기농 쌀 과자', category: 'both' },
        { name: '소고기 육포 스틱', category: 'dog' },
        { name: '참치 캔 간식', category: 'cat' },
        { name: '치즈 큐브', category: 'both' },
        { name: '닭고기 져키', category: 'dog' },
        { name: '고양이 우유', category: 'cat' },
        { name: '감자 과자', category: 'both' },
        { name: '오리고기 간식', category: 'dog' },
        { name: '고등어 간식', category: 'cat' }
    ];

    const statuses = ['대기중', '정산완료'];
    const data: SettlementItem[] = [];

    // 60개의 더미 데이터 생성
    for (let i = 0; i < 60; i++) {
        const baseItem = baseData[i % baseData.length];
        const orderAmount = Math.floor(Math.random() * 40000) + 10000; // 10,000 ~ 50,000
        const commission = Math.floor(orderAmount * 0.1); // 10% 수수료
        const settlementAmount = orderAmount - commission;

        // 날짜를 최근 3개월로 분산
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // 0~90일 전

        data.push({
            id: `#${12345 + i}`,
            productName: `${baseItem.name} ${Math.floor(i / baseData.length) + 1}`,
            orderAmount,
            commission,
            settlementAmount,
            status: statuses[Math.floor(Math.random() * statuses.length)] as '대기중' | '정산완료',
            orderDate: date.toISOString().split('T')[0]
        });
    }

    return data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
};

// 더미 데이터 생성
const settlementData = generateSettlementData();

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
        console.log('현재 필터 상태:', filters);
        console.log('총 데이터 개수:', settlementData.length);

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
        console.log('현재 필터 상태:', filters);

        // 현재 데이터 통계
        const pendingCount = settlementData.filter(item => item.status === '대기중').length;
        const completedCount = settlementData.filter(item => item.status === '정산완료').length;
        const totalAmount = settlementData.reduce((sum, item) => sum + item.settlementAmount, 0);

        console.log('데이터 통계:', {
            전체: settlementData.length,
            정산대기: pendingCount,
            정산완료: completedCount,
            총정산금액: totalAmount.toLocaleString()
        });
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