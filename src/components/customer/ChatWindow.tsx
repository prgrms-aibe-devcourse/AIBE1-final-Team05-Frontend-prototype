"use client"

import type React from "react"
import { useState } from "react"
import { Box, Paper, Typography, IconButton, TextField, Button } from "@mui/material"
import { ArrowBack, Send, Close } from "@mui/icons-material"
import type { CustomerInquiry } from "../../types/customer"

interface ChatWindowProps {
    selectedCustomer: CustomerInquiry
    onBackToList: () => void
    isMobile: boolean
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedCustomer, onBackToList, isMobile }) => {
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
                    {/* 모바일에서는 뒤로가기 아이콘, 데스크톱에서는 닫기 아이콘 */}
                    <IconButton onClick={onBackToList}>{isMobile ? <ArrowBack /> : <Close />}</IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{selectedCustomer.name}</Typography>
                        {selectedCustomer.orderProduct && (
                            <Typography variant="body2" color="text.secondary">
                                주문 상품: {selectedCustomer.orderProduct}
                            </Typography>
                        )}
                    </Box>
                    <Button variant="text" onClick={() => console.log("채팅방 나가기")}>
                        채팅방 나가기
                    </Button>
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
                                backgroundColor: message.sender === "admin" ? "primary.main" : "#f5f5f5",
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
