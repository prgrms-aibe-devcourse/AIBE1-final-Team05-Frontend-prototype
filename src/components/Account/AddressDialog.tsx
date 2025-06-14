"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material"
import AddressSearchField from "@/components/OrderPayment/AddressSearchField"
import AddressSearchDialog from "@/components/OrderPayment/AddressSearchDialog"
import type { Address } from "./index"
import type { AddressSearchResult } from "@/components/OrderPayment/AddressSearchDialog"

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
    setNewAddress: (address: {
        label: string
        fullName: string
        address: string
        city: string
        postalCode: string
        phoneNumber: string
    }) => void
    onSubmit: () => void
}

const INITIAL_ADDRESS = {
    label: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
}


const AddressDialog: React.FC<AddressDialogProps> = ({
                                                         open,
                                                         onClose,
                                                         editingAddress,
                                                         newAddress,
                                                         setNewAddress,
                                                         onSubmit,
                                                     }) => {
    const [searchDialogOpen, setSearchDialogOpen] = useState(false)

    const handleAddressSearch = () => {
        setSearchDialogOpen(true)
    }

    const handleAddressSelect = (addressResult: AddressSearchResult) => {
        setNewAddress({
            ...newAddress,
            address: addressResult.address,
            city: addressResult.city,
            postalCode: addressResult.postalCode,
        })
        setSearchDialogOpen(false)
    }

    const handleSearchDialogClose = () => {
        setSearchDialogOpen(false)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
                disableAutoFocus
                disableEnforceFocus
            >
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
                            <AddressSearchField
                                value={newAddress.address}
                                onSearchClick={handleAddressSearch}
                                label="주소"
                                placeholder="주소 검색 버튼을 클릭하여 정확한 주소를 찾아보세요"
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                fullWidth
                                label="시/도"
                                value={newAddress.city}
                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                disabled
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                fullWidth
                                label="우편번호"
                                value={newAddress.postalCode}
                                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                disabled
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
                    <Button
                        onClick={() => {
                            setNewAddress(INITIAL_ADDRESS)
                            onClose()
                        }}
                    >취소</Button>
                    <Button onClick={onSubmit} variant="contained">
                        {editingAddress ? "수정" : "추가"}
                    </Button>
                </DialogActions>
            </Dialog>

            <AddressSearchDialog
                open={searchDialogOpen}
                onClose={handleSearchDialogClose}
                onSelectAddress={handleAddressSelect}
            />
        </>
    )
}

export default AddressDialog