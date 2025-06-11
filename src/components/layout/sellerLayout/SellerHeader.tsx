import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    Button,
    Divider,
    useTheme
} from '@mui/material';
import { SellerHeaderProps, Notification } from '@/components/layout/sellerLayout/types/seller.types.ts';

const SellerHeader = ({
                          sellerInfo,
                          notifications,
                          onNotificationClick,
                          onAnnouncementClick,
                          onFaqClick,
                          onInquiryClick
                      }: SellerHeaderProps) => {
    const theme = useTheme();
    const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
    const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleNotificationMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchor(null);
    };

    const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileAnchor(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchor(null);
    };

    const handleNotificationItemClick = (notification: Notification) => {
        if (onNotificationClick) {
            onNotificationClick(notification);
        }
        handleNotificationClose();
    };

    const getNotificationIcon = (type: Notification['type']) => {
        const iconMap = {
            order: 'shopping_bag',
            delivery: 'local_shipping',
            inquiry: 'support_agent',
            system: 'info'
        };
        return iconMap[type] || 'info';
    };

    const getNotificationColor = (type: Notification['type']) => {
        const colorMap = {
            order: theme.palette.primary.main,
            delivery: '#48bb78',
            inquiry: '#ed8936',
            system: theme.palette.text.secondary
        };
        return colorMap[type] || theme.palette.text.secondary;
    };

    const getNotificationBgColor = (type: Notification['type']) => {
        const bgColorMap = {
            order: 'rgba(232, 152, 48, 0.1)',
            delivery: 'rgba(72, 187, 120, 0.1)',
            inquiry: 'rgba(237, 137, 54, 0.1)',
            system: 'rgba(151, 120, 78, 0.1)'
        };
        return bgColorMap[type] || 'rgba(151, 120, 78, 0.1)';
    };

    return (
        <AppBar
            position="static" // sticky에서 static으로 변경
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: theme.zIndex.appBar
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                {/* 로고 및 브랜드 */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: 32,  // Header와 동일하게 32px로 변경
                            height: 32, // Header와 동일하게 32px로 변경
                            borderRadius: '50%',
                            background: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5, // Header와 동일하게 1.5로 변경
                            cursor: 'pointer'
                        }}
                    >
                        <span className="material-icons" style={{ color: 'white', fontSize: '20px' }}>
                            pets
                        </span>
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            component="div"  // Header와 동일하게 component 추가
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',  // Header와 동일하게 text.primary로 변경
                                cursor: 'pointer',  // Header와 동일하게 cursor 추가
                                fontSize: { xs: '1.1rem', sm: '1.25rem' },  // Header와 동일한 반응형 크기
                                lineHeight: 1
                            }}
                        >
                            CatDogEats
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: '0.75rem'
                            }}
                        >
                            판매자 대시보드
                        </Typography>
                    </Box>
                </Box>

                {/* 우측 메뉴 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* 네비게이션 메뉴 */}
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 0.5,
                        mr: 2
                    }}>
                        <Button
                            color="inherit"
                            startIcon={<span className="material-icons">campaign</span>}
                            onClick={onAnnouncementClick}
                            sx={{
                                textTransform: 'none',
                                color: theme.palette.text.secondary,
                                fontWeight: 400,  // Header와 동일하게 400으로 변경
                                fontSize: '0.875rem',
                                minWidth: 'auto',  // Header와 동일하게 추가
                                px: 1,  // Header와 동일하게 px: 1 추가
                                '&:hover': {
                                    color: theme.palette.text.primary,
                                    backgroundColor: 'transparent'  // Header와 동일하게 transparent로 변경
                                }
                            }}
                        >
                            공지사항
                        </Button>

                        <Button
                            color="inherit"
                            startIcon={<span className="material-icons">help</span>}
                            onClick={onFaqClick}
                            sx={{
                                textTransform: 'none',
                                color: theme.palette.text.secondary,
                                fontWeight: 400,  // Header와 동일하게 400으로 변경
                                fontSize: '0.875rem',
                                minWidth: 'auto',  // Header와 동일하게 추가
                                px: 1,  // Header와 동일하게 px: 1 추가
                                '&:hover': {
                                    color: theme.palette.text.primary,
                                    backgroundColor: 'transparent'  // Header와 동일하게 transparent로 변경
                                }
                            }}
                        >
                            FAQ
                        </Button>

                        <Button
                            color="inherit"
                            startIcon={<span className="material-icons">support_agent</span>}
                            onClick={onInquiryClick}
                            sx={{
                                textTransform: 'none',
                                color: theme.palette.text.secondary,
                                fontWeight: 400,  // Header와 동일하게 400으로 변경
                                fontSize: '0.875rem',
                                minWidth: 'auto',  // Header와 동일하게 추가
                                px: 1,  // Header와 동일하게 px: 1 추가
                                '&:hover': {
                                    color: theme.palette.text.primary,
                                    backgroundColor: 'transparent'  // Header와 동일하게 transparent로 변경
                                }
                            }}
                        >
                            1:1 문의
                        </Button>
                    </Box>

                    {/* 알림 아이콘 */}
                    <IconButton
                        onClick={handleNotificationMenuClick}
                        sx={{
                            color: theme.palette.text.secondary,
                            '&:hover': {
                                color: theme.palette.primary.main,
                                backgroundColor: theme.palette.grey[100]
                            }
                        }}
                    >
                        <Badge badgeContent={unreadCount} color="error">
                            <span className="material-icons">notifications</span>
                        </Badge>
                    </IconButton>

                    {/* 프로필 */}
                    <IconButton onClick={handleProfileClick} sx={{ p: 0.5 }}>
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                backgroundColor: theme.palette.primary.main,
                                fontSize: '0.875rem',
                                fontWeight: 600
                            }}
                            src={sellerInfo.profileImage}
                        >
                            {sellerInfo.name.charAt(0)}
                        </Avatar>
                    </IconButton>
                </Box>
            </Toolbar>

            {/* 알림 메뉴 */}
            <Menu
                anchorEl={notificationAnchor}
                open={Boolean(notificationAnchor)}
                onClose={handleNotificationClose}
                PaperProps={{
                    sx: {
                        width: 320,
                        maxHeight: 400,
                        mt: 1,
                        borderRadius: 2,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }
                }}
            >
                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.grey[200]}` }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                        }}
                    >
                        알림 ({unreadCount}개 읽지 않음)
                    </Typography>
                </Box>

                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <MenuItem
                                key={notification.id}
                                onClick={() => handleNotificationItemClick(notification)}
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    py: 1.5,
                                    backgroundColor: notification.isRead
                                        ? 'transparent'
                                        : getNotificationBgColor(notification.type),
                                    borderLeft: notification.isRead
                                        ? 'none'
                                        : `3px solid ${getNotificationColor(notification.type)}`,
                                    '&:hover': {
                                        backgroundColor: notification.isRead
                                            ? theme.palette.grey[100]
                                            : getNotificationBgColor(notification.type)
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 0.5 }}>
                                    <span
                                        className="material-icons"
                                        style={{
                                            fontSize: '16px',
                                            color: getNotificationColor(notification.type),
                                            marginRight: '8px'
                                        }}
                                    >
                                        {getNotificationIcon(notification.type)}
                                    </span>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: notification.isRead ? 400 : 600,
                                            flex: 1,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        {notification.title}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        ml: 3
                                    }}
                                >
                                    {notification.message}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        ml: 3,
                                        fontSize: '0.7rem'
                                    }}
                                >
                                    {notification.timestamp}
                                </Typography>
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary
                                }}
                            >
                                새로운 알림이 없습니다
                            </Typography>
                        </MenuItem>
                    )}
                </Box>

                <Divider />
                <Box sx={{ p: 1 }}>
                    <Button
                        fullWidth
                        size="small"
                        sx={{
                            textTransform: 'none',
                            color: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.grey[100]
                            }
                        }}
                    >
                        모든 알림 보기
                    </Button>
                </Box>
            </Menu>

            {/* 프로필 메뉴 */}
            <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={handleProfileClose}
                PaperProps={{
                    sx: {
                        width: 200,
                        mt: 1,
                        borderRadius: 2,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }
                }}
            >
                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.grey[200]}` }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                        }}
                    >
                        {sellerInfo.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: theme.palette.text.secondary
                        }}
                    >
                        {sellerInfo.email}
                    </Typography>
                </Box>

                <MenuItem
                    onClick={handleProfileClose}
                    sx={{
                        color: theme.palette.text.primary,
                        '&:hover': {
                            backgroundColor: theme.palette.grey[100]
                        }
                    }}
                >
                    <span className="material-icons" style={{ marginRight: '8px', fontSize: '18px' }}>
                        person
                    </span>
                    프로필 수정
                </MenuItem>
                <MenuItem
                    onClick={handleProfileClose}
                    sx={{
                        color: theme.palette.text.primary,
                        '&:hover': {
                            backgroundColor: theme.palette.grey[100]
                        }
                    }}
                >
                    <span className="material-icons" style={{ marginRight: '8px', fontSize: '18px' }}>
                        store
                    </span>
                    판매자 정보
                </MenuItem>
                <MenuItem
                    onClick={handleProfileClose}
                    sx={{
                        color: theme.palette.text.primary,
                        '&:hover': {
                            backgroundColor: theme.palette.grey[100]
                        }
                    }}
                >
                    <span className="material-icons" style={{ marginRight: '8px', fontSize: '18px' }}>
                        settings
                    </span>
                    설정
                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={handleProfileClose}
                    sx={{
                        color: '#f56565',
                        '&:hover': {
                            backgroundColor: 'rgba(245, 101, 101, 0.1)'
                        }
                    }}
                >
                    <span className="material-icons" style={{ marginRight: '8px', fontSize: '18px' }}>
                        logout
                    </span>
                    로그아웃
                </MenuItem>
            </Menu>
        </AppBar>
    );
};

export default SellerHeader;