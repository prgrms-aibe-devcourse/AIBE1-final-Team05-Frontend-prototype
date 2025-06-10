import { Container, Box, Card, CardContent } from '@mui/material';
import { ReactNode } from 'react';

interface LoginContainerProps {
    children: ReactNode;
}

const LoginContainer = ({ children }: LoginContainerProps) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                px: 2,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        maxWidth: 480,
                        mx: 'auto',
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                        border: '1px solid',
                        borderColor: 'grey.200',
                    }}
                >
                    <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
                        {children}
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default LoginContainer;
