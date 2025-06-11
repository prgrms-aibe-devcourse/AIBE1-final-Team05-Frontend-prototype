import React from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ProductPaginationProps } from '@/components/Home/types/product.types.ts';

export const ProductPagination: React.FC<ProductPaginationProps> = ({
                                                                        currentPage,
                                                                        totalPages,
                                                                        onPageChange,
                                                                        className
                                                                    }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const getVisiblePages = () => {
        const pages: number[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const start = Math.max(1, currentPage - 2);
            const end = Math.min(totalPages, start + maxVisiblePages - 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Box
            className={className}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                p: 2
            }}
        >
            <IconButton
                onClick={handlePrevious}
                disabled={currentPage === 1}
                sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    borderRadius: '50%',
                    color: '#181511',
                    '&:hover': {
                        bgcolor: 'grey.100'
                    },
                    '&:disabled': {
                        color: 'grey.400'
                    }
                }}
            >
                <ChevronLeft sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>

            {getVisiblePages().map((pageNum) => (
                <Button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    variant={currentPage === pageNum ? 'contained' : 'text'}
                    sx={{
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        minWidth: 'auto',
                        borderRadius: '50%',
                        fontSize: '0.875rem',
                        fontWeight: currentPage === pageNum ? 'bold' : 'normal',
                        mx: 0.25,
                        bgcolor: currentPage === pageNum ? '#e37d11' : 'transparent',
                        color: currentPage === pageNum ? 'white' : '#181511',
                        '&:hover': {
                            bgcolor: currentPage === pageNum ? '#d16f0a' : 'grey.100'
                        }
                    }}
                >
                    {pageNum}
                </Button>
            ))}

            <IconButton
                onClick={handleNext}
                disabled={currentPage === totalPages}
                sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    borderRadius: '50%',
                    color: '#181511',
                    '&:hover': {
                        bgcolor: 'grey.100'
                    },
                    '&:disabled': {
                        color: 'grey.400'
                    }
                }}
            >
                <ChevronRight sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
        </Box>
    );
};

export default ProductPagination;