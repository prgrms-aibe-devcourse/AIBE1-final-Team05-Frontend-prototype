// src/components/admin/InventoryManagement.tsx

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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Card,
  CardContent,
  Alert,
  Snackbar,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import {
  StockItem,
  StockMovement,
  StockMovementType,
  STOCK_MOVEMENT_TYPES,
} from "../types/product.types.ts";

// 목업 데이터
const mockStockItems: StockItem[] = [
  {
    id: "1",
    productId: "1",
    productName: "유기농 치킨 & 블루베리 강아지 훈련 간식",
    category: "dog_snacks",
    currentStock: 150,
    minStock: 20,
    maxStock: 500,
    reservedStock: 15,
    availableStock: 135,
    lastUpdated: "2024-06-09",
    supplier: "펫푸드 컴퍼니",
    costPrice: 7000,
    sellPrice: 9990,
    status: "충분",
  },
  {
    id: "2",
    productId: "2",
    productName: "야생 연어 & 고구마 껌",
    category: "chews",
    currentStock: 8,
    minStock: 10,
    maxStock: 200,
    reservedStock: 3,
    availableStock: 5,
    lastUpdated: "2024-06-08",
    supplier: "헬시펫",
    costPrice: 10000,
    sellPrice: 14500,
    status: "부족",
  },
  {
    id: "3",
    productId: "3",
    productName: "고양이 참치 크림 간식",
    category: "cat_snacks",
    currentStock: 0,
    minStock: 15,
    maxStock: 300,
    reservedStock: 0,
    availableStock: 0,
    lastUpdated: "2024-06-07",
    supplier: "캣푸드 전문",
    costPrice: 5000,
    sellPrice: 7500,
    status: "품절",
  },
];

const mockStockMovements: StockMovement[] = [
  {
    id: "1",
    productId: "1",
    type: "입고",
    quantity: 100,
    reason: "정기 입고",
    date: "2024-06-09",
    userId: "admin",
    notes: "신규 입고분",
  },
  {
    id: "2",
    productId: "2",
    type: "출고",
    quantity: -5,
    reason: "주문 출고",
    date: "2024-06-08",
    userId: "system",
  },
  {
    id: "3",
    productId: "1",
    type: "조정",
    quantity: -2,
    reason: "재고 조정",
    date: "2024-06-07",
    userId: "admin",
    notes: "파손품 제외",
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const InventoryManagement: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>(mockStockItems);
  const [stockMovements, setStockMovements] =
    useState<StockMovement[]>(mockStockMovements);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // 재고 조정 폼 상태
  const [adjustForm, setAdjustForm] = useState({
    type: "입고" as StockMovementType,
    quantity: 0,
    reason: "",
    notes: "",
  });

  const filteredItems = stockItems.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "충분":
        return "success";
      case "부족":
        return "warning";
      case "품절":
        return "error";
      case "재주문필요":
        return "info";
      default:
        return "default";
    }
  };

  const getTotalInventoryValue = () => {
    return stockItems.reduce(
      (total, item) => total + item.currentStock * item.costPrice,
      0
    );
  };

  const getLowStockCount = () => {
    return stockItems.filter((item) => item.currentStock <= item.minStock)
      .length;
  };

  const getOutOfStockCount = () => {
    return stockItems.filter((item) => item.currentStock === 0).length;
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAdjustStock = (item: StockItem) => {
    setSelectedItem(item);
    setAdjustDialogOpen(true);
  };

  const handleSubmitAdjustment = () => {
    if (!selectedItem) return;

    const adjustment =
      adjustForm.quantity *
      (adjustForm.type === "출고" || adjustForm.type === "폐기" ? -1 : 1);

    const newStock = Math.max(0, selectedItem.currentStock + adjustment);

    // 재고 아이템 업데이트
    setStockItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              currentStock: newStock,
              availableStock: Math.max(0, newStock - item.reservedStock),
              status:
                newStock === 0
                  ? "품절"
                  : newStock <= item.minStock
                    ? "부족"
                    : "충분",
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );

    // 재고 이동 기록 추가
    const newMovement: StockMovement = {
      id: Date.now().toString(),
      productId: selectedItem.productId,
      type: adjustForm.type,
      quantity: adjustment,
      reason: adjustForm.reason,
      date: new Date().toISOString().split("T")[0],
      userId: "admin",
      notes: adjustForm.notes,
    };

    setStockMovements((prev) => [newMovement, ...prev]);

    setAlertMessage("재고가 성공적으로 조정되었습니다.");
    setShowAlert(true);
    setAdjustDialogOpen(false);
    setSelectedItem(null);
    setAdjustForm({
      type: "입고",
      quantity: 0,
      reason: "",
      notes: "",
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 재고 현황 카드 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                  }}
                >
                  <InventoryIcon />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    총 재고 가치
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    ₩{getTotalInventoryValue().toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#fff3e0",
                    color: "#f57c00",
                  }}
                >
                  <WarningIcon />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    재고 부족 상품
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {getLowStockCount()}개
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#ffebee",
                    color: "#d32f2f",
                  }}
                >
                  <TrendingDownIcon />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    품절 상품
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {getOutOfStockCount()}개
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#e8f5e8",
                    color: "#2e7d32",
                  }}
                >
                  <TrendingUpIcon />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    총 상품 수
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {stockItems.length}개
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 탭 네비게이션 */}
      <Paper sx={{ borderRadius: 3, mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: "#F5EFEA",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                color: "#ef9942",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#ef9942",
            },
          }}
        >
          <Tab label="재고 현황" />
          <Tab label="재고 이동 기록" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {/* 재고 현황 탭 */}
          <Box sx={{ p: 3 }}>
            {/* 검색 */}
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#2d2a27", fontWeight: 600 }}
              >
                재고 현황
              </Typography>
              <TextField
                size="small"
                placeholder="상품명으로 검색"
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

            {/* 재고 테이블 */}
            <TableContainer sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      상품명
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      현재 재고
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      예약 재고
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      가용 재고
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      상태
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      마지막 업데이트
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      작업
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {item.productName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            공급업체: {item.supplier}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {item.currentStock}개
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            최소: {item.minStock}개
                          </Typography>
                        </TableCell>
                        <TableCell>{item.reservedStock}개</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            color={
                              item.availableStock > 0 ? "text.primary" : "error"
                            }
                          >
                            {item.availableStock}개
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            color={getStatusColor(item.status)}
                            variant={
                              item.status === "충분" ? "filled" : "outlined"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(item.lastUpdated).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleAdjustStock(item)}
                            sx={{
                              borderColor: "#ef9942",
                              color: "#ef9942",
                              "&:hover": {
                                backgroundColor: "#fdecdb",
                                borderColor: "#e08830",
                              },
                            }}
                          >
                            재고 조정
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              labelRowsPerPage="페이지당 행 수:"
              labelDisplayedRows={({ from, to, count }) =>
                `${count}개 중 ${from}-${to}`
              }
            />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* 재고 이동 기록 탭 */}
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#2d2a27", fontWeight: 600, mb: 3 }}
            >
              재고 이동 기록
            </Typography>

            <TableContainer sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      날짜
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      상품명
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      유형
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      수량
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      사유
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                    >
                      처리자
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockMovements.map((movement) => {
                    const product = stockItems.find(
                      (item) => item.productId === movement.productId
                    );
                    return (
                      <TableRow key={movement.id} hover>
                        <TableCell>
                          {new Date(movement.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {product?.productName || "알 수 없음"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={movement.type}
                            size="small"
                            color={
                              movement.type === "입고"
                                ? "success"
                                : movement.type === "출고"
                                  ? "info"
                                  : movement.type === "반품"
                                    ? "warning"
                                    : "default"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color={
                              movement.quantity > 0
                                ? "success.main"
                                : "error.main"
                            }
                            fontWeight={500}
                          >
                            {movement.quantity > 0 ? "+" : ""}
                            {movement.quantity}개
                          </Typography>
                        </TableCell>
                        <TableCell>{movement.reason}</TableCell>
                        <TableCell>{movement.userId}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
      </Paper>

      {/* 재고 조정 다이얼로그 */}
      <Dialog
        open={adjustDialogOpen}
        onClose={() => setAdjustDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>재고 조정</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="body2" color="text.secondary">
              상품: {selectedItem?.productName}
            </Typography>
            <Typography variant="body2">
              현재 재고: {selectedItem?.currentStock}개
            </Typography>

            <FormControl fullWidth>
              <InputLabel>조정 유형</InputLabel>
              <Select
                value={adjustForm.type}
                onChange={(e) =>
                  setAdjustForm((prev) => ({
                    ...prev,
                    type: e.target.value as StockMovementType,
                  }))
                }
                label="조정 유형"
              >
                {STOCK_MOVEMENT_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="수량"
              type="number"
              value={adjustForm.quantity}
              onChange={(e) =>
                setAdjustForm((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }))
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">개</InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="사유"
              value={adjustForm.reason}
              onChange={(e) =>
                setAdjustForm((prev) => ({ ...prev, reason: e.target.value }))
              }
              required
            />

            <TextField
              fullWidth
              label="메모"
              multiline
              rows={2}
              value={adjustForm.notes}
              onChange={(e) =>
                setAdjustForm((prev) => ({ ...prev, notes: e.target.value }))
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdjustDialogOpen(false)}>취소</Button>
          <Button
            onClick={handleSubmitAdjustment}
            variant="contained"
            sx={{
              backgroundColor: "#ef9942",
              "&:hover": { backgroundColor: "#e08830" },
            }}
          >
            조정 완료
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
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InventoryManagement;
