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
  IconButton,
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
  isActive: boolean; // 속성 추가
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
  isActive: boolean; // 필드는 유지하되 UI에서만 숨김
}

// 쿠폰 삭제 확인 다이얼로그를 위한 상태 타입
interface DeleteConfirmState {
  open: boolean;
  couponToDelete: Coupon | null;
  inputCode: string;
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
      isActive: true, // 추가
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
      isActive: true, // 추가
      usageCount: 18,
      createdAt: new Date("2024-01-01"),
    },
  ]);

  // 쿠폰 활성화 필드 제거된 폼 데이터 (isActive는 내부적으로 유지)
  const [formData, setFormData] = useState<CouponFormData>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minOrderAmount: 0,
    startDate: null,
    endDate: null,
    isActive: true, // 기본값으로 항상 활성 상태
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  // 페이지네이션 - 고정값으로 변경
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; // 고정값으로 설정

  // 쿠폰 삭제 확인 다이얼로그 상태
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState>({
    open: false,
    couponToDelete: null,
    inputCode: "",
  });

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
      // 수정 (formData의 isActive 값 사용 - 기존 값 유지됨)
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
      // 새 쿠폰 등록 (기본값으로 활성 상태)
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
      isActive: true, // 기본값 유지
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
      isActive: coupon.isActive, // 기존 값 유지
    });
    setIsDialogOpen(true);
  };

  // 쿠폰 삭제 버튼 클릭 (확인 다이얼로그 열기)
  const handleDeleteClick = (coupon: Coupon) => {
    setDeleteConfirm({
      open: true,
      couponToDelete: coupon,
      inputCode: "",
    });
  };

  // 쿠폰 삭제 확인 다이얼로그 닫기
  const handleDeleteConfirmClose = () => {
    setDeleteConfirm({
      open: false,
      couponToDelete: null,
      inputCode: "",
    });
  };

  // 쿠폰 삭제 실행
  const handleDeleteConfirm = () => {
    if (deleteConfirm.couponToDelete) {
      setCoupons((prev) =>
        prev.filter((coupon) => coupon.id !== deleteConfirm.couponToDelete!.id)
      );
      setAlertMessage("쿠폰이 삭제되었습니다.");
      setAlertSeverity("success");
      setShowAlert(true);
      handleDeleteConfirmClose();
    }
  };

  // 쿠폰 코드 복사
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setAlertMessage("쿠폰 코드가 복사되었습니다.");
    setAlertSeverity("success");
    setShowAlert(true);
  };

  // 페이지네이션 (행 수 변경 제거)
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 삭제 버튼 활성화 체크
  const isDeleteButtonEnabled =
    deleteConfirm.inputCode === deleteConfirm.couponToDelete?.code;

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

        {/* 쿠폰 목록 (상태, 사용 횟수 컬럼 제거) */}
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
                        <Typography variant="body2" color="text.secondary">
                          {coupon.startDate.toLocaleDateString()} ~{" "}
                          {coupon.endDate.toLocaleDateString()}
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
                            onClick={() => handleDeleteClick(coupon)}
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

          {/* 페이지네이션 (5개 고정, 행 수 선택 완전 제거) */}
          <TablePagination
            component="div"
            count={coupons.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelDisplayedRows={({ from, to, count }) =>
              `${count}개 중 ${from}-${to}`
            }
            showFirstButton
            showLastButton
            sx={{
              "& .MuiTablePagination-selectLabel": {
                display: "none",
              },
              "& .MuiTablePagination-select": {
                display: "none",
              },
              "& .MuiTablePagination-selectIcon": {
                display: "none",
              },
            }}
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

              {/* 활성화 상태 체크박스 - 제거됨 */}
              {/* 기존에 있던 FormControlLabel with Switch 제거 */}
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

        {/* 쿠폰 삭제 확인 다이얼로그 */}
        <Dialog
          open={deleteConfirm.open}
          onClose={handleDeleteConfirmClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ color: "#d32f2f", fontWeight: 600 }}>
            쿠폰 삭제 확인
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>{deleteConfirm.couponToDelete?.name}</strong> 쿠폰을
                삭제하시겠습니까?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                삭제하시려면 아래에 쿠폰 코드를 정확히 입력해주세요.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                쿠폰 코드: <strong>{deleteConfirm.couponToDelete?.code}</strong>
              </Typography>
              <TextField
                fullWidth
                label="쿠폰 코드를 입력하세요"
                value={deleteConfirm.inputCode}
                onChange={(e) =>
                  setDeleteConfirm((prev) => ({
                    ...prev,
                    inputCode: e.target.value,
                  }))
                }
                placeholder={deleteConfirm.couponToDelete?.code}
                sx={{ mt: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmClose}>취소</Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              disabled={!isDeleteButtonEnabled}
              sx={{
                "&:disabled": {
                  backgroundColor: "#e0e0e0",
                  color: "#9e9e9e",
                },
              }}
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

export default CouponManagement;
