"use client"

import type React from "react"
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton } from "@mui/material"
import { Search, Person, Pets } from "@mui/icons-material"

const PaymentHeader: React.FC = () => {
    return (
        <AppBar
            position="static"
            style={{ backgroundColor: "#fcfaf8", boxShadow: "none", borderBottom: "1px solid #f3eee7" }}
        >
            <Toolbar style={{ paddingLeft: 40, paddingRight: 40 }}>
                <Box style={{ display: "flex", alignItems: "center", gap: 16, color: "#e89830" }}>
                    <Avatar style={{ width: 32, height: 32, backgroundColor: "#e89830" }}>
                        <Pets />
                    </Avatar>
                    <Typography variant="h5" component="h1" style={{ color: "#1b150e", fontWeight: "bold" }}>
                        Pet's Delights
                    </Typography>
                </Box>

                <Box style={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 32 }}>
                    <Button style={{ color: "#1b150e" }}>Shop</Button>
                    <Button style={{ color: "#1b150e" }}>Subscription</Button>
                    <Button style={{ color: "#1b150e" }}>Learn</Button>
                    <Button style={{ color: "#1b150e" }}>Contact</Button>
                </Box>

                <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <IconButton style={{ color: "#1b150e" }}>
                        <Search />
                    </IconButton>
                    <IconButton style={{ color: "#1b150e" }}>
                        <Person />
                    </IconButton>
                    <Avatar src="/placeholder.svg?height=40&width=40" style={{ width: 40, height: 40 }} />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default PaymentHeader