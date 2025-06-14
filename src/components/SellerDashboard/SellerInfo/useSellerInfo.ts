// src/components/SellerDashboard/SellerInfo/useSellerInfo.ts

import { useState, useCallback } from "react";

export interface SellerInfoData {
    workshopName: string;
    representativeName: string;
    businessNumber: string;
    postalCode: string;
    roadAddress: string;
    detailAddress: string;
    tags: string[];
    operatingHours: {
        start: string;
        end: string;
        breakTime?: string;
        holidayInfo: string;
    };
    profileImage: string | null;
    completionRate: number;
    rating: number;
    avatarEmoji: string;
}

const initialData: SellerInfoData = {
    workshopName: "",
    representativeName: "",
    businessNumber: "",
    postalCode: "",
    roadAddress: "",
    detailAddress: "",
    tags: [],
    operatingHours: {
        start: "09:00",
        end: "18:00",
        holidayInfo: "주말 및 공휴일 휴무",
    },
    profileImage: null,
    completionRate: 75,
    rating: 4.5,
    avatarEmoji: "🐾",
};

export const useSellerInfo = () => {
    const [data, setData] = useState<SellerInfoData>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSection, setActiveSection] = useState("basic-info");

    const updateField = useCallback((field: keyof SellerInfoData, value: any) => {
        setData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    // 완성도 계산 함수
    const calculateCompletionRate = useCallback((data: SellerInfoData) => {
        const fields = [
            data.workshopName,
            data.representativeName,
            data.businessNumber,
            data.roadAddress,
            data.detailAddress,
            data.operatingHours.start,
            data.operatingHours.end,
            data.operatingHours.holidayInfo,
        ];

        const imageBonus = data.profileImage ? 1 : 0;
        const tagBonus = data.tags.length > 0 ? 1 : 0;

        const filledFields = fields.filter(field => field && field.trim() !== "").length;
        const totalFields = fields.length + 2; // 이미지와 태그 포함

        return Math.round(((filledFields + imageBonus + tagBonus) / totalFields) * 100);
    }, []);

    const handleSave = useCallback(async () => {
        setIsLoading(true);
        try {
            // 완성도 업데이트
            const newCompletionRate = calculateCompletionRate(data);
            setData(prev => ({ ...prev, completionRate: newCompletionRate }));

            console.log("저장하기:", data);
            // TODO: API 호출
            // await saveSellerInfo(data);
        } catch (error) {
            console.error("저장 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, [data, calculateCompletionRate]);

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
            // const result = await verifyBusinessNumber(data.businessNumber);
            // if (result.success) {
            //     alert("인증이 완료되었습니다.");
            // }
        } catch (error) {
            console.error("인증 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, [data.businessNumber]);

    const handleCustomerViewClick = useCallback(() => {
        console.log("고객 화면으로 이동");
        // TODO: 고객 화면으로 이동 로직
        // 예시: navigate('/seller/1');
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