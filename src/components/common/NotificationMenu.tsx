import React, { useState } from 'react';
import {
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Box,
    Typography,
    Button,
    Divider,
    useTheme
} from '@mui/material';

export interface Notification {
    id: string;
    type: 'order' | 'delivery' | 'inquiry' | 'system';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
}

interface NotificationMenuProps {
    notifications: Notification[];
    onNotificationClick?: (notification: Notification) => void;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({
                                                               notifications,
                                                               onNotificationClick
                                                           }) => {
    const theme = useTheme();
    const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleNotificationMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchor(null);
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
        <>
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
        </>
    );
};

export default NotificationMenu;