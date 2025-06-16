"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Paper,
    Typography,
    IconButton,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material"
import { ArrowBack, Send, Close } from "@mui/icons-material"
import type { CustomerInquiry } from "../../types/customer"

interface ChatWindowProps {
    selectedCustomer: CustomerInquiry
    onBackToList: () => void
    onDeleteChatRoom: (customerId: number) => void // 새로 추가된 prop
    isMobile: boolean
}

const ChatWindow: React.FC<ChatWindowProps> = ({
                                                   selectedCustomer,
                                                   onBackToList,
                                                   onDeleteChatRoom,
                                                   isMobile
                                               }) => {
    const [newMessage, setNewMessage] = useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false) // 삭제 확인 다이얼로그 상태

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

    // 채팅방 나가기 버튼 클릭 핸들러
    const handleLeaveChatRoom = () => {
        setDeleteDialogOpen(true)
    }

    // 삭제 확인 핸들러
    const handleConfirmDelete = () => {
        onDeleteChatRoom(selectedCustomer.id)
        setDeleteDialogOpen(false)
        onBackToList() // 고객 목록으로 돌아가기
    }

    // 삭제 취소 핸들러
    const handleCancelDelete = () => {
        setDeleteDialogOpen(false)
    }

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", borderLeft: "1px solid #e0e0e0" }}>
                {/* 채팅 헤더 */}
                <Paper elevation={1} sx={{ p: 2, borderRadius: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {/* 모바일에서는 뒤로가기 아이콘, 데스크톱에서는 닫기 아이콘 */}
                        <IconButton onClick={onBackToList}>
                            {isMobile ? <ArrowBack /> : <Close />}
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6">{selectedCustomer.name}</Typography>
                            {selectedCustomer.orderProduct && (
                                <Typography variant="body2" color="text.secondary">
                                    주문 상품: {selectedCustomer.orderProduct}
                                </Typography>
                            )}
                        </Box>
                        <Button
                            variant="text"
                            onClick={handleLeaveChatRoom}
                            sx={{
                                color: "#d32f2f",
                                "&:hover": {
                                    backgroundColor: "#ffebee"
                                }
                            }}
                        >
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

            {/* 채팅방 나가기 확인 다이얼로그 */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="delete-dialog-title"
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle id="delete-dialog-title" sx={{ textAlign: "center", pt: 3 }}>
                    채팅방을 나가시겠습니까?
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center", pb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {selectedCustomer.name}님과의 채팅 내역이 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", gap: 1, pb: 3 }}>
                    <Button
                        onClick={handleCancelDelete}
                        variant="outlined"
                        sx={{ minWidth: 80 }}
                    >
                        아니오
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        sx={{ minWidth: 80 }}
                    >
                        예
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ChatWindow