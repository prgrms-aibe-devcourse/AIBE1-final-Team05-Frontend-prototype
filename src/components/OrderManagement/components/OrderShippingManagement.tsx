// src/components/OrderManagement/components/OrderShippingManagement.tsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  SelectChangeEvent,
} from "@mui/material";
import {
  Info as InfoIcon,
  Error as ErrorIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Order,
  OrderSummary,
  UrgentTasks,
  OrderFilter,
  ShippingStatus,
  DateRange,
  SHIPPING_STATUS_LABELS,
  SEARCH_CONDITIONS,
  DATE_RANGES,
} from "@/components/OrderManagement/types/order.types";

// Mock 데이터 - 주문 취소 상태 추가
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1001",
    orderDate: "2024-07-25",
    customerName: "김민수",
    productName: "수제 닭가슴살 간식",
    quantity: 3,
    amount: 45000,
    shippingStatus: "payment_completed",
    customerPhone: "010-1234-5678",
    shippingAddress: "서울시 강남구 테헤란로 123",
  },
  {
    id: "2",
    orderNumber: "#1002",
    orderDate: "2024-07-24",
    customerName: "이영희",
    productName: "고양이 참치 간식",
    quantity: 2,
    amount: 28000,
    shippingStatus: "preparing",
  },
  {
    id: "3",
    orderNumber: "#1003",
    orderDate: "2024-07-23",
    customerName: "박철수",
    productName: "강아지 소고기 육포",
    quantity: 1,
    amount: 15000,
    shippingStatus: "ready_to_ship",
  },
  {
    id: "4",
    orderNumber: "#1004",
    orderDate: "2024-07-22",
    customerName: "최지영",
    productName: "수제 연어 간식",
    quantity: 4,
    amount: 52000,
    shippingStatus: "shipping",
    trackingNumber: "123456789",
    shippingCompany: "CJ대한통운",
  },
  {
    id: "5",
    orderNumber: "#1005",
    orderDate: "2024-07-21",
    customerName: "정민호",
    productName: "고양이 치킨 간식",
    quantity: 1,
    amount: 18000,
    shippingStatus: "order_cancelled", // 주문 취소 상태
  },
];

const mockUrgentTasks: UrgentTasks = {
  delayRequests: 3,
  longTermUndelivered: 1,
};

// 배송 상태별 색상 정의 (주문 취소 추가)
const statusColorMap: Record<
  ShippingStatus | "order_cancelled",
  {
    label: string;
    color: "primary" | "warning" | "info" | "secondary" | "success" | "error";
  }
> = {
  payment_completed: { label: "주문확인", color: "primary" },
  preparing: { label: "상품준비중", color: "warning" },
  ready_to_ship: { label: "배송 지시", color: "info" },
  shipping: { label: "운송장 등록", color: "secondary" },
  delivered: { label: "배송완료", color: "success" },
  pending_confirmation: { label: "확인 대기", color: "error" },
  order_cancelled: { label: "주문 취소", color: "error" },
};

const OrderShippingManagement: React.FC = () => {
  const [filter, setFilter] = useState<OrderFilter>({
    dateRange: "30days",
    startDate: "",
    endDate: "",
    shippingStatus: "all",
    searchCondition: "customer_name",
    searchKeyword: "",
    directShippingOnly: false,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 상태 편집 관련 상태
  const [statusEditDialog, setStatusEditDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] =
    useState<ShippingStatus>("payment_completed");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shippingCompany, setShippingCompany] = useState("");

  // 주문 취소 확인 다이얼로그
  const [cancelConfirmDialog, setCancelConfirmDialog] = useState(false);

  // 알림
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  // 배송사 목록
  const shippingCompanies = [
    "CJ대한통운",
    "우체국택배",
    "롯데택배",
    "한진택배",
    "로젠택배",
  ];

  // 이벤트 핸들러들
  const handleFilterChange =
    (field: keyof OrderFilter) =>
    (event: SelectChangeEvent<string | boolean>) => {
      const value = event.target.value;
      setFilter((prev: OrderFilter) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleTextFieldChange =
    (field: keyof OrderFilter) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFilter((prev: OrderFilter) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 상태 편집 버튼 클릭
  const handleStatusEdit = (order: Order) => {
    setSelectedOrder(order);

    // 주문 취소 상태인 경우 삭제 확인 다이얼로그 표시
    if (order.shippingStatus === "order_cancelled") {
      setCancelConfirmDialog(true);
    } else {
      // 일반 주문인 경우 상태 변경 다이얼로그 표시
      setNewStatus(order.shippingStatus);
      setTrackingNumber(order.trackingNumber || "");
      setShippingCompany(order.shippingCompany || "");
      setStatusEditDialog(true);
    }
  };

  // 상태 변경 제출
  const handleStatusSubmit = () => {
    if (!selectedOrder) return;

    // 운송장 등록 선택 시 필수 필드 검증
    if (newStatus === "shipping" && (!trackingNumber || !shippingCompany)) {
      setAlertMessage("택배사와 운송장 번호를 입력해주세요.");
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }

    // 실제로는 API 호출하여 상태 업데이트
    console.log("상태 변경:", {
      orderId: selectedOrder.id,
      newStatus,
      trackingNumber: newStatus === "shipping" ? trackingNumber : undefined,
      shippingCompany: newStatus === "shipping" ? shippingCompany : undefined,
    });

    setAlertMessage("배송 상태가 변경되었습니다.");
    setAlertSeverity("success");
    setShowAlert(true);
    setStatusEditDialog(false);
    setSelectedOrder(null);
  };

  // 취소된 주문 삭제 확인
  const handleCancelledOrderDelete = () => {
    if (!selectedOrder) return;

    // 실제로는 API 호출하여 주문 삭제
    console.log("취소된 주문 삭제:", selectedOrder.id);

    setAlertMessage("취소된 주문이 목록에서 삭제되었습니다.");
    setAlertSeverity("success");
    setShowAlert(true);
    setCancelConfirmDialog(false);
    setSelectedOrder(null);
  };

  const getStatusChip = (status: ShippingStatus | "order_cancelled") => {
    const statusConfig = statusColorMap[status];
    return (
      <Chip
        label={statusConfig.label}
        color={statusConfig.color}
        size="small"
        variant="outlined"
      />
    );
  };

  // 주문 요약 계산 (주문 취소 제외)
  const orderSummary: OrderSummary = mockOrders
    .filter((order) => order.shippingStatus !== "order_cancelled")
    .reduce(
      (acc, order) => {
        switch (order.shippingStatus) {
          case "payment_completed":
            acc.paymentCompleted++;
            break;
          case "preparing":
            acc.preparing++;
            break;
          case "ready_to_ship":
            acc.readyToShip++;
            break;
          case "shipping":
            acc.shipping++;
            break;
          case "delivered":
            acc.delivered++;
            break;
        }
        return acc;
      },
      {
        paymentCompleted: 0,
        preparing: 0,
        readyToShip: 0,
        shipping: 0,
        delivered: 0,
      }
    );

  // 필터링된 주문 목록
  const filteredOrders = mockOrders.filter((order) => {
    // 배송 상태 필터
    if (
      filter.shippingStatus !== "all" &&
      order.shippingStatus !== filter.shippingStatus
    ) {
      return false;
    }

    // 검색 키워드 필터
    if (filter.searchKeyword) {
      const searchField =
        filter.searchCondition === "customer_name"
          ? order.customerName
          : filter.searchCondition === "order_number"
            ? order.orderNumber
            : filter.searchCondition === "product_name"
              ? order.productName
              : order.customerName;
      return searchField
        .toLowerCase()
        .includes(filter.searchKeyword.toLowerCase());
    }
    return true;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "none", width: "100%" }}>
      {/* 페이지 헤더 - 불필요한 UI 레이아웃 제거 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#2d2a27", mb: 1 }}
        >
          배송관리
        </Typography>
      </Box>

      {/* 우선 처리 알림 */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#2d2a27", mb: 2 }}
        >
          먼저 확인하고 처리해주세요!
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: 1, borderColor: "#e0e0e0", borderRadius: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    출고지연요청
                  </Typography>
                  <InfoIcon sx={{ fontSize: 16, color: "#bdbdbd" }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#ef9942", mb: 1 }}
                >
                  {mockUrgentTasks.delayRequests}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ErrorIcon sx={{ fontSize: 12, color: "#f44336" }} />
                  <Typography variant="caption" sx={{ color: "#f44336" }}>
                    출고지시 완료해야 발송지연됩니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: 1, borderColor: "#e0e0e0", borderRadius: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    장기미배송
                  </Typography>
                  <InfoIcon sx={{ fontSize: 16, color: "#bdbdbd" }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#ef9942", mb: 1 }}
                >
                  {mockUrgentTasks.longTermUndelivered}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ErrorIcon sx={{ fontSize: 12, color: "#f44336" }} />
                  <Typography variant="caption" sx={{ color: "#f44336" }}>
                    7일 이상 배송중 상태입니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* 주문 현황 요약 */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#2d2a27", mb: 2 }}
        >
          주문 현황
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={2.4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: "#1976d2", fontWeight: 600 }}
              >
                {orderSummary.paymentCompleted}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                주문확인
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: "#ed6c02", fontWeight: 600 }}
              >
                {orderSummary.preparing}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                상품준비중
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: "#0288d1", fontWeight: 600 }}
              >
                {orderSummary.readyToShip}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                배송지시
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: "#9c27b0", fontWeight: 600 }}
              >
                {orderSummary.shipping}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                운송장등록
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: "#2e7d32", fontWeight: 600 }}
              >
                {orderSummary.delivered}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                배송완료
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* 필터 및 검색 */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>기간</InputLabel>
              <Select
                value={filter.dateRange}
                onChange={handleFilterChange("dateRange")}
                label="기간"
              >
                {DATE_RANGES.map((range) => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>배송상태</InputLabel>
              <Select
                value={filter.shippingStatus}
                onChange={handleFilterChange("shippingStatus")}
                label="배송상태"
              >
                <MenuItem value="all">전체</MenuItem>
                {Object.entries(SHIPPING_STATUS_LABELS).map(
                  ([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  )
                )}
                <MenuItem value="order_cancelled">주문 취소</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>검색조건</InputLabel>
              <Select
                value={filter.searchCondition}
                onChange={handleFilterChange("searchCondition")}
                label="검색조건"
              >
                {SEARCH_CONDITIONS.map((condition) => (
                  <MenuItem key={condition.value} value={condition.value}>
                    {condition.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="검색어를 입력하세요"
              value={filter.searchKeyword}
              onChange={handleTextFieldChange("searchKeyword")}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#ef9942",
                "&:hover": { backgroundColor: "#d6853c" },
                height: "40px",
              }}
            >
              검색
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* 주문 목록 테이블 */}
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  주문번호
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  주문일
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  고객명
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  상품명
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  수량
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  금액
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  배송 상태
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}>
                  관리
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.orderNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.orderDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.productName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.quantity}개
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.amount.toLocaleString()}원
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(order.shippingStatus as any)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleStatusEdit(order)}
                        sx={{
                          textTransform: "none",
                          fontSize: "0.75rem",
                          color:
                            order.shippingStatus === "order_cancelled"
                              ? "#f44336"
                              : "#ef9942",
                          borderColor:
                            order.shippingStatus === "order_cancelled"
                              ? "#f44336"
                              : "#ef9942",
                        }}
                      >
                        상태 편집
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
          count={filteredOrders.length}
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

      {/* 상태 변경 다이얼로그 */}
      <Dialog
        open={statusEditDialog}
        onClose={() => setStatusEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>배송 상태 변경</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                주문번호: {selectedOrder.orderNumber}
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>배송 상태</InputLabel>
                <Select
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(e.target.value as ShippingStatus)
                  }
                  label="배송 상태"
                >
                  <MenuItem value="payment_completed">주문확인</MenuItem>
                  <MenuItem value="preparing">상품준비중</MenuItem>
                  <MenuItem value="ready_to_ship">배송 지시</MenuItem>
                  <MenuItem value="shipping">운송장 등록</MenuItem>
                </Select>
              </FormControl>

              {/* 운송장 등록 선택 시 추가 폼 */}
              {newStatus === "shipping" && (
                <Box>
                  {selectedOrder.shippingAddress && (
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        p: 2,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 1,
                      }}
                    >
                      배송지: {selectedOrder.shippingAddress}
                    </Typography>
                  )}

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>택배사</InputLabel>
                    <Select
                      value={shippingCompany}
                      onChange={(e) => setShippingCompany(e.target.value)}
                      label="택배사"
                    >
                      {shippingCompanies.map((company) => (
                        <MenuItem key={company} value={company}>
                          {company}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="운송장 번호"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="운송장 번호를 입력하세요"
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusEditDialog(false)}>취소</Button>
          <Button
            onClick={handleStatusSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#ef9942",
              "&:hover": { backgroundColor: "#d6853c" },
            }}
          >
            변경
          </Button>
        </DialogActions>
      </Dialog>

      {/* 주문 취소 확인 다이얼로그 */}
      <Dialog
        open={cancelConfirmDialog}
        onClose={() => setCancelConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>취소된 주문</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ py: 2 }}>
            취소된 주문입니다. 주문 목록에서 삭제할까요?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelConfirmDialog(false)}>취소</Button>
          <Button
            onClick={handleCancelledOrderDelete}
            variant="contained"
            color="error"
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      {/* 알림 스낵바 */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
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

export default OrderShippingManagement;
