// src/components/SellerDashboard/settlement/components/ProductSalesDetail.tsx
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { ProductSalesData } from '@/components/SellerDashboard/settlement';

interface ProductSalesDetailProps {
    productData: ProductSalesData[];
}

const ProductSalesDetail = ({ productData }: ProductSalesDetailProps) => {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <span className="material-icons" style={{ fontSize: '20px', color: theme.palette.primary.main }}>
                    inventory_2
                </span>
                상품별 매출 상세
            </Typography>

            <Grid container spacing={3}>
                {productData.slice(0, 4).map((product, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Box sx={{
                            p: 2,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.grey[200]}`,
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: product.color,
                                    mb: 1,
                                    fontSize: '1.1rem'
                                }}
                            >
                                ₩{product.amount.toLocaleString()}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontWeight: 500,
                                    mb: 0.5
                                }}
                            >
                                {product.productName}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.75rem'
                                }}
                            >
                                전체의 {product.percentage.toFixed(1)}% • {product.salesCount}회 판매
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductSalesDetail;