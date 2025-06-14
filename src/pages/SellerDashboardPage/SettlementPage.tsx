// src/pages/SellerDashboardPage/SettlementPage.tsx
import { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    useTheme
} from '@mui/material';

// 컴포넌트 임포트
import SettlementTable from '@/components/SellerDashboard/settlement/SettlementTable';
import SalesChart from '@/components/SellerDashboard/settlement/SalesChart';
import SalesRanking from '@/components/SellerDashboard/settlement/SalesRanking';
import ProductSalesDetail from '@/components/SellerDashboard/settlement/ProductSalesDetail';
import SalesInsight from '@/components/SellerDashboard/settlement/SalesInsight';

// 타입 임포트
import {
    SettlementFilters,
    SettlementItem,
    YearlyMonthData,
    ProductSalesData,
    SalesRecommendation
} from '@/components/SellerDashboard/settlement/types/settlement.types';

// 🚀 더미 데이터 생성 함수들
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

    const statuses: ('대기중' | '처리중' | '정산완료')[] = ['대기중', '처리중', '정산완료'];
    const data: SettlementItem[] = [];

    for (let i = 0; i < 60; i++) {
        const baseItem = baseData[i % baseData.length];
        const orderAmount = Math.floor(Math.random() * 40000) + 10000;
        const commission = Math.floor(orderAmount * 0.1);
        const settlementAmount = orderAmount - commission;

        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 90));

        data.push({
            id: `#${12345 + i}`,
            productName: `${baseItem.name} ${Math.floor(i / baseData.length) + 1}`,
            orderAmount,
            commission,
            settlementAmount,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            orderDate: date.toISOString().split('T')[0]
        });
    }

    return data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
};

const generateYearlyData = (): YearlyMonthData[] => {
    const years = [2022, 2023, 2024, 2025];
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

    return years.map(year => ({
        year,
        monthlyData: months.map(month => ({
            month,
            amount: Math.floor(Math.random() * 300) + 50
        }))
    }));
};

const generateProductSalesData = (): ProductSalesData[] => {
    const products = [
        '닭가슴살 간식',
        '고단백 면역 간식',
        '강아지 소고기 젤리',
        '고양이 참치 간식',
        '프리미엄 덴탈 츄',
        '연어 큐브',
        '야채 믹스 간식',
        '소고기 육포 스틱'
    ];

    const colors = [
        '#e8984b', '#48bb78', '#3182ce', '#ed8936',
        '#9f7aea', '#38b2ac', '#f56565', '#805ad5'
    ];

    const salesData = products.map((product, index) => ({
        productName: product,
        amount: Math.floor(Math.random() * 50000) + 10000,
        percentage: 0,
        color: colors[index % colors.length],
        salesCount: Math.floor(Math.random() * 50) + 5,
        totalSales: 0
    }));

    const totalAmount = salesData.reduce((sum, item) => sum + item.amount, 0);
    return salesData.map(item => ({
        ...item,
        percentage: (item.amount / totalAmount) * 100,
        totalSales: totalAmount
    })).sort((a, b) => b.amount - a.amount);
};

// 데이터 생성
const settlementData = generateSettlementData();
const yearlyData = generateYearlyData();
const productData = generateProductSalesData();

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

const SettlementPage = () => {
    const theme = useTheme();

    // 정산 현황 필터 상태
    const [settlementFilters, setSettlementFilters] = useState<SettlementFilters>({
        paymentFilter: '전체',
        settlementFilter: '전체',
        periodFilter: '결제일 기준',
        startDate: '',
        endDate: ''
    });

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // 정산 현황 필터 변경 핸들러
    const handleSettlementFiltersChange = (newFilters: Partial<SettlementFilters>) => {
        setSettlementFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
        console.log('선택된 년도:', year);
    };

    const handleDownloadReport = () => {
        console.log('보고서 다운로드 요청');
        console.log('정산 현황 필터:', settlementFilters);
        console.log('선택된 년도:', selectedYear);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            {/* 정산 현황 섹션 */}
            <Box sx={{ mb: 6 }}>
                <SettlementTable
                    data={settlementData}
                    filters={settlementFilters}
                    onFiltersChange={handleSettlementFiltersChange}
                />
            </Box>

            {/* 매출 내역 섹션 */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary
                    }}
                >
                    매출 내역
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <SalesChart
                            data={[]}
                            title="매출 분석"
                            yearlyData={yearlyData}
                            productData={productData}
                            selectedYear={selectedYear}
                            onYearChange={handleYearChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <SalesRanking
                            data={salesRecommendations}
                            title="상품 판매 순위"
                            onDownloadReport={handleDownloadReport}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* 상품 매출 상세 정보 섹션 */}
            <ProductSalesDetail productData={productData} />

            {/* 매출 성장 인사이트 섹션 */}
            <SalesInsight
                productData={productData}
                selectedYear={selectedYear}
            />
        </Container>
    );
};

export default SettlementPage;