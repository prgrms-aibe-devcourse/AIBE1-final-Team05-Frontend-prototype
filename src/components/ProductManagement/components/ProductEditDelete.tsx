// src/components/admin/ProductEditDelete.tsx

import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Alert,
  Snackbar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { ProductFormData, PRODUCT_CATEGORIES } from "../types/product.types.ts";
import ProductRegistrationForm from "./ProductRegistrationForm";

// 목업 데이터
const mockProducts: ProductFormData[] = [
  {
    id: "1",
    productName: "유기농 치킨 & 블루베리 강아지 훈련 간식",
    category: "dog_snacks",
    price: 9990,
    description: "신선한 유기농 치킨과 블루베리로 만든 건강한 강아지 간식",
    ingredients: "닭고기, 블루베리, 고구마, 현미",
    images: [],
    stockQuantity: 150,
    salesStartDate: "2024-01-15",
    shippingCosts: 3000,
    leadTime: 3,
    isActive: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    productName: "야생 연어 & 고구마 껌",
    category: "chews",
    price: 14500,
    description: "신선한 야생 연어와 고구마로 만든 치아 건강 껌",
    ingredients: "연어, 고구마, 감자전분",
    images: [],
    stockQuantity: 75,
    salesStartDate: "2024-02-01",
    shippingCosts: 3000,
    leadTime: 5,
    isActive: true,
    createdAt: "2024-01-25",
    updatedAt: "2024-02-01",
  },
  {
    id: "3",
    productName: "고양이 참치 크림 간식",
    category: "cat_snacks",
    price: 7500,
    description: "고양이가 좋아하는 참치 크림 타입 간식",
    ingredients: "참치, 닭고기, 타우린",
    images: [],
    stockQuantity: 0,
    salesStartDate: "2024-01-20",
    shippingCosts: 2500,
    leadTime: 2,
    isActive: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
];

const ProductEditDelete: React.FC = () => {
  const [products, setProducts] = useState<ProductFormData[]>(mockProducts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormData | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  // 검색 필터링
  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      PRODUCT_CATEGORIES.find((cat) => cat.value === product.category)
        ?.label.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    product: ProductFormData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleToggleActive = () => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, isActive: !product.isActive }
            : product
        )
      );
      setAlertMessage(
        `상품이 ${selectedProduct.isActive ? "비활성화" : "활성화"}되었습니다.`
      );
      setAlertSeverity("success");
      setShowAlert(true);
    }
    handleMenuClose();
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProduct.id)
      );
      setAlertMessage("상품이 삭제되었습니다.");
      setAlertSeverity("success");
      setShowAlert(true);
    }
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleEditSubmit = (updatedData: ProductFormData) => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...updatedData,
                id: selectedProduct.id,
                updatedAt: new Date().toISOString(),
              }
            : product
        )
      );
      setAlertMessage("상품이 수정되었습니다.");
      setAlertSeverity("success");
      setShowAlert(true);
      setEditDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const getCategoryLabel = (category: string) => {
    return (
      PRODUCT_CATEGORIES.find((cat) => cat.value === category)?.label ||
      category
    );
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "품절", color: "error" as const };
    if (stock < 10) return { label: "부족", color: "warning" as const };
    return { label: "충분", color: "success" as const };
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 검색 및 필터 */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "#2d2a27", fontWeight: 600 }}>
          등록된 상품 목록
        </Typography>
        <TextField
          size="small"
          placeholder="상품명 또는 카테고리로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#5c5752" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f9fafb",
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {/* 상품 테이블 */}
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  상품명
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  카테고리
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  가격
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  재고
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  상태
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  등록일
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  작업
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => {
                  const stockStatus = getStockStatus(product.stockQuantity);
                  return (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 48,
                              height: 48,
                              backgroundColor: "#f9fafb",
                              color: "#5c5752",
                            }}
                          >
                            📦
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {product.productName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              ID: {product.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getCategoryLabel(product.category)}
                          size="small"
                          sx={{ backgroundColor: "#fdecdb", color: "#ef9942" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          ₩{product.price.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body2">
                            {product.stockQuantity}개
                          </Typography>
                          <Chip
                            label={stockStatus.label}
                            size="small"
                            color={stockStatus.color}
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={product.isActive ? "활성" : "비활성"}
                          size="small"
                          color={product.isActive ? "success" : "default"}
                          variant={product.isActive ? "filled" : "outlined"}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(
                            product.createdAt || ""
                          ).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, product)}
                          size="small"
                          sx={{ color: "#5c5752" }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="페이지당 행 수:"
          labelDisplayedRows={({ from, to, count }) =>
            `${count}개 중 ${from}-${to}`
          }
        />
      </Paper>

      {/* 작업 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 150 },
        }}
      >
        <MenuItem onClick={handleEdit} sx={{ gap: 1 }}>
          <EditIcon fontSize="small" />
          수정
        </MenuItem>
        <MenuItem onClick={handleToggleActive} sx={{ gap: 1 }}>
          {selectedProduct?.isActive ? (
            <VisibilityOffIcon fontSize="small" />
          ) : (
            <ViewIcon fontSize="small" />
          )}
          {selectedProduct?.isActive ? "비활성화" : "활성화"}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ gap: 1, color: "error.main" }}>
          <DeleteIcon fontSize="small" />
          삭제
        </MenuItem>
      </Menu>

      {/* 수정 다이얼로그 */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: "#F5EFEA" }}>
          상품 수정
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {selectedProduct && (
            <ProductRegistrationForm
              initialData={selectedProduct}
              onSubmit={handleEditSubmit}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>상품 삭제 확인</DialogTitle>
        <DialogContent>
          <Typography>
            "{selectedProduct?.productName}" 상품을 정말 삭제하시겠습니까?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            삭제된 상품은 복구할 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      {/* 알림 스낵바 */}
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductEditDelete;
