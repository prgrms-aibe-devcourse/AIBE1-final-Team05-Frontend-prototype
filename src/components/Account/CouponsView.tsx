"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Tabs,
    Tab,
    Alert
} from "@mui/material"
import {
    LocalOffer,
    AccessTime,
    CheckCircle
} from "@mui/icons-material"
import CouponCard from "./CouponCard"
import Pagination from "../common/Pagination"
import type { CouponCategory } from "./index"
import { mockCoupons } from "@/data/mock-data.ts"

const CouponsView: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<CouponCategory>("all")
    const [couponCode, setCouponCode] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [showAlert, setShowAlert] = useState(false)
    const itemsPerPage = 6

    const filteredCoupons = useMemo(() => {
        switch (activeCategory) {
            case "available":
                return mockCoupons.filter(c => c.status === "available" && !c.isExpiringSoon)
            case "expiring":
                return mockCoupons.filter(c => c.isExpiringSoon)
            case "used-expired":
                return mockCoupons.filter(c => c.status === "used" || c.status === "expired")
            default:
                return mockCoupons
        }
    }, [activeCategory])

    const paginatedCoupons = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredCoupons.slice(startIndex, endIndex)
    }, [filteredCoupons, currentPage])

    const couponCounts = useMemo(() => ({
        available: mockCoupons.filter(c => c.status === "available" && !c.isExpiringSoon).length,
        expiring: mockCoupons.filter(c => c.isExpiringSoon).length,
        usedExpired: mockCoupons.filter(c => c.status === "used" || c.status === "expired").length,
        total: mockCoupons.length
    }), [])

    const handleCategoryChange = (_: React.SyntheticEvent, newValue: CouponCategory) => {
        setActiveCategory(newValue)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleCouponCodeSubmit = () => {
        if (couponCode.trim()) {
            setShowAlert(true)
            setCouponCode("")
            setTimeout(() => setShowAlert(false), 3000)
        }
    }

    const handleUseCoupon = (couponId: string) => {
        console.log("쿠폰 사용:", couponId)
    }

    return (
        <Box>
            <Typography variant="h5" fontWeight={600} mb={4}>
                나의 쿠폰함
            </Typography>

            {/* 쿠폰 현황 카드 */}
            <Grid container spacing={3} mb={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card style={{ height: "100%" }}>
                        <CardContent style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}>
                            <CheckCircle style={{ fontSize: 48, color: "#4CAF50", marginBottom: 16 }} />
                            <Typography variant="h6" mb={1}>
                                사용가능한 쿠폰
                            </Typography>
                            <Typography variant="h2" fontWeight={700} style={{ color: "#4CAF50" }}>
                                {couponCounts.available}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                개
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card style={{ height: "100%" }}>
                        <CardContent style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}>
                            <AccessTime style={{ fontSize: 48, color: "#FF9800", marginBottom: 16 }} />
                            <Typography variant="h6" mb={1}>
                                만료임박 쿠폰
                            </Typography>
                            <Typography variant="h2" fontWeight={700} style={{ color: "#FF9800" }}>
                                {couponCounts.expiring}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                개
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 쿠폰 코드 입력 */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" mb={2} sx={{ display: "flex", alignItems: "center" }}>
                        <LocalOffer sx={{ mr: 1 }} />
                        할인쿠폰 코드 입력란
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        보유하신 쿠폰 코드를 입력해주세요.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="쿠폰 코드를 입력하세요"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleCouponCodeSubmit()}
                        />
                        <Button
                            variant="contained"
                            onClick={handleCouponCodeSubmit}
                            sx={{ minWidth: 100, backgroundColor: "#4CAF50" }}
                        >
                            등록
                        </Button>
                    </Box>
                    {showAlert && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            쿠폰 코드가 등록되었습니다.
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* 카테고리 탭 */}
            <Box mb={3}>
                <Tabs
                    value={activeCategory}
                    onChange={handleCategoryChange}
                    TabIndicatorProps={{ style: { backgroundColor: "#FDBF60" } }}
                >
                    <Tab
                        label={`사용가능 (${couponCounts.available})`}
                        value="available"
                        sx={{
                            color: activeCategory === "available" ? "#4A2C2A" : undefined,
                            fontWeight: activeCategory === "available" ? 600 : undefined
                        }}
                    />
                    <Tab
                        label={`만료임박 (${couponCounts.expiring})`}
                        value="expiring"
                        sx={{
                            color: activeCategory === "expiring" ? "#4A2C2A" : undefined,
                            fontWeight: activeCategory === "expiring" ? 600 : undefined
                        }}
                    />
                    <Tab
                        label={`사용완료·기간만료 (${couponCounts.usedExpired})`}
                        value="used-expired"
                        sx={{
                            color: activeCategory === "used-expired" ? "#4A2C2A" : undefined,
                            fontWeight: activeCategory === "used-expired" ? 600 : undefined
                        }}
                    />
                    <Tab
                        label={`전체 쿠폰 (${couponCounts.total})`}
                        value="all"
                        sx={{
                            color: activeCategory === "all" ? "#4A2C2A" : undefined,
                            fontWeight: activeCategory === "all" ? 600 : undefined
                        }}
                    />
                </Tabs>
            </Box>

            {/* 쿠폰 목록 */}
            {paginatedCoupons.length > 0 ? (
                <>
                    <Grid container spacing={3}>
                        {paginatedCoupons.map((coupon) => (
                            <Grid key={coupon.id} size={{ xs: 12, md: 6, lg: 4 }}>
                                <CouponCard coupon={coupon} onUse={handleUseCoupon} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* 페이지네이션 */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredCoupons.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <LocalOffer sx={{ fontSize: 64, color: "#e0e0e0", mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        해당 카테고리에 쿠폰이 없습니다.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default CouponsView
