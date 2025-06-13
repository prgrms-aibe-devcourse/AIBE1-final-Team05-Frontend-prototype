import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#e89830',
            light: '#f2b260',
            dark: '#d18224',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#1b150e',
            light: '#3a2e1e',
            dark: '#0f0a06',
        },
        background: {
            default: '#fcfaf8',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1b150e',
            secondary: '#97784e',
        },
        grey: {
            100: '#f3eee7',
            200: '#e7ddd0',
        },
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 900,
            lineHeight: 1.2,
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.3,
            '@media (max-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h6: {
            fontSize: '1.125rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                },
                contained: {
                    boxShadow: '0 4px 12px rgba(232, 152, 48, 0.3)',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(232, 152, 48, 0.4)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 24,
                        backgroundColor: '#f3eee7',
                        border: 'none',
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                            border: '2px solid #e89830',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: '8px 16px',
                    height: 'auto',
                },
            },
        },
    },
});

export default theme;