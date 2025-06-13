// src/components/OrderManagement/components/OrderShippingManagement.tsx

import React, { useState, useMemo } from "react";
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
  FormControlLabel,
  Checkbox,
  Radio,
} from "@mui/material";
import {
  Info as InfoIcon,
  Error as ErrorIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ko } from "date-fns/locale";
import {
  Order,
  OrderSummary,
  UrgentTasks,
  OrderFilter,
  ShippingStatus,
  SHIPPING_STATUS_LABELS,
  SEARCH_CONDITIONS,
} from "@/components/OrderManagement/types/order.types";

// Mock 데이터 - 개선된 샘플 데이터
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
    shippingStatus: "delay_requested",
    delayReason: "원재료 공급 지연으로 인한 제작 지연",
  },
  {
    id: "4",
    orderNumber: "#1004",
    orderDate: "2024-07-22",
    customerName: "최지영",
    productName: "수제 연어 간식",
    quantity: 4,
    amount: 52000,
    shippingStatus: "ready_to_ship",
  },
  {
    id: "5",
    orderNumber: "#1005",
    orderDate: "2024-07-21",
    customerName: "정민호",
    productName: "고양이 치킨 간식",
    quantity: 1,
    amount: 18000,
    shippingStatus: "shipping",
    trackingNumber: "123456789",
    shippingCompany: "CJ대한통운",
  },
  {
    id: "6",
    orderNumber: "#1006",
    orderDate: "2024-07-20",
    customerName: "홍길동",
    productName: "강아지 연어 간식",
    quantity: 2,
    amount: 24000,
    shippingStatus: "in_transit",
    trackingNumber: "987654321",
    shippingCompany: "우체국택배",
  },
  {
    id: "7",
    orderNumber: "#1007",
    orderDate: "2024-07-19",
    customerName: "장영수",
    productName: "수제 소고기 간식",
    quantity: 1,
    amount: 22000,
    shippingStatus: "delivered",
    trackingNumber: "456789123",
    shippingCompany: "롯데택배",
  },
  {
    id: "8",
    orderNumber: "#1008",
    orderDate: "2024-07-18",
    customerName: "김수정",
    productName: "고양이 치킨 간식",
    quantity: 3,
    amount: 32000,
    shippingStatus: "order_cancelled",
  },
];

const mockUrgentTasks: UrgentTasks = {
  delayRequests: 1, // 실제 데이터와 연동
  longTermUndelivered: 0,
};

// 배송 상태별 색상 정의 (신규 상태 포함)
const statusColorMap: Record<
  ShippingStatus | "order_cancelled" | "delay_requested",
  {
    label: string;
    color: "primary" | "warning" | "info" | "secondary" | "success" | "error";
  }
> = {
  payment_completed: { label: "주문확인", color: "primary" },
  preparing: { label: "상품준비중", color: "warning" },
  delay_requested: { label: "출고지연중", color: "error" },
  ready_to_ship: { label: "배송지시", color: "info" },
  shipping: { label: "운송장등록", color: "secondary" },
  in_transit: { label: "배송중", color: "info" },
  delivered: { label: "배송완료", color: "success" },
  order_cancelled: { label: "주문 취소", color: "error" },
};

const OrderShippingManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

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
  const [isDelayRequested, setIsDelayRequested] = useState(false);
  const [delayReason, setDelayReason] = useState("");

  // 주문 취소 확인 다이얼로그
  const [cancelConfirmDialog, setCancelConfirmDialog] = useState(false);

  // 알림
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  // 날짜 선택 상태
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // 배송사 목록
  const shippingCompanies = [
    "CJ대한통운",
    "우체국택배",
    "롯데택배",
    "한진택배",
    "로젠택배",
  ];

  // 주문 현황 계산 (실제 데이터와 연동)
  const orderSummary: OrderSummary = useMemo(() => {
    const summary = orders
      .filter((order) => order.shippingStatus !== "order_cancelled")
      .reduce(
        (acc, order) => {
          switch (order.shippingStatus) {
            case "payment_completed":
              acc.paymentCompleted++;
              break;
            case "preparing":
            case "delay_requested": // 출고 지연중도 상품준비중에 포함
              acc.preparing++;
              break;
            case "ready_to_ship":
              acc.readyToShip++;
              break;
            case "shipping":
              acc.shipping++;
              break;
            case "in_transit":
              acc.inTransit++;
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
          inTransit: 0,
          delivered: 0,
        }
      );
    return summary;
  }, [orders]);

  // 출고 지연 요청 개수 계산
  const delayRequestedCount = useMemo(() => {
    return orders.filter((order) => order.shippingStatus === "delay_requested")
      .length;
  }, [orders]);

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

  const handleDateRangeClick = (range: "today" | "7days" | "30days") => {
    setFilter((prev) => ({ ...prev, dateRange: range }));
    // 실제로는 날짜 범위에 따라 startDate, endDate를 자동 설정
    const today = new Date();
    const endDate = new Date(today);
    let startDate = new Date(today);

    switch (range) {
      case "today":
        break;
      case "7days":
        startDate.setDate(today.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(today.getDate() - 30);
        break;
    }

    setStartDate(startDate);
    setEndDate(endDate);
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
      setNewStatus(order.shippingStatus as ShippingStatus);
      setTrackingNumber(order.trackingNumber || "");
      setShippingCompany(order.shippingCompany || "");
      setIsDelayRequested(order.shippingStatus === "delay_requested");
      setDelayReason(order.delayReason || "");
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

    // 출고 지연 요청 시 사유 입력 검증
    if (isDelayRequested && !delayReason.trim()) {
      setAlertMessage("출고 지연 사유를 입력해주세요.");
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }

    // 주문 상태 업데이트 (실시간 반영)
    const updatedOrder: Order = {
      ...selectedOrder,
      shippingStatus: isDelayRequested ? "delay_requested" : newStatus,
      trackingNumber:
        newStatus === "shipping" || newStatus === "in_transit"
          ? trackingNumber
          : selectedOrder.trackingNumber,
      shippingCompany:
        newStatus === "shipping" || newStatus === "in_transit"
          ? shippingCompany
          : selectedOrder.shippingCompany,
      delayReason: isDelayRequested ? delayReason : selectedOrder.delayReason,
    };

    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? updatedOrder : order
      )
    );

    setAlertMessage("배송 상태가 변경되었습니다.");
    setAlertSeverity("success");
    setShowAlert(true);
    setStatusEditDialog(false);
    setSelectedOrder(null);
    setIsDelayRequested(false);
    setDelayReason("");
  };

  // 취소된 주문 삭제 확인
  const handleCancelledOrderDelete = () => {
    if (!selectedOrder) return;

    setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id));

    setAlertMessage("취소된 주문이 목록에서 삭제되었습니다.");
    setAlertSeverity("success");
    setShowAlert(true);
    setCancelConfirmDialog(false);
    setSelectedOrder(null);
  };

  // 검색 초기화
  const handleResetFilters = () => {
    setFilter({
      dateRange: "30days",
      startDate: "",
      endDate: "",
      shippingStatus: "all",
      searchCondition: "customer_name",
      searchKeyword: "",
      directShippingOnly: false,
    });
    setStartDate(null);
    setEndDate(null);
  };

  const getStatusChip = (
    status: ShippingStatus | "order_cancelled" | "delay_requested"
  ) => {
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

  // 필터링된 주문 목록
  const filteredOrders = orders.filter((order) => {
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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "none", width: "100%" }}>
        {/* 페이지 헤더 */}
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
            <Grid size={{ xs: 12, md: 6 }}>
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
                    {delayRequestedCount}
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
            <Grid size={{ xs: 12, md: 6 }}>
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

        {/* 주문 현황 요약 (동적 데이터 연동) */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#2d2a27", mb: 2 }}
          >
            주문 현황
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 2 }}>
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
            <Grid size={{ xs: 6, md: 2 }}>
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
            <Grid size={{ xs: 6, md: 2 }}>
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
            <Grid size={{ xs: 6, md: 2 }}>
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
            <Grid size={{ xs: 6, md: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#0288d1", fontWeight: 600 }}
                >
                  {orderSummary.inTransit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  배송중
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
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

        {/* 개편된 검색 영역 */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#2d2a27", mb: 2 }}
          >
            주문 검색
          </Typography>

          {/* 첫째 줄: 주문일 */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              주문일
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant={
                  filter.dateRange === "today" ? "contained" : "outlined"
                }
                onClick={() => handleDateRangeClick("today")}
                size="small"
              >
                오늘
              </Button>
              <Button
                variant={
                  filter.dateRange === "7days" ? "contained" : "outlined"
                }
                onClick={() => handleDateRangeClick("7days")}
                size="small"
              >
                7일
              </Button>
              <Button
                variant={
                  filter.dateRange === "30days" ? "contained" : "outlined"
                }
                onClick={() => handleDateRangeClick("30days")}
                size="small"
              >
                30일
              </Button>
              <DatePicker
                label="시작일"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { minWidth: 140 },
                  },
                }}
              />
              <Typography variant="body2">~</Typography>
              <DatePicker
                label="종료일"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { minWidth: 140 },
                  },
                }}
              />
            </Box>
          </Box>

          {/* 둘째 줄: 배송상태 (라디오 버튼으로 변경) */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              배송상태
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <FormControlLabel
                control={
                  <Radio
                    checked={filter.shippingStatus === "all"}
                    onChange={() =>
                      setFilter((prev) => ({ ...prev, shippingStatus: "all" }))
                    }
                    value="all"
                  />
                }
                label="전체"
              />
              {Object.entries(SHIPPING_STATUS_LABELS).map(([value, label]) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Radio
                      checked={filter.shippingStatus === value}
                      onChange={() =>
                        setFilter((prev) => ({
                          ...prev,
                          shippingStatus: value as any,
                        }))
                      }
                      value={value}
                    />
                  }
                  label={label}
                />
              ))}
            </Box>
          </Box>

          {/* 셋째 줄: 검색 조건 */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              검색 조건
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={filter.searchCondition}
                  onChange={handleFilterChange("searchCondition")}
                >
                  {SEARCH_CONDITIONS.map((condition) => (
                    <MenuItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                size="small"
                placeholder="검색어를 입력하세요"
                value={filter.searchKeyword}
                onChange={handleTextFieldChange("searchKeyword")}
                sx={{ minWidth: 250 }}
              />
            </Box>
          </Box>

          {/* 하단 버튼 */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={handleResetFilters}
              sx={{ textTransform: "none" }}
            >
              초기화
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ef9942",
                "&:hover": { backgroundColor: "#d6853c" },
                textTransform: "none",
              }}
            >
              검색
            </Button>
          </Box>
        </Paper>

        {/* 주문 목록 테이블 */}
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    주문번호
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    주문일
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    고객명
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    상품명
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    수량
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    금액
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    배송 상태
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
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
                        <Typography variant="body2">
                          {order.orderDate}
                        </Typography>
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
                        {order.delayReason && (
                          <Typography
                            variant="caption"
                            sx={{ color: "#f44336", display: "block" }}
                          >
                            지연사유: {order.delayReason}
                          </Typography>
                        )}
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

        {/* 상태 변경 다이얼로그 (출고 지연 요청 기능 포함) */}
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

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>배송 상태</InputLabel>
                  <Select
                    value={newStatus}
                    onChange={(e) => {
                      setNewStatus(e.target.value as ShippingStatus);
                      // 상품준비중이 아닌 상태로 변경하면 출고 지연 요청 해제
                      if (e.target.value !== "preparing") {
                        setIsDelayRequested(false);
                      }
                    }}
                    label="배송 상태"
                  >
                    <MenuItem value="payment_completed">주문확인</MenuItem>
                    <MenuItem value="preparing">상품준비중</MenuItem>
                    <MenuItem value="ready_to_ship">배송 지시</MenuItem>
                    <MenuItem value="shipping">운송장 등록</MenuItem>
                    <MenuItem value="in_transit">배송중</MenuItem>
                    <MenuItem value="delivered">배송완료</MenuItem>
                  </Select>
                </FormControl>

                {/* 출고 지연 요청 체크박스 (상품준비중일 때만 표시) */}
                {newStatus === "preparing" && (
                  <Box sx={{ mb: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isDelayRequested}
                          onChange={(e) =>
                            setIsDelayRequested(e.target.checked)
                          }
                        />
                      }
                      label="출고 지연 요청"
                    />
                  </Box>
                )}

                {/* 출고 지연 사유 입력 (출고 지연 요청 체크 시 표시) */}
                {isDelayRequested && (
                  <TextField
                    fullWidth
                    label="지연 사유"
                    multiline
                    rows={3}
                    value={delayReason}
                    onChange={(e) => setDelayReason(e.target.value)}
                    placeholder="출고 지연 사유를 입력해주세요"
                    sx={{ mb: 2 }}
                  />
                )}

                {/* 운송장 등록/배송중 선택 시 추가 폼 */}
                {(newStatus === "shipping" || newStatus === "in_transit") && (
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
    </LocalizationProvider>
  );
};

export default OrderShippingManagement;
