import { Container, Box, Typography, Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

// 도메인별 컴포넌트 import
import { ProductGrid } from '@/domains/product';
import { WorkshopGrid } from '@/domains/workshop';
import { CategoryTabs } from '@/domains/category';

// 도메인별 타입 import
import { Product } from '@/domains/product/types';
import { Workshop } from '@/domains/workshop/types';

// 더미 데이터 import
import {
    popularProducts,
    newProducts,
    bestSellerProducts,
    allergicFreeProducts,
    dentalCareProducts,
    popularWorkshops,
    productCategories,
    contentCategories,
} from '@/data';

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

const HomePage = () => {
    const [activeCategory, setActiveCategory] = useState('dog');
    const [newBestTab, setNewBestTab] = useState(0);

    // 카테고리별 상품 데이터 매핑
    const getProductsByCategory = (categoryId: string): Product[] => {
        switch (categoryId) {
            case 'dog':
                return popularProducts.filter(product => product.category === 'dog');
            case 'cat':
                return popularProducts.filter(product => product.category === 'cat');
            case 'allergy-free':
                return allergicFreeProducts;
            case 'dental':
                return dentalCareProducts;
            default:
                return popularProducts;
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
    };

    const handleProductClick = (product: Product) => {
        console.log('상품 클릭:', product);
        // 향후 상품 상세 페이지로 라우팅
    };

    const handleWorkshopClick = (workshop: Workshop) => {
        console.log('공방 클릭:', workshop);
        // 향후 공방 상세 페이지로 라우팅
    };

    const currentCategoryProducts = getProductsByCategory(activeCategory);

    return (
        <Box>
            {/* 히어로 섹션 */}
            <Box
                sx={{
                    minHeight: { xs: 'calc(100vh - 120px)', sm: '560px' },
                    background: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=600&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    px: 2,
                    py: { xs: 8, sm: 16 },
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h1"
                        sx={{
                            color: 'white',
                            fontWeight: 900,
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                            lineHeight: 1.1,
                            mb: 3,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                        }}
                    >
                        우리 아이만을 위한
                        <br />
                        특별한 수제 간식
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white',
                            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                            lineHeight: 1.6,
                            mb: 4,
                            opacity: 0.95,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                        }}
                    >
                        정성껏 만든 영양 가득한 수제 간식으로
                        <br />
                        사랑하는 반려동물에게 행복을 선물하세요.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<span className="material-icons">arrow_forward</span>}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontSize: { xs: '1rem', sm: '1.125rem' },
                            fontWeight: 700,
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1.5, sm: 2 },
                            borderRadius: 3,
                            boxShadow: '0 8px 24px rgba(232, 152, 48, 0.4)',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                                boxShadow: '0 12px 32px rgba(232, 152, 48, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        지금 쇼핑하기
                    </Button>
                </Container>
            </Box>

            {/* 카테고리별 상품 섹션 */}
            <Box sx={{ py: { xs: 6, sm: 8, lg: 10 } }}>
                <Container maxWidth="lg">
                    <CategoryTabs
                        categories={productCategories}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />

                    {currentCategoryProducts.length > 0 ? (
                        <ProductGrid
                            products={currentCategoryProducts}
                            onProductClick={handleProductClick}
                        />
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" color="text.secondary">
                                {productCategories.find(cat => cat.id === activeCategory)?.description || '상품 준비중입니다.'}
                            </Typography>
                        </Box>
                    )}
                </Container>
            </Box>

            {/* 맞춤 추천 섹션 */}
            <Box sx={{ backgroundColor: 'grey.100', py: { xs: 6, sm: 8, lg: 10 } }}>
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
                        내 아이 정보로 맞춤 추천
                    </Typography>

                    <Box
                        sx={{
                            maxWidth: '800px',
                            mx: 'auto',
                            backgroundColor: 'white',
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            p: { xs: 3, sm: 4, lg: 5 },
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            gap: { xs: 3, sm: 4, lg: 5 },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop"
                            alt="맞춤 추천"
                            sx={{
                                width: { xs: '100%', sm: '33%' },
                                height: 'auto',
                                borderRadius: 2,
                                objectFit: 'cover',
                            }}
                        />
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.875rem',
                                    mb: 0.5,
                                }}
                            >
                                우리 아이 맞춤형 간식
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                                    lineHeight: 1.3,
                                    mb: 1,
                                    color: 'text.primary',
                                }}
                            >
                                나이, 품종, 알러지 정보로
                                <br />
                                최적의 간식을 찾아보세요.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.875rem',
                                    lineHeight: 1.5,
                                    mb: 2,
                                }}
                            >
                                간단한 정보 입력으로 우리 아이에게 딱 맞는 간식을 추천받을 수 있습니다.
                            </Typography>
                            <Button
                                variant="contained"
                                endIcon={<span className="material-icons">pets</span>}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    px: 3,
                                    py: 1.25,
                                    borderRadius: 3,
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            >
                                맞춤 추천 시작하기
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* 인기 판매자 공방 섹션 */}
            <Box sx={{ py: { xs: 6, sm: 8, lg: 10 } }}>
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
                        인기 판매자 공방
                    </Typography>

                    <WorkshopGrid
                        workshops={popularWorkshops}
                        onWorkshopClick={handleWorkshopClick}
                    />
                </Container>
            </Box>

            {/* 신상품 & 베스트셀러 섹션 */}
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
                        신상품 & 베스트셀러
                    </Typography>

                    <Box sx={{ borderBottom: '1px solid', borderBottomColor: 'grey.200', mb: { xs: 4, sm: 6 } }}>
                        <Tabs
                            value={newBestTab}
                            onChange={(_, newValue) => setNewBestTab(newValue)}
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
                            {contentCategories.map((category, index) => (
                                <Tab key={category.id} label={category.label} />
                            ))}
                        </Tabs>
                    </Box>

                    <TabPanel value={newBestTab} index={0}>
                        <ProductGrid
                            products={newProducts}
                            onProductClick={handleProductClick}
                        />
                    </TabPanel>

                    <TabPanel value={newBestTab} index={1}>
                        <ProductGrid
                            products={bestSellerProducts}
                            onProductClick={handleProductClick}
                        />
                    </TabPanel>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;