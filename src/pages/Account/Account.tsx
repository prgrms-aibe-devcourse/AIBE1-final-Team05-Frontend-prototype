"use client"

import { useState } from "react"
import { Box, Container, Grid, Card, CardContent } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"

// 분리된 컴포넌트들 import
import Sidebar from "@/components/Account/Sidebar"
import OrdersView from "@/components/Account/OrdersView"
import ReviewsView from "@/components/Account/ReviewsView"
import ReturnInquiryView from "@/components/Account/ReturnInquiryView"
import AddressesView from "@/components/Account/AddressesView"
import PetsView from "@/components/Account/PetsView"
import CouponsView from "@/components/Account/CouponsView"
import ShippingDetailView from "@/components/Account/ShippingDetailView"
import ReturnRequestView from "@/components/Account/ReturnRequestView"
import ReviewWriteView from "@/components/Account/ReviewWriteView"
import CancelDetailView from "@/components/Account/CancelDetailView"
import OrderDetail from "@/components/Account/OrderDetail"
import AddressDialog from "@/components/Account/AddressDialog"
import PetDialog from "@/components/Account/PetDialog"

// 타입 import
import type { Address, Pet, Order } from "components/Account"
import {mockOrders} from "@/data/mock-data"
import {theme} from "@/theme";

export default function MyPage() {
    const [activeMenu, setActiveMenu] = useState("orders")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedPeriod, setSelectedPeriod] = useState("최근 6개월")
    const [addresses, setAddresses] = useState<Address[]>([])
    const [pets, setPets] = useState<Pet[]>([])
    const [addressDialogOpen, setAddressDialogOpen] = useState(false)
    const [petDialogOpen, setPetDialogOpen] = useState(false)
    const [editingAddress, setEditingAddress] = useState<Address | null>(null)
    const [editingPet, setEditingPet] = useState<Pet | null>(null)
    const [detailView, setDetailView] = useState<string | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [returnTab, setReturnTab] = useState(0)

    const [newAddress, setNewAddress] = useState({
        label: "",
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
    })

    const [newPet, setNewPet] = useState({
        name: "",
        breed: "",
        age: "",
        gender: "",
        category: "",
        hasAllergies: false,
        healthCondition: "",
        specialRequests: "",
    })

    // 핸들러 함수들
    const handleMenuChange = (menuId: string) => {
        setActiveMenu(menuId)
        setDetailView(null)
    }

    const handleOrderAction = (action: string, order: Order) => {
        setSelectedOrder(order)
        setDetailView(action)
    }

    const handleAddressSubmit = () => {
        if (editingAddress) {
            setAddresses(
                addresses.map((addr) => (addr.id === editingAddress.id ? { ...editingAddress, ...newAddress } : addr)),
            )
        } else {
            const address: Address = {
                id: Date.now().toString(),
                ...newAddress,
            }
            setAddresses([...addresses, address])
        }
        setAddressDialogOpen(false)
        setEditingAddress(null)
        setNewAddress({
            label: "",
            fullName: "",
            address: "",
            city: "",
            postalCode: "",
            phoneNumber: "",
        })
    }

    const handlePetSubmit = () => {
        if (editingPet) {
            setPets(pets.map((pet) => (pet.id === editingPet.id ? { ...editingPet, ...newPet } : pet)))
        } else {
            const pet: Pet = {
                id: Date.now().toString(),
                ...newPet,
            }
            setPets([...pets, pet])
        }
        setPetDialogOpen(false)
        setEditingPet(null)
        setNewPet({
            name: "",
            breed: "",
            age: "",
            gender: "",
            category: "",
            hasAllergies: false,
            healthCondition: "",
            specialRequests: "",
        })
    }

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address)
        setNewAddress({
            label: address.label,
            fullName: address.fullName,
            address: address.address,
            city: address.city,
            postalCode: address.postalCode,
            phoneNumber: address.phoneNumber,
        })
        setAddressDialogOpen(true)
    }

    const handleEditPet = (pet: Pet) => {
        setEditingPet(pet)
        setNewPet({
            name: pet.name,
            breed: pet.breed,
            age: pet.age,
            gender: pet.gender,
            category: pet.category,
            hasAllergies: pet.hasAllergies,
            healthCondition: pet.healthCondition,
            specialRequests: pet.specialRequests,
        })
        setPetDialogOpen(true)
    }

    const handleDeleteAddress = (id: string) => {
        setAddresses(addresses.filter((addr) => addr.id !== id))
    }

    const handleDeletePet = (id: string) => {
        setPets(pets.filter((pet) => pet.id !== id))
    }

    // 메인 컨텐츠 렌더링
    const renderContent = () => {
        // 상세 뷰들
        if (detailView === "shipping" && selectedOrder) {
            return <ShippingDetailView setDetailView={setDetailView} />
        }
        if (detailView === "return" && selectedOrder) {
            return <ReturnRequestView setDetailView={setDetailView} />
        }
        if (detailView === "review" && selectedOrder) {
            return <ReviewWriteView setDetailView={setDetailView} />
        }
        if (detailView === "detail" && selectedOrder) {
            return (
                <OrderDetail
                    selectedOrder={selectedOrder}
                    setDetailView={setDetailView}
                    handleOrderAction={handleOrderAction}
                />
            )
        }
        if (detailView === "cancel-detail") {
            return <CancelDetailView setDetailView={setDetailView} />
        }

        // 메인 메뉴들
        switch (activeMenu) {
            case "orders":
                return (
                    <OrdersView
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedPeriod={selectedPeriod}
                        setSelectedPeriod={setSelectedPeriod}
                        mockOrders={mockOrders}
                        handleOrderAction={handleOrderAction}
                    />
                )
            case "reviews":
                return <ReviewsView mockOrders={mockOrders} handleOrderAction={handleOrderAction} />
            case "return-inquiry":
                return <ReturnInquiryView returnTab={returnTab} setReturnTab={setReturnTab} setDetailView={setDetailView} />
            case "addresses":
                return (
                    <AddressesView
                        addresses={addresses}
                        handleEditAddress={handleEditAddress}
                        handleDeleteAddress={handleDeleteAddress}
                        setAddressDialogOpen={setAddressDialogOpen}
                    />
                )
            case "pets":
                return (
                    <PetsView
                        pets={pets}
                        handleEditPet={handleEditPet}
                        handleDeletePet={handleDeletePet}
                        setPetDialogOpen={setPetDialogOpen}
                    />
                )
            case "coupons":
                return <CouponsView />
            default:
                return null
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
                <Container maxWidth="xl" sx={{ py: 4 }}>
                    <Grid container spacing={4}>
                        {/* 사이드바 */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} />
                        </Grid>

                        {/* 메인 컨텐츠 */}
                        <Grid size={{ xs: 12, md: 9 }}>
                            <Card>
                                <CardContent sx={{ p: 4 }}>{renderContent()}</CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

                {/* 다이얼로그들 */}
                <AddressDialog
                    open={addressDialogOpen}
                    onClose={() => setAddressDialogOpen(false)}
                    editingAddress={editingAddress}
                    newAddress={newAddress}
                    setNewAddress={setNewAddress}
                    onSubmit={handleAddressSubmit}
                />

                <PetDialog
                    open={petDialogOpen}
                    onClose={() => setPetDialogOpen(false)}
                    editingPet={editingPet}
                    newPet={newPet}
                    setNewPet={setNewPet}
                    onSubmit={handlePetSubmit}
                />
            </Box>
        </ThemeProvider>
    )
}