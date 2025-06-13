import type React from "react"
import { Fab } from "@mui/material"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"

const FloatingChatButton: React.FC = () => {
    return (
        <Fab
            color="primary"
            aria-label="문의하기"
            sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                bgcolor: "#f38b24",
                "&:hover": {
                    bgcolor: "#e07b1a",
                },
                zIndex: 50,
            }}
        >
            <ChatBubbleOutlineIcon />
        </Fab>
    )
}

export default FloatingChatButton
