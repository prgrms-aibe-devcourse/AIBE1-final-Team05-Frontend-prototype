// src/components/SellerDashboard/Dashboard/components/SalesChart/SalesChartSVG.tsx

import React from "react";

export const SalesChartSVG: React.FC = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 200"
            style={{ position: "absolute", top: 0, left: 0 }}
        >
            <defs>
                <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ef9942", stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: "#ef9942", stopOpacity: 0.05 }} />
                </linearGradient>
            </defs>
            <path
                d="M20 160 Q80 140 120 130 Q160 120 200 110 Q240 100 280 90 Q320 80 380 70"
                stroke="#ef9942"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M20 160 Q80 140 120 130 Q160 120 200 110 Q240 100 280 90 Q320 80 380 70 L380 180 L20 180 Z"
                fill="url(#salesGradient)"
            />
        </svg>
    );
};