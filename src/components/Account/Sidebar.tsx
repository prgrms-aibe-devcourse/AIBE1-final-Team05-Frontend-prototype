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
    ListItemText, Divider,
} from "@mui/material"
import {Receipt, Description, Home, Pets, RateReview, LocalOffer, ExitToApp} from "@mui/icons-material"

const menuItems = [
    { id: "orders", label: "주문/배송 조회", icon: Receipt },
    { id: "return-inquiry", label: "취소/환불 조회", icon: Description },
    { id: "reviews", label: "리뷰 관리", icon: RateReview },
    { id: "addresses", label: "주소 관리", icon: Home },
    { id: "pets", label: "나의 반려동물", icon: Pets },
    { id: "coupons", label: "나의 쿠폰함", icon: LocalOffer}
]

const accountMenuItems = [
    { id: "withdrawal", label: "회원 탈퇴", icon: ExitToApp },
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

                {/* 주문/서비스 관련 메뉴 */}
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
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* 계정 관리 메뉴 */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, px: 1 }}>
                    계정 관리
                </Typography>
                <List sx={{ p: 0 }}>
                    {accountMenuItems.map((item) => (
                        <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                selected={activeMenu === item.id}
                                onClick={() => onMenuChange(item.id)}
                                sx={{
                                    borderRadius: 2,
                                    "&.Mui-selected": {
                                        bgcolor: item.id === "withdrawal" ? "#ffebee" : "#FDBF60",
                                        color: item.id === "withdrawal" ? "#d32f2f" : "#4A2C2A",
                                        "& .MuiListItemIcon-root": {
                                            color: item.id === "withdrawal" ? "#d32f2f" : "#4A2C2A",
                                        },
                                    },
                                    "&:hover": {
                                        bgcolor: item.id === "withdrawal" ? "#ffebee" : "#FFF3E0",
                                        color: item.id === "withdrawal" ? "#d32f2f" : "#8D5B4C",
                                        "& .MuiListItemIcon-root": {
                                            color: item.id === "withdrawal" ? "#d32f2f" : "#8D5B4C",
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* 회원 탈퇴 주의사항 */}
                {/*{activeMenu === "withdrawal" && (*/}
                {/*    <Box sx={{ mt: 2, p: 2, bgcolor: "#fff3e0", borderRadius: 1 }}>*/}
                {/*        <Typography variant="caption" color="text.secondary">*/}
                {/*            ⚠️ 회원 탈퇴 시 모든 데이터가 삭제되며 복구가 불가능합니다.*/}
                {/*        </Typography>*/}
                {/*    </Box>*/}
                {/*)}*/}
            </CardContent>
        </Card>
    )
}

export default Sidebar
