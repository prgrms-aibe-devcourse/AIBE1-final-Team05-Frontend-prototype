"use client"

import type React from "react"
import { Box, Checkbox, Typography, IconButton, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import type { CartItem as CartItemType } from "./types/cart.types"

interface CartItemListProps {
    cartItems: CartItemType[]
    selectAll: boolean
    onSelectAll: () => void
    onItemSelect: (id: string) => void
    onQuantityChange: (id: string, quantity: number) => void
    onRemoveItem: (id: string) => void
    formatPrice: (price: number) => string
}

const CartItemList: React.FC<CartItemListProps> = ({
                                                       cartItems,
                                                       selectAll,
                                                       onSelectAll,
                                                       onItemSelect,
                                                       onQuantityChange,
                                                       onRemoveItem,
                                                       formatPrice,
                                                   }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #f0f0f0",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            {/* 헤더 */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "50px 1fr 100px 100px 100px 50px",
                    alignItems: "center",
                    p: 2,
                    backgroundColor: "#fafaf8",
                    borderBottom: "1px solid #f0f0f0",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Checkbox
                        checked={selectAll}
                        onChange={onSelectAll}
                        sx={{
                            color: "#ccc",
                            "&.Mui-checked": {
                                color: "#e89830",
                            },
                        }}
                    />
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#666" }}>
                    제품
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#666", textAlign: "center" }}>
                    금액
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#666", textAlign: "center" }}>
                    수량
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#666", textAlign: "center" }}>
                    총 금액
                </Typography>
                <Box />
            </Box>

            {/* 상품 목록 */}
            {cartItems.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "50px 1fr 100px 100px 100px 50px",
                        alignItems: "center",
                        p: 2,
                        borderBottom: "1px solid #f0f0f0",
                        "&:last-child": {
                            borderBottom: "none",
                        },
                    }}
                >
                    {/* 체크박스 */}
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Checkbox
                            checked={item.selected}
                            onChange={() => onItemSelect(item.id)}
                            sx={{
                                color: "#ccc",
                                "&.Mui-checked": {
                                    color: "#e89830",
                                },
                            }}
                        />
                    </Box>

                    {/* 상품 정보 */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                                width: 60,
                                height: 60,
                                objectFit: "cover",
                                borderRadius: 1,
                            }}
                        />
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                                {item.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#888" }}>
                                옵션: {item.option}
                            </Typography>
                        </Box>
                    </Box>

                    {/* 가격 */}
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                        {formatPrice(item.price)}
                    </Typography>

                    {/* 수량 */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconButton
                            size="small"
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            sx={{
                                color: "#888",
                                bgcolor: "#f5f5f5",
                                width: 24,
                                height: 24,
                                "&:hover": { bgcolor: "#e0e0e0" },
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                            variant="body2"
                            sx={{
                                mx: 1,
                                minWidth: "30px",
                                textAlign: "center",
                            }}
                        >
                            {item.quantity}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            sx={{
                                color: "#888",
                                bgcolor: "#f5f5f5",
                                width: 24,
                                height: 24,
                                "&:hover": { bgcolor: "#e0e0e0" },
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    {/* 합계 */}
                    <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "center" }}>
                        {formatPrice(item.price * item.quantity)}
                    </Typography>

                    {/* 삭제 버튼 */}
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton
                            onClick={() => onRemoveItem(item.id)}
                            size="small"
                            sx={{
                                color: "#888",
                                "&:hover": { color: "#e89830" },
                            }}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </Paper>
    )
}

export default CartItemList
