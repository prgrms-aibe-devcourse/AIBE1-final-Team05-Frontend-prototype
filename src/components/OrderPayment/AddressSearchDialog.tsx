import React, { useEffect, useRef, useState } from "react"
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, IconButton, CircularProgress
} from "@mui/material"
import { Close } from "@mui/icons-material"

export interface AddressSearchResult {
    address: string
    postalCode: string
    city: string
    detailAddress?: string
}

interface AddressSearchDialogProps {
    open: boolean
    onClose: () => void
    onSelectAddress: (address: AddressSearchResult) => void
}

declare global {
    interface Window {
        daum?: {
            Postcode: new (options: {
                oncomplete: (data: any) => void
                onclose?: () => void
                width?: string
                height?: string
            }) => {
                embed: (element: HTMLElement) => void
            }
        }
    }
}

const AddressSearchDialog: React.FC<AddressSearchDialogProps> = ({
                                                                     open,
                                                                     onClose,
                                                                     onSelectAddress,
                                                                 }) => {
    const postcodeRef = useRef<HTMLDivElement>(null)
    const [scriptLoaded, setScriptLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 스크립트 로드 함수
    const loadScript = () => {
        return new Promise<void>((resolve, reject) => {
            if (window.daum) {
                resolve()
                return
            }

            const script = document.createElement("script")
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
            script.async = true
            script.onload = () => {
                console.log("Daum Postcode script loaded successfully")
                resolve()
            }
            script.onerror = () => {
                console.error("Failed to load Daum Postcode script")
                reject(new Error("스크립트 로드에 실패했습니다."))
            }
            document.head.appendChild(script)
        })
    }

    // 스크립트 로드
    useEffect(() => {
        const initScript = async () => {
            try {
                setLoading(true)
                setError(null)
                await loadScript()
                setScriptLoaded(true)
            } catch (err) {
                setError(err instanceof Error ? err.message : "스크립트 로드 오류")
                console.error("Script loading error:", err)
            } finally {
                setLoading(false)
            }
        }

        initScript()
    }, [])

    // 주소 검색 초기화 함수
    const initializePostcode = () => {
        if (!postcodeRef.current || !window.daum) {
            console.error("Postcode ref or daum object not available")
            return
        }

        try {
            // 기존 내용 제거
            postcodeRef.current.innerHTML = ""

            console.log("Initializing Daum Postcode...")

            const postcode = new window.daum.Postcode({
                oncomplete: (data: any) => {
                    console.log("Address selected:", data)

                    const fullAddress = data.roadAddress || data.jibunAddress
                    const city = `${data.sido} ${data.sigungu}`

                    onSelectAddress({
                        address: fullAddress,
                        postalCode: data.zonecode,
                        city: city,
                        detailAddress: data.buildingName || '',
                    })
                    onClose()
                },
                onclose: () => {
                    console.log("Daum Postcode closed")
                },
                width: "100%",
                height: "400px",
            })

            postcode.embed(postcodeRef.current)
            console.log("Daum Postcode embedded successfully")
        } catch (error) {
            console.error("Error initializing postcode:", error)
            setError("주소 검색 초기화에 실패했습니다.")
        }
    }

    // 모달이 열릴 때 주소 검색 초기화
    useEffect(() => {
        if (open && scriptLoaded && !loading && !error) {
            // 약간의 지연을 주어 DOM이 완전히 렌더링되도록 함
            const timer = setTimeout(() => {
                initializePostcode()
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [open, scriptLoaded, loading, error])

    const handleRetry = () => {
        setError(null)
        setScriptLoaded(false)
        setLoading(true)

        // 기존 스크립트 제거
        const existingScript = document.querySelector('script[src*="postcode.v2.js"]')
        if (existingScript) {
            existingScript.remove()
        }

        // 다시 로드
        loadScript()
            .then(() => setScriptLoaded(true))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ sx: { minHeight: "500px" } }}
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">주소 검색</Typography>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        width: "100%",
                        minHeight: "400px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    {loading && (
                        <>
                            <CircularProgress />
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                주소 검색 서비스를 불러오는 중...
                            </Typography>
                        </>
                    )}

                    {error && (
                        <>
                            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                            <Button variant="outlined" onClick={handleRetry}>
                                다시 시도
                            </Button>
                        </>
                    )}

                    {!loading && !error && (
                        <div ref={postcodeRef} style={{ width: "100%", height: "400px" }} />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>취소</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddressSearchDialog