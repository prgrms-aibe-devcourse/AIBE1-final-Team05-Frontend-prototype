import type React from "react"
import { Box, type StepIconProps } from "@mui/material"
import { Payment, HourglassBottom, Inventory, LocalShipping, CheckCircle } from "@mui/icons-material"

const CustomStepIcon: React.FC<StepIconProps> = ({ icon, active, completed }) => {
    const getIconComponent = (icon: React.ReactNode) => {
        switch (icon) {
            case 1:
                return <Payment />
            case 2:
                return <HourglassBottom />
            case 3:
                return <Inventory />
            case 4:
                return <LocalShipping />
            case 5:
                return <CheckCircle />
            default:
                return <></>
        }
    }

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
    )
}

export default CustomStepIcon