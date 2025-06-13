// src/components/ProductManagement/components/CouponManagement.tsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ko } from "date-fns/locale";

interface Coupon {
  id: string;
  name: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  usageCount: number;
  createdAt: Date;
}

interface CouponFormData {
  name: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
}

const CouponManagement: React.FC = () => {
  // 상태 관리
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      name: "여름맞이 15% 할인",
      code: "SUMMER15",
      discountType: "percentage",
      discountValue: 15,
      minOrderAmount: 30000,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-08-31"),
      isActive: true,
      usageCount: 42,
      createdAt: new Date("2024-05-15"),
    },
    {
      id: "2",
      name: "신규 고객 5천원 할인",
      code: "NEW5000",
      discountType: "fixed",
      discountValue: 5000,
      minOrderAmount: 20000,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      isActive: true,
      usageCount: 18,
      createdAt: new Date("2024-01-01"),
    },
  ]);

  const [formData, setFormData] = useState<CouponFormData>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minOrderAmount: 0,
    startDate: null,
    endDate: null,
    isActive: true,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 쿠폰 코드 자동 생성 함수
  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // 폼 데이터 변경 처리
  const handleFormChange = (field: keyof CouponFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 쿠폰 등록/수정 제출
  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.code ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setAlertMessage("모든 필수 항목을 입력해주세요.");
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }

    if (editingCoupon) {
      // 수정
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === editingCoupon.id
            ? {
                ...coupon,
                ...formData,
                startDate: formData.startDate!,
                endDate: formData.endDate!,
              }
            : coupon
        )
      );
      setAlertMessage("쿠폰이 수정되었습니다.");
    } else {
      // 새 쿠폰 등록
      const newCoupon: Coupon = {
        id: Date.now().toString(),
        ...formData,
        startDate: formData.startDate!,
        endDate: formData.endDate!,
        usageCount: 0,
        createdAt: new Date(),
      };
      setCoupons((prev) => [...prev, newCoupon]);
      setAlertMessage("쿠폰이 등록되었습니다.");
    }

    setAlertSeverity("success");
    setShowAlert(true);
    handleDialogClose();
  };

  // 다이얼로그 닫기
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCoupon(null);
    setFormData({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
      minOrderAmount: 0,
      startDate: null,
      endDate: null,
      isActive: true,
    });
  };

  // 쿠폰 수정
  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      name: coupon.name,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      isActive: coupon.isActive,
    });
    setIsDialogOpen(true);
  };

  // 쿠폰 삭제
  const handleDelete = (couponId: string) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId));
    setAlertMessage("쿠폰이 삭제되었습니다.");
    setAlertSeverity("success");
    setShowAlert(true);
  };

  // 쿠폰 코드 복사
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setAlertMessage("쿠폰 코드가 복사되었습니다.");
    setAlertSeverity("success");
    setShowAlert(true);
  };

  // 페이지네이션
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <Box sx={{ p: 2 }}>
        {/* 헤더 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ color: "#2d2a27", fontWeight: 600 }}>
            쿠폰 관리
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsDialogOpen(true)}
            sx={{
              backgroundColor: "#ef9942",
              "&:hover": { backgroundColor: "#d6853c" },
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            새 쿠폰 등록
          </Button>
        </Box>

        {/* 쿠폰 목록 */}
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    쿠폰명
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    쿠폰 코드
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    할인 정보
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    최소 주문금액
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    사용 기간
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    상태
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    사용 횟수
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f9fafb", fontWeight: 600 }}
                  >
                    관리
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((coupon) => (
                    <TableRow key={coupon.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {coupon.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontFamily: "monospace" }}
                          >
                            {coupon.code}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleCopyCode(coupon.code)}
                            sx={{ color: "#5c5752" }}
                          >
                            <CopyIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}% 할인`
                            : `${coupon.discountValue.toLocaleString()}원 할인`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {coupon.minOrderAmount.toLocaleString()}원
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {coupon.startDate.toLocaleDateString()} ~<br />
                          {coupon.endDate.toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={coupon.isActive ? "활성" : "비활성"}
                          size="small"
                          color={coupon.isActive ? "success" : "default"}
                          variant={coupon.isActive ? "filled" : "outlined"}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ color: "#ef9942", fontWeight: 500 }}
                        >
                          {coupon.usageCount}회
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(coupon)}
                            sx={{ color: "#5c5752" }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(coupon.id)}
                            sx={{ color: "#f44336" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={coupons.length}
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

        {/* 쿠폰 등록/수정 다이얼로그 */}
        <Dialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingCoupon ? "쿠폰 수정" : "새 쿠폰 등록"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {/* 쿠폰 이름 */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="쿠폰 이름"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="예: 여름맞이 15% 할인"
                  required
                />
              </Grid>

              {/* 쿠폰 코드 */}
              <Grid size={{ xs: 8 }}>
                <TextField
                  fullWidth
                  label="쿠폰 코드"
                  value={formData.code}
                  onChange={(e) =>
                    handleFormChange("code", e.target.value.toUpperCase())
                  }
                  placeholder="예: SUMMER15"
                  required
                  inputProps={{ style: { fontFamily: "monospace" } }}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleFormChange("code", generateCouponCode())}
                  sx={{ height: "56px", textTransform: "none" }}
                >
                  자동 생성
                </Button>
              </Grid>

              {/* 할인 유형 */}
              <Grid size={{ xs: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>할인 유형</InputLabel>
                  <Select
                    value={formData.discountType}
                    onChange={(e) =>
                      handleFormChange("discountType", e.target.value)
                    }
                    label="할인 유형"
                  >
                    <MenuItem value="percentage">정률 할인 (%)</MenuItem>
                    <MenuItem value="fixed">정액 할인 (원)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* 할인 값 */}
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label={`할인 ${formData.discountType === "percentage" ? "율" : "금액"}`}
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) =>
                    handleFormChange("discountValue", Number(e.target.value))
                  }
                  InputProps={{
                    endAdornment:
                      formData.discountType === "percentage" ? "%" : "원",
                  }}
                />
              </Grid>

              {/* 최소 주문 금액 */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="최소 주문 금액"
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) =>
                    handleFormChange("minOrderAmount", Number(e.target.value))
                  }
                  InputProps={{ endAdornment: "원" }}
                />
              </Grid>

              {/* 사용 기간 - DatePicker 사용 */}
              <Grid size={{ xs: 6 }}>
                <DatePicker
                  label="시작일"
                  value={formData.startDate}
                  onChange={(date: Date | null) =>
                    handleFormChange("startDate", date)
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: false,
                      helperText: "",
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <DatePicker
                  label="종료일"
                  value={formData.endDate}
                  onChange={(date: Date | null) =>
                    handleFormChange("endDate", date)
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: false,
                      helperText: "",
                    },
                  }}
                />
              </Grid>

              {/* 활성화 상태 */}
              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) =>
                        handleFormChange("isActive", e.target.checked)
                      }
                    />
                  }
                  label="쿠폰 활성화"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>취소</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#ef9942",
                "&:hover": { backgroundColor: "#d6853c" },
              }}
            >
              {editingCoupon ? "수정" : "등록"}
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

export default CouponManagement;
