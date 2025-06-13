// src/pages/SellerDashboardPage/SellerDashboardPage.tsx

import React from "react";
import { Box, Typography } from "@mui/material";
import {
    StatCards,
    SalesChart,
    ProductChart,
    AIForecastPanel,
    ReorderPanel,
    demandForecastData,
} from "@/components/SellerDashboard/Dashboard/SellerDashboardComponents";

const SellerDashboardDashboardPage: React.FC = () => {
    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {/* 페이지 제목 */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        color: "#2d2a27",
                        fontFamily: "'Noto Sans KR', sans-serif",
                        mb: 1,
                    }}
                >
                    대시보드
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#5c5752", fontSize: "1rem" }}
                >
                    판매 현황을 실시간으로 확인하고 AI 기반 분석을 받아보세요.
                </Typography>
            </Box>

            {/* 1행: 통계 카드 영역 */}
            <Box sx={{ mb: 3 }}>
                <StatCards />
            </Box>

            {/* 2행과 3행 컨테이너 */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                {/* 2행: 차트 영역 */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' },
                        minHeight: 350
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <SalesChart />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <ProductChart />
                    </Box>
                </Box>

                {/* 3행: AI 수요 예측 영역 */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' },
                        minHeight: 350
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <AIForecastPanel data={demandForecastData} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <ReorderPanel data={demandForecastData} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SellerDashboardDashboardPage;