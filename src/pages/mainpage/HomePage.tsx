import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    HeroSection,
    // ProductCategorySection,
    RecommendationSection,
    WorkshopSection,
    ProductTabSection
} from '@/components/Home';
import { Product } from '@/components/Home';
import { Workshop } from '@/components/Home/types';
import {
    // popularProducts,
    newProducts,
    bestSellerProducts,
    discountProducts,
    // allergicFreeProducts,
    // dentalCareProducts,
    popularWorkshops,
    // productCategories,
    contentCategories,
} from '@/data';

const HomePage = () => {
    const navigate = useNavigate();

    // 카테고리별 상품 데이터 매핑
    // const getProductsByCategory = (categoryId: string): Product[] => {
    //     switch (categoryId) {
    //         case 'dog':
    //             return popularProducts.filter(product => product.category === 'dog');
    //         case 'cat':
    //             return popularProducts.filter(product => product.category === 'cat');
    //         case 'allergy-free':
    //             return allergicFreeProducts;
    //         case 'dental':
    //             return dentalCareProducts;
    //         default:
    //             return popularProducts;
    //     }
    // };

    const handleProductClick = (product: Product) => {
        console.log('상품 클릭:', product);
        // 향후 상품 상세 페이지로 라우팅
    };

    const handleWorkshopClick = (workshop: Workshop) => {
        console.log('공방 클릭:', workshop);
        // 향후 공방 상세 페이지로 라우팅
    };

    const handleShopNowClick = () => {
        navigate('/categories');
    };

    const handleStartRecommendation = () => {
        // 맞춤 추천 페이지로 이동
        console.log('맞춤 추천 시작');
    };

    return (
        <Box>
            <HeroSection onShopNowClick={handleShopNowClick} />

            {/*<ProductCategorySection*/}
            {/*    categories={productCategories}*/}
            {/*    getProductsByCategory={getProductsByCategory}*/}
            {/*    onProductClick={handleProductClick}*/}
            {/*/>*/}

            <ProductTabSection
                categories={contentCategories}
                productSets={[newProducts, bestSellerProducts, discountProducts]}
                onProductClick={handleProductClick}
            />

            <RecommendationSection onStartRecommendation={handleStartRecommendation} />

            <WorkshopSection
                workshops={popularWorkshops}
                onWorkshopClick={handleWorkshopClick}
            />

        </Box>
    );
};

export default HomePage;