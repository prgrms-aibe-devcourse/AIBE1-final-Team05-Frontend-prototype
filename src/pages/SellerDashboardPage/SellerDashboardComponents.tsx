// src/pages/SellerDashboardPage/DashboardComponents.tsx

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  Dashboard,
  Inventory2,
  LocalShipping,
  Paid,
  People,
  Article,
  Quiz,
  Chat,
  AutoAwesome,
  Psychology,
  CheckCircle,
  TrendingUp,
} from "@mui/icons-material";
import {
  demandForecastData,
  getStatusColor,
  menuItemsData,
  mobileOnlyItemsData,
} from "./SellerDashboardData";

// getTrendIcon 함수를 컴포넌트 파일 내부로 이동
const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "급증":
      return <TrendingUp sx={{ color: "#EB5757", fontSize: 16 }} />;
    case "증가":
      return <TrendingUp sx={{ color: "#F2994A", fontSize: 16 }} />;
    case "안정":
      return <CheckCircle sx={{ color: "#6FCF97", fontSize: 16 }} />;
    default:
      return <TrendingUp sx={{ color: "#A59A8E", fontSize: 16 }} />;
  }
};

// 사이드바 컨텐츠 컴포넌트
export const SidebarContent: React.FC<{ isMobile: boolean }> = ({
  isMobile,
}) => {
  const iconMap = {
    대시보드: <Dashboard />,
    "상품 관리": <Inventory2 />,
    "주문/배송": <LocalShipping />,
    정산: <Paid />,
    "고객 관리": <People />,
    공지사항: <Article />,
    FAQ: <Quiz />,
    "1:1 문의": <Chat />,
  };

  return (
    <List sx={{ pt: 2 }}>
      {menuItemsData.map((item) => (
        <ListItem
          key={item.text}
          sx={{
            px: 2,
            py: 1.5,
            mx: 1,
            mb: 0.5,
            borderRadius: 2,
            backgroundColor: item.active ? "#FFFBF5" : "transparent",
            color: item.active ? "#E88C30" : "#333333",
            borderLeft: item.active ? "4px solid #E88C30" : "none",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#FFFBF5",
              color: "#E88C30",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#E88C30", minWidth: 40 }}>
            {iconMap[item.text as keyof typeof iconMap]}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontSize: "0.875rem",
              fontWeight: item.active ? 600 : 500,
            }}
          />
        </ListItem>
      ))}
      {isMobile && (
        <>
          <Box sx={{ borderTop: 1, borderColor: "#F3EADD", mt: 2, pt: 2 }} />
          {mobileOnlyItemsData.map((item) => (
            <ListItem
              key={item.text}
              sx={{
                px: 2,
                py: 1.5,
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#FFFBF5",
                  color: "#E88C30",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#E88C30", minWidth: 40 }}>
                {iconMap[item.text as keyof typeof iconMap]}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              />
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
};

// 통계 카드들 컴포넌트
export const StatCards: React.FC = () => {
  const stats = [
    { title: "오늘의 주문 수", value: "120건" },
    { title: "오늘의 매출", value: "5,500,000원" },
    { title: "오늘의 방문자 수", value: "350명" },
  ];

  return (
    <Box sx={{ display: "flex", gap: 2.5, width: "100%" }}>
      {stats.map((stat, index) => (
        <Box key={index} sx={{ flex: 1 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #F3EADD",
              height: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="#A59A8E" gutterBottom>
                {stat.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#E88C30", fontWeight: 700, fontSize: "1.8rem" }}
              >
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

// 라인 차트 컴포넌트
export const SalesChart: React.FC = () => (
  <Card
    sx={{
      borderRadius: 3,
      border: "1px solid #F3EADD",
      p: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
        주간 매출 동향
      </Typography>
      <Typography variant="body2" color="#A59A8E">
        이번 주
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        gap: 1,
        mb: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        15,000,000원
      </Typography>
      <Typography sx={{ color: "#6FCF97", fontWeight: 500 }}>+15%</Typography>
    </Box>
    <Box
      sx={{
        flex: 1,
        position: "relative",
        backgroundColor: "#ffffff",
        borderRadius: 2,
        minHeight: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 350"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path
          d="M10 280 C110 260, 160 220, 210 240 C310 230, 360 270, 410 260 C510 250, 550 180, 600 200 C700 190, 740 170, 790 180 C890 170, 940 150, 990 160 C1090 150, 1140 130, 1190 140"
          stroke="#E88C30"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#E88C30", stopOpacity: 0.12 }}
            />
            <stop
              offset="40%"
              style={{ stopColor: "#E88C30", stopOpacity: 0.06 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#E88C30", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M10 280 C110 260, 160 220, 210 240 C310 230, 360 270, 410 260 C510 250, 550 180, 600 200 C700 190, 740 170, 790 180 C890 170, 940 150, 990 160 C1090 150, 1140 130, 1190 140 L1190 320 L10 320 Z"
          fill="url(#chartGradient)"
        />
        <defs>
          <pattern
            id="grid"
            width="120"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 120 0 L 0 0 0 60"
              fill="none"
              stroke="#F8F4F0"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.2" />
      </svg>
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          px: "10px",
        }}
      >
        {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
          <Typography
            key={day}
            variant="caption"
            sx={{
              color: "#A59A8E",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>
    </Box>
  </Card>
);

// 막대 차트 컴포넌트
export const ProductChart: React.FC = () => {
  const chartData = [
    { name: "상품 A", height: 100, color: "#F3EADD" },
    { name: "상품 B", height: 90, color: "#F3EADD" },
    { name: "상품 C", height: 140, color: "#F3EADD" },
    { name: "상품 D", height: 180, color: "#F3EADD" },
    { name: "상품 E", height: 250, color: "#E88C30" },
    { name: "상품 F", height: 130, color: "#F3EADD" },
    { name: "상품 G", height: 80, color: "#F3EADD" },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #F3EADD",
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
          월간 상품 매출 순위
        </Typography>
        <Typography variant="body2" color="#A59A8E">
          이번 달
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          1,200개
        </Typography>
        <Typography sx={{ color: "#EB5757", fontWeight: 500 }}>-5%</Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          px: 2,
          pb: 4,
          minHeight: 0,
        }}
      >
        {chartData.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "12%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: `${item.height}px`,
                backgroundColor: item.color,
                borderRadius: "4px 4px 0 0",
                mb: 1,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: item.color === "#E88C30" ? "#E88C30" : "#A59A8E",
                fontSize: "0.7rem",
                fontWeight: item.color === "#E88C30" ? 600 : 400,
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

// AI 수요 예측 패널
export const AIForecastPanel: React.FC = () => (
  <Card
    sx={{
      borderRadius: 3,
      border: "1px solid #F3EADD",
      p: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Psychology sx={{ color: "#E88C30", fontSize: 24 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
          AI 수요 예측 결과
        </Typography>
      </Box>
      <Chip
        icon={<AutoAwesome />}
        label="실시간 분석"
        size="small"
        sx={{
          backgroundColor: "#F3EADD",
          color: "#E88C30",
          fontSize: "0.75rem",
        }}
      />
    </Box>

    <Box sx={{ mb: 2 }}>
      <Alert
        severity="warning"
        sx={{ backgroundColor: "#FFF3CD", border: "1px solid #F2C94C" }}
      >
        <AlertTitle sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
          재주문 알림
        </AlertTitle>
        <Typography sx={{ fontSize: "0.75rem" }}>
          2개 상품의 재고 부족이 예상됩니다. 자동 주문을 권장합니다.
        </Typography>
      </Alert>
    </Box>

    <Box sx={{ flex: 1, overflow: "auto" }}>
      {demandForecastData.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.5,
            mb: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            border: "1px solid #F8F4F0",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                mb: 0.5,
                color: "#333333",
              }}
            >
              {item.product}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: "#A59A8E", fontSize: "0.75rem" }}
              >
                현재: {item.currentStock}개
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#333333", fontSize: "0.75rem" }}
              >
                예측: {item.predictedDemand}개
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {getTrendIcon(item.trend)}
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: getStatusColor(item.status),
              }}
            >
              {item.status}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Card>
);

// 재주문 추천 패널
export const ReorderPanel: React.FC = () => (
  <Card
    sx={{
      borderRadius: 3,
      border: "1px solid #F3EADD",
      p: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
      }}
    >
      <AutoAwesome sx={{ color: "#E88C30", fontSize: 24 }} />
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
        자동 재주문 추천
      </Typography>
    </Box>

    <Box sx={{ mb: 2 }}>
      <Typography
        variant="body2"
        sx={{ color: "#A59A8E", fontSize: "0.75rem", mb: 1 }}
      >
        {/* 이동평균 + 지수평활법 기반 예측 */}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#E88C30" }}>
          3건
        </Typography>
        <Typography variant="body2" sx={{ color: "#333333" }}>
          재주문 필요
        </Typography>
      </Box>
    </Box>

    <Box sx={{ flex: 1, overflow: "auto" }}>
      {demandForecastData
        .filter((item) => item.recommendedOrder > 0)
        .map((item, index) => (
          <Box
            key={index}
            sx={{
              p: 1.5,
              mb: 1,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              border: `1px solid ${getStatusColor(item.status)}20`,
              borderLeft: `4px solid ${getStatusColor(item.status)}`,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                mb: 0.5,
                color: "#333333",
              }}
            >
              {item.product.length > 15
                ? `${item.product.substring(0, 15)}...`
                : item.product}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#A59A8E", fontSize: "0.7rem" }}
              >
                추천 수량
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: getStatusColor(item.status),
                }}
              >
                {item.recommendedOrder}개
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#A59A8E", fontSize: "0.7rem" }}
              >
                신뢰도: {item.confidence}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={item.confidence}
                sx={{
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "#F3EADD",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      item.confidence >= 90
                        ? "#6FCF97"
                        : item.confidence >= 80
                        ? "#F2994A"
                        : "#EB5757",
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          </Box>
        ))}

      {demandForecastData.filter((item) => item.recommendedOrder > 0).length ===
        0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#A59A8E",
          }}
        >
          <CheckCircle sx={{ fontSize: 40, mb: 1, color: "#6FCF97" }} />
          <Typography sx={{ fontSize: "0.875rem", textAlign: "center" }}>
            모든 상품의 재고가 충분합니다
          </Typography>
        </Box>
      )}
    </Box>
  </Card>
);
