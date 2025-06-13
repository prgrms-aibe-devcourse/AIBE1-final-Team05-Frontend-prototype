"use client"

import type React from "react"
import {
    Box,
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import { Delete as DeleteIcon, Compare as CompareIcon } from "@mui/icons-material"
import type { CartItem as CartItemType } from "./types/cart.types"
import CartItem from "./CartItem"

interface CartItemListProps {
    cartItems: CartItemType[]
    selectAll: boolean
    onSelectAll: () => void
    onItemSelect: (id: string) => void
    onQuantityChange: (id: string, quantity: number) => void
    onRemoveItem: (id: string) => void
    onRemoveSelected: () => void
    onCompareSelected: () => void
}

const CartItemList: React.FC<CartItemListProps> = ({
                                                       cartItems,
                                                       selectAll,
                                                       onSelectAll,
                                                       onItemSelect,
                                                       onQuantityChange,
                                                       onRemoveItem,
                                                       onRemoveSelected,
                                                       onCompareSelected,
                                                   }) => {
    return (
        <>
            <Paper
                sx={{
                    overflow: "hidden",
                    border: "1px solid #F3EADD",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    },
                }}
            >
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: "#f9f6f2" }}>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectAll}
                                        onChange={onSelectAll}
                                        sx={{
                                            color: "#e89830",
                                            "&.Mui-checked": { color: "#e89830" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 600,
                                        color: "#57493a",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    제품
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 600,
                                        color: "#57493a",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    금액
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 600,
                                        color: "#57493a",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    수량
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 600,
                                        color: "#57493a",
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    총 금액
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onSelect={onItemSelect}
                                    onQuantityChange={onQuantityChange}
                                    onRemove={onRemoveItem}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* 액션 버튼들 */}
            <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={onRemoveSelected}
                    sx={{
                        borderColor: "#e7ddd0",
                        color: "#57493a",
                        textTransform: "none",
                        borderRadius: "8px",
                        "&:hover": {
                            borderColor: "#e89830",
                            bgcolor: "#f9f6f2",
                            color: "#1b150e",
                        },
                    }}
                >
                    선택한 제품 삭제
                </Button>
                <Button
                    variant="contained"
                    startIcon={<CompareIcon />}
                    onClick={onCompareSelected}
                    sx={{
                        bgcolor: "#e89830",
                        textTransform: "none",
                        borderRadius: "8px",
                        "&:hover": { bgcolor: "#d18727" },
                    }}
                >
                    AI 제품 비교
                </Button>
            </Box>
        </>
    )
}

export default CartItemList
