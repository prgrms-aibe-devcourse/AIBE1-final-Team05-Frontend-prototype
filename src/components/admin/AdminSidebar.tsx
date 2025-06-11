// src/components/admin/AdminSidebar.tsx

import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory2 as InventoryIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface AdminSidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "판매자 대시보드",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
  },
  {
    id: "products",
    label: "상품 관리",
    icon: <InventoryIcon />,
    path: "/admin/products",
  },
  {
    id: "orders",
    label: "주문/배송",
    icon: <ShippingIcon />,
    path: "/admin/orders",
  },
  {
    id: "payments",
    label: "정산",
    icon: <PaymentIcon />,
    path: "/admin/payments",
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeItem = "products",
  onItemClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return null; // 모바일에서는 숨김
  }

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId);
  };

  return (
    <Box
      sx={{
        width: 256,
        height: "100vh", // 페이지 전체 높이로 변경
        borderRight: 1,
        borderColor: "#F5EFEA",
        backgroundColor: "white",
        position: "sticky", // 스크롤 시에도 고정
        top: 0,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          backgroundColor: "white",
          borderRadius: 0,
        }}
      >
        <Box sx={{ p: 3 }}>
          <List sx={{ p: 0 }}>
            {sidebarItems.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleItemClick(item.id)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    color: activeItem === item.id ? "white" : "#5c5752",
                    backgroundColor:
                      activeItem === item.id ? "#ef9942" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        activeItem === item.id ? "#e08830" : "#fdecdb",
                      color: activeItem === item.id ? "white" : "#ef9942",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                      minWidth: 40,
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.25rem",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: activeItem === item.id ? 500 : 400,
                      fontFamily: "'Noto Sans KR', sans-serif",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminSidebar;
