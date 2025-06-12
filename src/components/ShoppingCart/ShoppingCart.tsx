import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Breadcrumbs,
    Link,
    Divider,
    Alert,
    Collapse,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as ShoppingCartIcon,
    // Clear as ClearIcon,
    Compare as CompareIcon,
    LocalOffer as CouponIcon,
    Close as CloseIcon,
    NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';

// 타입 정의
interface CartItem {
    id: string;
    name: string;
    option: string;
    price: number;
    quantity: number;
    image: string;
    selected: boolean;
}

interface Coupon {
    id: string;
    name: string;
    type: 'percentage' | 'fixed';
    value: number;
    minAmount: number;
    description: string;
}

interface RecommendedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}

const ShoppingCart: React.FC = () => {
    const theme = useTheme();

    // 상태 관리
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            name: 'Chicken Jerky Bites',
            option: 'Large Bag',
            price: 12.99,
            quantity: 2,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQEf71hk9m0w23j83x5tXwCamyvp3ZRQE-Gn6mURnDhwsrZ2iVxIlPzb-cIXTc2Nb06JfuTnZLas9esghplzH7niN5KZna2omsb_5oGsE_F94elQt3t7vR8aDqwuweZnhF8CN6_-2kZDZuGuwEv3eYTWWmPS7H1vyMiLoW-JUCHYCJjh1NTQGyaNWL8p18oXQ1tftvd_-xUXDPuCWj00PDJpf38YtYUsKVDhySccZYlQanbhc4yx2irM_q_q3tMZawnypnNa7SGnI',
            selected: false,
        },
        {
            id: '2',
            name: 'Salmon & Sweet Potato Treats',
            option: 'Regular',
            price: 9.99,
            quantity: 1,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc-p_3A9etPWhm2pKuNp8uokcJGVXdaQFWsESe3PIIF1CvVnu_LCynYZaUz7rS-M8Z_VE5yxHvwnUWdwW5bYbT9RDYiOXhCy-_-Hfj8XZHBMYoGRWnX_qquYWlm_c17C1njRiOeISCM-pB0AWCOwn7WO6ztSY7FrxdslQhRTq0_KXd6ld2aLNLogn7HUywuT3PmibMR7ISRDEB2V7fYKy4mdWQuFEHggsy8_20bbvK7obANl4ptmYanm0qrthM7EC40-7ZccpSayY',
            selected: false,
        },
    ]);

    // 사용 가능한 쿠폰 목록
    const [availableCoupons] = useState<Coupon[]>([
        {
            id: 'WELCOME15',
            name: '신규 회원 15% 할인',
            type: 'percentage',
            value: 15,
            minAmount: 20,
            description: '20달러 이상 구매 시 15% 할인',
        },
        {
            id: 'SAVE5',
            name: '5달러 즉시 할인',
            type: 'fixed',
            value: 5,
            minAmount: 30,
            description: '30달러 이상 구매 시 5달러 할인',
        },
        {
            id: 'FIRSTTIME20',
            name: '첫 구매 20% 할인',
            type: 'percentage',
            value: 20,
            minAmount: 25,
            description: '25달러 이상 첫 구매 시 20% 할인',
        },
    ]);

    const [selectedCoupon, setSelectedCoupon] = useState<string>('');
    const [selectAll, setSelectAll] = useState(false);
    const [comparisonOpen, setComparisonOpen] = useState(false);
    const [comparisonResult, setComparisonResult] = useState<string>('');

    // 추천 상품
    const recommendedProducts: RecommendedProduct[] = [
        {
            id: 'rec1',
            name: 'Beef & Carrot Chews',
            price: 14.99,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAin29om5OwCRLqHjfWNZuHdAMFXq-xMJdMh64LSS7pa9YFMqpezCqmuwy-IhkaZ0ft6ZTmsgR4yDJdmYsemZ5t3QzkP7APXMlSvZ4yvlfTiD_4B1VrhE-0bae07KnzqZMScfh6z2xLtJ2g8PYSX0tDnFs4y-a2jYZCxH6QVpH4vMjLebxU0ENWERJb93wGr9105HRWJy9Iq3Iw0usGGrp3ds2eVBN3EdFZJ3Lr6MFLwcRQMFPwBupQ5bnyIl_g9asnJuhUzmq5Pzw',
        },
        {
            id: 'rec2',
            name: 'Interactive Puzzle Toy',
            price: 19.99,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKiHIP63C4ILgJFvv64KKOmj8o1PGzRRcZ6EojdiwpLGj5vvnwrNE85Ge3RhijiEHUHAcSQmBTKmcBd0rfaqch0WrThp5oTMdskn6Ptonq03HgUT8OpNT9tnqQqyqQh0BkUDlWB0Jp3_-y-V4zdDD8R_XBIs2p5VTlvlOOuzdWt8tkscEgIdej_-6Bg3VHdeUkH2Fb6kUGxWNtHFjVD39x-L45c8X0Y9tBMog87EldpXrJhbzEWIz5m6biR1SxIoj4i0oWz7L2VNU',
        },
        {
            id: 'rec3',
            name: 'Grain-Free Salmon Recipe',
            price: 29.99,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Ofdjs276QZH3kKvoOjQu2MlW7HEDj4p-QE75-IyviIvCO_ECVzNT8ToyM6vWBi_kCR_bW_M8V4Ay_CTxWxwHkRLdsipI0cENEOLI-3p6rD59OL3P1TKQ0aaQrVHIqbE10aPrC7IJO84ydI5uGrKJQBBhaCk29lQY089wCT1Tt_4RlFu9HWCdI0ITTyzze28XUZXR5JwwixmMdl5U5-4bAtQ0eX76IyADVQmO8ASuvVI1D6YG81L5S-aw_tSpUC2O5BPp9QQRRYU',
        },
        {
            id: 'rec4',
            name: 'Organic Turkey Pate',
            price: 11.50,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrIOlKYAPwL8tOlLcZSfZ0sTXCaAJVkCqZ3GuctaAouZ9ELKxz3oDyqR8yzxyvtejrPLjb4DP2wvUmj130lZlTfmdPkPRR9eh_1frX6piUSXIsFAS2q6BCEIu-zOGhmsq_pXaehHcNFK2a8bmEDWQXt7QxSjeGZFfy9EQUbGQK78or5vS7NPmHyePfGPfYqo08ltZNKFVHnEa-J9Ugmsm5nhEBcNWP8NJKTkxjaXeV2BLHFiFVSTk4rEVsCeZX7JEM-_yWZ4dqbtU',
        },
    ];

    // 전체 선택/해제
    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setCartItems(items => items.map(item => ({ ...item, selected: newSelectAll })));
    };

    // 개별 상품 선택/해제
    const handleItemSelect = (id: string) => {
        setCartItems(items => {
            const updated = items.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            );
            setSelectAll(updated.every(item => item.selected));
            return updated;
        });
    };

    // 수량 변경
    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
    };

    // 상품 삭제
    const handleRemoveItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    // 선택된 상품 삭제
    const handleRemoveSelected = () => {
        setCartItems(items => items.filter(item => !item.selected));
        setSelectAll(false);
    };

    // // 장바구니 전체 삭제
    // const handleClearCart = () => {
    //     setCartItems([]);
    //     setSelectAll(false);
    //     setSelectedCoupon('');
    // };

    // 가격 계산
    const calculateSubtotal = () => {
        return cartItems
            .filter(item => item.selected)
            .reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const calculateDiscount = () => {
        if (!selectedCoupon) return 0;

        const coupon = availableCoupons.find(c => c.id === selectedCoupon);
        const subtotal = calculateSubtotal();

        if (!coupon || subtotal < coupon.minAmount) return 0;

        if (coupon.type === 'percentage') {
            return subtotal * (coupon.value / 100);
        } else {
            return coupon.value;
        }
    };

    const calculateTotal = () => {
        return calculateSubtotal() - calculateDiscount();
    };

    // 쿠폰 적용 가능 여부 확인
    const isCouponApplicable = (coupon: Coupon) => {
        return calculateSubtotal() >= coupon.minAmount;
    };

    // 상품 비교 기능
    const handleCompareSelected = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        if (selectedItems.length < 2) {
            alert('비교를 위해서는 최소 2개 상품을 선택해주세요.');
            return;
        }

        // 샘플 비교 결과 (실제로는 LLM API 호출)
        const result = `
선택된 상품들의 비교 분석:

${selectedItems.map(item => `• ${item.name} (${item.option}) - $${item.price}`).join('\n')}

영양성분 및 특징 분석:
이 제품들은 모두 자연 재료로 만들어진 프리미엄 펫 간식입니다. 
Chicken Jerky Bites는 높은 단백질 함량으로 활동적인 반려동물에게 적합하며, 
Salmon & Sweet Potato Treats는 오메가-3가 풍부하여 피모 건강에 도움을 줍니다.

권장사항:
두 제품 모두 우수한 품질의 간식이므로, 반려동물의 선호도와 건강 상태에 따라 선택하시면 됩니다.
`;

        setComparisonResult(result);
        setComparisonOpen(true);
    };

    return (
        <Box sx={{ bgcolor: '#fcfaf8', minHeight: '100vh' }}>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* 브레드크럼 */}
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
                    <Link
                        href="#"
                        color="#97784e"
                        sx={{
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            '&:hover': { color: '#e89830' }
                        }}
                    >
                        Shop
                    </Link>
                    <Typography color="#1b150e" sx={{ fontSize: '0.875rem' }}>
                        장바구니
                    </Typography>
                </Breadcrumbs>

                {/* 페이지 제목 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1b150e',
                            fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                            mb: 4
                        }}
                    >
                        장바구니
                    </Typography>
                    {/*<Button*/}
                    {/*    startIcon={<ClearIcon />}*/}
                    {/*    onClick={handleClearCart}*/}
                    {/*    sx={{*/}
                    {/*        color: '#e89830',*/}
                    {/*        '&:hover': {*/}
                    {/*            color: '#d18727',*/}
                    {/*            backgroundColor: 'transparent'*/}
                    {/*        },*/}
                    {/*        fontWeight: 600,*/}
                    {/*        textTransform: 'none',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    장바구니 비우기*/}
                    {/*</Button>*/}
                </Box>

                <Grid container spacing={4}>
                    {/* 장바구니 테이블 */}
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{
                            overflow: 'hidden',
                            border: '1px solid #e7ddd0',
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#f9f6f2' }}>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    sx={{
                                                        color: '#e89830',
                                                        '&.Mui-checked': { color: '#e89830' }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: 600,
                                                color: '#57493a',
                                                textTransform: 'uppercase',
                                                fontSize: '0.75rem',
                                                letterSpacing: '0.05em'
                                            }}>
                                                제품
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: 600,
                                                color: '#57493a',
                                                textTransform: 'uppercase',
                                                fontSize: '0.75rem',
                                                letterSpacing: '0.05em'
                                            }}>
                                                금액
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: 600,
                                                color: '#57493a',
                                                textTransform: 'uppercase',
                                                fontSize: '0.75rem',
                                                letterSpacing: '0.05em'
                                            }}>
                                                수량
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: 600,
                                                color: '#57493a',
                                                textTransform: 'uppercase',
                                                fontSize: '0.75rem',
                                                letterSpacing: '0.05em'
                                            }}>
                                                총 금액
                                            </TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                sx={{
                                                    '&:not(:last-child)': { borderBottom: '1px solid #e7ddd0' },
                                                    '&:hover': { backgroundColor: '#faf9f8' }
                                                }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={item.selected}
                                                        onChange={() => handleItemSelect(item.id)}
                                                        sx={{
                                                            color: '#e89830',
                                                            '&.Mui-checked': { color: '#e89830' }
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{
                                                                width: 64,
                                                                height: 64,
                                                                borderRadius: 8,
                                                                objectFit: 'cover',
                                                                border: '1px solid #e7ddd0'
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: '#1b150e',
                                                                    mb: 0.5
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{ color: '#97784e' }}
                                                            >
                                                                Option: {item.option}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ color: '#57493a' }}>
                                                    ${item.price.toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        bgcolor: '#f9f6f2',
                                                        borderRadius: '8px',
                                                        p: 0.5,
                                                        width: 'fit-content'
                                                    }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            sx={{
                                                                color: '#97784e',
                                                                minWidth: 28,
                                                                minHeight: 28,
                                                                '&:hover': { backgroundColor: '#e7ddd0' }
                                                            }}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                                            sx={{
                                                                width: 60,
                                                                '& .MuiOutlinedInput-root': {
                                                                    height: 32,
                                                                    backgroundColor: 'white',
                                                                    '& fieldset': { borderColor: '#e7ddd0' },
                                                                    '&:hover fieldset': { borderColor: '#e89830' },
                                                                    '&.Mui-focused fieldset': { borderColor: '#e89830' },
                                                                    '& input': {
                                                                        textAlign: 'center',
                                                                        padding: '4px 8px',
                                                                        fontSize: '0.875rem'
                                                                    }
                                                                },
                                                            }}
                                                            inputProps={{ min: 1 }}
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            sx={{
                                                                color: '#97784e',
                                                                minWidth: 28,
                                                                minHeight: 28,
                                                                '&:hover': { backgroundColor: '#e7ddd0' }
                                                            }}
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: '#1b150e' }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        sx={{
                                                            color: '#97784e',
                                                            '&:hover': {
                                                                color: '#e89830',
                                                                backgroundColor: '#fef3e2'
                                                            }
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        {/* 액션 버튼들 */}
                        <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={handleRemoveSelected}
                                sx={{
                                    borderColor: '#e7ddd0',
                                    color: '#57493a',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        borderColor: '#e89830',
                                        bgcolor: '#f9f6f2',
                                        color: '#1b150e',
                                    },
                                }}
                            >
                                선택한 제품 삭제
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<CompareIcon />}
                                onClick={handleCompareSelected}
                                sx={{
                                    bgcolor: '#e89830',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    '&:hover': { bgcolor: '#d18727' },
                                }}
                            >
                                AI 제품 비교
                            </Button>
                        </Box>

                        {/* AI 비교 결과 */}
                        <Collapse in={comparisonOpen}>
                            <Card sx={{
                                mt: 3,
                                border: '1px solid #e7ddd0',
                                borderRadius: '12px'
                            }}>
                                <CardContent>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#1b150e',
                                                fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'
                                            }}
                                        >
                                            Product Comparison Analysis
                                        </Typography>
                                        <IconButton
                                            onClick={() => setComparisonOpen(false)}
                                            sx={{
                                                color: '#97784e',
                                                '&:hover': {
                                                    color: '#e89830',
                                                    backgroundColor: '#fef3e2'
                                                }
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{
                                        bgcolor: '#f9f6f2',
                                        p: 2,
                                        borderRadius: '8px',
                                        border: '1px solid #e7ddd0'
                                    }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#57493a',
                                                whiteSpace: 'pre-line',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {comparisonResult}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Collapse>
                    </Grid>

                    {/* 주문 요약 및 쿠폰 */}
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* 쿠폰 선택 */}
                            <Card sx={{
                                border: '1px solid #e7ddd0',
                                borderRadius: '12px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                            color: '#1b150e',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'
                                        }}
                                    >
                                        <CouponIcon sx={{ color: '#e89830' }} />
                                        할인쿠폰
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <InputLabel sx={{ color: '#97784e' }}>쿠폰을 선택하세요</InputLabel>
                                        <Select
                                            value={selectedCoupon}
                                            onChange={(e) => setSelectedCoupon(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#e7ddd0',
                                                    borderRadius: '8px'
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#e89830'
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#e89830'
                                                },
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>쿠폰을 선택하지 않음</em>
                                            </MenuItem>
                                            {availableCoupons.map((coupon) => (
                                                <MenuItem
                                                    key={coupon.id}
                                                    value={coupon.id}
                                                    disabled={!isCouponApplicable(coupon)}
                                                >
                                                    <Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1,
                                                            mb: 0.5
                                                        }}>
                                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                {coupon.name}
                                                            </Typography>
                                                            {!isCouponApplicable(coupon) && (
                                                                <Chip
                                                                    label={`최소 $${coupon.minAmount}`}
                                                                    size="small"
                                                                    color="error"
                                                                    variant="outlined"
                                                                />
                                                            )}
                                                        </Box>
                                                        <Typography variant="caption" sx={{ color: '#97784e' }}>
                                                            {coupon.description}
                                                        </Typography>
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {selectedCoupon && (
                                        <Alert
                                            severity="success"
                                            sx={{
                                                mt: 2,
                                                borderRadius: '8px',
                                                '& .MuiAlert-message': {
                                                    fontSize: '0.875rem'
                                                }
                                            }}
                                        >
                                            쿠폰이 적용되었습니다! ${calculateDiscount().toFixed(2)} 할인
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>

                            {/* 주문 요약 */}
                            <Card sx={{
                                border: '1px solid #e7ddd0',
                                borderRadius: '12px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                            color: '#1b150e',
                                            fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'
                                        }}
                                    >
                                        Order Summary
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ color: '#57493a' }}>
                                                Subtotal
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1b150e' }}>
                                                ${calculateSubtotal().toFixed(2)}
                                            </Typography>
                                        </Box>

                                        {selectedCoupon && calculateDiscount() > 0 && (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" sx={{ color: '#57493a' }}>
                                                    Discount ({availableCoupons.find(c => c.id === selectedCoupon)?.name})
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 500, color: '#e89830' }}>
                                                    -${calculateDiscount().toFixed(2)}
                                                </Typography>
                                            </Box>
                                        )}

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ color: '#57493a' }}>
                                                Shipping
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#1b150e' }}>
                                                Calculated at next step
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ my: 1, borderColor: '#e7ddd0' }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#1b150e' }}>
                                                Total
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#1b150e' }}>
                                                ${calculateTotal().toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            onClick={() => {
                                                const selectedItems = cartItems.filter(item => item.selected);
                                                if (selectedItems.length === 0) {
                                                    alert('결제를 진행하려면 최소 1개 상품을 선택해주세요.');
                                                    return;
                                                }
                                                alert('결제 페이지로 이동합니다...');
                                            }}
                                            sx={{
                                                bgcolor: '#e89830',
                                                color: 'white',
                                                py: 1.5,
                                                fontWeight: 'bold',
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                                                '&:hover': { bgcolor: '#d18727' },
                                            }}
                                        >
                                            결제하기
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            size="large"
                                            sx={{
                                                borderColor: '#e7ddd0',
                                                color: '#57493a',
                                                py: 1.5,
                                                fontWeight: 600,
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                                                '&:hover': {
                                                    borderColor: '#e89830',
                                                    bgcolor: '#f9f6f2',
                                                    color: '#1b150e',
                                                },
                                            }}
                                        >
                                            쇼핑 계속하기
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>

                {/* 추천 상품 섹션 */}
                <Box sx={{ mt: 8 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 4,
                            fontWeight: 'bold',
                            color: '#1b150e',
                            fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'
                        }}
                    >
                        함께 구매하면 좋은 제품
                    </Typography>
                    <Grid container spacing={3}>
                        {recommendedProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.id}>
                                <Card
                                    sx={{
                                        border: '1px solid #e7ddd0',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(232, 152, 48, 0.15)',
                                            borderColor: '#e89830',
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={product.image}
                                            alt={product.name}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                color: '#e89830',
                                                backdropFilter: 'blur(4px)',
                                                width: 36,
                                                height: 36,
                                                opacity: 0,
                                                transition: 'all 0.3s ease',
                                                '.MuiCard-root:hover &': {
                                                    opacity: 1,
                                                },
                                                '&:hover': {
                                                    bgcolor: '#e89830',
                                                    color: 'white',
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                    <CardContent sx={{ p: 2 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#1b150e',
                                                mb: 1,
                                                lineHeight: 1.4,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                minHeight: '2.8em'
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#e89830',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            ${product.price.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default ShoppingCart;