import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Divider,
    Alert,
    CircularProgress,
    Snackbar,
    Stack,
} from '@mui/material';
import {
    SellerProfileCard,
    SellerProductGrid,
    SimilarSellersGrid,
} from '@/components/SellerStore';
import {
    SellerProfile,
    SellerProduct,
    SimilarSeller,
} from '@/components/SellerStore/types';
import { sellersData } from '@/data/sellers.data.ts';
import { sellerProductsData } from '@/data/seller-products.data.ts';
import ProductFilter from '@/components/SellerStore/ProductFilter.tsx';

const SellerStorePage: React.FC = () => {
    const { sellerId } = useParams<{ sellerId: string }>();
    const navigate = useNavigate();

    // 상태 관리
    const [seller, setSeller] = useState<SellerProfile | null>(null);
    const [products, setProducts] = useState<SellerProduct[]>([]);
    const [similarSellers, setSimilarSellers] = useState<SimilarSeller[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSellerLiked, setIsSellerLiked] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // 필터 상태
    const [filters, setFilters] = useState({
        excludeOutOfStock: false,
        bestProducts: false,
        discountProducts: false,
        newProducts: false,
    });

    // 필터링된 상품 계산
    // 필터 중복 적용 가능
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (filters.excludeOutOfStock) {
            result = result.filter(product => !product.isOutOfStock);
        }

        if (filters.bestProducts) {
            // 베스트 상품 기준: 평점 4.5 이상 또는 리뷰 100개 이상
            result = result.filter(product =>
                product.rating >= 4.5 || product.reviewCount >= 100
            );
        }

        if (filters.discountProducts) {
            // 할인 상품: originalPrice가 있고 originalPrice가 현재 가격보다 높은 상품
            result = result.filter(product =>
                product.originalPrice && product.originalPrice > product.price
            );
        }

        if (filters.newProducts) {
            // 신규 상품: 가정상 상품 ID에 'new'가 포함되거나 최근 등록된 상품
            // 실제로는 등록일 기준으로 필터링해야 함
            result = result.filter(product =>
                product.id.includes('new')
            );
        }

        return result;
    }, [products, filters]);

    // 데이터 로딩
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // 판매자 정보 로드
                const foundSeller = sellersData.find(s => s.id === sellerId);
                if (!foundSeller) {
                    throw new Error('판매자를 찾을 수 없습니다.');
                }
                setSeller(foundSeller);

                // 판매자 상품 로드
                const sellerProducts = sellerProductsData.filter(p => p.sellerId === sellerId);
                setProducts(sellerProducts);

                // 유사 판매자 로드 (현재 판매자 제외하고 랜덤으로 5개)
                const otherSellers: SimilarSeller[] = sellersData
                    .filter(s => s.id !== sellerId)
                    .slice(0, 5)
                    .map(seller => ({
                        id: seller.id,
                        name: seller.name,
                        profileImage: seller.profileImage,
                        description: seller.description || `${seller.tags[0]} 전문`,
                        speciality: seller.tags?.[0] || '전문 판매자'
                    }));

                setSimilarSellers(otherSellers);

            } catch (error) {
                console.error('데이터 로딩 오류:', error);
                setSnackbarMessage('데이터를 불러오는 중 오류가 발생했습니다.');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };

        if (sellerId) {
            loadData();
        }
    }, [sellerId]);

    // 이벤트 핸들러
    const handleContactSeller = () => {
        setSnackbarMessage('판매자 문의 기능은 준비 중입니다.');
        setSnackbarOpen(true);
    };

    const handleToggleSellerLike = () => {
        setIsSellerLiked(!isSellerLiked);
        setSnackbarMessage(isSellerLiked ? '관심 판매자에서 제거되었습니다.' : '관심 판매자로 등록되었습니다.');
        setSnackbarOpen(true);
    };

    const handleShareSeller = () => {
        if (navigator.share) {
            navigator.share({
                title: `${seller?.name} - 판매자 정보`,
                text: `${seller?.name} 판매자의 상품을 확인해보세요!`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setSnackbarMessage('링크가 클립보드에 복사되었습니다.');
            setSnackbarOpen(true);
        }
    };

    const handleReportSeller = () => {
        setSnackbarMessage('신고 기능은 준비 중입니다.');
        setSnackbarOpen(true);
    };

    const handleProductClick = (productId: string) => {
        // 상품 상세 페이지로 이동
        navigate(`/product/${productId}`);
    };

    const handleToggleProductLike = (productId: string) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, isLiked: !product.isLiked }
                    : product
            )
        );

        const product = products.find(p => p.id === productId);
        if (product) {
            setSnackbarMessage(
                product.isLiked
                    ? '관심 상품에서 제거되었습니다.'
                    : '관심 상품으로 등록되었습니다.'
            );
            setSnackbarOpen(true);
        }
    };

    const handleSimilarSellerClick = (similarSellerId: string) => {
        navigate(`/seller/${similarSellerId}`);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // 필터 변경 핸들러
    const handleFilterChange = (filterKey: string, value: boolean) => {
        setFilters(prev => ({
            ...prev,
            [filterKey]: value,
        }));
    };

    // 로딩 상태
    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Container>
        );
    }

    // 판매자를 찾을 수 없는 경우
    if (!seller) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">
                    요청하신 판매자 정보를 찾을 수 없습니다.
                </Alert>
            </Container>
        );
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
                {/* 판매자 프로필 카드 */}
                <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                    <SellerProfileCard
                        seller={seller}
                        onContactSeller={handleContactSeller}
                        onToggleLike={handleToggleSellerLike}
                        onShare={handleShareSeller}
                        onReport={handleReportSeller}
                        isLiked={isSellerLiked}
                    />
                </Box>

                <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

                {/* 판매자 상품 섹션 */}
                <Box sx={{ mb: { xs: 4, sm: 6 } }}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', sm: 'flex-start' }}
                        spacing={2}
                        sx={{ mb: { xs: 2, sm: 3 } }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            fontWeight="bold"
                            sx={{
                                fontSize: { xs: '1.25rem', sm: '1.5rem' }
                            }}
                        >
                            {seller.name}의 상품 ({filteredProducts.length})
                        </Typography>

                        {/* 필터 컴포넌트 */}
                        <Box sx={{ minWidth: { sm: 240 } }}>
                            <ProductFilter
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </Box>
                    </Stack>

                    {filteredProducts.length > 0 ? (
                        <SellerProductGrid
                            products={filteredProducts}
                            onProductClick={handleProductClick}
                            onToggleLike={handleToggleProductLike}
                        />
                    ) : (
                        <Alert severity="info">
                            {products.length === 0 ? '등록된 상품이 없습니다.' : '필터 조건에 맞는 상품이 없습니다.'}
                        </Alert>
                    )}
                </Box>

                <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

                {/* 유사 판매자 섹션 */}
                <Box>
                    <Typography
                        variant="h5"
                        component="h2"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            mb: { xs: 2, sm: 3 },
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}
                    >
                        비슷한 판매자
                    </Typography>

                    {similarSellers.length > 0 ? (
                        <SimilarSellersGrid
                            sellers={similarSellers}
                            onSellerClick={handleSimilarSellerClick}
                        />
                    ) : (
                        <Alert severity="info">
                            추천할 판매자가 없습니다.
                        </Alert>
                    )}
                </Box>
            </Container>

            {/* 스낵바 */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    );
};

export default SellerStorePage;