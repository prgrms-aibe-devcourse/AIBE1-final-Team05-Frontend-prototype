"use client"

import type React from "react"
import { TextField, InputAdornment, Button } from "@mui/material"
import { Search } from "@mui/icons-material"

interface AddressSearchFieldProps {
    value: string
    onSearchClick: () => void
    placeholder?: string
    label?: string
}

const AddressSearchField: React.FC<AddressSearchFieldProps> = ({
                                                                   value,
                                                                   onSearchClick,
                                                                   placeholder = "카카오 주소 검색을 이용해 정확한 주소를 찾아보세요",
                                                                   label = "주소",
                                                               }) => {
    return (
        <TextField
            fullWidth
            label={label}
            value={value}
            placeholder={placeholder}
            variant="outlined"
            InputProps={{
                readOnly: true,
                endAdornment: (
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<Search />}
                            onClick={onSearchClick}
                            style={{
                                textTransform: "none",
                                fontWeight: 500,
                            }}
                        >
                            주소 검색
                        </Button>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default AddressSearchField