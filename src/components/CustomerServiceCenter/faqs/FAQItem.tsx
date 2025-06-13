"use client"

import type React from "react"
import { useState } from "react"
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface FAQItemProps {
    faq: {
        id: number
        question: string
        answer: string
    }
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
    const [expanded, setExpanded] = useState(false)

    const handleChange = () => {
        setExpanded(!expanded)
    }

    return (
        <Accordion
            expanded={expanded}
            onChange={handleChange}
            sx={{
                bgcolor: "white",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                border: "1px solid #e8dbce",
                borderRadius: "8px !important",
                "&:before": {
                    display: "none",
                },
                mb: 1,
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon
                        sx={{ transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                }
                sx={{
                    padding: 2,
                    "& .MuiAccordionSummary-content": {
                        margin: 0,
                    },
                }}
            >
                <Typography fontWeight="medium" sx={{ color: "#1c140d" }}>
                    Q. {faq.question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 2, pt: 0, mt: 1.5 }}>
                <Typography variant="body2" sx={{ color: "#9c7349" }}>
                    A. {faq.answer}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default FAQItem
