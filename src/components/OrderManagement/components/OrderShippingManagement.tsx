// src/components/OrderManagement/components/OrderShippingManagement.tsx

import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ko } from "date-fns/locale";
import {
  Order,
  OrderFilter,
  OrderSummary,
  SearchCondition,
} from "../types/order.types";

// 개편된 목업 데이터 (구매자 주소 추가, 상태 변경)
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1001",
    orderDate: "2024-07-25",
    customerName: "김민지",
    productName: "유기농 치킨 간식",
    quantity: 2,
    amount: 15000,
    shippingStatus: "payment_completed",
    customerPhone: "010-1234-5678",
    shippingAddress: "서울특별시 강남구 테헤란로 123, 101동 501호", // 추가
  },
  {
    id: "2",
    orderNumber: "#1002",
    orderDate: "2024-07-24",
    customerName: "이준호",
    productName: "수제 소고기 간식",
    quantity: 1,
    amount: 22000,
    shippingStatus: "preparing",
    customerPhone: "010-2345-6789",
    shippingAddress: "경기도 성남시 분당구 판교로 456, 202동 301호", // 추가
  },
  {
    id: "3",
    orderNumber: "#1003",
    orderDate: "2024-07-23",
    customerName: "박수현",
    productName: "고양이 참치 간식",
    quantity: 3,
    amount: 18000,
    shippingStatus: "delay_requested",
    customerPhone: "010-3456-7890",
    shippingAddress: "부산광역시 해운대구 센텀로 789, 303동 201호", // 추가
    delayReason: "원재료 수급 지연",
  },
  {
    id: "4",
    orderNumber: "#1004",
    orderDate: "2024-07-22",
    customerName: "최영수",
    productName: "강아지 덴탈껌",
    quantity: 1,
    amount: 12000,
    shippingStatus: "ready_for_delivery", // 통합된 상태로 변경
    customerPhone: "010-4567-8901",
    shippingAddress: "대구광역시 수성구 동대구로 321, 104동 801호", // 추가
  },
  {
    id: "5",
    orderNumber: "#1005",
    orderDate: "2024-07-21",
    customerName: "정하영",
    productName: "고양이 연어 간식",
    quantity: 1,
    amount: 18000,
    shippingStatus: "ready_for_delivery", // 통합된 상태로 변경
    customerPhone: "010-5678-9012",
    shippingAddress: "인천광역시 연수구 송도대로 654, 205동 501호", // 추가
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
    customerPhone: "010-6789-0123",
    shippingAddress: "광주광역시 서구 상무대로 987, 106동 301호", // 추가
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
    customerPhone: "010-7890-1234",
    shippingAddress: "대전광역시 유성구 대학로 147, 207동 702호", // 추가
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
    customerPhone: "010-8901-2345",
    shippingAddress: "울산광역시 남구 삼산로 258, 108동 401호", // 추가
  },
];

// 개편된 배송 상태별 색상 정의
const statusColorMap: Record<
  string,
  {
    label: string;
    color: "primary" | "warning" | "info" | "secondary" | "success" | "error";
  }
> = {
  payment_completed: { label: "주문확인", color: "primary" },
  preparing: { label: "상품준비중", color: "warning" },
  delay_requested: { label: "출고지연중", color: "error" },
  ready_for_delivery: { label: "배송준비 완료", color: "info" }, // 통합된 새 상태
  in_transit: { label: "배송중", color: "secondary" },
  delivered: { label: "배송완료", color: "success" },
  order_cancelled: { label: "주문 취소", color: "error" },
};

const OrderShippingManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const [filter, setFilter] = useState<OrderFilter>({
    dateRange: "30days",
    startDate: "",
    endDate: "",
    shippingStatus: ["all"], // 배열로 변경
    searchCondition: "customer_name",
    searchKeyword: "",
    directShippingOnly: false,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 상태 편집 관련 상태
  const [statusEditDialog, setStatusEditDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("payment_completed");
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

  // 개편된 주문 현황 계산 (ready_for_delivery로 통합)
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
            case "ready_for_delivery": // 통합된 상태
              acc.readyForDelivery++;
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
          readyForDelivery: 0,
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

  // 배송상태 체크박스 다중 선택 핸들러
  const handleShippingStatusChange = (value: string) => {
    setFilter((prev) => {
      let newShippingStatus = [...prev.shippingStatus];

      if (value === "all") {
        // "전체" 선택 시 모든 선택 해제
        newShippingStatus = ["all"];
      } else {
        // "전체"가 선택되어 있다면 제거
        if (newShippingStatus.includes("all")) {
          newShippingStatus = newShippingStatus.filter((s) => s !== "all");
        }

        // 해당 값이 이미 선택되어 있다면 제거, 없다면 추가
        if (newShippingStatus.includes(value)) {
          newShippingStatus = newShippingStatus.filter((s) => s !== value);
        } else {
          newShippingStatus.push(value);
        }

        // 아무것도 선택되지 않았다면 "전체" 선택
        if (newShippingStatus.length === 0) {
          newShippingStatus = ["all"];
        }
      }

      return {
        ...prev,
        shippingStatus: newShippingStatus,
      };
    });
  };

  const handleDateRangeClick = (range: "today" | "7days" | "30days") => {
    setFilter((prev) => ({ ...prev, dateRange: range }));
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

  // 상태 편집 버튼 클릭 (출고지연중 처리 개선)
  const handleStatusEdit = (order: Order) => {
    setSelectedOrder(order);

    // 주문 취소 상태인 경우 삭제 확인 다이얼로그 표시
    if (order.shippingStatus === "order_cancelled") {
      setCancelConfirmDialog(true);
    } else {
      // 출고지연중 상태인 경우 기본값 설정
      if (order.shippingStatus === "delay_requested") {
        setNewStatus("preparing"); // 상품준비중으로 설정
        setIsDelayRequested(true); // 출고 지연 요청 체크
        setDelayReason(order.delayReason || "");
      } else {
        // 일반 주문인 경우
        setNewStatus(order.shippingStatus);
        setIsDelayRequested(false);
        setDelayReason("");
      }

      setTrackingNumber(order.trackingNumber || "");
      setShippingCompany(order.shippingCompany || "");
      setStatusEditDialog(true);
    }
  };

  // 상태 변경 제출
  const handleStatusSubmit = () => {
    if (!selectedOrder) return;

    // 배송중 선택 시 운송장 정보 필수 검증 (변경된 시점)
    if (newStatus === "in_transit" && (!trackingNumber || !shippingCompany)) {
      setAlertMessage(
        "배송중으로 변경하려면 택배사와 운송장 번호를 입력해주세요."
      );
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
        newStatus === "in_transit" // 배송중일 때만 운송장 정보 업데이트
          ? trackingNumber
          : selectedOrder.trackingNumber,
      shippingCompany:
        newStatus === "in_transit" // 배송중일 때만 배송사 정보 업데이트
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
      shippingStatus: ["all"], // 배열로 변경
      searchCondition: "customer_name",
      searchKeyword: "",
      directShippingOnly: false,
    });
    setStartDate(null);
    setEndDate(null);
  };

  const getStatusChip = (status: string) => {
    const statusConfig = statusColorMap[status] || {
      label: status,
      color: "default" as const,
    };
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
    // 배송 상태 필터 (다중 선택 지원)
    if (
      !filter.shippingStatus.includes("all") &&
      !filter.shippingStatus.includes(order.shippingStatus)
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

      if (
        !searchField.toLowerCase().includes(filter.searchKeyword.toLowerCase())
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
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
            주문/배송 관리
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#5c5752", fontSize: "1rem" }}
          >
            주문 현황을 확인하고 배송 상태를 관리하세요.
          </Typography>
        </Box>

        {/* 긴급 처리 현황 */}
        {delayRequestedCount > 0 && (
          <Alert
            severity="warning"
            icon={<WarningIcon />}
            sx={{ mb: 3, borderRadius: 3 }}
          >
            <Typography variant="body2" fontWeight={600}>
              출고 지연 요청: {delayRequestedCount}건
            </Typography>
            <Typography variant="body2">
              지연 요청된 주문들을 확인하고 처리해주세요.
            </Typography>
          </Alert>
        )}

        {/* 개편된 주문 현황판 */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#2d2a27", mb: 2 }}
          >
            주문 현황
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 2.4 }}>
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
            <Grid size={{ xs: 6, md: 2.4 }}>
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
            <Grid size={{ xs: 6, md: 2.4 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#0288d1", fontWeight: 600 }}
                >
                  {orderSummary.readyForDelivery}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  배송준비 완료
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 2.4 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#9c27b0", fontWeight: 600 }}
                >
                  {orderSummary.inTransit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  배송중
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 2.4 }}>
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

        {/* 기존 방식으로 복원된 검색 영역 */}
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
                onChange={setStartDate}
                slotProps={{ textField: { size: "small", sx: { width: 150 } } }}
              />
              <DatePicker
                label="종료일"
                value={endDate}
                onChange={setEndDate}
                slotProps={{ textField: { size: "small", sx: { width: 150 } } }}
              />
            </Box>
          </Box>

          {/* 둘째 줄: 배송상태 (개편된 상태들로 수정) */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              배송 상태
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "all", label: "전체" },
                { value: "payment_completed", label: "주문확인" },
                { value: "preparing", label: "상품준비중" },
                { value: "delay_requested", label: "출고지연중" },
                { value: "ready_for_delivery", label: "배송준비 완료" },
                { value: "in_transit", label: "배송중" },
                { value: "delivered", label: "배송완료" },
                { value: "order_cancelled", label: "주문 취소" },
              ].map(({ value, label }) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      checked={filter.shippingStatus.includes(value)}
                      onChange={() => handleShippingStatusChange(value)}
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
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      searchCondition: e.target.value as SearchCondition,
                    }))
                  }
                >
                  <MenuItem value="customer_name">주문자명</MenuItem>
                  <MenuItem value="order_number">주문번호</MenuItem>
                  <MenuItem value="product_name">상품명</MenuItem>
                </Select>
              </FormControl>
              <TextField
                size="small"
                placeholder="검색어를 입력하세요"
                value={filter.searchKeyword}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    searchKeyword: e.target.value,
                  }))
                }
                sx={{ minWidth: 250 }}
              />
            </Box>
          </Box>

          {/* 하단 버튼 (검색 버튼 제거, 초기화만 유지) */}
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
          </Box>
        </Paper>

        {/* 주문 목록 테이블 */}
        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
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
                    주문자명
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
                        <Typography variant="body2" fontWeight={500}>
                          {order.orderNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
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
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {order.quantity}개
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {order.amount.toLocaleString()}원
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {getStatusChip(order.shippingStatus)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleStatusEdit(order)}
                          sx={{
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

        {/* 개편된 상태 변경 다이얼로그 */}
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
                      setNewStatus(e.target.value);
                      // 상품준비중이 아닌 상태로 변경하면 출고 지연 요청 해제
                      if (e.target.value !== "preparing") {
                        setIsDelayRequested(false);
                      }
                    }}
                    label="배송 상태"
                  >
                    <MenuItem value="payment_completed">주문확인</MenuItem>
                    <MenuItem value="preparing">상품준비중</MenuItem>
                    <MenuItem value="ready_for_delivery">
                      배송준비 완료
                    </MenuItem>
                    <MenuItem value="in_transit">배송중</MenuItem>
                    {/* 배송완료는 택배사 API로 자동 처리되므로 제거 */}
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

                {/* 운송장 정보 입력 (배송중 선택 시만 표시) */}
                {newStatus === "in_transit" && (
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
                        <strong>배송 주소:</strong>{" "}
                        {selectedOrder.shippingAddress}
                      </Typography>
                    )}

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
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
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="운송장 번호"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          placeholder="운송장 번호를 입력하세요"
                        />
                      </Grid>
                    </Grid>
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
                "&:hover": { backgroundColor: "#e08830" },
              }}
            >
              변경 완료
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
          <DialogTitle>취소된 주문 삭제</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              취소된 주문을 목록에서 삭제하시겠습니까?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              주문번호: {selectedOrder?.orderNumber}
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
    </LocalizationProvider>
  );
};

export default OrderShippingManagement;
