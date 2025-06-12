"use client"
import {
    Modal,
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
} from "@mui/material"
import { Close, Map } from "@mui/icons-material"
import type { SavedAddress , AddressModalProps} from "./index"


const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 500 },
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 0,
    maxHeight: "80vh",
    overflow: "hidden",
}

export default function AddressModal({ open, onClose, onSelectAddress, savedAddresses }: AddressModalProps) {
    const handleSelectAddress = (address: SavedAddress) => {
        onSelectAddress(address)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="address-modal-title">
            <Box sx={modalStyle}>
                <Box
                    sx={{
                        p: 3,
                        borderBottom: "1px solid #f3eee7",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Select Saved Address
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
                <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
                    <List sx={{ p: 0 }}>
                        {savedAddresses.map((address) => (
                            <ListItem key={address.id} disablePadding>
                                <ListItemButton
                                    onClick={() => handleSelectAddress(address)}
                                    sx={{
                                        py: 2,
                                        px: 3,
                                        "&:hover": {
                                            backgroundColor: "#fff8f0",
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "primary.main" }}>
                                            <Map />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {address.fullName}
                                                </Typography>
                                                <Chip
                                                    label={address.label}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{ fontSize: "0.75rem" }}
                                                />
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {address.address}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {address.city}, {address.postalCode}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {address.phoneNumber}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Modal>
    )
}
