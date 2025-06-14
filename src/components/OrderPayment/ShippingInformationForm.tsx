"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, Typography, Button, Box, TextField, Grid } from "@mui/material"
import { Map } from "@mui/icons-material"
import AddressSearchDialog, { type AddressSearchResult } from "./AddressSearchDialog"
import AddressSearchField from "./AddressSearchField"

interface ShippingInfo {
    fullName: string
    address: string
    city: string
    postalCode: string
    phoneNumber: string
}

interface ShippingInformationFormProps {
    shippingInfo: ShippingInfo
    onShippingInfoChange: (field: keyof ShippingInfo, value: string) => void
    onLoadSavedAddress: () => void
}

const ShippingInformationForm: React.FC<ShippingInformationFormProps> = ({
                                                                             shippingInfo,
                                                                             onShippingInfoChange,
                                                                             onLoadSavedAddress,
                                                                         }) => {
    const [addressSearchOpen, setAddressSearchOpen] = useState(false)

    const handleAddressSelect = (selectedAddress: AddressSearchResult) => {
        onShippingInfoChange("address", selectedAddress.address)
        onShippingInfoChange("postalCode", selectedAddress.postalCode)
        onShippingInfoChange("city", selectedAddress.city)
    }

    return (
        <>
            <Card style={{ marginBottom: 32, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <CardContent style={{ padding: 32 }}>
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                        <Typography variant="h5" component="h2" style={{ fontWeight: 600, color: "#1b150e" }}>
                            배송 정보
                        </Typography>
                        <Button
                            startIcon={<Map />}
                            color="primary"
                            variant="text"
                            size="small"
                            onClick={onLoadSavedAddress}
                            style={{
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "0.875rem",
                            }}
                        >
                            저장된 주소 불러오기
                        </Button>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="받는분 이름"
                                value={shippingInfo.fullName}
                                onChange={(e) => onShippingInfoChange("fullName", e.target.value)}
                                placeholder="이름을 입력하세요"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <AddressSearchField
                                value={shippingInfo.address}
                                onSearchClick={() => setAddressSearchOpen(true)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="시/도"
                                value={shippingInfo.city}
                                placeholder="주소 검색 시 자동 입력됩니다"
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="우편번호"
                                value={shippingInfo.postalCode}
                                placeholder="주소 검색 시 자동 입력됩니다"
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="휴대폰 번호"
                                type="tel"
                                value={shippingInfo.phoneNumber}
                                onChange={(e) => onShippingInfoChange("phoneNumber", e.target.value)}
                                placeholder="휴대폰 번호를 입력하세요"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <AddressSearchDialog
                open={addressSearchOpen}
                onClose={() => setAddressSearchOpen(false)}
                onSelectAddress={handleAddressSelect}
            />
        </>
    )
}

export default ShippingInformationForm