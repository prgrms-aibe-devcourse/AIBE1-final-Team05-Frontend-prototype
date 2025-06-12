// src/components/navigation/Breadcrumb.tsx

import React from "react";
import { Breadcrumbs, Link, Typography, useTheme } from "@mui/material";
import {
    Home as HomeIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    const theme = useTheme();

    return (
        <Breadcrumbs
            separator={
                <ChevronRightIcon
                    sx={{
                        fontSize: 16,
                        color: theme.palette.grey[200]
                    }}
                />
            }
            sx={{ mb: 3 }}
        >
            <Link
                href="#"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    "&:hover": {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <HomeIcon sx={{ fontSize: 16, mr: 0.5 }} />홈
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                if (isLast) {
                    return (
                        <Typography
                            key={index}
                            sx={{
                                color: theme.palette.text.primary,
                                fontSize: "0.875rem",
                                fontWeight: 500,
                            }}
                        >
                            {item.label}
                        </Typography>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={item.href || "#"}
                        sx={{
                            color: theme.palette.text.secondary,
                            textDecoration: "none",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            "&:hover": {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export { Breadcrumb };