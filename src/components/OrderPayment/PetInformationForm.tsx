"use client"

import type React from "react"
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Checkbox,
    FormControlLabel,
    Grid,
} from "@mui/material"
import { Pets } from "@mui/icons-material"
import {PetInfo} from "@/components/OrderPayment/index.ts";

interface PetInformationFormProps {
    petInfo: PetInfo
    onPetInfoChange: (field: keyof PetInfo, value: string | boolean) => void
    onLoadSavedPet: () => void
}

const PetInformationForm: React.FC<PetInformationFormProps> = ({ petInfo, onPetInfoChange, onLoadSavedPet }) => {
    return (
        <Card style={{ marginBottom: 32, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent style={{ padding: 32 }}>
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <Typography variant="h5" component="h2" style={{ fontWeight: 600, color: "#1b150e" }}>
                        반려동물 정보
                    </Typography>
                    <Button
                        startIcon={<Pets />}
                        color="primary"
                        variant="text"
                        size="small"
                        onClick={onLoadSavedPet}
                        style={{
                            textTransform: "none",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                        }}
                    >
                        저장된 반려동물 불러오기
                    </Button>
                </Box>

                <Grid container spacing={2} sx={{mt: 1}}>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="이름"
                            value={petInfo.name}
                            onChange={(e) => onPetInfoChange("name", e.target.value)}
                        />
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <Box sx={{display: "flex", gap: 2}}>
                            <FormControl sx={{width: "50%"}}>
                                <Select
                                    value={petInfo.gender}
                                    onChange={(e) => onPetInfoChange("gender", e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="">성별 선택</MenuItem>
                                    <MenuItem value="male">수컷</MenuItem>
                                    <MenuItem value="female">암컷</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{width: "50%"}}>
                                <Select
                                    value={petInfo.category}
                                    onChange={(e) => onPetInfoChange("category", e.target.value)}
                                    displayEmpty
                                    defaultValue=""
                                >
                                    <MenuItem value="">선택</MenuItem>
                                    <MenuItem value="dogs">강아지</MenuItem>
                                    <MenuItem value="cats">고양이</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="나이"
                            type="number"
                            value={petInfo.age}
                            onChange={(e) => onPetInfoChange("age", e.target.value)}
                        />
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <TextField
                            fullWidth
                            label="품종"
                            value={petInfo.breed}
                            onChange={(e) => onPetInfoChange("breed", e.target.value)}
                            placeholder="품종을 적어주세요"
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={petInfo.hasAllergies}
                                    onChange={(e) => onPetInfoChange("hasAllergies", e.target.checked)}
                                />
                            }
                            label="알레르기가 있습니다"
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            fullWidth
                            label="건강상태"
                            multiline
                            rows={3}
                            value={petInfo.healthCondition}
                            onChange={(e) => onPetInfoChange("healthCondition", e.target.value)}
                            placeholder="중성화 여부, 특별한 건강 상태 등을 입력해주세요"
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            fullWidth
                            label="특별 요청사항"
                            multiline
                            rows={3}
                            value={petInfo.specialRequests}
                            onChange={(e) => onPetInfoChange("specialRequests", e.target.value)}
                            placeholder="예: 작은 크기로, 부드럽게 등"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PetInformationForm