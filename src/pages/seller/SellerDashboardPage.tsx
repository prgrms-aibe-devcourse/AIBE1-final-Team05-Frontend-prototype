import { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    useTheme,
    useMediaQuery,
    IconButton
} from '@mui/material';
import {
    SellerHeader,
    SettlementTab
} from '@/domains/seller';
import {
    SellerInfo,
    Notification,
} from '@/domains/seller/types';

// 임시 컴포넌트들 (추후 구현 예정)
const ProductManagementTabContent = () => {
    const theme = useTheme();
    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <span
                    className="material-icons"
                    style={{
                        fontSize: '64px',
                        color: theme.palette.grey[200],
                        marginBottom: '16px',
                        display: 'block'
                    }}
                >
                    inventory
                </span>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        fontWeight: 700
                    }}
                >
                    상품관리 탭
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary
                    }}
                >
                    상품 등록, 조회/수정, 알림 기능이 곧 구현 예정입니다!
                </Typography>
            </Box>
        </Box>
    );
};

const DashboardTabContent = () => {
    const theme = useTheme();
    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <span
                    className="material-icons"
                    style={{
                        fontSize: '64px',
                        color: theme.palette.grey[200],
                        marginBottom: '16px',
                        display: 'block'
                    }}
                >
                    dashboard
                </span>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        fontWeight: 700
                    }}
                >
                    대시보드 탭
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary
                    }}
                >
                    LLM 활용 수요 예측 기능이 곧 구현 예정입니다!
                </Typography>
            </Box>
        </Box>
    );
};

const OrderShippingTabContent = () => {
    const theme = useTheme();
    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <span
                    className="material-icons"
                    style={{
                        fontSize: '64px',
                        color: theme.palette.grey[200],
                        marginBottom: '16px',
                        display: 'block'
                    }}
                >
                    local_shipping
                </span>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        fontWeight: 700
                    }}
                >
                    주문/배송 탭
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary
                    }}
                >
                    환불, 주문 등록, 배송 조회 기능이 곧 구현 예정입니다!
                </Typography>
            </Box>
        </Box>
    );
};

const CustomerManagementTabContent = () => {
    const theme = useTheme();
    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <span
                    className="material-icons"
                    style={{
                        fontSize: '64px',
                        color: theme.palette.grey[200],
                        marginBottom: '16px',
                        display: 'block'
                    }}
                >
                    people
                </span>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        fontWeight: 700
                    }}
                >
                    고객관리 탭
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary
                    }}
                >
                    고객문의, 상품평 관리 기능이 곧 구현 예정입니다!
                </Typography>
            </Box>
        </Box>
    );
};

const SellerInfoTabContent = () => {
    const theme = useTheme();
    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <span
                    className="material-icons"
                    style={{
                        fontSize: '64px',
                        color: theme.palette.grey[200],
                        marginBottom: '16px',
                        display: 'block'
                    }}
                >
                    store
                </span>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        fontWeight: 700
                    }}
                >
                    판매자 정보 탭
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary
                    }}
                >
                    판매자 소개 입력 및 수정 기능이 곧 구현 예정입니다!
                </Typography>
            </Box>
        </Box>
    );
};

// 더미 데이터
const mockSellerInfo: SellerInfo = {
    id: 'seller-001',
    name: '김판매',
    email: 'seller@catdogeats.com',
    shopName: '사랑가득 엄마손길',
    shopDescription: '유기농 재료로 만드는 건강 간식 전문',
    joinDate: '2023-01-15'
};

const mockNotifications: Notification[] = [
    {
        id: 'noti-001',
        title: '새로운 주문이 들어왔습니다',
        message: '닭가슴살 간식 1개 주문이 접수되었습니다.',
        timestamp: '5분 전',
        isRead: false,
        type: 'order'
    },
    {
        id: 'noti-002',
        title: '배송이 완료되었습니다',
        message: '주문번호 #12345의 배송이 완료되었습니다.',
        timestamp: '1시간 전',
        isRead: false,
        type: 'delivery'
    },
    {
        id: 'noti-003',
        title: '고객 문의가 도착했습니다',
        message: '상품에 대한 문의가 1건 도착했습니다.',
        timestamp: '2시간 전',
        isRead: false,
        type: 'inquiry'
    }
];

const DRAWER_WIDTH = 240;

const SellerDashboardPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeTab, setActiveTab] = useState(4); // 정산 탭을 기본으로 설정
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNotificationClick = (notification: Notification) => {
        console.log('알림 클릭:', notification);
    };

    const handleAnnouncementClick = () => {
        console.log('공지사항 클릭');
    };

    const handleFaqClick = () => {
        console.log('FAQ 클릭');
    };

    const handleInquiryClick = () => {
        console.log('1:1 문의 클릭');
    };

    const menuItems = [
        {
            id: 1,
            label: '상품관리',
            icon: 'inventory',
            isHeader: false
        },
        {
            id: 2,
            label: '대시보드',
            icon: 'analytics',
            isHeader: false
        },
        {
            id: 3,
            label: '주문/배송',
            icon: 'local_shipping',
            isHeader: false
        },
        {
            id: 4,
            label: '정산관리',
            icon: 'account_balance_wallet',
            isHeader: false
        },
        {
            id: 5,
            label: '고객관리',
            icon: 'people',
            isHeader: false
        },
        {
            id: 6,
            label: '판매자 정보',
            icon: 'store',
            isHeader: false
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 1:
                return <ProductManagementTabContent />;
            case 2:
                return <DashboardTabContent />;
            case 3:
                return <OrderShippingTabContent />;
            case 4:
                return <SettlementTab />;
            case 5:
                return <CustomerManagementTabContent />;
            case 6:
                return <SellerInfoTabContent />;
            default:
                return <DashboardTabContent />;
        }
    };

    const drawer = (
        <Box sx={{
            height: '100%',
            backgroundColor: '#f8f9fa',
            // 헤더와 연결된 느낌을 주기 위해 상단 패딩 제거
            pt: 0
        }}>
            <List sx={{ p: 0 }}>
                {menuItems.map((item) => (
                    <ListItem
                        key={item.id}
                        onClick={() => !item.isHeader && handleTabChange(item.id)}
                        sx={{
                            py: item.isHeader ? 3 : 2,
                            px: 3,
                            cursor: item.isHeader ? 'default' : 'pointer',
                            backgroundColor: activeTab === item.id && !item.isHeader
                                ? '#fff3e0'
                                : 'transparent',
                            borderRight: activeTab === item.id && !item.isHeader
                                ? `3px solid ${theme.palette.primary.main}`
                                : 'none',
                            '&:hover': {
                                backgroundColor: item.isHeader
                                    ? 'transparent'
                                    : activeTab === item.id
                                        ? '#fff3e0'
                                        : '#f0f0f0'
                            }
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: item.isHeader
                                    ? theme.palette.primary.main
                                    : activeTab === item.id
                                        ? theme.palette.primary.main
                                        : theme.palette.text.secondary
                            }}
                        >
                            <span className="material-icons">
                                {item.icon}
                            </span>
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontSize: item.isHeader ? '1.1rem' : '0.95rem',
                                    fontWeight: item.isHeader ? 700 : activeTab === item.id ? 600 : 400,
                                    color: item.isHeader
                                        ? theme.palette.primary.main
                                        : activeTab === item.id
                                            ? theme.palette.primary.main
                                            : theme.palette.text.primary
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{
            height: '100vh', // minHeight가 아닌 고정 height
            backgroundColor: theme.palette.background.default,
            overflow: 'hidden' // 전체 페이지 스크롤 방지
        }}>
            {/* 헤더 - 고정 위치 */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 64, // 명시적으로 높이 설정
                    zIndex: theme.zIndex.appBar
                }}
            >
                <SellerHeader
                    sellerInfo={mockSellerInfo}
                    notifications={mockNotifications}
                    onNotificationClick={handleNotificationClick}
                    onAnnouncementClick={handleAnnouncementClick}
                    onFaqClick={handleFaqClick}
                    onInquiryClick={handleInquiryClick}
                />
            </Box>

            {/* 모바일 메뉴 버튼 */}
            {isMobile && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 64, // 헤더 높이만큼 아래
                        left: 0,
                        right: 0,
                        height: 48, // 명시적으로 높이 설정
                        zIndex: theme.zIndex.appBar - 1,
                        backgroundColor: theme.palette.background.paper,
                        borderBottom: `1px solid ${theme.palette.grey[200]}`
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 2, height: '100%' }}>
                        <IconButton
                            color="inherit"
                            aria-label="메뉴 열기"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ color: theme.palette.text.primary, mr: 2 }}
                        >
                            <span className="material-icons">menu</span>
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            {menuItems.find(item => item.id === activeTab)?.label || '대시보드'}
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* 사이드바 - 데스크톱 (고정 위치) */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'fixed',
                    left: 0,
                    top: 64, // 헤더 높이만큼 아래
                    width: DRAWER_WIDTH,
                    height: 'calc(100vh - 64px)', // 전체 높이에서 헤더 높이 제외
                    backgroundColor: '#f8f9fa',
                    borderRight: `1px solid ${theme.palette.grey[200]}`,
                    overflowY: 'auto', // 사이드바에 독립적인 스크롤
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
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        top: isMobile ? 112 : 64, // 헤더 + 모바일 메뉴 높이
                        height: `calc(100vh - ${isMobile ? 112 : 64}px)`,
                        backgroundColor: '#f8f9fa'
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* 메인 콘텐츠 */}
            <Box
                component="main"
                sx={{
                    position: 'fixed',
                    top: { xs: isMobile ? 112 : 64, md: 64 }, // 헤더(+모바일메뉴) 아래부터 시작
                    left: { xs: 0, md: DRAWER_WIDTH }, // 데스크톱에서는 사이드바 옆에서 시작
                    right: 0,
                    bottom: 0,
                    backgroundColor: theme.palette.background.default,
                    overflowY: 'auto', // 메인 콘텐츠에서만 스크롤
                    overflowX: 'hidden'
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
};

export default SellerDashboardPage;