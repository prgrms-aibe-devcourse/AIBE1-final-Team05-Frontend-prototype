import { Container, Typography, Box } from '@mui/material';

const SupportPage = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h3" gutterBottom>
                    💬 고객센터 페이지
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    곧 오픈 예정입니다!
                </Typography>
            </Box>
        </Container>
    );
};

export default SupportPage;