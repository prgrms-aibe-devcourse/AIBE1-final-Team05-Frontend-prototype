import React from "react";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
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
  return (
    <Breadcrumbs
      separator={<ChevronRightIcon sx={{ fontSize: 16, color: "#C5C5C5" }} />}
      sx={{ mb: 3 }}
    >
      <Link
        href="#"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#7F7F7F",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          "&:hover": {
            color: "#E92933",
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
                color: "#383838",
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
              color: "#7F7F7F",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              "&:hover": {
                color: "#E92933",
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
