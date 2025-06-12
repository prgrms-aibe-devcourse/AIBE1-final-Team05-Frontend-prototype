// src/pages/SellerInfoEnterPage/SellerInfoComponents.tsx

import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

// 브랜드 컬러 상수
export const BRAND_COLOR = "#de7710";

// 프로그레스 서클 컴포넌트
export const ProgressCircle: React.FC<{ value: number }> = ({ value }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={100}
        size={128}
        thickness={3}
        sx={{ color: "#e5e7eb" }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={128}
        thickness={3}
        sx={{
          color: BRAND_COLOR,
          position: "absolute",
          left: 0,
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          color={BRAND_COLOR}
          fontWeight="bold"
        >
          {`${value}%`}
        </Typography>
      </Box>
    </Box>
  );
};

// 프로필 미리보기 카드
export const ProfilePreviewCard: React.FC = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#fafaf9",
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="#1f2937" mb={1}>
          워크샵 프로필 미리보기
        </Typography>
        <Typography variant="body2" color="#6b7280" mb={3}>
          현재 워크샵 프로필 요약과 고객에게 표시될 내용을 간략하게
          확인해보세요.
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{ width: 96, height: 96, borderRadius: 2 }}
            src="/api/placeholder/96/96"
          />
          <Box>
            <Typography variant="h6" fontWeight="semibold" color="#1f2937">
              달콤한 우리집 간식공방
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Rating value={4.5} precision={0.5} readOnly size="small" />
              <Typography variant="body2" color="#6b7280" ml={1}>
                (4.5/5.0)
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// 완성도 카드
export const CompletionCard: React.FC = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#fafaf9",
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h6" fontWeight="medium" color="#1f2937" mb={2}>
          프로필 완성도
        </Typography>
        <ProgressCircle value={75} />
        <Typography variant="caption" color="#6b7280" mt={2}>
          완성도를 높여 더 많은 고객을 만나세요!
        </Typography>
      </CardContent>
    </Card>
  );
};
