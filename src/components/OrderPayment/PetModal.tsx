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
import { Close, Pets } from "@mui/icons-material"
import type { SavedPet , PetModalProps} from "./index"


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

export default function PetModal({ open, onClose, onSelectPet, savedPets }: PetModalProps) {
    const handleSelectPet = (pet: SavedPet) => {
        onSelectPet(pet)
        onClose()
    }

    const formatBreed = (breed: string) => {
        return breed.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    }

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="pet-modal-title">
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
                        Select Saved Pet
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
                <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
                    <List sx={{ p: 0 }}>
                        {savedPets.map((pet) => (
                            <ListItem key={pet.id} disablePadding>
                                <ListItemButton
                                    onClick={() => handleSelectPet(pet)}
                                    sx={{
                                        py: 2,
                                        px: 3,
                                        "&:hover": {
                                            backgroundColor: "#fff8f0",
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={pet.avatar} sx={{ bgcolor: "primary.main" }}>
                                            <Pets />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {pet.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {formatBreed(pet.breed)} • {pet.age} years • {pet.gender}
                                                </Typography>
                                                {pet.hasAllergies && (
                                                    <Chip
                                                        label="Has Allergies"
                                                        size="small"
                                                        color="warning"
                                                        variant="outlined"
                                                        sx={{ mt: 0.5, fontSize: "0.75rem" }}
                                                    />
                                                )}
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
