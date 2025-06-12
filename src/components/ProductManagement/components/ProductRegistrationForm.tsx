// src/components/admin/ProductRegistrationForm.tsx

import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Paper,
  IconButton,
  Alert,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { ProductFormData, PRODUCT_CATEGORIES } from "../types/product.types.ts";

interface ProductRegistrationFormProps {
  onSubmit?: (data: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
}

const ProductRegistrationForm: React.FC<ProductRegistrationFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [formData, setFormData] = useState<ProductFormData>({
    productName: "",
    category: "dog_snacks",
    price: 0,
    description: "",
    ingredients: "",
    images: [],
    stockQuantity: 0,
    salesStartDate: "",
    shippingCosts: 0,
    leadTime: 0,
    isActive: true,
    ...initialData,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange =
    (field: keyof ProductFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "price" ||
          field === "stockQuantity" ||
          field === "shippingCosts" ||
          field === "leadTime"
            ? Number(value) || 0
            : value,
      }));
    };

  const handleSelectChange = (field: keyof ProductFormData) => (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // 이미지 파일만 허용
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      setAlertMessage("이미지 파일만 업로드 가능합니다.");
      setShowAlert(true);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageFiles],
    }));

    // 프리뷰 생성
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 간단한 유효성 검사
    if (!formData.productName.trim()) {
      setAlertMessage("상품명을 입력해주세요.");
      setShowAlert(true);
      return;
    }

    if (formData.price <= 0) {
      setAlertMessage("올바른 가격을 입력해주세요.");
      setShowAlert(true);
      return;
    }

    onSubmit?.(formData);
    setAlertMessage("상품이 성공적으로 등록되었습니다.");
    setShowAlert(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* 상품명과 카테고리 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="상품명"
            placeholder="상품명을 입력하세요"
            value={formData.productName}
            onChange={handleInputChange("productName")}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={formData.category}
              onChange={handleSelectChange("category")}
              label="카테고리"
              sx={{
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              }}
            >
              {PRODUCT_CATEGORIES.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* 가격 */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="가격"
            type="number"
            placeholder="가격을 입력하세요 (예: 9900)"
            value={formData.price}
            onChange={handleInputChange("price")}
            InputProps={{
              endAdornment: <InputAdornment position="end">원</InputAdornment>,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              },
            }}
          />
        </Grid>

        {/* 상품 설명 */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="상품 설명"
            multiline
            rows={4}
            placeholder="상품 설명을 입력하세요"
            value={formData.description}
            onChange={handleInputChange("description")}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              },
            }}
          />
        </Grid>

        {/* 원재료 */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="원재료"
            multiline
            rows={3}
            placeholder="원재료를 쉼표로 구분하여 입력하세요"
            value={formData.ingredients}
            onChange={handleInputChange("ingredients")}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              },
            }}
          />
        </Grid>

        {/* 이미지 업로드 */}
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#2d2a27", fontWeight: 600 }}
          >
            상품 이미지
          </Typography>
          <Paper
            sx={{
              border: "2px dashed #F5EFEA",
              borderRadius: 3,
              p: 4,
              textAlign: "center",
              backgroundColor: "white",
              cursor: "pointer",
              transition: "border-color 0.3s ease",
              "&:hover": {
                borderColor: "#ef9942",
              },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadIcon sx={{ fontSize: 60, color: "#a5d6a7", mb: 2 }} />
            <Typography variant="body2" sx={{ color: "#5c5752", mb: 2 }}>
              이미지를 드래그 앤 드롭하거나 파일을 찾아보세요. (여러 이미지
              지원)
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#a5d6a7",
                color: "#1f2937",
                "&:hover": {
                  backgroundColor: "#81c784",
                },
              }}
            >
              파일 찾아보기
            </Button>
          </Paper>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          {/* 이미지 프리뷰 */}
          {imagePreviews.length > 0 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {imagePreviews.map((preview, index) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                  <Box sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "1px solid #F5EFEA",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleImageRemove(index)}
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.7)",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* 재고 수량과 판매 시작일 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="재고 수량"
            type="number"
            placeholder="재고 수량을 입력하세요"
            value={formData.stockQuantity}
            onChange={handleInputChange("stockQuantity")}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="판매 시작일"
            type="date"
            value={formData.salesStartDate}
            onChange={handleInputChange("salesStartDate")}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              },
            }}
          />
        </Grid>

        {/* 배송비와 리드타임 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="배송비"
            type="number"
            placeholder="배송비를 입력하세요 (예: 3000)"
            value={formData.shippingCosts}
            onChange={handleInputChange("shippingCosts")}
            InputProps={{
              endAdornment: <InputAdornment position="end">원</InputAdornment>,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="제조 리드타임"
            type="number"
            placeholder="리드타임(일)을 입력하세요"
            value={formData.leadTime}
            onChange={handleInputChange("leadTime")}
            InputProps={{
              endAdornment: <InputAdornment position="end">일</InputAdornment>,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ef9942",
                },
              },
            }}
          />
        </Grid>

        {/* 제출 버튼 */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              sx={{
                backgroundColor: "#ef9942",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#e08830",
                },
              }}
            >
              상품 등록
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* 알림 스낵바 */}
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertMessage.includes("성공") ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductRegistrationForm;
