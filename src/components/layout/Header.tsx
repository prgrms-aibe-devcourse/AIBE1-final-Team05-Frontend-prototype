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
    Badge,
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
                    🐕 Pet's Delight
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
                    onClick={() => setMobileOpen(false)}
                >
                    로그인
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setMobileOpen(false)}
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
                    backgroundColor: 'rgba(252, 250, 248, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: 'text.primary',
                    boxShadow: '0 1px 0 rgba(231, 221, 208, 1)',
                    borderBottom: '1px solid',
                    borderBottomColor: 'grey.200',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', py: 1, minHeight: '64px !important' }}>
                    {/* 로고 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: 'conic-gradient(from 0deg, #e89830 0deg, #e89830 360deg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '16px',
                            }}
                        >
                            🐕
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
                            Pet's Delight
                        </Typography>
                    </Box>

                    {/* 네비게이션 (데스크톱) */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 4 }}>
                            {navigationItems.map((item) => (
                                <Button
                                    key={item.label}
                                    color="inherit"
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: 'text.primary',
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: 'transparent',
                                        }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* 검색 및 액션 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                        {/* 검색창 */}
                        {!isSmall && (
                            <TextField
                                placeholder="간식 검색..."
                                size="small"
                                sx={{
                                    width: { sm: 200, md: 300 },
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'grey.100',
                                        '& input': {
                                            fontSize: '0.875rem',
                                        }
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton size="small">
                                                <span className="material-icons" style={{ fontSize: '18px' }}>search</span>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}

                        {/* 모바일 검색 아이콘 */}
                        {isSmall && (
                            <IconButton>
                                <span className="material-icons">search</span>
                            </IconButton>
                        )}

                        {/* 로그인/회원가입 버튼 (데스크톱) */}
                        {!isMobile && (
                            <>
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{
                                        color: 'text.primary',
                                        '&:hover': { backgroundColor: 'grey.100' }
                                    }}
                                >
                                    로그인
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        borderRadius: 3,
                                        px: 2
                                    }}
                                >
                                    회원가입
                                </Button>
                            </>
                        )}

                        {/* 모바일 로그인/회원가입 아이콘 */}
                        {isMobile && !isSmall && (
                            <>
                                <IconButton>
                                    <span className="material-icons">login</span>
                                </IconButton>
                                <IconButton>
                                    <span className="material-icons">person_add</span>
                                </IconButton>
                            </>
                        )}

                        {/* 장바구니 */}
                        <IconButton
                            sx={{
                                color: 'text.primary',
                                '&:hover': {
                                    color: 'primary.main',
                                    backgroundColor: 'grey.100'
                                }
                            }}
                        >
                            <Badge badgeContent={3} color="primary" max={99}>
                                <span className="material-icons">shopping_cart</span>
                            </Badge>
                        </IconButton>

                        {/* 모바일 메뉴 버튼 */}
                        {isMobile && (
                            <IconButton
                                onClick={handleDrawerToggle}
                                sx={{
                                    color: 'text.primary',
                                    '&:hover': {
                                        color: 'primary.main'
                                    }
                                }}
                            >
                                <span className="material-icons">menu</span>
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