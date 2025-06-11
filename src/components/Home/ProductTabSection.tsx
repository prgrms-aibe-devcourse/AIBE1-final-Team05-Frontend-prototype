// 📁 components/sections/ProductTabSection.tsx
import { Container, Box, Typography, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { ProductGrid } from '@/components/Home/index.ts';
import { Product } from '@/components/Home/index.ts';
import { Category } from '@/components/Home/types';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

interface ProductTabSectionProps {
    categories: Category[];
    productSets: Product[][]; // 각 탭별 상품 배열
    onProductClick: (product: Product) => void;
}

export const ProductTabSection = ({
                                      categories,
                                      productSets,
                                      onProductClick
                                  }: ProductTabSectionProps) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box sx={{ backgroundColor: 'background.default', py: { xs: 6, sm: 8, lg: 10 } }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        mb: { xs: 4, sm: 6 },
                        color: 'text.primary',
                    }}
                >
                </Typography>

                <Box sx={{ borderBottom: '1px solid', borderBottomColor: 'grey.200', mb: { xs: 4, sm: 6 } }}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 700,
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                textTransform: 'none',
                                px: { xs: 2, sm: 4 },
                                py: 2,
                                minHeight: 'auto',
                                '&.Mui-selected': {
                                    color: 'text.primary',
                                },
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'primary.main',
                                height: 2,
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <Tab key={category.id} label={category.label} />
                        ))}
                    </Tabs>
                </Box>

                {productSets.map((products, index) => (
                    <TabPanel key={index} value={activeTab} index={index}>
                        <ProductGrid
                            products={products}
                            onProductClick={onProductClick}
                        />
                    </TabPanel>
                ))}
            </Container>
        </Box>
    );
};