"use client"

import type React from "react"
import { useState } from "react"
import { Box, Paper, Typography, Avatar, Badge, IconButton, TextField, useTheme } from "@mui/material"
import { ArrowBack, MoreVert, AttachFile, Send } from "@mui/icons-material"
import type { CustomerInquiry } from "../../types/customer"

interface ChatWindowProps {
    selectedCustomer: CustomerInquiry
    onBackToList: () => void
    isMobile: boolean
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedCustomer, onBackToList, isMobile }) => {
    const theme = useTheme()
    const [newMessage, setNewMessage] = useState("")

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // 메시지 전송 로직
            console.log("메시지 전송:", newMessage)
            setNewMessage("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", borderLeft: "1px solid #e0e0e0" }}>
            {/* 채팅 헤더 */}
            <Paper elevation={1} sx={{ p: 2, borderRadius: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {isMobile && (
                        <IconButton onClick={onBackToList}>
                            <ArrowBack />
                        </IconButton>
                    )}
                    <Badge
                        badgeContent=" "
                        color="success"
                        invisible={!selectedCustomer.isOnline}
                        variant="dot"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <Avatar src={selectedCustomer.avatar} />
                    </Badge>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{selectedCustomer.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedCustomer.isOnline ? "온라인" : "오프라인"}
                        </Typography>
                    </Box>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </Box>
            </Paper>

            {/* 메시지 영역 */}
            <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
                {selectedCustomer.messages?.map((message) => (
                    <Box
                        key={message.id}
                        sx={{
                            display: "flex",
                            justifyContent: message.sender === "admin" ? "flex-end" : "flex-start",
                            mb: 2,
                        }}
                    >
                        <Paper
                            elevation={1}
                            sx={{
                                p: 1.5,
                                maxWidth: "70%",
                                backgroundColor: message.sender === "admin" ? theme.palette.primary.main : "#f5f5f5",
                                color: message.sender === "admin" ? "white" : "inherit",
                                borderRadius: 2,
                                borderBottomRightRadius: message.sender === "admin" ? 4 : 16,
                                borderBottomLeftRadius: message.sender === "admin" ? 16 : 4,
                            }}
                        >
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                {message.text}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    opacity: 0.7,
                                    color: message.sender === "admin" ? "rgba(255,255,255,0.7)" : "text.secondary",
                                }}
                            >
                                {message.time}
                            </Typography>
                        </Paper>
                    </Box>
                ))}
            </Box>

            {/* 메시지 입력창 */}
            <Paper elevation={2} sx={{ p: 2, borderRadius: 0 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <TextField
                        multiline
                        maxRows={3}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="메시지를 입력하세요..."
                        variant="outlined"
                        size="small"
                        sx={{ flexGrow: 1 }}
                    />
                    <IconButton onClick={handleSendMessage} disabled={!newMessage.trim()} color="primary">
                        <Send />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    )
}

export default ChatWindow
