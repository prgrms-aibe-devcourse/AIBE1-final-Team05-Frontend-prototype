"use client"

import type React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
} from "@mui/material"
import type { PetDialogProps } from "./index"

const PetDialog: React.FC<PetDialogProps> = ({ open, onClose, editingPet, newPet, setNewPet, onSubmit }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{editingPet ? "반려동물 정보 수정" : "새 반려동물 추가"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="이름"
                            value={newPet.name}
                            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <FormControl sx={{ width: "50%" }}>
                                <Select
                                    value={newPet.gender}
                                    onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
                                    displayEmpty
                                >
                                    <MenuItem value="">성별 선택</MenuItem>
                                    <MenuItem value="male">수컷</MenuItem>
                                    <MenuItem value="female">암컷</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ width: "50%" }}>
                                <Select
                                    value={newPet.category}
                                    onChange={(e) => setNewPet({ ...newPet, category: e.target.value })}
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
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="나이"
                            type="number"
                            value={newPet.age}
                            onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="품종"
                            value={newPet.breed}
                            onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                            placeholder="품종을 적어주세요"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={newPet.hasAllergies}
                                    onChange={(e) => setNewPet({ ...newPet, hasAllergies: e.target.checked })}
                                />
                            }
                            label="알레르기가 있습니다"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="건강상태"
                            multiline
                            rows={3}
                            value={newPet.healthCondition}
                            onChange={(e) => setNewPet({ ...newPet, healthCondition: e.target.value })}
                            placeholder="중성화 여부, 특별한 건강 상태 등을 입력해주세요"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="특별 요청사항"
                            multiline
                            rows={3}
                            value={newPet.specialRequests}
                            onChange={(e) => setNewPet({ ...newPet, specialRequests: e.target.value })}
                            placeholder="예: 작은 크기로, 부드럽게 등"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>취소</Button>
                <Button onClick={onSubmit} variant="contained">
                    {editingPet ? "수정" : "추가"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PetDialog