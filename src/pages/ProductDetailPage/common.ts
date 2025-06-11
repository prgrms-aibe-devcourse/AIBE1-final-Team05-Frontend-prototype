// src/types/common.ts

/** 브레드크럼 아이템 */
export interface BreadcrumbItem {
  label: string;
  href?: string; // 마지막 아이템은 링크 없음
}
