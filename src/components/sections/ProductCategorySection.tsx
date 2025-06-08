// 📁 components/sections/ProductCategorySection.tsx
import { Container, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { CategoryTabs } from '@/domains/category';
import { ProductGrid } from '@/domains/product';
import { Product } from '@/domains/product/types';
import { Category } from '@/domains/category/types';

interface ProductCategorySectionProps {
    categories: Category[];
    getProductsByCategory: (categoryId: string) => Product[];
    onProductClick: (product: Product) => void;
}

export const ProductCategorySection = ({
                                           categories,
                                           getProductsByCategory,
                                           onProductClick
                                       }: ProductCategorySectionProps) => {
    const [activeCategory, setActiveCategory] = useState('dog');

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
    };

    const currentCategoryProducts = getProductsByCategory(activeCategory);

    return (
        <Box sx={{ py: { xs: 6, sm: 8, lg: 10 } }}>
            <Container maxWidth="lg">
                <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {currentCategoryProducts.length > 0 ? (
                    <ProductGrid
                        products={currentCategoryProducts}
                        onProductClick={onProductClick}
                    />
                ) : (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                            {categories.find(cat => cat.id === activeCategory)?.description || '상품 준비중입니다.'}
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};