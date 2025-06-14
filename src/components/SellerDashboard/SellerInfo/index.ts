// src/components/SellerDashboard/SellerInfo/index.ts

// 컴포넌트 export
export { BRAND_COLORS, PrimaryButton, SecondaryButton } from "./constants";
export { ProgressCircle, FormField, PageHeader } from "./BasicComponents";
export { ProfilePreviewCard, CompletionCard } from "./CardComponents";
export { BasicInfoForm, FormActions } from "./FormComponents";
export type { BasicInfoFormData } from "./FormComponents";
export { useSellerInfo } from "./useSellerInfo";
export type { SellerInfoData } from "./useSellerInfo";

// 🎯 메인 페이지 - 올바른 경로로 수정!
export { default } from "../../../pages/SellerDashboardPage/SellerInfoPage";