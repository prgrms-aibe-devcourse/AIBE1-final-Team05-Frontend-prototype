import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tab,
    Tabs,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Badge,
    Chip,
    Paper,
    IconButton,
    Button,
    Rating,
    Card,
    CardContent,
    CardMedia,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Container,
    useTheme,
    useMediaQuery,
    Drawer,
    AppBar,
    Toolbar,
} from '@mui/material';
import {
    Search,
    Send,
    AttachFile,
    MoreVert,
    ArrowBack,
    ThumbUp,
    Comment,
    Image as ImageIcon,
    FilterList,
    Sort,
    StarRate,
    Menu as MenuIcon,
} from '@mui/icons-material';

// 타입 정의
interface CustomerMessage {
    id: number;
    text: string;
    sender: 'customer' | 'admin';
    time: string;
}

interface CustomerInquiry {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    unreadCount: number;
    isOnline: boolean;
    messages: CustomerMessage[];
}

interface ProductReview {
    id: number;
    customerName: string;
    customerAvatar: string;
    rating: number;
    reviewText: string;
    reviewDate: string;
    images: string[];
    helpful: number;
}

interface Product {
    id: number;
    name: string;
    image: string;
    averageRating: number;
    totalReviews: number;
    reviews: ProductReview[];
}

const CustomerManagementPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeTab, setActiveTab] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerInquiry | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [reviewFilter, setReviewFilter] = useState('all');
    const [reviewSort, setReviewSort] = useState('latest');
    const [mobileOpen, setMobileOpen] = useState(false);

    // 사이드바 메뉴 항목
    const sidebarItems = [
        { id: 1, label: '상품관리', icon: 'inventory' },
        { id: 2, label: '대시보드', icon: 'analytics' },
        { id: 3, label: '주문/배송', icon: 'local_shipping' },
        { id: 4, label: '정산관리', icon: 'account_balance_wallet' },
        { id: 5, label: '고객관리', icon: 'people', active: true },
        { id: 6, label: '판매자 정보', icon: 'store' },
    ];

    // 고객 문의 데이터
    const customerInquiries: CustomerInquiry[] = [
        {
            id: 1,
            name: '김민지',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOOhzKfV_i1zaCaQATDD7yGTBCnMrGdDmOLv3sB-AI1-r1TLH0JoZSPoanKCOwNtDr_eAvSBHU3pY5f0S4kHzGnxaEoaPCovfKltNYYc1CqoHdK_yeQ8CBJ27WoicTjbDk5z0wZaJnex0x6mg7Dqjs8eIrcQYXDQmV1diLeNLAiZHdELSxFDA0vwzwB5zCB58s-C_L9eHHk5TkT41EnEmr_j6Mqc4letHpEr3Qoj4kSQ18qdQnbqN2V9EaapBXtExVuFwWfZmcPbBj',
            lastMessage: '안녕하세요, 주문한 간식 배송이 언제쯤 시작될까요?',
            unreadCount: 1,
            isOnline: true,
            messages: [
                { id: 1, text: '안녕하세요! 강아지 간식을 주문했는데요', sender: 'customer', time: '14:20' },
                { id: 2, text: '안녕하세요! 주문 확인했습니다. 어떤 제품을 주문하셨나요?', sender: 'admin', time: '14:21' },
                { id: 3, text: '닭가슴살 간식 2팩이요', sender: 'customer', time: '14:22' },
                { id: 4, text: '네, 확인했습니다. 내일 오전 중 배송 시작 예정이에요!', sender: 'admin', time: '14:23' },
                { id: 5, text: '안녕하세요, 주문한 간식 배송이 언제쯤 시작될까요?', sender: 'customer', time: '15:30' }
            ]
        },
        {
            id: 2,
            name: '박지훈',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCncC98rROGNv0h4nVpvi5dukWxFoEdCkyOLkbSSi2TWuKB8ejGTNrxdielZem5ICy5-aaAm2hb5DGHeSBSwdynMR6tadeIJcgNcz-YdnZ8u1gtdQM1M3Bn8Uf4aKJWLmhnOpnMZLR6zNsU9dsmQqtIqNmasyfVm_hd4bClqPY23m38-I1S9Kq962QA9KQDu6zKbRNvqg9D-Chkcmi_ZjW3u15xQs7IbF2Y0G23XBPzqCcqo7qOj7dP8IIAO8b-hOsj0yb0DU7HqgH_',
            lastMessage: '강아지 간식 추천 감사합니다!',
            unreadCount: 0,
            isOnline: false,
            messages: [
                { id: 1, text: '혹시 소화가 잘 되는 강아지 간식 추천해주실 수 있나요?', sender: 'customer', time: '13:10' },
                { id: 2, text: '물론이죠! 연어 간식이나 고구마 간식을 추천드려요', sender: 'admin', time: '13:15' },
                { id: 3, text: '강아지 간식 추천 감사합니다!', sender: 'customer', time: '13:20' }
            ]
        },
        {
            id: 3,
            name: '최수현',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgJD_UB0jy-pWBhRgJxKyp6DWcLjpJGO3Xp17IKuUooeBYAiMI0x_ntEEUtw8_gUXckjrnYdT_VGvaLQEeGW2jixySuctAvRwRzJFoe4mv_7H0LPeTxBt13gNdRbwYi5ZjQIfs-o2nCg4svX07HUraengL8D_3g3hcZJuhAXzpMElX0NojBPvuw9nwCOy0U7vbt3_t_3V6uDjfB01YzLXMAYfIF0lLTcbWpq1Q2F67iteDeHcqw4V5F7VXyL11x_UZZ7Kjhye7xDB-',
            lastMessage: '고양이 간식 문의드립니다.',
            unreadCount: 3,
            isOnline: true,
            messages: [
                { id: 1, text: '고양이가 참치를 좋아하는데 참치 간식 있나요?', sender: 'customer', time: '12:30' },
                { id: 2, text: '고양이 간식 문의드립니다.', sender: 'customer', time: '14:45' },
                { id: 3, text: '혹시 답변 가능하신가요?', sender: 'customer', time: '15:20' }
            ]
        },
        {
            id: 4,
            name: '이준호',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGP-PWT_bfOxCp3Zl4pHDwAoa5wMXmDR0_jmgKkwm7R3082O5zjA1J3Jv4pjY0h0GvfdG2ndUKO8rVTvzXrBDslpfKe4aiVQT4xYqKhIS81kAA_aqzDy5vq2a_4wBdMuWwzVpWwHnxEGuC1Kf-TVll2UnceXHRKj7zDFYkUL57mK08qZHnWGun9bwGSrq_9fwFd6unVlZKdNLOSyjHyOL6KDlw8rbRIBnRxfMYEOZO4iMl-8cujm7Mdy_3exeBJOpj4piy1_Pbej0x',
            lastMessage: '주문 취소 요청합니다.',
            unreadCount: 0,
            isOnline: false,
            messages: [
                { id: 1, text: '주문 취소 요청합니다.', sender: 'customer', time: '11:30' },
                { id: 2, text: '어떤 주문을 취소하고 싶으신가요?', sender: 'admin', time: '11:35' },
                { id: 3, text: '어제 주문한 강아지 사료요', sender: 'customer', time: '11:40' }
            ]
        },
        {
            id: 5,
            name: '정하은',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxlncJFbwPaUoEabiwVBtX1ipxf6gjjZQdKZY-k7KDw9ofcDdH-aDNQ_GIRcesO0dXlDZcBeGxDd_GfOnmCdXK6g6AE45uIyo5Ist-XEA41iz74EkdBfBC1Y7BhF3znJYDLUB6T2w6mhidBoGPirWs07vsux_cRnHhNg54t033KBZOHJytZN9ajnyfUwJURCmn8d2Fx8nuVpkBRID9YxnyBxxcLEfu1wH18UalKI_pLUZqGnWBJI89KYv34nHht04PIayOYyOu1qTF',
            lastMessage: '간식 알레르기 성분 문의',
            unreadCount: 1,
            isOnline: true,
            messages: [
                { id: 1, text: '안녕하세요, 강아지가 알레르기가 있어서요', sender: 'customer', time: '16:10' },
                { id: 2, text: '간식 알레르기 성분 문의', sender: 'customer', time: '16:15' }
            ]
        }
    ];

    // 상품 리뷰 데이터
    const productReviews: Product[] = [
        {
            id: 1,
            name: '프리미엄 닭가슴살 간식',
            image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=80&h=80&fit=crop',
            averageRating: 5.0,
            totalReviews: 1,
            reviews: [
                {
                    id: 1,
                    customerName: '김민지',
                    customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOOhzKfV_i1zaCaQATDD7yGTBCnMrGdDmOLv3sB-AI1-r1TLH0JoZSPoanKCOwNtDr_eAvSBHU3pY5f0S4kHzGnxaEoaPCovfKltNYYc1CqoHdK_yeQ8CBJ27WoicTjbDk5z0wZaJnex0x6mg7Dqjs8eIrcQYXDQmV1diLeNLAiZHdELSxFDA0vwzwB5zCB58s-C_L9eHHk5TkT41EnEmr_j6Mqc4letHpEr3Qoj4kSQ18qdQnbqN2V9EaapBXtExVuFwWfZmcPbBj',
                    rating: 5,
                    reviewText: '우리 강아지가 정말 좋아해요! 품질도 좋고 포장도 깔끔하게 되어있어서 만족합니다. 다음에도 주문할 예정이에요.',
                    reviewDate: '2024.06.08',
                    images: [
                        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop'
                    ],
                    helpful: 12
                }
            ]
        },
        {
            id: 2,
            name: '고양이 참치 간식',
            image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=80&h=80&fit=crop',
            averageRating: 4.0,
            totalReviews: 1,
            reviews: [
                {
                    id: 2,
                    customerName: '박지훈',
                    customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCncC98rROGNv0h4nVpvi5dukWxFoEdCkyOLkbSSi2TWuKB8ejGTNrxdielZem5ICy5-aaAm2hb5DGHeSBSwdynMR6tadeIJcgNcz-YdnZ8u1gtdQM1M3Bn8Uf4aKJWLmhnOpnMZLR6zNsU9dsmQqtIqNmasyfVm_hd4bClqPY23m38-I1S9Kq962QA9KQDu6zKbRNvqg9D-Chkcmi_ZjW3u15xQs7IbF2Y0G23XBPzqCcqo7qOj7dP8IIAO8b-hOsj0yb0DU7HqgH_',
                    rating: 4,
                    reviewText: '고양이가 맛있게 먹네요. 다만 양이 조금 적은 것 같아요.',
                    reviewDate: '2024.06.07',
                    images: [],
                    helpful: 8
                }
            ]
        }
    ];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setSelectedCustomer(null);
    };

    const handleCustomerClick = (customer: CustomerInquiry) => {
        setSelectedCustomer(customer);
    };

    const handleBackToList = () => {
        setSelectedCustomer(null);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedCustomer) {
            // 메시지 전송 로직
            console.log('메시지 전송:', newMessage);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // 전체 평점 통계 계산
    const getOverallReviewStats = () => {
        const allReviews = productReviews.flatMap(product => product.reviews);
        const totalReviews = allReviews.length;
        const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

        const ratingCounts = {
            5: allReviews.filter(r => r.rating === 5).length,
            4: allReviews.filter(r => r.rating === 4).length,
            3: allReviews.filter(r => r.rating === 3).length,
            2: allReviews.filter(r => r.rating === 2).length,
            1: allReviews.filter(r => r.rating === 1).length,
        };

        return { totalReviews, averageRating, ratingCounts };
    };

    // 사이드바 컴포넌트
    const drawer = (
        <Box sx={{ height: '100%', backgroundColor: '#f8f9fa', pt: 0 }}>
            <List sx={{ p: 0 }}>
                {sidebarItems.map((item) => (
                    <ListItem
                        key={item.id}
                        button
                        sx={{
                            py: 2,
                            px: 3,
                            backgroundColor: item.active ? '#fff3e0' : 'transparent',
                            borderRight: item.active ? `3px solid ${theme.palette.primary.main}` : 'none',
                            '&:hover': {
                                backgroundColor: item.active ? '#fff3e0' : '#f0f0f0'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <span
                                className="material-icons"
                                style={{
                                    color: item.active ? theme.palette.primary.main : theme.palette.text.secondary
                                }}
                            >
                                {item.icon}
                            </span>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: item.active ? 600 : 400,
                                    color: item.active ? theme.palette.primary.main : theme.palette.text.primary
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // 채팅창 컴포넌트
    const renderChatWindow = () => {
        if (!selectedCustomer) return null;

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid #e0e0e0' }}>
                {/* 채팅 헤더 */}
                <Paper elevation={1} sx={{ p: 2, borderRadius: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {isMobile && (
                            <IconButton onClick={handleBackToList}>
                                <ArrowBack />
                            </IconButton>
                        )}
                        <Badge
                            badgeContent=" "
                            color="success"
                            invisible={!selectedCustomer.isOnline}
                            variant="dot"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                            <Avatar src={selectedCustomer.avatar} />
                        </Badge>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6">{selectedCustomer.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedCustomer.isOnline ? '온라인' : '오프라인'}
                            </Typography>
                        </Box>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </Box>
                </Paper>

                {/* 메시지 영역 */}
                <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                    {selectedCustomer.messages?.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                display: 'flex',
                                justifyContent: message.sender === 'admin' ? 'flex-end' : 'flex-start',
                                mb: 2
                            }}
                        >
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 1.5,
                                    maxWidth: '70%',
                                    backgroundColor: message.sender === 'admin' ? theme.palette.primary.main : '#f5f5f5',
                                    color: message.sender === 'admin' ? 'white' : 'inherit',
                                    borderRadius: 2,
                                    borderBottomRightRadius: message.sender === 'admin' ? 4 : 16,
                                    borderBottomLeftRadius: message.sender === 'admin' ? 16 : 4,
                                }}
                            >
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {message.text}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        opacity: 0.7,
                                        color: message.sender === 'admin' ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                                    }}
                                >
                                    {message.time}
                                </Typography>
                            </Paper>
                        </Box>
                    ))}
                </Box>

                {/* 메시지 입력창 */}
                <Paper elevation={2} sx={{ p: 2, borderRadius: 0 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <TextField
                            multiline
                            maxRows={3}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="메시지를 입력하세요..."
                            variant="outlined"
                            size="small"
                            sx={{ flexGrow: 1 }}
                        />
                        <IconButton
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            color="primary"
                        >
                            <Send />
                        </IconButton>
                    </Box>
                </Paper>
            </Box>
        );
    };

    // 고객 문의 목록 컴포넌트
    const renderCustomerInquiries = () => (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                고객 문의
            </Typography>

            {/* 검색창 */}
            <TextField
                fullWidth
                placeholder="채팅방 검색"
                variant="outlined"
                size="small"
                sx={{ mt: 3, mb: 3 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />

            {/* 고객 목록 */}
            <List>
                {customerInquiries.map((customer) => (
                    <ListItem
                        key={customer.id}
                        button
                        onClick={() => handleCustomerClick(customer)}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            border: selectedCustomer?.id === customer.id ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
                            backgroundColor: selectedCustomer?.id === customer.id ? '#fff3e0' : 'white',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        <ListItemAvatar>
                            <Badge
                                badgeContent=" "
                                color="success"
                                invisible={!customer.isOnline}
                                variant="dot"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            >
                                <Avatar src={customer.avatar} />
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText
                            primary={customer.name}
                            secondary={customer.lastMessage}
                            secondaryTypographyProps={{
                                noWrap: true,
                                sx: { maxWidth: '200px' }
                            }}
                        />
                        {customer.unreadCount > 0 && (
                            <Chip
                                label={customer.unreadCount}
                                color="primary"
                                size="small"
                                sx={{ minWidth: 24, height: 24 }}
                            />
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // 상품 리뷰 컴포넌트
    const renderProductReviews = () => {
        const stats = getOverallReviewStats();

        return (
            <Box>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    상품 리뷰
                </Typography>

                {/* 전체 리뷰 통계 */}
                <Paper elevation={1} sx={{ p: 3, mt: 3, mb: 3 }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography variant="h2" fontWeight="bold" gutterBottom>
                                    {stats.averageRating.toFixed(1)}
                                </Typography>
                                <Rating value={Math.round(stats.averageRating)} readOnly size="large" />
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    총 {stats.totalReviews}개 리뷰
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {[5, 4, 3, 2, 1].map(rating => (
                                <Box key={rating} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" sx={{ minWidth: 30 }}>
                                        {rating}점
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, mx: 2, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 }}>
                                        <Box
                                            sx={{
                                                width: `${stats.totalReviews > 0 ? (stats.ratingCounts[rating] / stats.totalReviews) * 100 : 0}%`,
                                                height: '100%',
                                                backgroundColor: theme.palette.primary.main,
                                                borderRadius: 4,
                                                transition: 'width 0.3s ease'
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="body2" sx={{ minWidth: 20 }}>
                                        {stats.ratingCounts[rating]}
                                    </Typography>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>

                {/* 필터 및 정렬 */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>평점 필터</InputLabel>
                        <Select
                            value={reviewFilter}
                            label="평점 필터"
                            onChange={(e) => setReviewFilter(e.target.value)}
                            startAdornment={<FilterList sx={{ mr: 1 }} />}
                        >
                            <MenuItem value="all">전체 평점</MenuItem>
                            <MenuItem value="5star">5점 제품만</MenuItem>
                            <MenuItem value="4star">4점 제품만</MenuItem>
                            <MenuItem value="3star">3점 제품만</MenuItem>
                            <MenuItem value="2star">2점 제품만</MenuItem>
                            <MenuItem value="1star">1점 제품만</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>정렬</InputLabel>
                        <Select
                            value={reviewSort}
                            label="정렬"
                            onChange={(e) => setReviewSort(e.target.value)}
                            startAdornment={<Sort sx={{ mr: 1 }} />}
                        >
                            <MenuItem value="latest">최신 리뷰순</MenuItem>
                            <MenuItem value="oldest">오래된 리뷰순</MenuItem>
                            <MenuItem value="rating-high">평점 높은순</MenuItem>
                            <MenuItem value="rating-low">평점 낮은순</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                        {productReviews.length}개의 제품
                    </Typography>
                </Box>

                {/* 제품별 리뷰 목록 */}
                <Box sx={{ space: 3 }}>
                    {productReviews.map((product) => (
                        <Card key={product.id} sx={{ mb: 3 }}>
                            {/* 제품 헤더 */}
                            <CardContent sx={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 64, height: 64, borderRadius: 2 }}
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {product.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Rating value={Math.round(product.averageRating)} readOnly size="small" />
                                            <Typography variant="body2" fontWeight="medium">
                                                {product.averageRating.toFixed(1)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                리뷰 {product.totalReviews}개
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>

                            {/* 해당 제품의 리뷰들 */}
                            <CardContent>
                                {product.reviews.map((review) => (
                                    <Box key={review.id}>
                                        {/* 리뷰 헤더 */}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar src={review.customerAvatar} sx={{ width: 40, height: 40 }} />
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight="medium">
                                                        {review.customerName}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {review.reviewDate}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Rating value={review.rating} readOnly size="small" />
                                                <Typography variant="caption" color="text.secondary">
                                                    ({review.rating}.0)
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* 리뷰 내용 */}
                                        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                                            {review.reviewText}
                                        </Typography>

                                        {/* 리뷰 이미지 */}
                                        {review.images.length > 0 && (
                                            <Box sx={{ display: 'flex', gap: 1, mb: 2, overflowX: 'auto' }}>
                                                {review.images.map((image, index) => (
                                                    <CardMedia
                                                        key={index}
                                                        component="img"
                                                        sx={{
                                                            width: 80,
                                                            height: 80,
                                                            borderRadius: 1,
                                                            flexShrink: 0,
                                                            border: '1px solid #e0e0e0'
                                                        }}
                                                        image={image}
                                                        alt={`리뷰 이미지 ${index + 1}`}
                                                    />
                                                ))}
                                            </Box>
                                        )}

                                        {/* 리뷰 액션 */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            pt: 2,
                                            borderTop: '1px solid #f0f0f0'
                                        }}>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Button
                                                    startIcon={<ThumbUp />}
                                                    size="small"
                                                    color="inherit"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    도움돼요 ({review.helpful})
                                                </Button>
                                                <Button
                                                    startIcon={<Comment />}
                                                    size="small"
                                                    color="inherit"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    답글
                                                </Button>
                                            </Box>
                                            {review.images.length > 0 && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <ImageIcon sx={{ width: 16, height: 16, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {review.images.length}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* 제품이 없을 때 */}
                {productReviews.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <StarRate sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            해당 조건의 제품이 없습니다.
                        </Typography>
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ minheight: '100vh', backgroundColor: theme.palette.background.default }}>
            {/* 헤더 */}
            <AppBar position="fixed" color="default" elevation={1}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                        <Avatar
                            sx={{ width: 48, height: 48 }}
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfedrOM9tiWIHu5hc0AZODOS6Sp0seq13g8RmVpHfMHNxgPEiFFHKCKt9Llr54wGfIbjzaC-4dNGKBWEi_JIfo-LM-KE_ZY4oJv25Y8SZiSBeZ_ryN2lq8Bzwybg8e2dZXBWJFkHz-bSMK7xCC0xNirc6io1frBn_zOnRxJuU-rSb_VFD91lPbXRtBoDFtTmjy4UzEpvDPTmXIbRzboctB5_LdStr1okp9EIGBAJ8JztLJ1zobCVLR9kUsMu2iMSpji9oM5guu0U1U"
                        />
                        <Typography variant="h6" fontWeight="bold">
                            CatDogEats
                        </Typography>
                    </Box>
                    {isMobile && (
                        <IconButton color="inherit" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* 사이드바 - 데스크톱 */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'fixed',
                    left: 0,
                    top: 64,
                    width: 240,
                    height: 'calc(100vh - 64px)',
                    backgroundColor: '#f8f9fa',
                    borderRight: '1px solid #e0e0e0',
                    overflowY: 'auto',
                    zIndex: theme.zIndex.drawer
                }}
            >
                {drawer}
            </Box>

            {/* 사이드바 - 모바일 */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: 240,
                        top: 64,
                        height: 'calc(100vh - 64px)',
                        backgroundColor: '#f8f9fa'
                    }
                }}
            >
                {drawer}
            </Drawer>

            {/* 메인 콘텐츠 */}
            <Box
                component="main"
                sx={{
                    marginTop: '64px',
                    marginLeft: { xs: 0, md: '240px' },
                    width: { xs: '100%', md: 'calc(100% - 240px)' },
                    backgroundColor: theme.palette.background.default,
                    minHeight: 'calc(100vh - 64px)'
                }}
            >
                {/* 탭 헤더 */}
                <Paper elevation={1} sx={{ borderRadius: 0 }}>
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                            {selectedCustomer && isMobile && (
                                <IconButton onClick={handleBackToList}>
                                    <ArrowBack />
                                </IconButton>
                            )}
                            <Typography variant="h4" fontWeight="bold">
                                {selectedCustomer && isMobile ? selectedCustomer.name : '고객 관리'}
                            </Typography>
                        </Box>
                        {(!selectedCustomer || !isMobile) && (
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="고객 문의" />
                                <Tab label="상품 리뷰" />
                            </Tabs>
                        )}
                    </Container>
                </Paper>

                {/* 콘텐츠 영역 */}
                <Box sx={{ minheight: 'calc(100vh - 128px)' }}>
                    {/* 모바일에서 채팅창이 열린 경우 */}
                    {selectedCustomer && isMobile && (
                        <Box sx={{ height: '100%' }}>
                            {renderChatWindow()}
                        </Box>
                    )}

                    {/*/!* 데스크톱 또는 모바일에서 고객 목록 *!/*/}
                    {/*{!selectedCustomer && activeTab === 0 && (*/}
                    {/*    <Container maxWidth="lg" sx={{ p: 3, height: '100%', overflow: 'auto' }}>*/}
                    {/*        {renderCustomerInquiries()}*/}
                    {/*    </Container>*/}
                    {/*)}*/}

                    {/* 데스크톱에서 고객 문의 탭 (분할 화면) */}
                    {activeTab === 0 && (
                        <Box sx={{ display: 'flex', height: '100%' }}>
                            {/* 고객 목록 */}
                            <Box sx={{
                                width: selectedCustomer ? '33%' : '100%',
                                minWidth: 320,
                                p: 3,
                                overflowY: 'auto',
                                borderRight: selectedCustomer ? '1px solid #e0e0e0' : 'none'
                            }}>
                                {renderCustomerInquiries()}
                            </Box>

                            {/* 채팅창 */}
                            {selectedCustomer && (
                                <Box sx={{ flexGrow: 1 }}>
                                    {renderChatWindow()}
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* 상품 리뷰 탭 */}
                    {activeTab === 1 && (
                        <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
                            {renderProductReviews()}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CustomerManagementPage;