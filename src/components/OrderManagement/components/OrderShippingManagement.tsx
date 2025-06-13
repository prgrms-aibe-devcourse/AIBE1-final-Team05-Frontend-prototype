// src/components/OrderManagement/components/OrderShippingManagement.tsx

import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import {
  Info as InfoIcon,
  Error as ErrorIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
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
} from "../types/order.types";

// 목업 데이터
const mockUrgentTasks: UrgentTasks = {
  delayRequests: 1,
  longTermUndelivered: 0,
};

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1001",
    orderDate: "2024-07-26",
    customerName: "에밀리 카터",
    productName: "유기농 닭가슴살",
    quantity: 2,
    amount: 30000,
    shippingStatus: "pending_confirmation",
  },
  {
    id: "2",
    orderNumber: "#1002",
    orderDate: "2024-07-25",
    customerName: "데이비드 리",
    productName: "연어 간식",
    quantity: 1,
    amount: 15000,
    shippingStatus: "pending_confirmation",
  },
  {
    id: "3",
    orderNumber: "#1003",
    orderDate: "2024-07-24",
    customerName: "김민수",
    productName: "수제 오리 간식",
    quantity: 3,
    amount: 45000,
    shippingStatus: "preparing",
  },
  {
    id: "4",
    orderNumber: "#1004",
    orderDate: "2024-07-23",
    customerName: "박지영",
    productName: "고양이 참치 츄르",
    quantity: 5,
    amount: 25000,
    shippingStatus: "ready_to_ship",
  },
  {
    id: "5",
    orderNumber: "#1005",
    orderDate: "2024-07-22",
    customerName: "이수진",
    productName: "강아지 치킨 져키",
    quantity: 2,
    amount: 18000,
    shippingStatus: "preparing",
  },
  {
    id: "6",
    orderNumber: "#1006",
    orderDate: "2024-07-21",
    customerName: "최영호",
    productName: "고양이 연어 간식",
    quantity: 4,
    amount: 32000,
    shippingStatus: "shipping",
  },
  {
    id: "7",
    orderNumber: "#1007",
    orderDate: "2024-07-20",
    customerName: "정미경",
    productName: "수제 소고기 간식",
    quantity: 1,
    amount: 22000,
    shippingStatus: "delivered",
  },
  {
    id: "8",
    orderNumber: "#1008",
    orderDate: "2024-07-19",
    customerName: "한상우",
    productName: "강아지 양고기 스틱",
    quantity: 3,
    amount: 27000,
    shippingStatus: "ready_to_ship",
  },
  {
    id: "9",
    orderNumber: "#1009",
    orderDate: "2024-07-18",
    customerName: "윤서연",
    productName: "고양이 참치 파우치",
    quantity: 6,
    amount: 36000,
    shippingStatus: "delivered",
  },
  {
    id: "10",
    orderNumber: "#1010",
    orderDate: "2024-07-17",
    customerName: "김태현",
    productName: "강아지 치즈 간식",
    quantity: 2,
    amount: 16000,
    shippingStatus: "preparing",
  },
];

// 배송 상태별 색상 정의
const statusColorMap: Record<
  ShippingStatus,
  {
    label: string;
    color: "primary" | "warning" | "info" | "secondary" | "success" | "error";
  }
> = {
  payment_completed: { label: "결제완료", color: "primary" },
  preparing: { label: "상품준비중", color: "warning" },
  ready_to_ship: { label: "배송지시", color: "info" },
  shipping: { label: "배송중", color: "secondary" },
  delivered: { label: "배송완료", color: "success" },
  pending_confirmation: { label: "확인 대기", color: "error" },
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

  // TextField 전용 핸들러 추가
  const handleTextFieldChange =
    (field: keyof OrderFilter) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFilter((prev: OrderFilter) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleDateRangeChange = (range: DateRange) => {
    setFilter((prev: OrderFilter) => ({
      ...prev,
      dateRange: range,
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

  const getStatusChip = (status: ShippingStatus) => {
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

  // 주문 요약 계산
  const orderSummary: OrderSummary = mockOrders.reduce(
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
              : order.customerName; // recipient_name fallback
      return searchField
        .toLowerCase()
        .includes(filter.searchKeyword.toLowerCase());
    }
    return true;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "none", width: "100%" }}>
      {/* 페이지 헤더 */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#2d2a27", mb: 1 }}
          >
            배송관리
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button size="small" variant="text" sx={{ color: "#1976d2" }}>
              자세히 알아보기
            </Button>
            <Typography variant="body2" sx={{ color: "#8d837a" }}>
              |
            </Typography>
            <Button size="small" variant="text" sx={{ color: "#1976d2" }}>
              이전 버전 사용하기
            </Button>
          </Box>
        </Box>
        <Button size="small" variant="text" sx={{ color: "#1976d2" }}>
          택배픽업 현황 안내보기
        </Button>
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
          <Grid size={{ xs: 6, md: 2.4 }}>
            <Card
              sx={{
                border: 1,
                borderColor: "#e0e0e0",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  결제완료
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#2d2a27" }}
                >
                  {orderSummary.paymentCompleted}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 2.4 }}>
            <Card
              sx={{
                border: 1,
                borderColor: "#e0e0e0",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  상품준비중
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#2d2a27" }}
                >
                  {orderSummary.preparing}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 2.4 }}>
            <Card
              sx={{
                border: 1,
                borderColor: "#e0e0e0",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  배송지시
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#2d2a27" }}
                >
                  {orderSummary.readyToShip}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 2.4 }}>
            <Card
              sx={{
                border: 1,
                borderColor: "#e0e0e0",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  배송중
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#2d2a27" }}
                >
                  {orderSummary.shipping}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 2.4 }}>
            <Card
              sx={{
                border: 1,
                borderColor: "#e0e0e0",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  배송완료
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#2d2a27" }}
                >
                  {orderSummary.delivered}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* 필터 섹션 */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          {/* 주문일 */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              주문일
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 10 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {DATE_RANGES.map((range) => (
                <Button
                  key={range.value}
                  variant={
                    filter.dateRange === range.value ? "contained" : "outlined"
                  }
                  onClick={() =>
                    handleDateRangeChange(range.value as DateRange)
                  }
                  sx={{
                    minWidth: 60,
                    fontSize: "0.75rem",
                    ...(filter.dateRange === range.value && {
                      backgroundColor: "#1976d2",
                      color: "white",
                    }),
                  }}
                >
                  {range.label}
                </Button>
              ))}
              <TextField
                size="small"
                type="date"
                value={filter.startDate}
                onChange={handleTextFieldChange("startDate")} // ✅ 수정됨
                sx={{ width: 140 }}
                InputProps={{ style: { fontSize: "0.75rem" } }}
              />

              <TextField
                size="small"
                type="date"
                value={filter.endDate}
                onChange={handleTextFieldChange("endDate")} // ✅ 수정됨
                sx={{ width: 140 }}
                InputProps={{ style: { fontSize: "0.75rem" } }}
              />
            </Box>
          </Grid>

          {/* 배송상태 */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              배송상태
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 10 }}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={filter.shippingStatus}
                onChange={handleFilterChange("shippingStatus")}
                sx={{ gap: 2 }}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio size="small" />}
                  label={<Typography variant="body2">전체</Typography>}
                />
                {Object.entries(SHIPPING_STATUS_LABELS)
                  .filter(([key]) => key !== "all")
                  .map(([value, label]) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio size="small" />}
                      label={<Typography variant="body2">{label}</Typography>}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* 검색 조건 */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              검색조건
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 10 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={filter.searchCondition}
                  onChange={handleFilterChange("searchCondition")}
                  displayEmpty
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
                onChange={handleTextFieldChange("searchKeyword")} // ✅ 수정됨
                sx={{ width: 200 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.directShippingOnly}
                    onChange={handleFilterChange("directShippingOnly")}
                    size="small"
                  />
                }
                label={<Typography variant="body2">업체직송만</Typography>}
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() =>
              setFilter({
                dateRange: "30days",
                startDate: "",
                endDate: "",
                shippingStatus: "all",
                searchCondition: "customer_name",
                searchKeyword: "",
                directShippingOnly: false,
              })
            }
            sx={{ minWidth: 100 }}
          >
            초기화
          </Button>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              minWidth: 100,
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            검색
          </Button>
        </Box>
      </Paper>

      {/* 주문 목록 테이블 */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  주문 번호
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  주문일
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  고객명
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  상품명
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  수량
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  금액
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  배송상태
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>₩{order.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusChip(order.shippingStatus)}</TableCell>
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
    </Box>
  );
};

export default OrderShippingManagement;
