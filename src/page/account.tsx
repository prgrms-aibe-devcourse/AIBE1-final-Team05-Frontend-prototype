"use client"

import { useState } from "react"
import {
    Alert,
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Button,
    Paper,
    Stepper,
    Step,
    StepLabel,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Chip,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Rating,
    RadioGroup,
    Radio,
    Tab,
    Tabs,
    StepConnector, StepIconProps,
} from "@mui/material"
import {
    Receipt,
    LocalShipping,
    Description,
    Home,
    Pets,
    Add,
    Edit,
    Delete,
    Search,
    Map,
    ChevronRight,
    PhotoCamera, CheckCircle, HourglassBottom, Payment, Inventory, RateReview, Settings,
} from "@mui/icons-material"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import OrderItem from "../components/OrderItem"; // 또는 적절한 경로
import { Address, Pet, Order } from '../types';
import OrderDetail from "../components/OrderDetail.tsx"; // 프로젝트 구조에 따라 경로를 조정하세요. (예: '../types' 또는 '@/types')


const theme = createTheme({
    palette: {
        primary: {
            main: "#f97316", // orange-500
            light: "#fed7aa", // orange-200
            dark: "#ea580c", // orange-600
        },
        secondary: {
            main: "#78716c", // stone-500
        },
        background: {
            default: "#fef3e2", // amber-50
            paper: "#ffffff",
        },
        text: {
            primary: "#1c1917", // stone-800
            secondary: "#57534e", // stone-600
        },
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
    },
})

const CustomStepIcon = ({ icon, active, completed }: StepIconProps) => {
    const getIconComponent = (icon: React.ReactNode) => {
        switch (icon) {
            case 1:
                return <Payment />;
            case 2:
                return <HourglassBottom />;
            case 3:
                return <Inventory />;
            case 4:
                return <LocalShipping />;
            case 5:
                return <CheckCircle />;
            default:
                return <></>;
        }
    };

    return (
        <Box
            sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: completed ? "#1976d2" : active ? "#90caf9" : "#f5f5f5",
                color: completed || active ? "#fff" : "#9e9e9e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
            }}
        >
            {getIconComponent(icon)}
        </Box>
    );
};


// Custom Stepper Connector with Arrow
const ArrowConnector = styled(StepConnector)(({ theme }) => ({
    ["& .MuiStepConnector-line"]: {
        top: 40,
        border: 0,
        backgroundColor: "transparent",
        position: "relative",
        "&::after": {
            content: '">"',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "70px",
            color: theme.palette.grey[400],
        },
    },
}))


const menuItems = [
    { id: "orders", label: "주문/배송 조회", icon: Receipt },
    { id: "return-inquiry", label: "반품/교환 조회", icon: Description },
    { id: "reviews", label: "리뷰 관리", icon: RateReview },
    { id: "addresses", label: "주소 관리", icon: Home },
    { id: "pets", label: "나의 애완동물", icon: Pets },
]


const mockOrders: Order[] = [
    {
        id: "1",
        orderNumber: "20250528001",
        date: "2025. 5. 28 주문",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "5/29(목) 도착",
        products: [
            {
                id: "1",
                name: "티아시아가진 치킨 마누카 커리 170g + 게살 푸팟퐁 커리 170g + 비프 마살라 커리 170g + 스파이시 비프 마살라 커리 170g 세트, 1세트",
                price: 0,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 0,
    },
    {
        id: "2",
        orderNumber: "20250307001",
        date: "2025. 3. 7 주문",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "3/8(토) 도착",
        products: [
            {
                id: "2",
                name: "오리통다리 껌",
                price: 28800,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 28800,
    },
]

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
        hasAllergies: false,
        healthCondition: "",
        specialRequests: "",
    })

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

    const handleOrderAction = (action: string, order: Order) => {
        setSelectedOrder(order)
        setDetailView(action)
    }

    const renderShippingDetail = () => (
        <Box>
            <Button
                startIcon={<ChevronRight sx={{ transform: "rotate(180deg)" }} />}
                onClick={() => setDetailView(null)}
                sx={{ mb: 3 }}
            >
                뒤로가기
            </Button>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                배송조회
            </Typography>

            <Paper sx={{ p: 4, mb: 4, bgcolor: "#f5f5f5", textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    5/29(목) 도착 완료
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    고객님이 주문하신 상품이 배송완료 되었습니다.
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            <LocalShipping />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                배송
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                송장번호: 1029137188374
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                📞 배송업무 중 연락을 받을 수 없습니다.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>받는사람:</strong> 홍길동
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>받는주소:</strong> 서울특별시 서초구 반포대로 45 4층
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>배송요청사항:</strong> 세대: 기타 (택배함)
                        </Typography>
                        <Typography variant="body2" sx={{ color: "success.main", fontWeight: 600 }}>
                            <strong>상품수령방법:</strong> 고객요청
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>시간</strong>
                            </TableCell>
                            <TableCell>
                                <strong>현재위치</strong>
                            </TableCell>
                            <TableCell>
                                <strong>배송상태</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>5월 29, 2025 03:45</TableCell>
                            <TableCell>일산5</TableCell>
                            <TableCell>배송완료</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5월 29, 2025 02:32</TableCell>
                            <TableCell>일산5</TableCell>
                            <TableCell>배송출발</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5월 29, 2025 02:04</TableCell>
                            <TableCell>일산5</TableCell>
                            <TableCell>캠프도착</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5월 29, 2025 00:04</TableCell>
                            <TableCell>고양HUB</TableCell>
                            <TableCell>캠프상차</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5월 28, 2025 23:58</TableCell>
                            <TableCell>고양HUB</TableCell>
                            <TableCell>집하</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

    const renderReturnRequest = () => (
        <Box>
            <Button
                startIcon={<ChevronRight sx={{ transform: "rotate(180deg)" }} />}
                onClick={() => setDetailView(null)}
                sx={{ mb: 3 }}
            >
                뒤로가기
            </Button>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                교환, 반품 신청
            </Typography>

            <Stepper activeStep={0} alternativeLabel connector={<ArrowConnector />} sx={{ mb: 6 }}>
                <Step>
                    <StepLabel>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>
                                1
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                상품 선택
                            </Typography>
                        </Box>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                2
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                사유 선택
                            </Typography>
                        </Box>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                3
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                해결방법 선택
                            </Typography>
                        </Box>
                    </StepLabel>
                </Step>
            </Stepper>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}>
                상품을 선택해 주세요
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Checkbox defaultChecked color="primary" />
                    <Avatar src="/placeholder.svg?height=80&width=80" variant="rounded" sx={{ width: 80, height: 80 }} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            {/*<Chip label="로켓와우" color="primary" size="small" />*/}
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                티아시아가진 치킨 마누카 커리 170g + 게살 푸팟퐁 커리 170g + 비프 마살라 커리 170g + 스파이시 비프
                                마살라 커리 170g 세트, 1세트
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "right" }}>
                            1개
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Box sx={{ textAlign: "center" }}>
                <Button variant="contained" size="large" sx={{ minWidth: 200 }}>
                    {"다음 단계 →"}
                </Button>
            </Box>
        </Box>
    )

    const renderReviewWrite = () => (
        <Box>
            <Button
                startIcon={<ChevronRight sx={{ transform: "rotate(180deg)" }} />}
                onClick={() => setDetailView(null)}
                sx={{ mb: 3 }}
            >
                뒤로가기
            </Button>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                상품 후기 다루
            </Typography>

            <Typography variant="body1" sx={{ mb: 4 }}>
                이 상품의 품질에 대해서 얼마나 만족하시나요?
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
                    <Avatar src="/placeholder.svg?height=80&width=80" variant="rounded" sx={{ width: 80, height: 80 }} />
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                            티아시아가진 치킨 마누카 커리 170g + 게살 푸팟퐁 커리 170g + 비프 마살라 커리 170g + 스파이시 비프 마살라
                            커리 170g 세트, 1세트
                        </Typography>
                        <Rating size="large" defaultValue={0} />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            (필수)*
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        리뷰
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        작성 드셨던 것은 어떠셨어요?
                    </Typography>
                    <RadioGroup>
                        <FormControlLabel value="good" control={<Radio />} label="맛있어요" />
                        <FormControlLabel value="normal" control={<Radio />} label="보통이에요" />
                        <FormControlLabel value="bad" control={<Radio />} label="생각보다 별로예요" />
                    </RadioGroup>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        상세리뷰
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        placeholder="다른 고객님에게 도움이 되도록 상품에 대한 솔직한 평가를 남겨주세요.
상품 품질과 관계 없는 배송, 포장, 절차 등에 대한 상품 가격 등은 판매자 서비스 평가에 남겨주세요."
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        상품 품질과 관련 없는 내용은 비공개 처리될 수 있습니다.
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                        {"작성된 리뷰는 상세 전까지 상품 리뷰에 공개되고, 마이쿠팡 > 리뷰 관리에서 수정 및 삭제가 가능합니다."}
                    </Typography>
                    <Box sx={{ textAlign: "right", mt: 1 }}>
                        <Typography variant="caption">0</Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        사진첨부
                    </Typography>
                    <Button variant="outlined" startIcon={<PhotoCamera />} sx={{ mb: 2 }}>
                        사진 첨부하기
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        0/10
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        한줄요약
                    </Typography>
                    <TextField fullWidth placeholder="한 줄 요약을 입력해 주세요" variant="outlined" sx={{ mb: 1 }} />
                    <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption">0/30</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <Button variant="outlined" size="large" sx={{ minWidth: 120 }}>
                        취소하기
                    </Button>
                    <Button variant="contained" size="large" sx={{ minWidth: 120 }}>
                        등록하기
                    </Button>
                </Box>
            </Paper>
        </Box>
    )

    const renderCancelDetail = () => (
        <Box>
            <Button
                startIcon={<ChevronRight sx={{ transform: "rotate(180deg)" }} />}
                onClick={() => setDetailView(null)}
                sx={{ mb: 3 }}
            >
                뒤로가기
            </Button>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                취소/반품/교환/환불내역 상세
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    주문일 : 2022/7/23 | 주문번호 : 29000146282236
                </Typography>
            </Box>

            {/* 상품 정보 테이블 */}
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>상품</TableCell>
                            <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>금액</TableCell>
                            <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>진행 상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar src="/placeholder.svg?height=80&width=80" variant="rounded" sx={{ width: 80, height: 80 }} />
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                                            셀리본 프리미엄 롤 포킹 헤어브러쉬
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            셀리본 프리미엄 토모 롤 포킹 헤어브러쉬, 1호, 1개
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography variant="body2">1개</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    8,260 원
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    취소완료
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 상세정보 */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                상세정보
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 150 }}>취소접수일자</TableCell>
                            <TableCell>2022/7/23</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>취소접수번호</TableCell>
                            <TableCell>596931508</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>취소완료일</TableCell>
                            <TableCell>2022/7/23</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 취소 사유 */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                취소 사유
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 150 }}>취소 사유</TableCell>
                            <TableCell>상품을 주가하여 재주문</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 환불안내 */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    환불안내
                </Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                    취소영수증 확인
                </Typography>
            </Box>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 150 }}>상품금액</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>8,260원</TableCell>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 150 }}>환불 수단</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>국민은행 8,260원</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>배송비</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>0원</TableCell>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>환불 완료</TableCell>
                            <TableCell sx={{ textAlign: "right", color: "error.main", fontWeight: 600 }}>8,260원</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>반품비</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>0원</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 목록 버튼 */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button variant="contained" size="large" sx={{ minWidth: 120 }} onClick={() => setDetailView(null)}>
                    목록
                </Button>
            </Box>
        </Box>
    )


    const renderContent = () => {
        if (detailView === "shipping" && selectedOrder) {
            return renderShippingDetail()
        }
        if (detailView === "return" && selectedOrder) {
            return renderReturnRequest()
        }
        if (detailView === "review" && selectedOrder) {
            return renderReviewWrite()
        }
        if (detailView === "detail" && selectedOrder) {
            return (<OrderDetail
                selectedOrder={selectedOrder}
                setDetailView={setDetailView}
                handleOrderAction={handleOrderAction}
            />)
        }
        if (detailView === "cancel-detail") {
            return renderCancelDetail()
        }

        const shippingSteps = [
            "결제 완료",
            "상품 준비중",
            "배송 준비 완료",
            "배송중",
            "배송 완료"
        ];

        const descriptions = [
            "주문 결제가\n완료되었습니다.",
            "판매자가 발송할\n상품을 준비중입니다.",
            "상품 준비가 완료되어\n택배를 예정입니다.",
            "상품이 고객님께\n배송중입니다.",
            "상품이 주문자에게\n전달 완료되었습니다."
        ];

        switch (activeMenu) {
            case "orders":
                return (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "text.primary" }}>
                            주문/배송 조회
                        </Typography>

                        <Paper sx={{ p: 3, mb: 4, bgcolor: "#fef3e2" }}>
                            <Box sx={{ display: "flex", gap: 2, alignItems: "end", mb: 3 }}>
                                <TextField
                                    fullWidth
                                    placeholder="주문한 상품을 검색할 수 있어요!"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: <Search color="action" />,
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            bgcolor: "white",
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                {["최근 6개월", "2025", "2024", "2023", "2022", "2021", "2020"].map((period) => (
                                    <Chip
                                        key={period}
                                        label={period}
                                        color={selectedPeriod === period ? "primary" : "default"}
                                        variant={selectedPeriod === period ? "filled" : "outlined"}
                                        onClick={() => setSelectedPeriod(period)}
                                        size="small"
                                    />
                                ))}
                            </Box>
                        </Paper>

                        {/* 주문 목록 */}
                        {/*<Box sx={{ mt: 3 }}>*/}
                            {mockOrders.map((order) => (
                                <OrderItem
                                    key={order.id}
                                    order={order}
                                    handleOrderAction={handleOrderAction}
                                />
                            ))}
                        {/*</Box>*/}

                        {/* 배송상품 주문상태 안내 */}
                        <Paper sx={{ p: 3, mb: 4 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    배송상품 주문상태 안내
                                </Typography>
                                <Button variant="text" color="primary" size="small">
                                    {"자세한 내용 더보기 >"}
                                </Button>
                            </Box>

                            <Stepper activeStep={-1}
                                     alternativeLabel
                                     connector={<ArrowConnector />}
                                     sx={{ mb: 4 }}
                            >
                                {shippingSteps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel
                                            slots={{
                                                stepIcon: CustomStepIcon,
                                            }}
                                            slotProps={{
                                                stepIcon: {
                                                    icon: index + 1, // 각 단계에 해당하는 아이콘 번호 전달
                                                },
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {label}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ textAlign: "center", whiteSpace: "pre-line" }}
                                            >
                                                {descriptions[index]}
                                            </Typography>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Paper>

                        {/* 취소/반품/교환 안내 */}
                        <Paper sx={{ p: 3 }}>
                            <Alert severity="error" sx={{ mb: 3 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    취소/반품/교환 신청전 확인해주세요!
                                </Typography>
                            </Alert>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    취소
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    • 취소수수료를 확인하여 2일 이내(주말,공휴일 제외) 처리결과를 안내해드립니다.(공휴 경우 기준 마감시간
                                    오후 4시)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    • 주문 상품은 사용 전날 오후 6시까지 취소 신청 시 취소수수료가 발생되지 않습니다.
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    반품
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    • 상품 수령 후 7일 이내 신청하여 주세요.
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    • 상품의 불량된 이유에는 택배 완료 후, 반품 상품을 회수합니다.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    • 절차상품/주문제작/해외배송/신선식품 상품 등은 고객변심에서만 반품 신청이 가능합니다.{" "}
                                    <Button variant="text" size="small" color="primary">
                                        1:1문의하기 &gt;
                                    </Button>
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    교환
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    • 상품의 교환 신청은 고객센터로 문의하여 주세요.{" "}
                                    <Button variant="text" size="small" color="primary">
                                        1:1문의하기 &gt;
                                    </Button>
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                )
            case "reviews":
                return (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "text.primary" }}>
                            리뷰 관리
                        </Typography>

                        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                            <Tabs value={0}>
                                <Tab label="리뷰 작성" />
                                <Tab label="작성한 리뷰" />
                            </Tabs>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                작성 가능한 리뷰 1건이 있습니다.
                            </Typography>
                            <Box>
                                <Button variant="text" color="primary" size="small">
                                    리뷰 운영원칙
                                </Button>
                                <Button variant="text" color="primary" size="small" startIcon={<Settings />}>
                                    리뷰 설정
                                </Button>
                            </Box>
                        </Box>

                        {mockOrders.map((order) => (
                            <Paper key={order.id} sx={{ mb: 3, p: 3 }}>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            {order.products.map((product) => (
                                                <TableRow key={product.id}>
                                                    {/* 이미지 셀 */}
                                                    <TableCell sx={{ width: 120 }}>
                                                        <Avatar
                                                            src={product.image}
                                                            variant="rounded"
                                                            sx={{ width: 100, height: 100 }}
                                                        />
                                                    </TableCell>

                                                    {/* 상품 정보 셀 */}
                                                    <TableCell>
                                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                            {product.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {order.deliveryDate
                                                                ? `${order.deliveryDate.split("(")[0]} 배송`
                                                                : "배송 완료"}
                                                        </Typography>
                                                    </TableCell>

                                                    {/* 버튼 셀 */}
                                                    <TableCell align="right" sx={{ width: 200 }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                sx={{ mb: 1 }}
                                                                onClick={() => handleOrderAction("review", order)}
                                                            >
                                                                리뷰 작성하기
                                                            </Button>

                                                            <Button
                                                                variant="text"
                                                                color="primary"
                                                                size="small"
                                                            >
                                                                숨기기
                                                            </Button>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        ))}
                    </Box>
                )

            case "return-inquiry":
                return (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "text.primary" }}>
                            취소/반품/교환 내역
                        </Typography>

                        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                            <Tabs value={returnTab} onChange={(_e, newValue) => setReturnTab(newValue)}>
                                <Tab label="취소/반품/교환" />
                                <Tab label="무통장환불" />
                            </Tabs>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {`• 취소/반품/교환 신청한 내역을 확인할 수 있습니다.`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {`• 하단 상품목록에 없는 상품은 1:1문의 또는 고객센터(1577-7011)로 문의주세요.`}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box />
                                <Button variant="text" color="primary" size="small" endIcon={<ChevronRight />}>
                                    {"취소/반품 안내"}
                                </Button>
                            </Box>
                        </Box>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                                        <TableCell colSpan={4}>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                취소접수일: 2022/7/23 | 주문일: 2022/7/23 | 주문번호: 29000146282236
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                셀리본 프리미엄 롤 포킹 헤어브러쉬
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                셀리본 프리미엄 토모 롤 포킹 헤어브러쉬, 1호, 1개
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">1개</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                8,260 원
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">취소완료</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="outlined" size="small" onClick={() => setDetailView("cancel-detail")}>
                                                취소상세
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )

            case "addresses":
                return (
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
                                주소 관리
                            </Typography>
                            <Button variant="contained" startIcon={<Add />} onClick={() => setAddressDialogOpen(true)}>
                                새 주소 추가
                            </Button>
                        </Box>

                        <Grid container spacing={3}>
                            {addresses.map((address) => (
                                <Grid size={{ xs: 12, md: 6 }} key={address.id}>
                                    <Card sx={{ height: "100%" }}>
                                        <CardContent>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                                                <Chip label={address.label} color="primary" size="small" />
                                                <Box>
                                                    <IconButton size="small" onClick={() => handleEditAddress(address)}>
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton size="small" onClick={() => handleDeleteAddress(address.id)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                {address.fullName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                {address.address}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                {address.city}, {address.postalCode}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {address.phoneNumber}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            {addresses.length === 0 && (
                                <Grid size={{ xs: 12 }}>
                                    <Paper
                                        sx={{
                                            p: 8,
                                            textAlign: "center",
                                            border: "2px dashed #d6d3d1",
                                        }}
                                    >
                                        <Map sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            등록된 주소가 없습니다
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                            자주 사용하는 주소를 등록해보세요
                                        </Typography>
                                        <Button variant="contained" startIcon={<Add />} onClick={() => setAddressDialogOpen(true)}>
                                            첫 번째 주소 추가하기
                                        </Button>
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                )

            case "pets":
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

            default:
                return (
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
                        {menuItems.find((item) => item.id === activeMenu)?.label}
                    </Typography>
                )
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
                {/* Header */}
                <Box sx={{ bgcolor: "white", boxShadow: 1, position: "sticky", top: 0, zIndex: 10 }}>
                    <Container maxWidth="xl">
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
                                CatDogEats
                            </Typography>
                            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
                                <Button color="inherit">홈</Button>
                                <Button color="inherit">상품</Button>
                                <Button color="primary" sx={{ fontWeight: 600 }}>
                                    마이페이지
                                </Button>
                                <Button color="inherit">고객센터</Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* Main Content */}
                <Container maxWidth="xl" sx={{ py: 4 }}>
                    <Grid container spacing={4}>
                        {/* Sidebar */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Card>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                        마이페이지
                                    </Typography>
                                    <List sx={{ p: 0 }}>
                                        {menuItems.map((item) => (
                                            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                                                <ListItemButton
                                                    selected={activeMenu === item.id}
                                                    onClick={() => {
                                                        setActiveMenu(item.id)
                                                        setDetailView(null)
                                                    }}
                                                    sx={{
                                                        borderRadius: 2,
                                                        "&.Mui-selected": {
                                                            bgcolor: "#FDBF60",
                                                            color: "#4A2C2A",
                                                            "& .MuiListItemIcon-root": {
                                                                color: "#4A2C2A",
                                                            },
                                                        },
                                                        "&:hover": {
                                                            bgcolor: "#FFF3E0",
                                                            color: "#8D5B4C",
                                                            "& .MuiListItemIcon-root": {
                                                                color: "#8D5B4C",
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <item.icon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={item.label}
                                                        primaryTypographyProps={{
                                                            fontSize: "0.875rem",
                                                            fontWeight: 500,
                                                        }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Main Content */}
                        <Grid size={{ xs: 12, md: 9 }}>
                            <Card>
                                <CardContent sx={{ p: 4 }}>{renderContent()}</CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

                {/* Footer */}
                <Box sx={{ bgcolor: "#1c1917", color: "#fef3e2", py: 6, mt: 8 }}>
                    <Container maxWidth="xl">
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>
                                CatDogEats
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#a8a29e", mb: 0.5 }}>
                                © 2024 CatDogEats. 모든 권리 보유.
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#a8a29e" }}>
                                건강하고 맛있는 수제 펫푸드 전문점
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                {/* Address Dialog */}
                <Dialog open={addressDialogOpen} onClose={() => setAddressDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>{editingAddress ? "주소 수정" : "새 주소 추가"}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="주소 라벨"
                                    value={newAddress.label}
                                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                    placeholder="예: 집, 회사, 부모님댁"
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="받는 분 이름"
                                    value={newAddress.fullName}
                                    onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="주소"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    label="도시"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    label="우편번호"
                                    value={newAddress.postalCode}
                                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="전화번호"
                                    value={newAddress.phoneNumber}
                                    onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAddressDialogOpen(false)}>취소</Button>
                        <Button onClick={handleAddressSubmit} variant="contained">
                            {editingAddress ? "수정" : "추가"}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Pet Dialog */}
                <Dialog open={petDialogOpen} onClose={() => setPetDialogOpen(false)} maxWidth="sm" fullWidth>
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
                                <FormControl fullWidth>
                                    <Select
                                        value={newPet.breed}
                                        onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                                        displayEmpty
                                    >
                                        <MenuItem value="">품종 선택</MenuItem>
                                        <MenuItem value="golden_retriever">골든 리트리버</MenuItem>
                                        <MenuItem value="labrador">래브라도</MenuItem>
                                        <MenuItem value="poodle">푸들</MenuItem>
                                        <MenuItem value="other">기타</MenuItem>
                                    </Select>
                                </FormControl>
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
                                <FormControl fullWidth>
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
                        <Button onClick={() => setPetDialogOpen(false)}>취소</Button>
                        <Button onClick={handlePetSubmit} variant="contained">
                            {editingPet ? "수정" : "추가"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    )
}
