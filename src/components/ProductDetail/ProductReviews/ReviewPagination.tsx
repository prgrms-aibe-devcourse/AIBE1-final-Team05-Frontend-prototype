// src/components/ProductDetail/ProductReviews/ReviewPagination.tsx
import React from "react";
import { Box, Pagination } from "@mui/material";

interface ReviewPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const ReviewPagination: React.FC<ReviewPaginationProps> = ({
                                                               totalPages,
                                                               currentPage,
                                                               onPageChange,
                                                           }) => {
    if (totalPages <= 1) return null;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={onPageChange}
                color="primary"
                size="medium"
                showFirstButton
                showLastButton
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "#97784e",
                        borderColor: "#e7ddd0",
                        "&:hover": {
                            backgroundColor: "#f3eee7",
                            borderColor: "#e89830",
                        },
                        "&.Mui-selected": {
                            backgroundColor: "#e89830",
                            color: "#ffffff",
                            "&:hover": {
                                backgroundColor: "#d4861f",
                            },
                        },
                    },
                    "& .MuiPaginationItem-previousNext": {
                        color: "#97784e",
                        "&:hover": {
                            backgroundColor: "#f3eee7",
                        },
                        "&.Mui-disabled": {
                            color: "#d5c4ae",
                        },
                    },
                }}
            />
        </Box>
    );
};

export default ReviewPagination;