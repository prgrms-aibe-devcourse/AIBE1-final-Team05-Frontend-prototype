import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    py: 8,
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '6rem' }}>
                    🐾
                </Typography>
                <Typography variant="h3" component="h2" gutterBottom>
                    페이지를 찾을 수 없어요
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    길을 잃은 것 같네요. 집으로 돌아가실까요?
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{ mt: 2 }}
                >
                    홈으로 가기
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;