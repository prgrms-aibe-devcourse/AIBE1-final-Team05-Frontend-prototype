import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { ProductSortButtonsProps, SortOption } from '@/components/Home/types/product.types.ts';

const SORT_OPTIONS: SortOption[] = ['최신순', '인기순', '낮은가격순', '높은평점순'];

export const ProductSortButtons: React.FC<ProductSortButtonsProps> = ({
                                                                          currentSort,
                                                                          onSortChange,
                                                                          className
                                                                      }) => {
    return (
        <Box className={className}>
            <ButtonGroup
                variant="outlined"
                size="small"
                sx={{
                    '& .MuiButton-root': {
                        px: 2,
                        py: 0.75,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 500,
                        borderRadius: '9999px',
                        textTransform: 'none',
                        border: 'none',
                        bgcolor: 'grey.100',
                        color: 'grey.700',
                        '&:hover': {
                            bgcolor: 'grey.200',
                            border: 'none'
                        },
                        '&.active': {
                            bgcolor: '#e37d11',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#d16f0a'
                            }
                        }
                    },
                    '& .MuiButton-root:not(:last-child)': {
                        borderRight: 'none'
                    },
                    gap: 0.5,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}
            >
                {SORT_OPTIONS.map((option) => (
                    <Button
                        key={option}
                        className={currentSort === option ? 'active' : ''}
                        onClick={() => onSortChange(option)}
                        sx={{
                            minWidth: 'auto',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {option}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
};

export default ProductSortButtons;