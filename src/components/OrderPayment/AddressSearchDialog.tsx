import React, { useEffect, useRef, useState } from "react"
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, IconButton
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

    // 스크립트는 최초 한 번만 삽입
    useEffect(() => {
        if (!window.daum) {
            const script = document.createElement("script")
            script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
            script.async = true
            script.onload = () => setScriptLoaded(true)
            document.body.appendChild(script)
        } else {
            setScriptLoaded(true)
        }
    }, [])

    // 모달 open 시 주소 검색 embed 실행
    useEffect(() => {
        if (open && scriptLoaded && postcodeRef.current && window.daum) {
            postcodeRef.current.innerHTML = "" // 초기화 (중복 삽입 방지)
            const postcode = new window.daum.Postcode({
                oncomplete: (data: any) => {
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
                width: "100%",
                height: "400px",
            })
            postcode.embed(postcodeRef.current)
        }
    }, [open, scriptLoaded, onClose, onSelectAddress])

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
                    ref={postcodeRef}
                    sx={{
                        width: "100%",
                        minHeight: "400px",
                        border: "1px solid #ddd",
                        borderRadius: "4px"
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>취소</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddressSearchDialog
