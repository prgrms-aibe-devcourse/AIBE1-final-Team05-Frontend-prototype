// src/components/common/Breadcrumb/Breadcrumb.tsx
// 페이지 경로 표시 컴포넌트 (Home > Shop > Treats)

import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { BreadcrumbItem } from "../../../types/common";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Box
      sx={{
        px: 3,
        py: 1.5,
        backgroundColor: "#F9F9F9",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Breadcrumbs
        separator={<ChevronRight fontSize="small" sx={{ color: "#999999" }} />}
        sx={{ fontSize: "0.875rem" }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast) {
            return (
              <Typography
                key={index}
                color="text.primary"
                fontSize="0.875rem"
                fontWeight="500"
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              underline="hover"
              color="text.secondary"
              fontSize="0.875rem"
              sx={{
                "&:hover": {
                  color: "#FF8A00",
                },
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
