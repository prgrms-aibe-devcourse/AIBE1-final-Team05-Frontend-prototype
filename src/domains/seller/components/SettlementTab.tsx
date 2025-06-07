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

// 더미 데이터
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
        periodFilter: '구매 확정일 기준'
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
    };

    const handleDownloadReport = () => {
        console.log('보고서 다운로드 요청');
        // TODO: 보고서 다운로드 기능 구현
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
                    mb: 3
                }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary
                        }}
                    >
                        매출 내역
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
        </Container>
    );
};

export default SettlementTab;