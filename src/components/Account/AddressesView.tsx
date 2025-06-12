"use client"

import type React from "react"
import { Box, Typography, Button, Card, CardContent, Chip, IconButton, Paper, Grid } from "@mui/material"
import { Add, Edit, Delete, Map } from "@mui/icons-material"
import type { Address } from "./index"

interface AddressesViewProps {
    addresses: Address[]
    handleEditAddress: (address: Address) => void
    handleDeleteAddress: (id: string) => void
    setAddressDialogOpen: (open: boolean) => void
}

const AddressesView: React.FC<AddressesViewProps> = ({
                                                         addresses,
                                                         handleEditAddress,
                                                         handleDeleteAddress,
                                                         setAddressDialogOpen,
                                                     }) => {
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
                    주소 관리
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setAddressDialogOpen(true)}>
                    새 주소 추가
                </Button>
            </Box>

            <Grid container spacing={3}>
                {addresses.map((address) => (
                    <Grid size={{ xs: 12, md: 6 }} key={address.id}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                                    <Chip label={address.label} color="primary" size="small" />
                                    <Box>
                                        <IconButton size="small" onClick={() => handleEditAddress(address)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDeleteAddress(address.id)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {address.fullName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    {address.address}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    {address.city}, {address.postalCode}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {address.phoneNumber}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {addresses.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Paper
                            sx={{
                                p: 8,
                                textAlign: "center",
                                border: "2px dashed #d6d3d1",
                            }}
                        >
                            <Map sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                등록된 주소가 없습니다
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                자주 사용하는 주소를 등록해보세요
                            </Typography>
                            <Button variant="contained" startIcon={<Add />} onClick={() => setAddressDialogOpen(true)}>
                                첫 번째 주소 추가하기
                            </Button>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default AddressesView