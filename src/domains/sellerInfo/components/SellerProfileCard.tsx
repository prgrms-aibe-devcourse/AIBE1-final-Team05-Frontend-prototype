import React from 'react';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Button,
    IconButton,
    Chip,
    Box,
    Grid as Grid,
    Divider,
    Stack,
} from '@mui/material';
import {
    ChatBubbleOutline,
    Favorite,
    Share,
    Star,
    Verified,
    Shield,
} from '@mui/icons-material';

// SellerProfile 타입 정의 (별도 파일에서 import하는 대신 여기서 정의)
export interface SellerProfile {
    id: string;
    name: string;
    profileImage: string;
    establishedYear: number;
    rating: number;
    reviewCount: number;
    salesCount: number;
    tags: string[];
    operatingHours: string;
    shippingInfo: string;
    location: string;
    isVerified: boolean;
    isSafetyChecked: boolean;
}

interface SellerProfileCardProps {
    seller: SellerProfile;
    onContactSeller: () => void;
    onToggleLike: () => void;
    onShare: () => void;
    onReport: () => void;
    isLiked: boolean;
}

const SellerProfileCard: React.FC<SellerProfileCardProps> = ({
                                                                 seller,
                                                                 onContactSeller,
                                                                 onToggleLike,
                                                                 onShare,
                                                                 onReport,
                                                                 isLiked,
                                                             }) => {
    return (
        <Card sx={{ p: { xs: 2, sm: 3 }, boxShadow: 1 }}>
            <CardContent sx={{ p: 0 }}>
                <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ alignItems: 'center' }}>
                    {/* 프로필 이미지 */}
                    <Grid size={{ xs: 12, sm: 'auto' }}>
                        <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                            <Avatar
                                src={seller.profileImage}
                                sx={{
                                    width: { xs: 96, sm: 128 },
                                    height: { xs: 96, sm: 128 },
                                    border: 2,
                                    borderColor: 'grey.200',
                                    boxShadow: 2,
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* 판매자 정보 */}
                    <Grid size={{ xs: 12, sm: 'grow' }}>
                        <Box textAlign={{ xs: 'center', sm: 'left' }}>
                            <Typography
                                variant="h4"
                                component="h2"
                                fontWeight="bold"
                                gutterBottom
                                sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                            >
                                {seller.name}
                            </Typography>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                mb={1}
                                sx={{ flexWrap: 'wrap' }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    운영 시작 {seller.establishedYear}년 •
                                </Typography>
                                <Star sx={{ color: '#ffc107', fontSize: 16 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {seller.rating} ({seller.reviewCount.toLocaleString()} 리뷰) • {seller.salesCount.toLocaleString()} 판매
                                </Typography>
                            </Box>

                            <Stack
                                direction="row"
                                spacing={0.5}
                                flexWrap="wrap"
                                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                sx={{ mt: 1 }}
                            >
                                {seller.tags.map((tag, index) => (
                                    <Chip
                                        key={`${tag}-${index}`}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            fontSize: '0.75rem',
                                            height: 24,
                                            bgcolor: index === 0 ? 'warning.100' : index === 1 ? 'success.100' : 'info.100',
                                            color: index === 0 ? 'warning.800' : index === 1 ? 'success.800' : 'info.800',
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Grid>

                    {/* 액션 버튼들 */}
                    <Grid size={{ xs: 12, sm: 'auto' }}>
                        <Box display="flex" flexDirection={{ xs: 'row', sm: 'column' }} gap={1} alignItems="center">
                            <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                <Button
                                    variant="contained"
                                    startIcon={<ChatBubbleOutline />}
                                    onClick={onContactSeller}
                                    sx={{
                                        bgcolor: '#e37d11',
                                        '&:hover': { bgcolor: '#d16d01' },
                                        flex: { xs: 1, sm: 'none' },
                                        minWidth: { sm: 120 },
                                    }}
                                >
                                    판매자 문의
                                </Button>
                                <IconButton
                                    onClick={onToggleLike}
                                    sx={{
                                        bgcolor: 'grey.100',
                                        '&:hover': { bgcolor: 'grey.200' },
                                        color: isLiked ? 'error.main' : 'grey.600',
                                    }}
                                >
                                    <Favorite />
                                </IconButton>
                                <IconButton
                                    onClick={onShare}
                                    sx={{
                                        bgcolor: 'grey.100',
                                        '&:hover': { bgcolor: 'grey.200' },
                                        color: 'grey.700',
                                    }}
                                >
                                    <Share />
                                </IconButton>
                            </Stack>
                            <Button
                                variant="text"
                                size="small"
                                onClick={onReport}
                                sx={{
                                    color: 'grey.500',
                                    '&:hover': { color: 'error.main' },
                                    fontSize: '0.75rem',
                                    mt: { xs: 0, sm: 0.5 },
                                }}
                            >
                                신고하기
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: { xs: 2, sm: 3 } }} />

                {/* 상세 정보 */}
                <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ fontSize: '0.875rem' }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>운영 시간:</strong> {seller.operatingHours}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>배송 정보:</strong> {seller.shippingInfo}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>위치:</strong> {seller.location}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>판매자 인증:</strong>
                            </Typography>
                            {seller.isVerified && (
                                <Verified sx={{ color: 'success.main', fontSize: 16 }} titleAccess="사업자 인증" />
                            )}
                            {seller.isSafetyChecked && (
                                <Shield sx={{ color: 'info.main', fontSize: 16 }} titleAccess="안전 검사 완료" />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SellerProfileCard;