"use client"

import type React from "react"
import { useState } from "react"
import { Container, Breadcrumbs, Link, Typography, Box, Chip, Button, FormControlLabel, Checkbox } from "@mui/material"
import { Schedule, ShoppingCartCheckout } from "@mui/icons-material"
import { ThemeProvider } from "@mui/material/styles"

// Component imports
import PaymentHeader from "@/components/OrderPayment/PaymentHeader"
import OrderSummary from "@/components/OrderPayment/OrderSummary"
import PetInformationForm from "@/components/OrderPayment/PetInformationForm"
import ShippingInformationForm from "@/components/OrderPayment/ShippingInformationForm"
import PaymentMethodSelection from "@/components/OrderPayment/PaymentMethodSelection"
import OrderTotal from "@/components/OrderPayment/OrderTotal"
import PetModal from "@/components/OrderPayment/PetModal"
import AddressModal from "@/components/OrderPayment/AddressModal"

// Data imports
import {savedPets, savedAddresses, type SavedPet, type SavedAddress, orderItems} from "@/data/mock-data"
import {theme} from "@/theme";
import type {PetInfo, ShippingInfo}from "@/components/OrderPayment"


export default function PaymentPage() {
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
            <Box style={{ flexGrow: 1, backgroundColor: "#fcfaf8", minHeight: "100vh" }}>
                <PaymentHeader />

                <Container maxWidth="md" style={{ paddingTop: 40, paddingBottom: 40 }}>
                    {/* Breadcrumbs */}
                    <Breadcrumbs style={{ marginBottom: 24 }}>
                        <Link color="text.secondary" href="#" underline="hover">
                            Shop
                        </Link>
                        <Typography color="text.primary">Custom Order</Typography>
                    </Breadcrumbs>

                    {/* Page Header */}
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                        <Typography variant="h3" component="h1" style={{ fontWeight: "bold" }}>
                            Custom Order & Checkout
                        </Typography>
                        <Chip
                            icon={<Schedule />}
                            label="Estimated Manufacturing Time: 2-3 days"
                            color="primary"
                            variant="outlined"
                        />
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <OrderSummary orderItems={orderItems} />

                        <PetInformationForm
                            petInfo={petInfo}
                            onPetInfoChange={handlePetInfoChange}
                            onLoadSavedPet={() => setPetModalOpen(true)}
                        />

                        <ShippingInformationForm
                            shippingInfo={shippingInfo}
                            onShippingInfoChange={handleShippingInfoChange}
                            onLoadSavedAddress={() => setAddressModalOpen(true)}
                        />

                        <PaymentMethodSelection paymentMethod={paymentMethod} onPaymentMethodChange={setPaymentMethod} />

                        <OrderTotal subtotal={subtotal} shipping={shipping} total={total} />

                        {/* Terms and Submit */}
                        <Box style={{ paddingLeft: 16, paddingRight: 16, marginTop: 32 }}>
                            <Box style={{ paddingTop: 24, paddingBottom: 24 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            style={{
                                                color: "#e7ddd0",
                                                alignSelf: "flex-start",
                                                marginTop: 4,
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography style={{ fontSize: "0.875rem", lineHeight: 1.6, marginLeft: 8 }}>
                                            I confirm that all information is accurate and I have reviewed the order details. I understand
                                            these treats are custom-made and may require seller confirmation.
                                        </Typography>
                                    }
                                    style={{ alignItems: "flex-start", margin: 0 }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={!termsAccepted}
                                startIcon={<ShoppingCartCheckout />}
                                style={{
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    fontSize: "1.125rem",
                                    fontWeight: 700,
                                    borderRadius: 8,
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                    textTransform: "none",
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