// src/pages/SellerDashboardPage/SettlementPage.tsx
import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Container,
    useTheme
} from '@mui/material';

// 컴포넌트 임포트
import SettlementTable from '@/components/SellerDashboard/settlement/SettlementTable';
import SalesChart from '@/components/SellerDashboard/settlement/SalesChart';
import SalesInsight from '@/components/SellerDashboard/settlement/SalesInsight';

// 타입 임포트
import {
    SettlementFilters,
    SettlementItem,
    YearlyMonthData,
    ProductSalesData
} from '@/components/SellerDashboard/settlement/types/settlement.types';

// 🚀 정산 프로세스를 반영한 더미 데이터 생성 함수
const generateSettlementData = (): SettlementItem[] => {
    // 🎯 간단한 상품명 배열로 변경
    const products = [
        '닭가슴살 간식',
        '고단백 면역 간식',
        '강아지 소고기 젤리',
        '고양이 참치 간식',
        '강아지 치킨 스낵',
        '연어 큐브',
        '야채 믹스 간식',
        '프리미엄 덴탈 츄',
        '고양이 연어 파우치',
        '유기농 쌀 과자',
        '소고기 육포 스틱',
        '참치 캔 간식',
        '치즈 큐브',
        '닭고기 져키',
        '고양이 우유',
        '감자 과자',
        '오리고기 간식',
        '고등어 간식'
    ];

    const data: SettlementItem[] = [];
    const now = new Date();

    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const totalDays = Math.floor((now.getTime() - twoYearsAgo.getTime()) / (1000 * 60 * 60 * 24));

    // 🔧 데이터 개수 증가 & 랜덤 선택으로 변경
    for (let i = 0; i < 3000; i++) {
        // 🎲 랜덤하게 상품 선택
        const randomIndex = Math.floor(Math.random() * products.length);
        const selectedProduct = products[randomIndex];

        const orderAmount = Math.floor(Math.random() * 40000) + 10000;
        const commission = Math.floor(orderAmount * 0.1);
        const settlementAmount = orderAmount - commission;

        const randomDaysFromTwoYearsAgo = Math.floor(Math.random() * totalDays);
        const orderDate = new Date(twoYearsAgo);
        orderDate.setDate(orderDate.getDate() + randomDaysFromTwoYearsAgo);

        const status = determineSettlementStatus(orderDate, now);

        data.push({
            id: `#${12345 + i}`,
            productName: selectedProduct, // ✅ 숫자 없이 순수 상품명만
            orderAmount,
            commission,
            settlementAmount,
            status,
            orderDate: orderDate.toISOString().split('T')[0]
        });
    }

    return data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
};

// 정산 프로세스에 따른 상태 결정 함수
const determineSettlementStatus = (orderDate: Date, currentDate: Date): '대기중' | '처리중' | '정산완료' => {
    const daysDiff = Math.floor((currentDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
    const orderMonth = orderDate.getMonth();
    const orderYear = orderDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // 1. 지난달 주문은 무조건 정산완료 (매월 1일 스케줄러가 돌았다고 가정)
    if (orderYear < currentYear || (orderYear === currentYear && orderMonth < currentMonth)) {
        return '정산완료';
    }

    // 2. 이번달 주문의 경우
    if (orderYear === currentYear && orderMonth === currentMonth) {
        if (daysDiff >= 7) {
            // 주문 후 일주일이 지났으면 처리중 (반품/교환 기간 지남)
            return '처리중';
        } else {
            // 주문 후 일주일이 안 지났으면 대기중
            return '대기중';
        }
    }

    // 기본값 (미래 주문은 없다고 가정하지만 안전장치)
    return '대기중';
};

// 🎯 정산 데이터를 기반으로 년도별 월별 매출 데이터 생성 함수
const generateYearlyDataFromSettlement = (settlementData: SettlementItem[]): YearlyMonthData[] => {
    const yearlyMap = new Map<number, Map<number, number>>();

    // 정산 데이터를 기반으로 년도별/월별 매출 집계
    settlementData.forEach(item => {
        const date = new Date(item.orderDate);
        const year = date.getFullYear();
        const month = date.getMonth();

        if (!yearlyMap.has(year)) {
            yearlyMap.set(year, new Map());
        }

        const monthlyMap = yearlyMap.get(year)!;
        const currentAmount = monthlyMap.get(month) || 0;
        monthlyMap.set(month, currentAmount + item.settlementAmount);
    });

    // Map을 배열로 변환
    const result: YearlyMonthData[] = [];
    yearlyMap.forEach((monthlyMap, year) => {
        const monthlyData = [];
        for (let month = 0; month < 12; month++) {
            const monthName = `${month + 1}월`;
            const amount = Math.floor((monthlyMap.get(month) || 0) / 1000); // 천원 단위로 변환
            monthlyData.push({ month: monthName, amount });
        }
        result.push({ year, monthlyData });
    });

    return result.sort((a, b) => a.year - b.year);
};

// 🔧 수정: 상품별 매출 데이터 생성 함수 - 매출 총액 정확히 계산
const generateProductSalesDataFromSettlement = (
    settlementData: SettlementItem[],
    year: number,
    month: number,
    viewMode: 'monthly' | 'yearly'
): ProductSalesData[] => {
    const productMap = new Map<string, { totalAmount: number; salesCount: number }>();

    // viewMode에 따른 정확한 필터링
    const filteredData = settlementData.filter(item => {
        const date = new Date(item.orderDate);
        const itemYear = date.getFullYear();
        const itemMonth = date.getMonth() + 1;

        if (viewMode === 'monthly') {
            // 월별 모드: 특정 년도의 특정 월 데이터만
            return itemYear === year && itemMonth === month;
        } else {
            // 년도별 모드: 특정 년도의 전체 데이터
            return itemYear === year;
        }
    });

    // 🔧 수정: 각 상품별로 매출 총액과 판매 횟수 집계
    filteredData.forEach(item => {
        const current = productMap.get(item.productName) || { totalAmount: 0, salesCount: 0 };
        productMap.set(item.productName, {
            totalAmount: current.totalAmount + item.settlementAmount, // ✅ 매출 총액 누적
            salesCount: current.salesCount + 1 // ✅ 판매 횟수 증가
        });
    });

    // 색상 배열
    const colors = [
        '#e8984b', '#48bb78', '#3182ce', '#ed8936',
        '#9f7aea', '#38b2ac', '#f56565', '#805ad5',
        '#4fd1c7', '#f093fb', '#63b3ed', '#68d391'
    ];

    // Map을 배열로 변환
    const productArray = Array.from(productMap.entries()).map(([productName, data], index) => ({
        productName,
        amount: data.totalAmount, // ✅ 매출 총액 (여러 번 판매된 경우 합계)
        percentage: 0, // 나중에 계산
        color: colors[index % colors.length],
        salesCount: data.salesCount, // ✅ 판매 횟수
        totalSales: 0 // 나중에 계산
    }));

    // 매출액 기준으로 정렬
    productArray.sort((a, b) => b.amount - a.amount);

    // 총 매출액 계산 및 퍼센티지 설정
    const totalAmount = productArray.reduce((sum, item) => sum + item.amount, 0);

    return productArray.map(item => ({
        ...item,
        percentage: totalAmount > 0 ? (item.amount / totalAmount) * 100 : 0,
        totalSales: totalAmount
    }));
};

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

    // 🔧 수정: 매출 분석 필터 상태 - viewMode 상위에서 관리
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

    // 🚀 메모이제이션을 통한 데이터 생성 최적화
    const settlementData = useMemo(() => generateSettlementData(), []);

    const yearlyData = useMemo(() =>
            generateYearlyDataFromSettlement(settlementData),
        [settlementData]
    );

    // 🔧 수정: viewMode를 매개변수로 전달
    const currentProductData = useMemo(() => {
        const result = generateProductSalesDataFromSettlement(
            settlementData,
            selectedYear,
            selectedMonth,
            viewMode // 🔧 viewMode 전달
        );

        // 🔧 디버깅 로그
        console.log(`📊 상품 데이터 생성 완료:`, {
            viewMode,
            selectedYear,
            selectedMonth,
            상품수: result.length,
            총매출: result.reduce((sum, item) => sum + item.amount, 0)
        });

        return result;
    }, [settlementData, selectedYear, selectedMonth, viewMode]); // 🔧 viewMode 의존성 추가

    // 정산 현황 필터 변경 핸들러
    const handleSettlementFiltersChange = (newFilters: Partial<SettlementFilters>) => {
        setSettlementFilters(prev => ({ ...prev, ...newFilters }));
    };

    // 🔧 수정: 핸들러 함수들 개선
    const handleYearChange = (year: number) => {
        console.log('🔄 년도 변경:', year);
        setSelectedYear(year);
    };

    const handleMonthChange = (month: number) => {
        console.log('🔄 월 변경:', month);
        setSelectedMonth(month);
    };

    // 🔧 수정: viewMode 변경 핸들러 추가
    const handleViewModeChange = (mode: 'monthly' | 'yearly') => {
        console.log('🔄 보기 모드 변경:', mode);
        setViewMode(mode);
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

            {/* 매출 분석 섹션 - 전체 너비 사용 */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary
                    }}
                >
                    매출 분석
                </Typography>

                {/* 🔧 수정: SalesChart에 viewMode와 핸들러 전달 */}
                <SalesChart
                    data={[]}
                    title="매출 분석"
                    yearlyData={yearlyData}
                    productData={currentProductData}
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    viewMode={viewMode} // 🔧 viewMode 전달
                    onYearChange={handleYearChange}
                    onMonthChange={handleMonthChange}
                    onViewModeChange={handleViewModeChange} // 🔧 viewMode 변경 핸들러 전달
                />
            </Box>

            {/* 매출 성장 인사이트 섹션 */}
            <SalesInsight
                productData={currentProductData}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                viewMode={viewMode}
                allSettlementData={settlementData}
            />
        </Container>
    );
};

export default SettlementPage;