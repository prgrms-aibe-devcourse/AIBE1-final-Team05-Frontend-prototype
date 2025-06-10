// 📁 components/sections/WorkshopSection.tsx
import { Container, Box, Typography } from '@mui/material';
import { WorkshopGrid } from '@/domains/workshop';
import { Workshop } from '@/domains/workshop/types';

interface WorkshopSectionProps {
    workshops: Workshop[];
    onWorkshopClick: (workshop: Workshop) => void;
}

export const WorkshopSection = ({ workshops, onWorkshopClick }: WorkshopSectionProps) => {
    return (
        <Box sx={{ py: { xs: 6, sm: 8, lg: 10 } }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        mb: { xs: 4, sm: 6 },
                        color: 'text.primary',
                    }}
                >
                    인기 판매자
                </Typography>

                <WorkshopGrid
                    workshops={workshops}
                    onWorkshopClick={onWorkshopClick}
                />
            </Container>
        </Box>
    );
};