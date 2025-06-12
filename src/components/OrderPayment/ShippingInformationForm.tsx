"use client"

import type React from "react"
import { Card, CardContent, Typography, Button, Box, TextField, Grid } from "@mui/material"
import { Map } from "@mui/icons-material"

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
    return (
        <Card style={{ marginBottom: 32, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent style={{ padding: 32 }}>
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <Typography variant="h5" component="h2" style={{ fontWeight: 600, color: "#1b150e" }}>
                        Shipping Information
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
                        Load Saved Address
                    </Button>
                </Box>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={shippingInfo.fullName}
                            onChange={(e) => onShippingInfoChange("fullName", e.target.value)}
                            placeholder="Enter your full name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            value={shippingInfo.address}
                            onChange={(e) => onShippingInfoChange("address", e.target.value)}
                            placeholder="Enter your street address"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="City"
                            value={shippingInfo.city}
                            onChange={(e) => onShippingInfoChange("city", e.target.value)}
                            placeholder="Enter your city"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Postal Code"
                            value={shippingInfo.postalCode}
                            onChange={(e) => onShippingInfoChange("postalCode", e.target.value)}
                            placeholder="Enter your postal code"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            type="tel"
                            value={shippingInfo.phoneNumber}
                            onChange={(e) => onShippingInfoChange("phoneNumber", e.target.value)}
                            placeholder="Enter your phone number"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ShippingInformationForm