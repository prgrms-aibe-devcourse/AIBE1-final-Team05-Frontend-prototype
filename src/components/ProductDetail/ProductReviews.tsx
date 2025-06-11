// src\components\product\ProductDetail\ProductReviews.tsx

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Grid,
  IconButton,
  Divider,
  Pagination,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,

} from "@mui/material";
import {
  ThumbUpAlt,
  ThumbDownAlt,
  AutoAwesome,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import { Review, ReviewStats } from "@/components/ProductDetail/review.ts";

interface ProductReviewsProps {
  reviews: Review[];
  stats: ReviewStats;
}

// LLM 리뷰 요약 데이터 인터페이스
interface ReviewSummary {
  positive: {
    summary: string;
    keyPoints: string[];
    percentage: number;
    mostMentioned: string[];
  };
  negative: {
    summary: string;
    keyPoints: string[];
    percentage: number;
    mostMentioned: string[];
  };
}

// Mock LLM 요약 데이터
const mockReviewSummary: ReviewSummary = {
  positive: {
    summary:
      "고객들이 제품의 품질과 강아지 반응에 대해 매우 만족하고 있습니다.",
    keyPoints: [
      "100% 국내산 닭가슴살로 만든 안전한 재료",
      "강아지들의 뛰어난 기호성과 맛에 대한 만족",
      "인공첨가물 없는 건강한 성분 구성",
      "훈련용 간식으로도 활용도가 높음",
      "다양한 견종과 연령대에 적합한 크기와 식감",
    ],
    percentage: 87,
    mostMentioned: ["맛있어해요", "건강한재료", "국내산", "안심"],
  },
  negative: {
    summary: "가격과 포장에 대한 개선 요구가 주요 불만사항입니다.",
    keyPoints: [
      "다른 제품 대비 높은 가격으로 인한 부담감",
      "포장재의 밀폐력 부족으로 보관 시 불편함",
      "소형견에게는 다소 딱딱한 식감",
      "일부 강아지의 기호도 차이",
      "정기구매 할인 혜택 부족",
    ],
    percentage: 13,
    mostMentioned: ["가격부담", "포장개선", "딱딱함", "할인필요"],
  },
};

// 리뷰 요약 컴포넌트 - 접이식으로 개선
const ReviewSummarySection: React.FC<{
  reviews: Review[];
  totalReviews: number;
}> = ({ reviews, totalReviews }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleToggleExpand = () => {
    if (!isExpanded) {
      setIsLoading(true);
      // 실제 환경에서는 API 호출 시뮬레이션
      setTimeout(() => {
        setIsLoading(false);
        setIsExpanded(true);
      }, 800);
    } else {
      setIsExpanded(false);
    }
  };

  const TabPanel = ({
    children,
    value,
    index,
  }: {
    children: React.ReactNode;
    value: number;
    index: number;
  }) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );

  return (
    <Card
      sx={{
        mb: 4,
        backgroundColor: "#ffffff",
        border: "1px solid #e7ddd0",
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* 헤더 - 클릭 가능한 영역 */}
      <Box
        onClick={handleToggleExpand}
        sx={{
          p: 3,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isExpanded ? "#fcfaf8" : "#ffffff",
          borderBottom: isExpanded ? "1px solid #f0f0f0" : "none",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#fcfaf8",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <AutoAwesome sx={{ color: "#e89830", fontSize: "1.5rem" }} />
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "#1b150e",
                mb: 0.5,
              }}
            >
              AI 리뷰 요약 분석
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#97784e",
                fontSize: "0.8125rem",
              }}
            >
              총 {totalReviews}개 리뷰를 AI가 분석한 결과입니다
            </Typography>
          </Box>
          {/* <Chip
            label="LLM 기반"
            size="small"
            sx={{
              backgroundColor: "#f3eee7",
              color: "#e89830",
              fontSize: "0.75rem",
              fontWeight: 500,
              ml: 1,
            }}
          /> */}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isLoading && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "#97784e", fontSize: "0.75rem" }}
              >
                분석 중...
              </Typography>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  border: "2px solid #f0f0f0",
                  borderTop: "2px solid #e89830",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
            </Box>
          )}
          <Typography
            variant="body2"
            sx={{
              color: "#97784e",
              fontSize: "0.8125rem",
              fontWeight: 500,
            }}
          >
            {isExpanded ? "접기" : "자세히 보기"}
          </Typography>
          <Box
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
              color: "#97784e",
            }}
          >
            ▼
          </Box>
        </Box>
      </Box>

      {/* 확장 가능한 콘텐츠 영역 */}
      <Box
        sx={{
          maxHeight: isExpanded ? "1000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s ease-in-out",
        }}
      >
        {isExpanded && !isLoading && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: "#f0f0f0" }}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{
                  px: 3,
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#e89830",
                  },
                  "& .MuiTab-root": {
                    color: "#97784e",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    minHeight: 48,
                    "&.Mui-selected": {
                      color: "#e89830",
                    },
                  },
                }}
              >
                <Tab
                  icon={<TrendingUp fontSize="small" />}
                  iconPosition="start"
                  label={`긍정적 리뷰 요약 (${mockReviewSummary.positive.percentage}%)`}
                />
                <Tab
                  icon={<TrendingDown fontSize="small" />}
                  iconPosition="start"
                  label={`부정적 리뷰 요약 (${mockReviewSummary.negative.percentage}%)`}
                />
              </Tabs>
            </Box>

            <CardContent sx={{ p: 0 }}>
              {/* 긍정적 리뷰 요약 탭 */}
              <TabPanel value={selectedTab} index={0}>
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: "0.875rem",
                      color: "#1b150e",
                      backgroundColor: "#f8fdf8",
                      p: 2,
                      borderRadius: 1,
                      borderLeft: "4px solid #4caf50",
                    }}
                  >
                    {mockReviewSummary.positive.summary}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: "#1b150e",
                      fontSize: "0.875rem",
                    }}
                  >
                    주요 만족 포인트
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      mb: 3,
                    }}
                  >
                    {mockReviewSummary.positive.keyPoints.map(
                      (point, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor: "#4caf50",
                              mt: 0.75,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8125rem",
                              color: "#1b150e",
                              lineHeight: 1.5,
                            }}
                          >
                            {point}
                          </Typography>
                        </Box>
                      )
                    )}
                  </Box>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      color: "#1b150e",
                      fontSize: "0.875rem",
                    }}
                  >
                    자주 언급되는 키워드
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {mockReviewSummary.positive.mostMentioned.map(
                      (keyword, index) => (
                        <Chip
                          key={index}
                          label={keyword}
                          size="small"
                          sx={{
                            backgroundColor: "#e8f5e8",
                            color: "#2e7d32",
                            fontSize: "0.75rem",
                            "& .MuiChip-label": { px: 1.5 },
                          }}
                        />
                      )
                    )}
                  </Box>
                </Box>
              </TabPanel>

              {/* 부정적 리뷰 요약 탭 */}
              <TabPanel value={selectedTab} index={1}>
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: "0.875rem",
                      color: "#1b150e",
                      backgroundColor: "#fff8f8",
                      p: 2,
                      borderRadius: 1,
                      borderLeft: "4px solid #f44336",
                    }}
                  >
                    {mockReviewSummary.negative.summary}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: "#1b150e",
                      fontSize: "0.875rem",
                    }}
                  >
                    주요 개선 요구사항
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      mb: 3,
                    }}
                  >
                    {mockReviewSummary.negative.keyPoints.map(
                      (point, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor: "#f44336",
                              mt: 0.75,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8125rem",
                              color: "#1b150e",
                              lineHeight: 1.5,
                            }}
                          >
                            {point}
                          </Typography>
                        </Box>
                      )
                    )}
                  </Box>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      color: "#1b150e",
                      fontSize: "0.875rem",
                    }}
                  >
                    주요 불만 키워드
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {mockReviewSummary.negative.mostMentioned.map(
                      (keyword, index) => (
                        <Chip
                          key={index}
                          label={keyword}
                          size="small"
                          sx={{
                            backgroundColor: "#ffeaea",
                            color: "#c62828",
                            fontSize: "0.75rem",
                            "& .MuiChip-label": { px: 1.5 },
                          }}
                        />
                      )
                    )}
                  </Box>
                </Box>
              </TabPanel>
            </CardContent>
          </>
        )}
      </Box>
    </Card>
  );
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, stats }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  // 데이터 안전성 체크
  if (!stats || !stats.ratingDistribution) {
    return (
      <div style={{ color: "red", fontSize: "2rem" }}>
        ERROR: stats 데이터가 없습니다!
      </div>
    );
  }

  // 페이지네이션 계산
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return reviews.slice(startIndex, endIndex);
  }, [reviews, currentPage, reviewsPerPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // 원래 기능으로 롤백 - 모든 페이지 변경 시 리뷰 섹션 상단으로 스크롤
    const reviewSection = document.getElementById("review-section");
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMonths = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    return `${diffInMonths}개월 전`;
  };

  return (
    <Box sx={{ mt: 6, py: 4 }}>
      {/* 고객 리뷰 섹션 - 배경색 추가 */}
      <Box
        id="review-section"
        sx={{ backgroundColor: "#f8f4f0", p: 4, borderRadius: 2 }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 4,
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#1b150e",
          }}
        >
          고객 리뷰
        </Typography>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* 평점 요약 섹션 */}
            <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "#1b150e",
                  mb: 1,
                }}
              >
                {stats.averageRating}
              </Typography>
              <Rating
                value={stats.averageRating}
                precision={0.1}
                readOnly
                sx={{
                  mb: 1,
                  color: "#e89830",
                  "& .MuiRating-iconEmpty": {
                    color: "#d5c4ae",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#97784e", fontSize: "0.875rem" }}
              >
                {stats.totalReviews}개 리뷰
              </Typography>
            </Box>
          </Grid>

          {/* 평점 분포 섹션 */}
          <Grid item xs={12} md={9}>
            <Box sx={{ width: "100%" }}>
              {[5, 4, 3, 2, 1].map((rating) => {
                // 문자열 키로 접근하도록 수정
                const percentage =
                  stats.ratingDistribution[rating.toString()] || 0;

                return (
                  <Box
                    key={rating}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        width: "8px",
                        color: "#1b150e",
                        textAlign: "center",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                      }}
                    >
                      {rating}
                    </Typography>
                    <Box
                      sx={{
                        width: "1100px", // 400px에서 700px로 증가
                        height: 8,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${Math.max(Number(percentage), 0)}%`,
                          height: "100%",
                          backgroundColor: "#e89830",
                          borderRadius: 0,
                          minWidth: percentage > 0 ? "4px" : "0px",
                          transition: "width 0.3s ease-in-out",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        width: "28px",
                        textAlign: "right",
                        color: "#97784e",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                      }}
                    >
                      {percentage}%
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>

        {/* 페이지 정보 표시 - 평점 분포 바로 아래로 이동 */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#97784e", fontSize: "0.875rem" }}
          >
            총 {stats.totalReviews}개 리뷰 중{" "}
            {(currentPage - 1) * reviewsPerPage + 1}-
            {Math.min(currentPage * reviewsPerPage, reviews.length)}개 표시
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#97784e", fontSize: "0.875rem" }}
          >
            {currentPage} / {totalPages} 페이지
          </Typography>
        </Box>

        {/* LLM 리뷰 요약 섹션 - 접이식으로 개선 */}
        <ReviewSummarySection
          reviews={reviews}
          totalReviews={stats.totalReviews}
        />

        {/* 페이지 정보 표시 - 제거 (위로 이동했음) */}

        {/* 개별 리뷰 섹션 - 박스 테두리 추가 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {currentReviews.map((review, index) => (
            <Box
              key={review.id}
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #e7ddd0",
                borderRadius: 2,
                p: 3,
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, color: "#1b150e" }}
                      >
                        {review.reviewer.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#97784e", fontSize: "0.75rem" }}
                      >
                        {review.reviewer.petInfo}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#97784e", fontSize: "0.75rem" }}
                    >
                      {formatTimeAgo(review.date)}
                    </Typography>
                  </Box>

                  <Rating
                    value={review.rating}
                    readOnly
                    size="small"
                    sx={{
                      mb: 1,
                      color: "#e89830",
                      "& .MuiRating-iconEmpty": {
                        color: "#d5c4ae",
                      },
                    }}
                  />

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      lineHeight: 1.6,
                      fontSize: "0.875rem",
                      color: "#1b150e",
                    }}
                  >
                    {review.content}
                  </Typography>

                  {review.image && (
                    <Box
                      component="img"
                      src={review.image}
                      alt="리뷰 사진"
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 2,
                      }}
                    />
                  )}

                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <IconButton size="small" sx={{ color: "#97784e" }}>
                        <ThumbUpAlt fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ color: "#97784e", fontSize: "0.75rem" }}
                      >
                        {review.likes}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <IconButton size="small" sx={{ color: "#97784e" }}>
                        <ThumbDownAlt fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ color: "#97784e", fontSize: "0.75rem" }}
                      >
                        {review.dislikes}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {index < currentReviews.length - 1 && (
                <Divider sx={{ mt: 3, borderColor: "#f0f0f0" }} />
              )}
            </Box>
          ))}
        </Box>

        {/* 페이지네이션 - 원래 디자인으로 복구 */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="medium"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#97784e",
                  borderColor: "#e7ddd0",
                  "&:hover": {
                    backgroundColor: "#f3eee7",
                    borderColor: "#e89830",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#e89830",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#d4861f",
                    },
                  },
                },
                "& .MuiPaginationItem-previousNext": {
                  color: "#97784e",
                  "&:hover": {
                    backgroundColor: "#f3eee7",
                  },
                  "&.Mui-disabled": {
                    color: "#d5c4ae",
                  },
                },
              }}
            />
          </Box>
        )}

        {/* 리뷰가 없을 때 표시할 메시지 */}
        {reviews.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              variant="body1"
              sx={{ color: "#97784e", fontSize: "1rem" }}
            >
              아직 등록된 리뷰가 없습니다.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#d5c4ae", fontSize: "0.875rem", mt: 1 }}
            >
              첫 번째 리뷰를 남겨보세요!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductReviews;
