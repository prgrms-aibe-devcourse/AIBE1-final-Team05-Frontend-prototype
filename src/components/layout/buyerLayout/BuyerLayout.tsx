import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import BuyerHeader from './BuyerHeader.tsx';
import BuyerFooter from './BuyerFooter.tsx';

const BuyerLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <BuyerHeader />
            <Box component="main" sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            <BuyerFooter />
        </Box>
    );
};

export default BuyerLayout;