import React from 'react';
import {
    Box,
    FormControlLabel,
    Checkbox,
    Stack,
    Typography,
} from '@mui/material';

interface ProductFilterProps {
    filters: {
        excludeOutOfStock: boolean;
        bestProducts: boolean;
        discountProducts: boolean;
        newProducts: boolean;
    };
    onFilterChange: (filterKey: string, value: boolean) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
                                                         filters,
                                                         onFilterChange,
                                                     }) => {
    return (
        <Box>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2 }}
                flexWrap="wrap"
            >

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.bestProducts}
                            onChange={(e) => onFilterChange('bestProducts', e.target.checked)}
                            size="small"
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                            베스트 상품만
                        </Typography>
                    }
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.discountProducts}
                            onChange={(e) => onFilterChange('discountProducts', e.target.checked)}
                            size="small"
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                            할인 상품만
                        </Typography>
                    }
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.newProducts}
                            onChange={(e) => onFilterChange('newProducts', e.target.checked)}
                            size="small"
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                            신규 상품만
                        </Typography>
                    }
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.excludeOutOfStock}
                            onChange={(e) => onFilterChange('excludeOutOfStock', e.target.checked)}
                            size="small"
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                            품절 상품 제외
                        </Typography>
                    }
                />
            </Stack>
        </Box>
    );
};

export default ProductFilter;