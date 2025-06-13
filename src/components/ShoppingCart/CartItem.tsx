"use client"

import type React from "react"
import { Box, Checkbox, TableCell, TableRow, IconButton, TextField, Typography } from "@mui/material"
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"
import type { CartItem as CartItemType } from "./types/cart.types"

interface CartItemProps {
    item: CartItemType
    onSelect: (id: string) => void
    onQuantityChange: (id: string, quantity: number) => void
    onRemove: (id: string) => void
}

const CartItem: React.FC<CartItemProps> = ({ item, onSelect, onQuantityChange, onRemove }) => {
    return (
        <TableRow
            sx={{
                "&:not(:last-child)": { borderBottom: "1px solid #e7ddd0" },
                "&:hover": { backgroundColor: "#faf9f8" },
            }}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    checked={item.selected}
                    onChange={() => onSelect(item.id)}
                    sx={{
                        color: "#e89830",
                        "&.Mui-checked": { color: "#e89830" },
                    }}
                />
            </TableCell>
            <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 8,
                            objectFit: "cover",
                            border: "1px solid #e7ddd0",
                        }}
                    />
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: "#1b150e",
                                mb: 0.5,
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#97784e" }}>
                            Option: {item.option}
                        </Typography>
                    </Box>
                </Box>
            </TableCell>
            <TableCell sx={{ color: "#57493a" }}>${item.price.toFixed(2)}</TableCell>
            <TableCell>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "#f9f6f2",
                        borderRadius: "8px",
                        p: 0.5,
                        width: "fit-content",
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        sx={{
                            color: "#97784e",
                            minWidth: 28,
                            minHeight: 28,
                            "&:hover": { backgroundColor: "#e7ddd0" },
                        }}
                    >
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <TextField
                        size="small"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                        sx={{
                            width: 60,
                            "& .MuiOutlinedInput-root": {
                                height: 32,
                                backgroundColor: "white",
                                "& fieldset": { borderColor: "#e7ddd0" },
                                "&:hover fieldset": { borderColor: "#e89830" },
                                "&.Mui-focused fieldset": { borderColor: "#e89830" },
                                "& input": {
                                    textAlign: "center",
                                    padding: "4px 8px",
                                    fontSize: "0.875rem",
                                },
                            },
                        }}
                        inputProps={{ min: 1 }}
                    />
                    <IconButton
                        size="small"
                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        sx={{
                            color: "#97784e",
                            minWidth: 28,
                            minHeight: 28,
                            "&:hover": { backgroundColor: "#e7ddd0" },
                        }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#1b150e" }}>${(item.price * item.quantity).toFixed(2)}</TableCell>
            <TableCell>
                <IconButton
                    onClick={() => onRemove(item.id)}
                    sx={{
                        color: "#97784e",
                        "&:hover": {
                            color: "#e89830",
                            backgroundColor: "#fef3e2",
                        },
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default CartItem
