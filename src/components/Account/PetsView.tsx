"use client"

import type React from "react"
import { Box, Typography, Button, Card, CardContent, Chip, IconButton, Paper, Grid } from "@mui/material"
import { Add, Edit, Delete, Pets } from "@mui/icons-material"
import type { Pet } from "./index"

interface PetsViewProps {
    pets: Pet[]
    handleEditPet: (pet: Pet) => void
    handleDeletePet: (id: string) => void
    setPetDialogOpen: (open: boolean) => void
}

const PetsView: React.FC<PetsViewProps> = ({ pets, handleEditPet, handleDeletePet, setPetDialogOpen }) => {
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
                    나의 애완동물
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setPetDialogOpen(true)}>
                    새 반려동물 추가
                </Button>
            </Box>

            <Grid container spacing={3}>
                {pets.map((pet) => (
                    <Grid size={{ xs: 12, md: 6 }} key={pet.id}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Pets color="primary" />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {pet.name}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <IconButton size="small" onClick={() => handleEditPet(pet)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDeletePet(pet.id)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    품종: {pet.breed.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    나이: {pet.age}세 • 성별: {pet.gender === "male" ? "수컷" : "암컷"}
                                </Typography>
                                {pet.hasAllergies && <Chip label="알레르기 있음" color="warning" size="small" sx={{ mb: 1 }} />}
                                {pet.healthCondition && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        건강상태: {pet.healthCondition}
                                    </Typography>
                                )}
                                {pet.specialRequests && (
                                    <Typography variant="body2" color="text.secondary">
                                        특별요청: {pet.specialRequests}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {pets.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Paper
                            sx={{
                                p: 8,
                                textAlign: "center",
                                border: "2px dashed #d6d3d1",
                            }}
                        >
                            <Pets sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                등록된 반려동물이 없습니다
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                소중한 반려동물의 정보를 등록해보세요
                            </Typography>
                            <Button variant="contained" startIcon={<Add />} onClick={() => setPetDialogOpen(true)}>
                                첫 번째 반려동물 추가하기
                            </Button>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default PetsView