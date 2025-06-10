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
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);

    // 필터 상태
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [allergyFree, setAllergyFree] = useState(false);
    const [minRating, setMinRating] = useState<number>(0);
    const [maxRating, setMaxRating] = useState<number>(5);

    const navigationItems = [
        { label: '베스트 상품', path: '/best' },
        { label: '특가 상품', path: '/sale' },
        { label: '신규 상품', path: '/new' },
        {
            label: '카테고리',
            path: '/categories',
            subItems: [
                {
                    label: '강아지 간식',
                    path: '/categories/dog',
                    subItems: [
                        { label: '주문 제작', path: '/categories/dog/custom' },
                        { label: '완제품', path: '/categories/dog/ready-made' }
                    ]
                },
                {
                    label: '고양이 간식',
                    path: '/categories/cat',
                    subItems: [
                        { label: '주문 제작', path: '/categories/cat/custom' },
                        { label: '완제품', path: '/categories/cat/ready-made' }
                    ]
                }
            ]
        },
        { label: '고객센터', path: '/support' },
        { label: '필터', isFilter: true },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleFilterApply = () => {
        // 필터 적용 로직
        console.log('필터 적용:', {
            minPrice,
            maxPrice,
            allergyFree,
            minRating,
            maxRating
        });
        setMenuOpen(false);
    };

    const handleFilterReset = () => {
        setMinPrice('');
        setMaxPrice('');
        setAllergyFree(false);
        setMinRating(0);
        setMaxRating(5);
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
        setHoveredCategory(null);
        setHoveredSubCategory(null);
    };

    // 별점 컴포넌트
    const StarRating = ({
                            rating,
                            onStarClick,
                            size = 16,
                            interactive = true
                        }: {
        rating: number;
        onStarClick?: (star: number) => void;
        size?: number;
        interactive?: boolean;
    }) => {
        return (
            <Box sx={{ display: 'flex', gap: 0.25 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Box
                        key={star}
                        onClick={() => interactive && onStarClick && onStarClick(star)}
                        sx={{
                            cursor: interactive ? 'pointer' : 'default',
                            color: star <= rating ? '#ffc107' : '#e0e0e0',
                            fontSize: `${size}px`,
                            lineHeight: 1,
                            transition: 'color 0.2s',
                            '&:hover': interactive ? {
                                color: star <= rating ? '#ffb300' : '#bdbdbd'
                            } : {}
                        }}
                    >
                        ★
                    </Box>
                ))}
            </Box>
        );
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
                            if (item.path) {
                                navigate(item.path);
                                setMobileOpen(false);
                            }
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
                <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, sm: 1.5 }, minHeight: '64px !important', position: 'relative' }}>
                    {/* 왼쪽 영역: 햄버거 메뉴 + 로고 */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* 햄버거 메뉴 버튼 */}
                        <IconButton
                            onClick={handleMenuToggle}
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                mr: 2,
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
                    </Box>

                    {/* 드롭다운 메뉴 */}
                    {menuOpen && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: 'fit-content',
                                minWidth: '180px',
                                height: 'calc(100vh - 64px)',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                zIndex: 1000,
                                borderTop: '1px solid',
                                borderTopColor: 'grey.200',
                                borderRadius: '0 0 8px 8px'
                            }}
                        >
                            <List sx={{ py: 0 }}>
                                {navigationItems.map((item, index) => (
                                    <Box key={item.label} sx={{ position: 'relative' }}>
                                        <ListItem
                                            onClick={() => {
                                                if (!item.subItems && !item.isFilter && item.path) {
                                                    navigate(item.path);
                                                    setMenuOpen(false);
                                                }
                                            }}
                                            onMouseEnter={() => {
                                                if (item.subItems) {
                                                    setHoveredCategory(item.label);
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                if (item.subItems) {
                                                    setHoveredCategory(null);
                                                    setHoveredSubCategory(null);
                                                }
                                            }}
                                            sx={{
                                                cursor: item.isFilter ? 'default' : 'pointer',
                                                py: 2,
                                                px: 3,
                                                borderBottom: index < navigationItems.length - 1 ? '1px solid' : 'none',
                                                borderBottomColor: 'grey.100',
                                                '&:hover': {
                                                    backgroundColor: item.isFilter ? 'transparent' : 'grey.50'
                                                },
                                                whiteSpace: 'nowrap',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                flexDirection: item.isFilter ? 'column' : 'row',
                                                alignItems: item.isFilter ? 'stretch' : 'center'
                                            }}
                                        >
                                            <ListItemText
                                                primary={item.label}
                                                primaryTypographyProps={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 400,
                                                    color: 'text.primary'
                                                }}
                                            />
                                            {item.subItems && (
                                                <span className="material-icons" style={{ fontSize: '16px', color: '#999' }}>
                                                    chevron_right
                                                </span>
                                            )}

                                            {/* 필터 섹션 */}
                                            {item.isFilter && (
                                                <Box sx={{ width: '100%', mt: 1 }}>
                                                    {/* 가격 필터 */}
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="subtitle2" sx={{ mb: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                                                            가격 범위
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                            <TextField
                                                                size="small"
                                                                placeholder="최소"
                                                                value={minPrice}
                                                                onChange={(e) => setMinPrice(e.target.value)}
                                                                type="number"
                                                                sx={{
                                                                    width: '80px',
                                                                    '& .MuiOutlinedInput-root': {
                                                                        fontSize: '0.75rem',
                                                                        '& input': { py: '4px' }
                                                                    }
                                                                }}
                                                            />
                                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>~</Typography>
                                                            <TextField
                                                                size="small"
                                                                placeholder="최대"
                                                                value={maxPrice}
                                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                                type="number"
                                                                sx={{
                                                                    width: '80px',
                                                                    '& .MuiOutlinedInput-root': {
                                                                        fontSize: '0.75rem',
                                                                        '& input': { py: '4px' }
                                                                    }
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>

                                                    {/* 알러지 필터 */}
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: '0.75rem', color: 'text.secondary' }}>
                                                            알러지 유무
                                                        </Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={allergyFree}
                                                                    onChange={(e) => setAllergyFree(e.target.checked)}
                                                                    size="small"
                                                                    sx={{ py: 0.5 }}
                                                                />
                                                            }
                                                            label="알러지 프리"
                                                            sx={{
                                                                '& .MuiFormControlLabel-label': {
                                                                    fontSize: '0.75rem'
                                                                }
                                                            }}
                                                        />
                                                    </Box>

                                                    {/* 평점 필터 */}
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="subtitle2" sx={{ mb: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                                                            평점 범위
                                                        </Typography>

                                                        {/* 최소 평점 */}
                                                        <Box sx={{ mb: 1.5 }}>
                                                            <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', mb: 0.5, display: 'block' }}>
                                                                최소 평점: {minRating}점
                                                            </Typography>
                                                            <StarRating
                                                                rating={minRating}
                                                                onStarClick={setMinRating}
                                                                size={14}
                                                            />
                                                        </Box>

                                                        {/* 최대 평점 */}
                                                        <Box>
                                                            <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', mb: 0.5, display: 'block' }}>
                                                                최대 평점: {maxRating}점
                                                            </Typography>
                                                            <StarRating
                                                                rating={maxRating}
                                                                onStarClick={setMaxRating}
                                                                size={14}
                                                            />
                                                        </Box>
                                                    </Box>

                                                    {/* 필터 버튼들 */}
                                                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            onClick={handleFilterReset}
                                                            sx={{
                                                                fontSize: '0.7rem',
                                                                py: 0.5,
                                                                px: 1.5,
                                                                minWidth: 'auto'
                                                            }}
                                                        >
                                                            초기화
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={handleFilterApply}
                                                            sx={{
                                                                fontSize: '0.7rem',
                                                                py: 0.5,
                                                                px: 1.5,
                                                                minWidth: 'auto',
                                                                backgroundColor: '#e89830',
                                                                '&:hover': {
                                                                    backgroundColor: '#d18224'
                                                                }
                                                            }}
                                                        >
                                                            적용
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            )}
                                        </ListItem>

                                        {/* 1차 서브메뉴 */}
                                        {item.subItems && hoveredCategory === item.label && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: '100%',
                                                    width: 'fit-content',
                                                    minWidth: '150px',
                                                    backgroundColor: 'white',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                    zIndex: 1001,
                                                    borderRadius: '8px',
                                                    border: '1px solid',
                                                    borderColor: 'grey.200'
                                                }}
                                                onMouseEnter={() => setHoveredCategory(item.label)}
                                                onMouseLeave={() => {
                                                    setHoveredCategory(null);
                                                    setHoveredSubCategory(null);
                                                }}
                                            >
                                                <List sx={{ py: 0 }}>
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <Box key={subItem.label} sx={{ position: 'relative' }}>
                                                            <ListItem
                                                                onClick={() => {
                                                                    if (!subItem.subItems) {
                                                                        navigate(subItem.path);
                                                                        setMenuOpen(false);
                                                                        setHoveredCategory(null);
                                                                        setHoveredSubCategory(null);
                                                                    }
                                                                }}
                                                                onMouseEnter={() => {
                                                                    if (subItem.subItems) {
                                                                        setHoveredSubCategory(subItem.label);
                                                                    }
                                                                }}
                                                                onMouseLeave={() => {
                                                                    if (subItem.subItems) {
                                                                        setHoveredSubCategory(null);
                                                                    }
                                                                }}
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    py: 1.5,
                                                                    px: 2.5,
                                                                    borderBottom: subIndex < item.subItems.length - 1 ? '1px solid' : 'none',
                                                                    borderBottomColor: 'grey.100',
                                                                    '&:hover': {
                                                                        backgroundColor: 'grey.50'
                                                                    },
                                                                    whiteSpace: 'nowrap',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <ListItemText
                                                                    primary={subItem.label}
                                                                    primaryTypographyProps={{
                                                                        fontSize: '0.8rem',
                                                                        fontWeight: 400,
                                                                        color: 'text.primary'
                                                                    }}
                                                                />
                                                                {subItem.subItems && (
                                                                    <span className="material-icons" style={{ fontSize: '14px', color: '#999' }}>
                                                                        chevron_right
                                                                    </span>
                                                                )}
                                                            </ListItem>

                                                            {/* 2차 서브메뉴 */}
                                                            {subItem.subItems && hoveredSubCategory === subItem.label && (
                                                                <Box
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        left: '100%',
                                                                        width: 'fit-content',
                                                                        minWidth: '120px',
                                                                        backgroundColor: 'white',
                                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                                        zIndex: 1002,
                                                                        borderRadius: '8px',
                                                                        border: '1px solid',
                                                                        borderColor: 'grey.200'
                                                                    }}
                                                                    onMouseEnter={() => setHoveredSubCategory(subItem.label)}
                                                                    onMouseLeave={() => setHoveredSubCategory(null)}
                                                                >
                                                                    <List sx={{ py: 0 }}>
                                                                        {subItem.subItems.map((subSubItem, subSubIndex) => (
                                                                            <ListItem
                                                                                key={subSubItem.label}
                                                                                onClick={() => {
                                                                                    navigate(subSubItem.path);
                                                                                    setMenuOpen(false);
                                                                                    setHoveredCategory(null);
                                                                                    setHoveredSubCategory(null);
                                                                                }}
                                                                                sx={{
                                                                                    cursor: 'pointer',
                                                                                    py: 1.5,
                                                                                    px: 2,
                                                                                    borderBottom: subSubIndex < subItem.subItems.length - 1 ? '1px solid' : 'none',
                                                                                    borderBottomColor: 'grey.100',
                                                                                    '&:hover': {
                                                                                        backgroundColor: 'grey.50'
                                                                                    },
                                                                                    whiteSpace: 'nowrap'
                                                                                }}
                                                                            >
                                                                                <ListItemText
                                                                                    primary={subSubItem.label}
                                                                                    primaryTypographyProps={{
                                                                                        fontSize: '0.75rem',
                                                                                        fontWeight: 400,
                                                                                        color: 'text.primary'
                                                                                    }}
                                                                                />
                                                                            </ListItem>
                                                                        ))}
                                                                    </List>
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    ))}
                                                </List>
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                            </List>
                        </Box>
                    )}

                    {/* 우측 영역: 검색창 및 메뉴 */}
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

                        {/* 모바일 드로어 메뉴 버튼 */}
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
                                    more_vert
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