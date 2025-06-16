"use client"

import type React from "react"
import { useState } from "react"
import {
    Container,
    Breadcrumbs,
    Link,
    Typography,
    Box,
    Chip,
    Button,
    FormControlLabel,
    Checkbox,
} from "@mui/material"
import { Schedule, ShoppingCartCheckout, NavigateNext } from "@mui/icons-material"
import { ThemeProvider } from "@mui/material/styles"

// Component imports
// import PaymentHeader from "@/components/OrderPayment/PaymentHeader"
import OrderSummary from "@/components/OrderPayment/OrderSummary"
import PetInformationForm from "@/components/OrderPayment/PetInformationForm"
import ShippingInformationForm from "@/components/OrderPayment/ShippingInformationForm"
import OrderTotal from "@/components/OrderPayment/OrderTotal"
import PetModal from "@/components/OrderPayment/PetModal"
import AddressModal from "@/components/OrderPayment/AddressModal"
import type { Coupon } from "@/components/OrderPayment"

// Data imports
import {savedPets, savedAddresses, type SavedPet, type SavedAddress, orderItems} from "@/data/mock-data"
import {theme} from "@/theme";
import type {PetInfo, ShippingInfo}from "@/components/OrderPayment"
import PaymentMethodSelection from "@/components/OrderPayment/PaymentMethodSelection.tsx";


export default function PaymentPage() {
    const [petInfo, setPetInfo] = useState<PetInfo>({
        name: "",
        category: "",
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
            category: pet.category,
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

    const [selectedCoupon, setSelectedCoupon] = useState<string>("")

    const [availableCoupons] = useState<Coupon[]>([
        {
            id: "WELCOME15",
            name: "신규 회원 15% 할인",
            type: "percentage",
            value: 15,
            minAmount: 20,
            description: "20달러 이상 구매 시 15% 할인",
        },
        {
            id: "SAVE5",
            name: "5달러 즉시 할인",
            type: "fixed",
            value: 5,
            minAmount: 30,
            description: "30달러 이상 구매 시 5달러 할인",
        },
        {
            id: "FIRSTTIME20",
            name: "첫 구매 20% 할인",
            type: "percentage",
            value: 20,
            minAmount: 25,
            description: "25달러 이상 첫 구매 시 20% 할인",
        },
    ])

// 할인 계산
    const getSelectedCoupon = (): Coupon | undefined =>
        availableCoupons.find((coupon) => coupon.id === selectedCoupon)

    const calculateDiscount = () => {
        const coupon = getSelectedCoupon()
        if (!coupon) return 0

        if (subtotal >= coupon.minAmount) {
            if (coupon.type === "percentage") {
                return subtotal * (coupon.value / 100)
            } else if (coupon.type === "fixed") {
                return coupon.value
            }
        }

        return 0
    }

    const isCouponApplicable = (coupon: Coupon) => subtotal >= coupon.minAmount
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log("Order submitted:", { petInfo, shippingInfo })
    }

    return (
        <ThemeProvider theme={theme}>
            <Box style={{ flexGrow: 1, backgroundColor: "#fcfaf8", minHeight: "100vh" }}>

                <Container maxWidth="md" style={{ paddingTop: 40, paddingBottom: 40 }}>
                    {/* Breadcrumbs */}
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
                        <Link
                            href="#"
                            color="#97784e"
                            sx={{
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                "&:hover": { color: "#e89830" },
                            }}
                        >
                            Shop
                        </Link>
                        <Typography color="#1b150e" sx={{ fontSize: "0.875rem" }}>
                            주문/결제
                        </Typography>
                    </Breadcrumbs>

                    {/* Page Header */}
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                        <Typography variant="h3" component="h1" style={{ fontWeight: "bold" }}>
                            주문/결제
                        </Typography>
                        <Chip
                            icon={<Schedule />}
                            label="예상 소요시간: 2 ~ 3일"
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
                        <PaymentMethodSelection
                            availableCoupons={availableCoupons}
                            selectedCoupon={selectedCoupon}
                            onCouponSelect={setSelectedCoupon}
                            isCouponApplicable={isCouponApplicable}
                            discountAmount={calculateDiscount()}
                        />


                        <OrderTotal subtotal={subtotal} shipping={shipping} discount={calculateDiscount()} total={total - calculateDiscount()} />

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
                                            저는 모든 정보가 정확함을 확인하였으며, 주문 세부사항을 검토하였습니다.
                                            주문제작 간식들은 맞춤 제작되므로 판매자의 확인이 필요할 수 있음을 이해합니다.
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
                                주문 및 결제
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