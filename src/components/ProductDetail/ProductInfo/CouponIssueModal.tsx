// src/components/ProductDetail/ProductInfo/CouponIssueModal.tsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
    Grid,
    Alert,
    Divider,
    IconButton,
} from "@mui/material";
import { Close, LocalOffer, CheckCircle } from "@mui/icons-material";
import ProductCouponCard, { ProductCoupon } from "./ProductCouponCard"; // 상품 전용 쿠폰 카드

interface CouponIssueModalProps {
    open: boolean;
    onClose: () => void;
    productId: string;
    productName: string;
}

// Mock 쿠폰 데이터 (실제로는 상품 ID에 따라 API에서 가져올 데이터)
const getAvailableCouponsForProduct = (productId: string): ProductCoupon[] => {
    return [
        {
            id: `product-${productId}-1`,
            title: "신규회원 첫 구매 15% 할인",
            description: "처음 구매하시는 신규 회원분들을 위한 특별 할인 혜택입니다.",
            discountType: "percentage",
            discountValue: 15,
            minOrderAmount: 30000,
            expiryDate: "2025-07-15T23:59:59",
            category: "신규회원",
            sellerName: "펫푸드 전문점",
            maxIssueCount: 100,
            currentIssueCount: 87,
        },
        {
            id: `product-${productId}-2`,
            title: "브랜드 전용 5천원 할인",
            description: "이 브랜드의 모든 상품에 사용할 수 있는 할인쿠폰입니다.",
            discountType: "fixed",
            discountValue: 5000,
            minOrderAmount: 20000,
            expiryDate: "2025-06-30T23:59:59",
            category: "브랜드",
            sellerName: "펫푸드 전문점",
        },
        {
            id: `product-${productId}-3`,
            title: "무료배송 쿠폰",
            description: "배송비 걱정 없이 주문하세요! 무료배송 혜택을 드립니다.",
            discountType: "fixed",
            discountValue: 3000,
            minOrderAmount: 15000,
            expiryDate: "2025-08-31T23:59:59",
            category: "배송",
            sellerName: "펫푸드 전문점",
            maxIssueCount: 50,
            currentIssueCount: 45,
        },
    ];
};

const CouponIssueModal: React.FC<CouponIssueModalProps> = ({
                                                               open,
                                                               onClose,
                                                               productId,
                                                               productName,
                                                           }) => {
    const [issuedCoupons, setIssuedCoupons] = useState<Set<string>>(new Set());
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const availableCoupons = getAvailableCouponsForProduct(productId);

    const handleIssueCoupon = (couponId: string) => {
        // 쿠폰 발급 로직 (API 호출)
        console.log("쿠폰 발급:", { couponId, productId, productName });

        setIssuedCoupons(prev => new Set([...prev, couponId]));
        setShowSuccessAlert(true);

        // 3초 후 성공 알림 숨기기
        setTimeout(() => setShowSuccessAlert(false), 3000);
    };

    const handleIssueAllCoupons = () => {
        const newIssuedCoupons = new Set(availableCoupons.map(coupon => coupon.id));
        setIssuedCoupons(newIssuedCoupons);
        setShowSuccessAlert(true);

        console.log("모든 쿠폰 발급:", {
            coupons: availableCoupons.map(c => c.id),
            productId,
            productName
        });

        setTimeout(() => setShowSuccessAlert(false), 3000);
    };

    const handleClose = () => {
        setIssuedCoupons(new Set());
        setShowSuccessAlert(false);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight: "90vh",
                }
            }}
        >
            {/* 헤더 */}
            <DialogTitle sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 2
            }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalOffer sx={{ color: "primary.main" }} />
                    <Typography variant="h6" fontWeight={600}>
                        쿠폰 발급받기
                    </Typography>
                </Box>
                <IconButton onClick={handleClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <Divider />

            {/* 콘텐츠 */}
            <DialogContent sx={{ py: 3 }}>
                {/* 상품 정보 */}
                <Box sx={{
                    backgroundColor: "grey.100",
                    p: 2,
                    borderRadius: 1,
                    mb: 3
                }}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                        상품명
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                        {productName}
                    </Typography>
                </Box>

                {/* 성공 알림 */}
                {showSuccessAlert && (
                    <Alert
                        severity="success"
                        sx={{ mb: 3 }}
                        icon={<CheckCircle />}
                    >
                        쿠폰이 성공적으로 발급되었습니다! 마이페이지 &gt; 쿠폰함에서 확인하세요.
                    </Alert>
                )}

                {/* 설명 텍스트 */}
                <Typography variant="body2" color="text.secondary" mb={3}>
                    이 상품에 사용할 수 있는 쿠폰을 발급받으세요.
                    발급받은 쿠폰은 마이페이지의 쿠폰함에서 확인할 수 있습니다.
                </Typography>

                {/* 쿠폰 목록 */}
                <Grid container spacing={3}>
                    {availableCoupons.map((coupon) => {
                        const isIssued = issuedCoupons.has(coupon.id);

                        return (
                            <Grid key={coupon.id} size={{ xs: 12, md: 6 }}>
                                <ProductCouponCard
                                    coupon={coupon}
                                    isIssued={isIssued}
                                    onIssue={handleIssueCoupon}
                                    productId={productId}
                                />
                            </Grid>
                        );
                    })}
                </Grid>

                {/* 쿠폰이 없는 경우 */}
                {availableCoupons.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 6 }}>
                        <LocalOffer sx={{ fontSize: 64, color: "#e0e0e0", mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" mb={1}>
                            발급 가능한 쿠폰이 없습니다
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            다른 상품을 확인해보세요.
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            {/* 액션 버튼 */}
            {availableCoupons.length > 0 && (
                <>
                    <Divider />
                    <DialogActions sx={{ p: 3, gap: 1 }}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{
                                minWidth: 100,
                                color: "text.secondary",
                                borderColor: "grey.300",
                            }}
                        >
                            닫기
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleIssueAllCoupons}
                            disabled={issuedCoupons.size === availableCoupons.length}
                            sx={{
                                minWidth: 120,
                                backgroundColor: "primary.main",
                                "&:hover": {
                                    backgroundColor: "primary.dark",
                                },
                            }}
                        >
                            {issuedCoupons.size === availableCoupons.length
                                ? "모두 발급완료"
                                : "모든 쿠폰 발급받기"
                            }
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default CouponIssueModal;