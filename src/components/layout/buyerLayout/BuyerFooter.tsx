// src/components/common/BuyerFooter/BuyerFooter.tsx
// 푸터 컴포넌트 - MUI v7 버전으로 업데이트

import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import { Instagram, YouTube } from "@mui/icons-material";

const BuyerFooter: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#f5f5f5",
                py: 5,
                mt: 8,
            }}
        >
            <Box sx={{ width: "1376px", mx: "auto" }}>
                <Grid container spacing={8} sx={{ justifyContent: "center" }}>
                    {/* 브랜드 소개 */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: "#1b150e",
                                fontSize: "1.1rem",
                            }}
                        >
                            CatDogEats
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#666",
                                lineHeight: 1.6,
                                fontSize: "0.9rem",
                            }}
                        >
                            우리 아이들을 위한 건강하고 맛있는 수제 간식을 만듭니다. 엄선된
                            <br />
                            신선한 재료와 정성을 담아 준비합니다.
                        </Typography>
                    </Grid>

                    {/* 고객센터 */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: "#1b150e",
                                fontSize: "1.1rem",
                            }}
                        >
                            고객센터
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                            <Link
                                href="#"
                                sx={{
                                    color: "#666",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    "&:hover": {
                                        color: "#e89830",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                자주 묻는 질문
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: "#666",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    "&:hover": {
                                        color: "#e89830",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                배송 및 환불 정책
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: "#666",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    "&:hover": {
                                        color: "#e89830",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                이용약관
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: "#666",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    "&:hover": {
                                        color: "#e89830",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                개인정보처리방침
                            </Link>
                        </Box>
                    </Grid>

                    {/* 문의하기 */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: "#1b150e",
                                fontSize: "1.1rem",
                            }}
                        >
                            문의하기
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#666",
                                    fontSize: "0.9rem",
                                }}
                            >
                                이메일: help@catdogeats.com
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#666",
                                    fontSize: "0.9rem",
                                }}
                            >
                                전화: 02-1234-5678
                            </Typography>

                            {/* 소셜 미디어 아이콘 */}
                            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                <Link
                                    href="#"
                                    sx={{
                                        color: "#666",
                                        "&:hover": { color: "#e89830" },
                                    }}
                                >
                                    <Instagram fontSize="small" />
                                </Link>
                                <Link
                                    href="#"
                                    sx={{
                                        color: "#666",
                                        "&:hover": { color: "#e89830" },
                                    }}
                                >
                                    <Instagram fontSize="small" />
                                </Link>
                                <Link
                                    href="#"
                                    sx={{
                                        color: "#666",
                                        "&:hover": { color: "#e89830" },
                                    }}
                                >
                                    <YouTube fontSize="small" />
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* 저작권 정보 */}
                <Box
                    sx={{
                        borderTop: "1px solid #e0e0e0",
                        mt: 4,
                        pt: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#999",
                            fontSize: "0.8rem",
                        }}
                    >
                        © 2025 CatDogEats. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default BuyerFooter;