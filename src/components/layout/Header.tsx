import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    TextField,
    InputAdornment,
    Button,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const navigationItems = [
        { label: '홈', path: '/' },
        { label: '카테고리', path: '/categories' },
        { label: '공방 소개', path: '/workshops' },
        { label: '고객센터', path: '/support' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ width: 250, pt: 2 }}>
            <Box sx={{ px: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    CatDogEats
                </Typography>
            </Box>
            <Divider />
            <List>
                {navigationItems.map((item) => (
                    <ListItem
                        key={item.label}
                        onClick={() => {
                            navigate(item.path);
                            setMobileOpen(false);
                        }}
                        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}
                    >
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    onClick={() => {
                        navigate('/login');
                        setMobileOpen(false);
                    }}
                >
                    로그인
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        navigate('/login');
                        setMobileOpen(false);
                    }}
                >
                    회원가입
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: 'white',
                    color: 'text.primary',
                    boxShadow: 'none',
                    borderBottom: '1px solid',
                    borderBottomColor: 'grey.200',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, sm: 1.5 }, minHeight: '64px !important' }}>
                    {/* 로고 */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: '#e89830',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1.5,
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate('/')}
                        >
                        </Box>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                cursor: 'pointer',
                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                            }}
                            onClick={() => navigate('/')}
                        >
                            CatDogEats
                        </Typography>
                    </Box>

                    {/* 네비게이션 (데스크톱) */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 4, mx: 4 }}>
                            {navigationItems.map((item) => (
                                <Button
                                    key={item.label}
                                    color="inherit"
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 400,
                                        color: 'text.secondary',
                                        textTransform: 'none',
                                        minWidth: 'auto',
                                        px: 1,
                                        '&:hover': {
                                            color: 'text.primary',
                                            backgroundColor: 'transparent',
                                        }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* 검색창 및 우측 메뉴 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                        {/* 검색창 (데스크톱) */}
                        {!isSmall && (
                            <TextField
                                placeholder="간식 검색..."
                                size="small"
                                sx={{
                                    width: { sm: 200, md: 250 },
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '20px',
                                        fontSize: '0.875rem',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        '&:hover fieldset': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: '1px solid #e89830',
                                        },
                                        '& input': {
                                            fontSize: '0.875rem',
                                            py: '8px',
                                        }
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <span className="material-icons" style={{ fontSize: '18px', color: '#999' }}>
                                                search
                                            </span>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}

                        {/* 로그인 버튼 (데스크톱) */}
                        {!isMobile && (
                            <Button
                                variant="text"
                                onClick={() => navigate('/login')} // 로그인 페이지로 이동
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 400,
                                    color: 'text.secondary',
                                    textTransform: 'none',
                                    minWidth: 'auto',
                                    px: 2,
                                    '&:hover': {
                                        color: 'text.primary',
                                        backgroundColor: 'transparent',
                                    }
                                }}
                            >
                                로그인
                            </Button>
                        )}

                        {/* 회원가입 버튼 (데스크톱) */}
                        {!isMobile && (
                            <Button
                                variant="contained"
                                onClick={() => navigate('/login')} // 로그인 페이지로 이동 (소셜로그인으로 회원가입도 처리)
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    backgroundColor: '#e89830',
                                    color: 'white',
                                    textTransform: 'none',
                                    borderRadius: '20px',
                                    px: 3,
                                    py: 1,
                                    '&:hover': {
                                        backgroundColor: '#d18224',
                                    }
                                }}
                            >
                                회원가입
                            </Button>
                        )}

                        {/* 장바구니 아이콘 */}
                        <IconButton
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'primary.main',
                                    backgroundColor: 'grey.50'
                                }
                            }}
                        >
                            <span className="material-icons" style={{ fontSize: '20px' }}>
                                shopping_cart
                            </span>
                        </IconButton>

                        {/* 모바일 검색 아이콘 */}
                        {isSmall && (
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                        color: 'primary.main',
                                        backgroundColor: 'grey.50'
                                    }
                                }}
                            >
                                <span className="material-icons" style={{ fontSize: '20px' }}>
                                    search
                                </span>
                            </IconButton>
                        )}

                        {/* 모바일 메뉴 버튼 */}
                        {isMobile && (
                            <IconButton
                                onClick={handleDrawerToggle}
                                size="small"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                        color: 'primary.main',
                                        backgroundColor: 'grey.50'
                                    }
                                }}
                            >
                                <span className="material-icons" style={{ fontSize: '20px' }}>
                                    menu
                                </span>
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* 모바일 드로어 */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Header;