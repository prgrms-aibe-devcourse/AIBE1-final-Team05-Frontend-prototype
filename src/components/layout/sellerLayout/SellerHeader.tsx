import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    useTheme
} from '@mui/material';
import { SellerHeaderProps } from '@/components/layout/sellerLayout/types/seller.types.ts';
import { NotificationMenu, ProfileMenu } from '@/components/common';

const SellerHeader = ({
                          sellerInfo,
                          notifications,
                          onNotificationClick,
                          onAnnouncementClick,
                          onFaqClick,
                          onInquiryClick,
                          onProfileEdit,
                          onSellerInfo,
                          onSettings,
                          onLogout
                      }: SellerHeaderProps) => {
    const theme = useTheme();

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

                    {/* 알림 메뉴 */}
                    <NotificationMenu
                        notifications={notifications}
                        onNotificationClick={onNotificationClick}
                    />

                    {/* 프로필 메뉴 */}
                    <ProfileMenu
                        userInfo={sellerInfo}
                        onProfileEdit={onProfileEdit}
                        onSellerInfo={onSellerInfo}
                        onSettings={onSettings}
                        onLogout={onLogout}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SellerHeader;