import { StepConnector } from "@mui/material"
import { styled } from "@mui/material/styles"

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

export default ArrowConnector
