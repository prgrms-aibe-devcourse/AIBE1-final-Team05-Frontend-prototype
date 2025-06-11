"use client"

import type React from "react"
import { useState } from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    Select,
    MenuItem,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Box,
    Avatar,
    Breadcrumbs,
    Link,
    Divider,
    Paper,
    IconButton,
    Chip,
} from "@mui/material"
import { Search, Person, Pets, Schedule, ShoppingCartCheckout, CreditCard, Map } from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import PetModal from "@/components/OrderCheckOut/pet-modal.tsx"
import AddressModal from "@/components/OrderCheckOut/address-modal.tsx"
import { savedPets, savedAddresses, type SavedPet, type SavedAddress } from "../data/mock-data"

const theme = createTheme({
    palette: {
        primary: {
            main: "#e89830",
            dark: "#d9821c",
        },
        secondary: {
            main: "#1b150e",
        },
        background: {
            default: "#fcfaf8",
            paper: "#ffffff",
        },
        text: {
            primary: "#1b150e",
            secondary: "#97784e",
        },
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
    },
})

interface OrderItem {
    id: string
    name: string
    quantity: number
    price: number
    image: string
}

interface PetInfo {
    name: string
    breed: string
    age: string
    gender: string
    hasAllergies: boolean
    healthCondition: string
    specialRequests: string
}

interface ShippingInfo {
    fullName: string
    address: string
    city: string
    postalCode: string
    phoneNumber: string
}

export default function OrderCheckoutPage() {
    const [petInfo, setPetInfo] = useState<PetInfo>({
        name: "",
        breed: "",
        age: "",
        gender: "",
        hasAllergies: false,
        healthCondition: "",
        specialRequests: "",
    })

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
    })

    const [paymentMethod, setPaymentMethod] = useState("toss")
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [petModalOpen, setPetModalOpen] = useState(false)
    const [addressModalOpen, setAddressModalOpen] = useState(false)

    const orderItems: OrderItem[] = [
        {
            id: "1",
            name: "Handmade Chicken Treats",
            quantity: 2,
            price: 30.0,
            image: "/placeholder.svg?height=64&width=64",
        },
        {
            id: "2",
            name: "Organic Beef Jerky",
            quantity: 1,
            price: 15.0,
            image: "/placeholder.svg?height=64&width=64",
        },
    ]

    const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0)
    const shipping = 5.0
    const total = subtotal + shipping

    const handlePetInfoChange = (field: keyof PetInfo, value: string | boolean) => {
        setPetInfo((prev) => ({ ...prev, [field]: value }))
    }

    const handleShippingInfoChange = (field: keyof ShippingInfo, value: string) => {
        setShippingInfo((prev) => ({ ...prev, [field]: value }))
    }

    const handleLoadPet = (pet: SavedPet) => {
        setPetInfo({
            name: pet.name,
            breed: pet.breed,
            age: pet.age,
            gender: pet.gender,
            hasAllergies: pet.hasAllergies,
            healthCondition: pet.healthCondition,
            specialRequests: pet.specialRequests,
        })
    }

    const handleLoadAddress = (address: SavedAddress) => {
        setShippingInfo({
            fullName: address.fullName,
            address: address.address,
            city: address.city,
            postalCode: address.postalCode,
            phoneNumber: address.phoneNumber,
        })
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log("Order submitted:", { petInfo, shippingInfo, paymentMethod })
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}>
                {/* BuyerHeader */}
                <AppBar
                    position="static"
                    sx={{ bgcolor: "background.default", boxShadow: "none", borderBottom: "1px solid #f3eee7" }}
                >
                    <Toolbar sx={{ px: { xs: 2, md: 5 } }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "primary.main" }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                                <Pets />
                            </Avatar>
                            <Typography variant="h5" component="h1" sx={{ color: "text.primary", fontWeight: "bold" }}>
                                Pet's Delights
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 4 }}>
                            <Button color="inherit" sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}>
                                Shop
                            </Button>
                            <Button color="inherit" sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}>
                                Subscription
                            </Button>
                            <Button color="inherit" sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}>
                                Learn
                            </Button>
                            <Button color="inherit" sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}>
                                Contact
                            </Button>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton sx={{ color: "text.primary" }}>
                                <Search />
                            </IconButton>
                            <IconButton sx={{ color: "text.primary" }}>
                                <Person />
                            </IconButton>
                            <Avatar src="/placeholder.svg?height=40&width=40" sx={{ width: 40, height: 40 }} />
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Container maxWidth="md" sx={{ py: 5 }}>
                    {/* Breadcrumbs */}
                    <Breadcrumbs sx={{ mb: 3 }}>
                        <Link color="text.secondary" href="#" underline="hover">
                            Shop
                        </Link>
                        <Typography color="text.primary">Custom Order</Typography>
                    </Breadcrumbs>

                    {/* Page BuyerHeader */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
                            Custom Order & Checkout
                        </Typography>
                        <Chip
                            icon={<Schedule />}
                            label="Estimated Manufacturing Time: 2-3 days"
                            color="primary"
                            variant="outlined"
                        />
                    </Box>

                    {/* Order Summary */}
                    <Card sx={{ mb: 4, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "semibold" }}>
                                Order Summary
                            </Typography>
                            {orderItems.map((item) => (
                                <Paper key={item.id} sx={{ p: 2, mb: 2, border: "1px solid #f3eee7" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Avatar src={item.image} sx={{ width: 64, height: 64, borderRadius: 1 }} variant="rounded" />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Quantity: {item.quantity}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{ fontWeight: "semibold" }}>
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Paper>
                            ))}
                        </CardContent>
                    </Card>

                    <form onSubmit={handleSubmit}>
                        {/* Pet Information */}
                        <Card sx={{ mb: 4, boxShadow: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: "text.primary" }}>
                                        Pet Information
                                    </Typography>
                                    <Button
                                        startIcon={<Pets />}
                                        color="primary"
                                        variant="text"
                                        size="small"
                                        onClick={() => setPetModalOpen(true)}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 500,
                                            fontSize: "0.875rem",
                                            "&:hover": {
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        Load Saved Pet
                                    </Button>
                                </Box>

                                <Grid container spacing={3}>
                                    {/* Pet Name */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 500,
                                                    color: "text.primary",
                                                    fontSize: "0.875rem",
                                                }}
                                            >
                                                Pet Name
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                value={petInfo.name}
                                                onChange={(e) => handlePetInfoChange("name", e.target.value)}
                                                placeholder="Enter pet's name"
                                                variant="outlined"
                                                size="medium"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        height: 48,
                                                        borderRadius: 2,
                                                        backgroundColor: "#fcfaf8",
                                                        "&:hover fieldset": {
                                                            borderColor: "primary.main",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "primary.main",
                                                            borderWidth: 2,
                                                        },
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        fontSize: "1rem",
                                                        "&::placeholder": {
                                                            color: "#97784e",
                                                            opacity: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Breed */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 500,
                                                    color: "text.primary",
                                                    fontSize: "0.875rem",
                                                }}
                                            >
                                                Breed
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Select
                                                    value={petInfo.breed}
                                                    onChange={(e) => handlePetInfoChange("breed", e.target.value)}
                                                    displayEmpty
                                                    sx={{
                                                        height: 48,
                                                        borderRadius: 2,
                                                        backgroundColor: "#fcfaf8",
                                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "primary.main",
                                                        },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "primary.main",
                                                            borderWidth: 2,
                                                        },
                                                        "& .MuiSelect-select": {
                                                            fontSize: "1rem",
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="" sx={{ color: "#97784e" }}>
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
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 500,
                                                    color: "text.primary",
                                                    fontSize: "0.875rem",
                                                }}
                                            >
                                                Age (years)
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                value={petInfo.age}
                                                onChange={(e) => handlePetInfoChange("age", e.target.value)}
                                                placeholder="Enter pet's age"
                                                variant="outlined"
                                                size="medium"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        height: 48,
                                                        borderRadius: 2,
                                                        backgroundColor: "#fcfaf8",
                                                        "&:hover fieldset": {
                                                            borderColor: "primary.main",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "primary.main",
                                                            borderWidth: 2,
                                                        },
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        fontSize: "1rem",
                                                        "&::placeholder": {
                                                            color: "#97784e",
                                                            opacity: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Gender */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 500,
                                                    color: "text.primary",
                                                    fontSize: "0.875rem",
                                                }}
                                            >
                                                Gender
                                            </Typography>
                                            <Box sx={{ display: "flex", gap: 1.5 }}>
                                                <Box
                                                    onClick={() => handlePetInfoChange("gender", "male")}
                                                    sx={{
                                                        flex: 1,
                                                        height: 44,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: 2,
                                                        border: "1px solid #e7ddd0",
                                                        backgroundColor: petInfo.gender === "male" ? "#fff8f0" : "transparent",
                                                        borderColor: petInfo.gender === "male" ? "primary.main" : "#e7ddd0",
                                                        borderWidth: petInfo.gender === "male" ? 2 : 1,
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease-in-out",
                                                        "&:hover": {
                                                            borderColor: "primary.main",
                                                            backgroundColor: "#fff8f0",
                                                        },
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>Male</Typography>
                                                </Box>
                                                <Box
                                                    onClick={() => handlePetInfoChange("gender", "female")}
                                                    sx={{
                                                        flex: 1,
                                                        height: 44,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: 2,
                                                        border: "1px solid #e7ddd0",
                                                        backgroundColor: petInfo.gender === "female" ? "#fff8f0" : "transparent",
                                                        borderColor: petInfo.gender === "female" ? "primary.main" : "#e7ddd0",
                                                        borderWidth: petInfo.gender === "female" ? 2 : 1,
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease-in-out",
                                                        "&:hover": {
                                                            borderColor: "primary.main",
                                                            backgroundColor: "#fff8f0",
                                                        },
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>Female</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    {/* Allergies Checkbox - spans 2 columns on md+ */}
                                    <Grid size={{ xs: 12 }}>
                                        <Box sx={{ py: 1 }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={petInfo.hasAllergies}
                                                        onChange={(e) => handlePetInfoChange("hasAllergies", e.target.checked)}
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 1,
                                                            color: "#e7ddd0",
                                                            "&.Mui-checked": {
                                                                color: "primary.main",
                                                                backgroundColor: "primary.main",
                                                            },
                                                            "& .MuiSvgIcon-root": {
                                                                fontSize: 20,
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 400, ml: 1 }}>
                                                        My pet has allergies
                                                    </Typography>
                                                }
                                                sx={{ alignItems: "center", margin: 0 }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Health Condition - spans 2 columns */}
                                    <Grid size={{ xs: 12 }}>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 500,
                                                    color: "text.primary",
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
                                                onChange={(e) => handlePetInfoChange("healthCondition", e.target.value)}
                                                placeholder="Enter details about your pet's health"
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        minHeight: 96,
                                                        borderRadius: 2,
                                                        backgroundColor: "#fcfaf8",
                                                        "&:hover fieldset": {
                                                            borderColor: "primary.main",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "primary.main",
                                                            borderWidth: 2,
                                                        },
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        fontSize: "1rem",
                                                        "&::placeholder": {
                                                            color: "#97784e",
                                                            opacity: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Special Requests - spans 2 columns */}
                                    <Grid size={{ xs: 12 }}>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 500,
                                                    color: "text.primary",
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
                                                onChange={(e) => handlePetInfoChange("specialRequests", e.target.value)}
                                                placeholder="e.g., smaller pieces, extra crunchy"
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        minHeight: 96,
                                                        borderRadius: 2,
                                                        backgroundColor: "#fcfaf8",
                                                        "&:hover fieldset": {
                                                            borderColor: "primary.main",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "primary.main",
                                                            borderWidth: 2,
                                                        },
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        fontSize: "1rem",
                                                        "&::placeholder": {
                                                            color: "#97784e",
                                                            opacity: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Shipping Information */}
                        <Card sx={{ mb: 4, boxShadow: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        sx={{
                                            fontWeight: 600,
                                            color: "text.primary",
                                        }}
                                    >
                                        Shipping Information
                                    </Typography>
                                    <Button
                                        startIcon={<Map />}
                                        color="primary"
                                        variant="text"
                                        size="small"
                                        onClick={() => setAddressModalOpen(true)}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 500,
                                            fontSize: "0.875rem",
                                            "&:hover": {
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        Load Saved Address
                                    </Button>
                                </Box>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            value={shippingInfo.fullName}
                                            onChange={(e) => handleShippingInfoChange("fullName", e.target.value)}
                                            placeholder="Enter your full name"
                                            variant="outlined"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                    backgroundColor: "#fcfaf8",
                                                    "&:hover fieldset": {
                                                        borderColor: "primary.main",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "primary.main",
                                                        borderWidth: 2,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            value={shippingInfo.address}
                                            onChange={(e) => handleShippingInfoChange("address", e.target.value)}
                                            placeholder="Enter your street address"
                                            variant="outlined"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                    backgroundColor: "#fcfaf8",
                                                    "&:hover fieldset": {
                                                        borderColor: "primary.main",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "primary.main",
                                                        borderWidth: 2,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            value={shippingInfo.city}
                                            onChange={(e) => handleShippingInfoChange("city", e.target.value)}
                                            placeholder="Enter your city"
                                            variant="outlined"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                    backgroundColor: "#fcfaf8",
                                                    "&:hover fieldset": {
                                                        borderColor: "primary.main",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "primary.main",
                                                        borderWidth: 2,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Postal Code"
                                            value={shippingInfo.postalCode}
                                            onChange={(e) => handleShippingInfoChange("postalCode", e.target.value)}
                                            placeholder="Enter your postal code"
                                            variant="outlined"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                    backgroundColor: "#fcfaf8",
                                                    "&:hover fieldset": {
                                                        borderColor: "primary.main",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "primary.main",
                                                        borderWidth: 2,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            type="tel"
                                            value={shippingInfo.phoneNumber}
                                            onChange={(e) => handleShippingInfoChange("phoneNumber", e.target.value)}
                                            placeholder="Enter your phone number"
                                            variant="outlined"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                    backgroundColor: "#fcfaf8",
                                                    "&:hover fieldset": {
                                                        borderColor: "primary.main",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "primary.main",
                                                        borderWidth: 2,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Payment Method */}
                        <Card sx={{ mb: 4, boxShadow: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{
                                        mb: 4,
                                        fontWeight: 600,
                                        color: "text.primary",
                                    }}
                                >
                                    Payment Method
                                </Typography>
                                <Box sx={{ mb: 4 }}>
                                    <RadioGroup
                                        row
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        sx={{ gap: 2 }}
                                    >
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                border: "1px solid #e7ddd0",
                                                borderRadius: 2,
                                                px: 3,
                                                py: 2,
                                                backgroundColor: paymentMethod === "toss" ? "#fff8f0" : "transparent",
                                                borderColor: paymentMethod === "toss" ? "primary.main" : "#e7ddd0",
                                                borderWidth: paymentMethod === "toss" ? 2 : 1,
                                                transition: "all 0.2s ease-in-out",
                                                flex: 1,
                                                "&:hover": {
                                                    borderColor: "primary.main",
                                                    backgroundColor: "#fff8f0",
                                                },
                                            }}
                                        >
                                            <FormControlLabel
                                                value="toss"
                                                control={<Radio sx={{ display: "none" }} />}
                                                label={
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Box
                                                            component="img"
                                                            src="/placeholder.svg?height=20&width=60"
                                                            alt="Toss Payments"
                                                            sx={{ height: 20 }}
                                                        />
                                                        <Typography sx={{ fontWeight: 500 }}>Toss Pay</Typography>
                                                    </Box>
                                                }
                                                sx={{ margin: 0, width: "100%", justifyContent: "center" }}
                                            />
                                        </Paper>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                border: "1px solid #e7ddd0",
                                                borderRadius: 2,
                                                px: 3,
                                                py: 2,
                                                backgroundColor: paymentMethod === "card" ? "#fff8f0" : "transparent",
                                                borderColor: paymentMethod === "card" ? "primary.main" : "#e7ddd0",
                                                borderWidth: paymentMethod === "card" ? 2 : 1,
                                                transition: "all 0.2s ease-in-out",
                                                flex: 1,
                                                "&:hover": {
                                                    borderColor: "primary.main",
                                                    backgroundColor: "#fff8f0",
                                                },
                                            }}
                                        >
                                            <FormControlLabel
                                                value="card"
                                                control={<Radio sx={{ display: "none" }} />}
                                                label={
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <CreditCard fontSize="small" />
                                                        <Typography sx={{ fontWeight: 500 }}>Credit Card</Typography>
                                                    </Box>
                                                }
                                                sx={{ margin: 0, width: "100%", justifyContent: "center" }}
                                            />
                                        </Paper>
                                    </RadioGroup>
                                </Box>

                                <Paper sx={{ p: 3, bgcolor: "#fcfaf8", border: "1px solid #f3eee7", borderRadius: 2 }}>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                        Order Total
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                                        <Typography color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                                            Subtotal
                                        </Typography>
                                        <Typography sx={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                        <Typography color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                                            Shipping
                                        </Typography>
                                        <Typography sx={{ fontWeight: 500 }}>${shipping.toFixed(2)}</Typography>
                                    </Box>
                                    <Divider sx={{ my: 2, borderColor: "#e7ddd0" }} />
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Total
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
                                            ${total.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </CardContent>
                        </Card>

                        {/* Terms and Submit */}
                        <Box sx={{ px: 2 }}>
                            <Box sx={{ py: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            sx={{
                                                color: "#e7ddd0",
                                                "&.Mui-checked": {
                                                    color: "primary.main",
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 20,
                                                },
                                                alignSelf: "flex-start",
                                                mt: 0.5,
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography sx={{ fontSize: "0.875rem", lineHeight: 1.6, ml: 1 }}>
                                            I confirm that all information is accurate and I have reviewed the order details. I understand
                                            these treats are custom-made and may require seller confirmation.
                                        </Typography>
                                    }
                                    sx={{ alignItems: "flex-start", margin: 0 }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={!termsAccepted}
                                startIcon={<ShoppingCartCheckout />}
                                sx={{
                                    py: 2.5,
                                    fontSize: "1.125rem",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    textTransform: "none",
                                    "&:hover": {
                                        boxShadow: 4,
                                    },
                                    "&:disabled": {
                                        backgroundColor: "#e0e0e0",
                                        color: "#9e9e9e",
                                    },
                                }}
                            >
                                Place Order & Pay
                            </Button>
                        </Box>
                    </form>
                </Container>

                {/* Modals */}
                <PetModal
                    open={petModalOpen}
                    onClose={() => setPetModalOpen(false)}
                    onSelectPet={handleLoadPet}
                    savedPets={savedPets}
                />

                <AddressModal
                    open={addressModalOpen}
                    onClose={() => setAddressModalOpen(false)}
                    onSelectAddress={handleLoadAddress}
                    savedAddresses={savedAddresses}
                />
            </Box>
        </ThemeProvider>
    )
}
