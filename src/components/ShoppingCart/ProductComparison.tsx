"use client"

import type React from "react"
import { Box, Card, CardContent, Collapse, IconButton, Typography } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

interface ProductComparisonProps {
    open: boolean
    comparisonResult: string
    onClose: () => void
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ open, comparisonResult, onClose }) => {
    return (
        <Collapse in={open}>
            <Card
                sx={{
                    mt: 3,
                    border: "1px solid #e7ddd0",
                    borderRadius: "12px",
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: "#1b150e",
                                fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                            }}
                        >
                            Product Comparison Analysis
                        </Typography>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: "#97784e",
                                "&:hover": {
                                    color: "#e89830",
                                    backgroundColor: "#fef3e2",
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#f9f6f2",
                            p: 2,
                            borderRadius: "8px",
                            border: "1px solid #e7ddd0",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#57493a",
                                whiteSpace: "pre-line",
                                lineHeight: 1.6,
                            }}
                        >
                            {comparisonResult}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Collapse>
    )
}

export default ProductComparison
