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

interface PetInfo {
    name: string
    breed: string
    age: string
    gender: string
    hasAllergies: boolean
    healthCondition: string
    specialRequests: string
}

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
                        Pet Information
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
                        Load Saved Pet
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {/* Pet Name */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="body2"
                                style={{
                                    marginBottom: 12,
                                    fontWeight: 500,
                                    color: "#1b150e",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Pet Name
                            </Typography>
                            <TextField
                                fullWidth
                                value={petInfo.name}
                                onChange={(e) => onPetInfoChange("name", e.target.value)}
                                placeholder="Enter pet's name"
                                variant="outlined"
                                size="medium"
                            />
                        </Box>
                    </Grid>

                    {/* Breed */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="body2"
                                style={{
                                    marginBottom: 12,
                                    fontWeight: 500,
                                    color: "#1b150e",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Breed
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={petInfo.breed}
                                    onChange={(e) => onPetInfoChange("breed", e.target.value)}
                                    displayEmpty
                                    style={{
                                        height: 48,
                                        borderRadius: 8,
                                        backgroundColor: "#fcfaf8",
                                    }}
                                >
                                    <MenuItem value="" style={{ color: "#97784e" }}>
                                        Select breed
                                    </MenuItem>
                                    <MenuItem value="golden_retriever">Golden Retriever</MenuItem>
                                    <MenuItem value="labrador">Labrador</MenuItem>
                                    <MenuItem value="poodle">Poodle</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    {/* Age */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="body2"
                                style={{
                                    marginBottom: 12,
                                    fontWeight: 500,
                                    color: "#1b150e",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Age (years)
                            </Typography>
                            <TextField
                                fullWidth
                                type="number"
                                value={petInfo.age}
                                onChange={(e) => onPetInfoChange("age", e.target.value)}
                                placeholder="Enter pet's age"
                                variant="outlined"
                                size="medium"
                            />
                        </Box>
                    </Grid>

                    {/* Gender */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                            <Typography
                                variant="body2"
                                style={{
                                    marginBottom: 12,
                                    fontWeight: 500,
                                    color: "#1b150e",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Gender
                            </Typography>
                            <Box style={{ display: "flex", gap: 12 }}>
                                <Box
                                    onClick={() => onPetInfoChange("gender", "male")}
                                    style={{
                                        flex: 1,
                                        height: 44,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 8,
                                        border: "1px solid #e7ddd0",
                                        backgroundColor: petInfo.gender === "male" ? "#fff8f0" : "transparent",
                                        borderColor: petInfo.gender === "male" ? "#e89830" : "#e7ddd0",
                                        borderWidth: petInfo.gender === "male" ? 2 : 1,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease-in-out",
                                    }}
                                >
                                    <Typography style={{ fontSize: "0.875rem", fontWeight: 500 }}>Male</Typography>
                                </Box>
                                <Box
                                    onClick={() => onPetInfoChange("gender", "female")}
                                    style={{
                                        flex: 1,
                                        height: 44,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 8,
                                        border: "1px solid #e7ddd0",
                                        backgroundColor: petInfo.gender === "female" ? "#fff8f0" : "transparent",
                                        borderColor: petInfo.gender === "female" ? "#e89830" : "#e7ddd0",
                                        borderWidth: petInfo.gender === "female" ? 2 : 1,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease-in-out",
                                    }}
                                >
                                    <Typography style={{ fontSize: "0.875rem", fontWeight: 500 }}>Female</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Allergies Checkbox */}
                    <Grid size={{ xs: 12 }}>
                        <Box style={{ paddingTop: 8, paddingBottom: 8 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={petInfo.hasAllergies}
                                        onChange={(e) => onPetInfoChange("hasAllergies", e.target.checked)}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 4,
                                            color: "#e7ddd0",
                                        }}
                                    />
                                }
                                label={
                                    <Typography style={{ fontSize: "0.875rem", fontWeight: 400, marginLeft: 8 }}>
                                        My pet has allergies
                                    </Typography>
                                }
                                style={{ alignItems: "center", margin: 0 }}
                            />
                        </Box>
                    </Grid>

                    {/* Health Condition */}
                    <Grid size={{ xs: 12 }}>
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="body2"
                                style={{
                                    marginBottom: 12,
                                    fontWeight: 500,
                                    color: "#1b150e",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Health Condition (e.g., neutered, specific issues)
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={petInfo.healthCondition}
                                onChange={(e) => onPetInfoChange("healthCondition", e.target.value)}
                                placeholder="Enter details about your pet's health"
                                variant="outlined"
                            />
                        </Box>
                    </Grid>

                    {/* Special Requests */}
                    <Grid size={{ xs: 12 }}>
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="body2"
                                style={{
                                    marginBottom: 12,
                                    fontWeight: 500,
                                    color: "#1b150e",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Special Requests for Treats
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={petInfo.specialRequests}
                                onChange={(e) => onPetInfoChange("specialRequests", e.target.value)}
                                placeholder="e.g., smaller pieces, extra crunchy"
                                variant="outlined"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PetInformationForm