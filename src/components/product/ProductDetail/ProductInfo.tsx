import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import { AddShoppingCart, FavoriteBorder, Pets } from "@mui/icons-material";
import { Product } from "../../../types/product";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [packaging, setPackaging] = useState("기본 포장");

  const handleAddToCart = () => {
    console.log("장바구니 추가:", { quantity, packaging });
  };

  const handleBuyNow = () => {
    console.log("바로 구매:", { quantity, packaging });
  };

  const handlePetInfoInput = () => {
    console.log("우리 아이 정보 입력하기");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}>
      {/* 상품명 및 기본 정보 */}
      <Box>
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontSize: "2rem",
            fontWeight: 700,
            color: "#1b150e",
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            lineHeight: 1.6,
            color: "#97784e",
            fontSize: "1rem",
            whiteSpace: "pre-line",
          }}
        >
          {product.description}
        </Typography>

        {/* 평점 - 수정: "리뷰 125개"로 변경 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{
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
            {product.rating} (리뷰 {product.reviewCount}개)
          </Typography>
        </Box>

        {/* 가격 */}
        <Typography
          variant="h2"
          sx={{
            color: "#e89830",
            fontWeight: 700,
            fontSize: "1.875rem",
            mb: 3,
          }}
        >
          {product.price.toLocaleString()}원
        </Typography>
      </Box>

      {/* 상품 정보 테이블 - 각 항목을 별도 행으로 표시 */}
      <Box sx={{ backgroundColor: "#f7f3ef", p: 3, borderRadius: 2 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#1b150e",
          }}
        >
          상품 정보
        </Typography>

        {/* 원재료 행 */}
        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#97784e",
              fontWeight: 500,
              minWidth: "80px",
              mr: 2,
            }}
          >
            원재료:
          </Typography>
          <Typography variant="body2" sx={{ color: "#1b150e", flex: 1 }}>
            {product.ingredients}
          </Typography>
        </Box>

        {/* 영양성분 행 */}
        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#97784e",
              fontWeight: 500,
              minWidth: "80px",
              mr: 2,
            }}
          >
            영양성분:
          </Typography>
          <Typography variant="body2" sx={{ color: "#1b150e", flex: 1 }}>
            조단백질 70% 이상, 조지방 5% 이상, 조섬유 2% 이하, 수분 15% 이하
          </Typography>
        </Box>

        {/* 알레르기 정보 행 */}
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#97784e",
              fontWeight: 500,
              minWidth: "80px",
              mr: 2,
            }}
          >
            알레르기 정보:
          </Typography>
          <Typography variant="body2" sx={{ color: "#1b150e", flex: 1 }}>
            일반적인 알러지 유발 물질 없음. 견과류를 처리하는 시설에서 생산될 수
            있습니다.
          </Typography>
        </Box>
      </Box>

      {/* 제조사 정보 - "1:1 채팅" 버튼 */}
      <Card sx={{ backgroundColor: "#f7f3ef", boxShadow: "none" }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={product.maker.image} sx={{ width: 64, height: 64 }} />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1b150e", mb: 0.5 }}
              >
                {product.maker.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#97784e" }}>
                {product.maker.description}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "#e89830",
                borderColor: "#e89830",
                "&:hover": {
                  backgroundColor: "#e89830",
                  color: "#ffffff",
                },
              }}
            >
              1:1 채팅
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 이런 아이에게 좋아요! */}
      <Box>
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#1b150e",
          }}
        >
          이런 아이에게 좋아요!
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#1b150e",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            • 모든 연령 및 견종의 강아지 (2개월 이상)
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#1b150e",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            • 소화기가 예민하거나 알러지가 있는 강아지
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#1b150e",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            • 훈련용 간식 또는 칭찬 간식으로 활용
          </Typography>
        </Box>

        {/* 우리 아이 정보 입력하기 버튼 */}
        <Button
          variant="text"
          startIcon={<Pets />}
          onClick={handlePetInfoInput}
          sx={{
            mt: 2,
            color: "#e89830",
            textTransform: "none",
            fontSize: "0.875rem",
            p: "4px 8px",
            borderRadius: 1,
            "&:hover": {
              backgroundColor: "rgba(232, 152, 48, 0.08)",
            },
          }}
        >
          우리 아이 정보 입력하기
        </Button>
      </Box>

      <Divider sx={{ borderColor: "#f3eee7" }} />

      {/* 수량 및 포장 선택 - 하단 버튼과 정확히 동일한 레이아웃 */}
      <Box sx={{ width: "100%" }}>
        {/* 수량/포장 선택 - 하단 버튼들과 정확히 동일한 구조 */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
          {/* 찜 버튼 자리만큼 공백 */}
          <Box sx={{ width: 48 }}></Box>

          {/* 장바구니 버튼과 동일한 비율의 수량 선택 */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                color: "#1b150e",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              수량
            </Typography>
            <FormControl fullWidth>
              <Select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                displayEmpty
                sx={{
                  height: 48,
                  backgroundColor: "#fcfaf8",
                  "& .MuiSelect-select": {
                    height: "48px",
                    padding: "0 14px",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e7ddd0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e89830",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e89830",
                  },
                }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}개
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 바로구매 버튼과 동일한 비율의 포장 선택 */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                color: "#1b150e",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              포장 방식
            </Typography>
            <FormControl fullWidth>
              <Select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                displayEmpty
                sx={{
                  height: 48,
                  backgroundColor: "#fcfaf8",
                  "& .MuiSelect-select": {
                    height: "48px",
                    padding: "0 14px",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e7ddd0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e89830",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e89830",
                  },
                }}
              >
                <MenuItem value="기본 포장">기본 포장</MenuItem>
                <MenuItem value="선물 포장">선물 포장</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* 버튼들 - 찜 + 장바구니 + 구매 */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <IconButton
            sx={{
              width: 48,
              height: 48,
              border: "1px solid #e7ddd0",
              backgroundColor: "#fcfaf8",
              "&:hover": {
                borderColor: "#e89830",
                backgroundColor: "#f3eee7",
              },
            }}
          >
            <FavoriteBorder sx={{ color: "#e89830" }} />
          </IconButton>

          <Button
            variant="outlined"
            startIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              flex: 1,
              height: 48,
              color: "#1b150e",
              borderColor: "#e7ddd0",
              backgroundColor: "#f3eee7",
              "&:hover": {
                borderColor: "#e89830",
                backgroundColor: "#e8c69b",
                color: "#1b150e",
              },
            }}
          >
            장바구니
          </Button>

          <Button
            variant="contained"
            onClick={handleBuyNow}
            sx={{
              flex: 1,
              height: 48,
              backgroundColor: "#e89830",
              "&:hover": {
                backgroundColor: "#d18720",
              },
            }}
          >
            바로 구매
          </Button>
        </Box>
      </Box>

      {/* 상품 문의하기 버튼 */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            height: 48,
            color: "#97784e",
            borderColor: "#e7ddd0",
            backgroundColor: "#fcfaf8",
            "&:hover": {
              borderColor: "#e89830",
              backgroundColor: "#f3eee7",
              color: "#e89830",
            },
          }}
        >
          상품 신고하기
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfo;
