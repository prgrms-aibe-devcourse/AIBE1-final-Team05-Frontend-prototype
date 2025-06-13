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
                        color: "text.secondary",
                        borderColor: "grey.200",
                        "&:hover": {
                            backgroundColor: "grey.100",
                            borderColor: "primary.main",
                        },
                        "&.Mui-selected": {
                            backgroundColor: "primary.main",
                            color: "primary.contrastText",
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        },
                    },
                    "& .MuiPaginationItem-previousNext": {
                        color: "text.secondary",
                        "&:hover": {
                            backgroundColor: "grey.100",
                        },
                        "&.Mui-disabled": {
                            color: "grey.200",
                        },
                    },
                }}
            />
        </Box>
    );
};

export default ReviewPagination;