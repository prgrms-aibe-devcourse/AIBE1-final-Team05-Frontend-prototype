import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Divider,
    Alert,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import {
    SellerProfileCard,
    SellerProductGrid,
    SimilarSellersGrid,
} from '../domains/sellerInfo';
import {
    SellerProfile,
    SellerProduct,
    SimilarSeller,
} from '@/domains/sellerInfo/types';
import { sellersData } from '../dummy-data/sellers.data';
import { sellerProductsData } from '../dummy-data/seller-products.data';

const SellerInfoPage: React.FC = () => {
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
                        speciality: seller.tags?.[0] || '전문 판매자' // ✅ 추가
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
                        {seller.name}의 상품 ({products.length})
                    </Typography>

                    {products.length > 0 ? (
                        <SellerProductGrid
                            products={products}
                            onProductClick={handleProductClick}
                            onToggleLike={handleToggleProductLike}
                        />
                    ) : (
                        <Alert severity="info">
                            등록된 상품이 없습니다.
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

export default SellerInfoPage;