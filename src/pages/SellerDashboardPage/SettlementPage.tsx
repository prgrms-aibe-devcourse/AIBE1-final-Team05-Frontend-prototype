import { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    useTheme
} from '@mui/material';
import SettlementTable from '@/components/SellerDashboard/settlement/SettlementTable.tsx';
import SalesChart from '@/components/SellerDashboard/settlement/SalesChart.tsx';
import SalesRanking from '@/components/SellerDashboard/settlement/SalesRanking.tsx';
import {
    SettlementFilters,
    SettlementItem,
    YearlyMonthData,
    ProductSalesData,
    SalesRecommendation
} from '@/components/SellerDashboard/settlement/types/settlement.types.ts';

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

            {/* 매출 내역 섹션 - 기간 선택 제거 */}
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
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <span className="material-icons" style={{ fontSize: '20px', color: theme.palette.primary.main }}>
                        inventory_2
                    </span>
                    상품별 매출 상세
                </Typography>

                <Grid container spacing={3}>
                    {productData.slice(0, 4).map((product, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <Box sx={{
                                p: 2,
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.grey[200]}`,
                                textAlign: 'center',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }
                            }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: product.color,
                                        mb: 1,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    ₩{product.amount.toLocaleString()}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 500,
                                        mb: 0.5
                                    }}
                                >
                                    {product.productName}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    전체의 {product.percentage.toFixed(1)}% • {product.salesCount}회 판매
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
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
                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
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

                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
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
                                대기중
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#3182ce',
                                    fontWeight: 700,
                                    mb: 0.5
                                }}
                            >
                                {settlementData.filter(item => item.status === '처리중').length}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary
                                }}
                            >
                                처리중
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
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
                                정산완료
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
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

            {/* 매출 성장 인사이트 섹션 */}
            <Box sx={{
                mt: 4,
                p: 3,
                backgroundColor: 'rgba(232, 152, 48, 0.05)',
                borderRadius: 3,
                border: `1px solid rgba(232, 152, 48, 0.2)`
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
                        lightbulb
                    </span>
                    매출 인사이트
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{
                            p: 2,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.grey[200]}`
                        }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    color: theme.palette.text.primary,
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <span className="material-icons" style={{ fontSize: '16px', color: '#48bb78' }}>
                                    trending_up
                                </span>
                                베스트 상품
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary, mb: 1 }}
                            >
                                {productData[0]?.productName}이(가) 가장 높은 매출을 기록했습니다.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
                            >
                                월 평균 ₩{Math.floor((productData[0]?.amount || 0) / 4).toLocaleString()} 매출
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{
                            p: 2,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.grey[200]}`
                        }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    color: theme.palette.text.primary,
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <span className="material-icons" style={{ fontSize: '16px', color: '#3182ce' }}>
                                    insights
                                </span>
                                성장률 분석
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary, mb: 1 }}
                            >
                                {selectedYear}년 대비 매출이 꾸준히 증가하고 있습니다.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: '#48bb78', fontWeight: 500 }}
                            >
                                평균 월 성장률: +12.5%
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>


        </Container>
    );
};

export default SettlementPage;