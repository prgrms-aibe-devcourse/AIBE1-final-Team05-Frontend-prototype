"use client"

import type React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material"
import type { Address } from "./index"

interface AddressDialogProps {
    open: boolean
    onClose: () => void
    editingAddress: Address | null
    newAddress: {
        label: string
        fullName: string
        address: string
        city: string
        postalCode: string
        phoneNumber: string
    }
    setNewAddress: (address: any) => void
    onSubmit: () => void
}

const AddressDialog: React.FC<AddressDialogProps> = ({
                                                         open,
                                                         onClose,
                                                         editingAddress,
                                                         newAddress,
                                                         setNewAddress,
                                                         onSubmit,
                                                     }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{editingAddress ? "주소 수정" : "새 주소 추가"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="주소 라벨"
                            value={newAddress.label}
                            onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                            placeholder="예: 집, 회사, 부모님댁"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="받는 분 이름"
                            value={newAddress.fullName}
                            onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="주소"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="도시"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="우편번호"
                            value={newAddress.postalCode}
                            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="전화번호"
                            value={newAddress.phoneNumber}
                            onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>취소</Button>
                <Button onClick={onSubmit} variant="contained">
                    {editingAddress ? "수정" : "추가"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddressDialog
