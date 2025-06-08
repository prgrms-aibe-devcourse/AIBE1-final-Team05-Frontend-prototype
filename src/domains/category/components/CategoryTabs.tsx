import { Box, Tabs, Tab } from '@mui/material';
import { CategoryTabsProps } from '../types';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        onCategoryChange(newValue);
    };

    return (
        <Box sx={{ borderBottom: '1px solid', borderBottomColor: 'grey.200', mb: { xs: 4, sm: 6 } }}>
            <Tabs
                value={activeCategory}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    '& .MuiTab-root': {
                        fontWeight: 700,
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        textTransform: 'none',
                        px: { xs: 1, sm: 2 },
                        py: 2,
                        minHeight: 'auto',
                        '&.Mui-selected': {
                            color: 'text.primary',
                        },
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: 'primary.main',
                        height: 2,
                    },
                }}
            >
                {categories.map((category) => (
                    <Tab key={category.id} label={category.label} value={category.id} />
                ))}
            </Tabs>
        </Box>
    );
};

export default CategoryTabs;