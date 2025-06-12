"use client"

import type React from "react"
import { Box, Pagination as MuiPagination, Typography } from "@mui/material"

interface PaginationProps {
    currentPage: number
    totalItems: number
    itemsPerPage: number
    onPageChange: (page: number) => void
    showInfo?: boolean
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalItems,
                                                   itemsPerPage,
                                                   onPageChange,
                                                   showInfo = true,
                                               }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    if (totalPages <= 1) return null

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
                mt: 4,
            }}
        >
            {showInfo && (
                <Typography variant="body2" color="text.secondary">
                    {totalItems > 0 ? `${startItem}-${endItem}` : "0"} / {totalItems}개
                </Typography>
            )}
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => onPageChange(page)}
                color="primary"
                size="medium"
                showFirstButton
                showLastButton
                sx={{
                    "& .MuiPaginationItem-root": {
                        "&.Mui-selected": {
                            backgroundColor: "#FDBF60",
                            color: "#4A2C2A",
                            "&:hover": {
                                backgroundColor: "#FDB94E",
                            },
                        },
                    },
                }}
            />
        </Box>
    )
}

export default Pagination