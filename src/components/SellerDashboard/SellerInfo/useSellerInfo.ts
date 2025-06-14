// src/components/SellerDashboard/SellerInfo/useSellerInfo.ts

import { useState, useCallback } from "react";

export interface SellerInfoData {
    workshopName: string;
    representativeName: string;
    businessNumber: string;
    businessAddress: string;
    completionRate: number;
    rating: number;
    avatarEmoji: string;
}

const initialData: SellerInfoData = {
    workshopName: "",
    representativeName: "",
    businessNumber: "",
    businessAddress: "",
    completionRate: 75,
    rating: 4.5,
    avatarEmoji: "🐾",
};

export const useSellerInfo = () => {
    const [data, setData] = useState<SellerInfoData>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSection, setActiveSection] = useState("basic-info");

    const updateField = useCallback((field: keyof SellerInfoData, value: string | number) => {
        setData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleSave = useCallback(async () => {
        setIsLoading(true);
        try {
            // TODO: API 호출
            console.log("저장하기:", data);
            // await saveSellerInfo(data);
        } catch (error) {
            console.error("저장 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, [data]);

    const handleCancel = useCallback(() => {
        setData(initialData);
    }, []);

    const handleBusinessNumberVerify = useCallback(async () => {
        if (!data.businessNumber) {
            console.warn("사업자 등록번호를 입력해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            console.log("사업자 등록번호 인증:", data.businessNumber);
            // TODO: 실제 API 호출
        } catch (error) {
            console.error("인증 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, [data.businessNumber]);

    const handleCustomerViewClick = useCallback(() => {
        console.log("고객 화면으로 이동");
        // TODO: 고객 화면으로 이동 로직
    }, []);

    return {
        data,
        isLoading,
        activeSection,
        setActiveSection,
        updateField,
        handleSave,
        handleCancel,
        handleBusinessNumberVerify,
        handleCustomerViewClick,
    };
};