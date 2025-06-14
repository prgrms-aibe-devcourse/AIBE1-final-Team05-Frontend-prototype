"use client"

import type React from "react"
import { Box, IconButton, Paper, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

interface ProductComparisonProps {
    result: string
    onClose: () => void
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ result, onClose }) => {
    return (
        <Paper
            sx={{
                width: "90%",
                maxWidth: 800,
                maxHeight: "80vh",
                overflow: "auto",
                p: 3,
                position: "relative",
                borderRadius: 2,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                    Product Comparison Analysis
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: "#666" }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    p: 3,
                    bgcolor: "#fafaf8",
                    borderRadius: 2,
                    whiteSpace: "pre-line",
                }}
            >
                <Typography variant="body2" component="div" sx={{ color: "#333" }}>
                    {result}
                </Typography>
            </Box>
        </Paper>
    )
}

export default ProductComparison
