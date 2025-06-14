// src/components/SellerDashboard/settlement/components/YearSelector.tsx
import {
    Box,
    FormControl,
    Select,
    MenuItem,
    IconButton,
    SelectChangeEvent,
    useTheme
} from '@mui/material';

interface YearSelectorProps {
    currentYear: number;
    availableYears: number[];
    onYearChange: (year: number) => void;
}

const YearSelector = ({ currentYear, availableYears, onYearChange }: YearSelectorProps) => {
    const theme = useTheme();

    const handleYearChange = (event: SelectChangeEvent) => {
        const year = parseInt(event.target.value);
        onYearChange(year);
    };

    const handlePrevYear = () => {
        const prevYear = currentYear - 1;
        if (availableYears.includes(prevYear)) {
            onYearChange(prevYear);
        }
    };

    const handleNextYear = () => {
        const nextYear = currentYear + 1;
        if (availableYears.includes(nextYear)) {
            onYearChange(nextYear);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
                size="small"
                onClick={handlePrevYear}
                disabled={!availableYears.includes(currentYear - 1)}
                sx={{ color: theme.palette.text.secondary }}
            >
                <span className="material-icons">chevron_left</span>
            </IconButton>

            <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select
                    value={currentYear.toString()}
                    onChange={handleYearChange}
                    sx={{
                        '& .MuiSelect-select': {
                            py: 0.5,
                            fontSize: '0.875rem',
                            fontWeight: 600
                        }
                    }}
                >
                    {availableYears.map((year) => (
                        <MenuItem key={year} value={year.toString()}>
                            {year}년
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <IconButton
                size="small"
                onClick={handleNextYear}
                disabled={!availableYears.includes(currentYear + 1)}
                sx={{ color: theme.palette.text.secondary }}
            >
                <span className="material-icons">chevron_right</span>
            </IconButton>
        </Box>
    );
};

export default YearSelector;