// src/components/SellerDashboard/SellerInfo/OperatingHours.tsx

import React from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { BRAND_COLORS } from "./constants";

// ==================== 인터페이스 ====================
interface OperatingHoursProps {
    hours: {
        start: string;
        end: string;
        breakTime?: string;
        holidayInfo: string;
    };
    onChange: (hours: {
        start: string;
        end: string;
        breakTime?: string;
        holidayInfo: string;
    }) => void;
}

// ==================== 운영시간 입력 컴포넌트 ====================
const OperatingHours: React.FC<OperatingHoursProps> = ({ hours, onChange }) => {
    return (
        <Box>
            <Typography
                variant="body2"
                fontWeight="500"
                color={BRAND_COLORS.TEXT_PRIMARY}
                mb={1}
            >
                운영시간
                <Typography component="span" color="error" ml={0.5}>*</Typography>
            </Typography>
            <Grid container spacing={1.5} sx={{ alignItems: 'flex-end' }}>
                <Grid item xs={3} sm={3}>
                    <TextField
                        fullWidth
                        label="시작시간"
                        placeholder="09:00"
                        value={hours.start}
                        onChange={(e) => onChange({ ...hours, start: e.target.value })}
                        inputProps={{
                            pattern: "[0-9]{2}:[0-9]{2}",
                            placeholder: "HH:MM"
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={3} sm={3}>
                    <TextField
                        fullWidth
                        label="종료시간"
                        placeholder="18:00"
                        value={hours.end}
                        onChange={(e) => onChange({ ...hours, end: e.target.value })}
                        inputProps={{
                            pattern: "[0-9]{2}:[0-9]{2}",
                            placeholder: "HH:MM"
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <TextField
                        fullWidth
                        label="휴무정보"
                        placeholder="예: 주말 및 공휴일 휴무"
                        value={hours.holidayInfo}
                        onChange={(e) => onChange({ ...hours, holidayInfo: e.target.value })}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: BRAND_COLORS.BACKGROUND_INPUT,
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: BRAND_COLORS.PRIMARY }
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default OperatingHours;