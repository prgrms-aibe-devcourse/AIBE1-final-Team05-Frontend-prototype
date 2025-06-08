import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { ProductGridProps } from '../types';

const ProductGrid = ({ products, onProductClick }: ProductGridProps) => {
    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid
                    key={product.id}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3
                    }}>
                    <ProductCard product={product} onClick={onProductClick} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;