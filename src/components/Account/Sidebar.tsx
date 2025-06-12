"use client"

import type React from "react"
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material"
import { Receipt, Description, Home, Pets, RateReview } from "@mui/icons-material"

const menuItems = [
    { id: "orders", label: "주문/배송 조회", icon: Receipt },
    { id: "return-inquiry", label: "반품/교환 조회", icon: Description },
    { id: "reviews", label: "리뷰 관리", icon: RateReview },
    { id: "addresses", label: "주소 관리", icon: Home },
    { id: "pets", label: "나의 애완동물", icon: Pets },
]

interface SidebarProps {
    activeMenu: string
    onMenuChange: (menuId: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuChange }) => {
    return (
        <Card>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    마이페이지
                </Typography>
                <List sx={{ p: 0 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                selected={activeMenu === item.id}
                                onClick={() => onMenuChange(item.id)}
                                sx={{
                                    borderRadius: 2,
                                    "&.Mui-selected": {
                                        bgcolor: "#FDBF60",
                                        color: "#4A2C2A",
                                        "& .MuiListItemIcon-root": {
                                            color: "#4A2C2A",
                                        },
                                    },
                                    "&:hover": {
                                        bgcolor: "#FFF3E0",
                                        color: "#8D5B4C",
                                        "& .MuiListItemIcon-root": {
                                            color: "#8D5B4C",
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}

export default Sidebar
