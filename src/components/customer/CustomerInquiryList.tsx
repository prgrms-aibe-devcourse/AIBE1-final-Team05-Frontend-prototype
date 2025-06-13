"use client"

import type React from "react"
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Badge,
    Chip,
} from "@mui/material"
import { Search } from "@mui/icons-material"
import type { CustomerInquiry } from "../../types/customer"

interface CustomerInquiryListProps {
    customerInquiries: CustomerInquiry[]
    selectedCustomer: CustomerInquiry | null
    onCustomerClick: (customer: CustomerInquiry) => void
}

const CustomerInquiryList: React.FC<CustomerInquiryListProps> = ({
                                                                     customerInquiries,
                                                                     selectedCustomer,
                                                                     onCustomerClick,
                                                                 }) => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                고객 문의
            </Typography>

            {/* 검색창 */}
            <TextField
                fullWidth
                placeholder="채팅방 검색"
                variant="outlined"
                size="small"
                sx={{ mt: 3, mb: 3 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />

            {/* 고객 목록 */}
            <List>
                {customerInquiries.map((customer) => (
                    <ListItem
                        key={customer.id}
                        onClick={() => onCustomerClick(customer)}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            border: selectedCustomer?.id === customer.id ? `2px solid #e89830` : "1px solid transparent",
                            backgroundColor: selectedCustomer?.id === customer.id ? "#fff3e0" : "white",
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                            },
                            cursor: "pointer",
                        }}
                    >
                        <ListItemAvatar>
                            <Badge
                                badgeContent=" "
                                color="success"
                                invisible={!customer.isOnline}
                                variant="dot"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            >
                                <Avatar src={customer.avatar} />
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText
                            primary={customer.name}
                            secondary={customer.lastMessage}
                            secondaryTypographyProps={{
                                noWrap: true,
                                sx: { maxWidth: "200px" },
                            }}
                        />
                        {customer.unreadCount > 0 && (
                            <Chip label={customer.unreadCount} color="primary" size="small" sx={{ minWidth: 24, height: 24 }} />
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default CustomerInquiryList
