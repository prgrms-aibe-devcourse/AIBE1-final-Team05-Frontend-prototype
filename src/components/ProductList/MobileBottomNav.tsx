// src/components/navigation/MobileBottomNav.tsx

import React from "react";
import {
    Box,
    Paper,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Sort as SortIcon,
    FilterList as FilterListIcon,
} from "@mui/icons-material";

interface MobileBottomNavProps {
    onSortClick: () => void;
    onFilterClick: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
                                                             onSortClick,
                                                             onFilterClick,
                                                         }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    if (!isMobile) {
        return null;
    }

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.grey[200]}`,
                borderRadius: 0,
                p: 1.5,
            }}
            elevation={8}
        >
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <IconButton
                    onClick={onSortClick}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: theme.palette.text.secondary,
                        "&:hover": {
                            color: theme.palette.primary.main,
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <SortIcon sx={{ fontSize: 24, mb: 0.5 }} />
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: "0.75rem",
                            color: "inherit"
                        }}
                    >
                        정렬
                    </Typography>
                </IconButton>

                <IconButton
                    onClick={onFilterClick}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: theme.palette.text.secondary,
                        "&:hover": {
                            color: theme.palette.primary.main,
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <FilterListIcon sx={{ fontSize: 24, mb: 0.5 }} />
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: "0.75rem",
                            color: "inherit"
                        }}
                    >
                        필터
                    </Typography>
                </IconButton>
            </Box>
        </Paper>
    );
};

export default MobileBottomNav;