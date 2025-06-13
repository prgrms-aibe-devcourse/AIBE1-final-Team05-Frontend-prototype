"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Box, Typography, Button, Card, CardContent, Chip, IconButton, Paper, Grid } from "@mui/material"
import { Add, Edit, Delete, Pets } from "@mui/icons-material"
import type { Pet } from "./index"
import Pagination from "../common/Pagination"

interface PetsViewProps {
    pets: Pet[]
    handleEditPet: (pet: Pet) => void
    handleDeletePet: (id: string) => void
    setPetDialogOpen: (open: boolean) => void
}

const PetsView: React.FC<PetsViewProps> = ({ pets, handleEditPet, handleDeletePet, setPetDialogOpen }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4

    // 페이지네이션을 위한 펫 데이터 슬라이싱
    const paginatedPets = useMemo(() => {
        if (pets.length <= itemsPerPage) {
            return pets;
        }
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return pets.slice(startIndex, endIndex);
    }, [pets, currentPage]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    // ���이지가 변경되었을 때 현재 페이지가 유효한지 확인
    useMemo(() => {
        const totalPages = Math.ceil(pets.length / itemsPerPage)
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1)
        }
    }, [pets.length, currentPage])

    return (
        <Box>
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <Typography variant="h4" style={{ fontWeight: "bold", color: "text.primary" }}>
                    나의 애완동물
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setPetDialogOpen(true)}>
                    새 반려동물 추가
                </Button>
            </Box>

            <Grid container spacing={3}>
                {paginatedPets.map((pet) => (
                    <Grid size={{ xs: 12, md: 6 }} key={pet.id}>
                        <Card style={{ height: "100%" }}>
                            <CardContent>
                                <Box
                                    style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}
                                >
                                    <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <Pets color="primary" />
                                        <Typography variant="h6" style={{ fontWeight: 600 }}>
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
                                <Typography variant="body2" color="text.secondary" style={{ marginBottom: 4 }}>
                                    카테고리: {pet.category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{ marginBottom: 4 }}>
                                    나이: {pet.age}세 • 성별: {pet.gender === "male" ? "수컷" : "암컷"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{ marginBottom: 4 }}>
                                    품종: {pet.breed.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </Typography>
                                {pet.hasAllergies && (
                                    <Chip label="알레르기 있음" color="warning" size="small" style={{ marginBottom: 8 }} />
                                )}
                                {pet.healthCondition && (
                                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: 4 }}>
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
                            style={{
                                padding: 64,
                                textAlign: "center",
                                border: "2px dashed #d6d3d1",
                            }}
                        >
                            <Pets style={{ fontSize: 64, color: "text.secondary", marginBottom: 16 }} />
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                                등록된 반려동물이 없습니다
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ marginBottom: 24 }}>
                                소중한 반려동물의 정보를 등록해보세요
                            </Typography>
                            <Button variant="contained" startIcon={<Add />} onClick={() => setPetDialogOpen(true)}>
                                첫 번째 반려동물 추가하기
                            </Button>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            {pets.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={pets.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            )}
        </Box>
    )
}

export default PetsView
