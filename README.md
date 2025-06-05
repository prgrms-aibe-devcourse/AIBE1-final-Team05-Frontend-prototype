# CatDogEats!- 반려동물 수제 간식 쇼핑몰

## 🛠️ 기술 스택

### **Core**
- **React**: 18.3.1
- **TypeScript**: 5.6.2
- **Vite**: 5.4.10

### **UI & Styling**
- **Material-UI**: 5.16.7
- **Emotion React**: 11.13.3
- **Emotion Styled**: 11.13.0

### **Routing & State**
- **React Router DOM**: 6.26.2
- **Zustand**: 4.5.5

### **Fonts**
- **Plus Jakarta Sans**: 5.1.0
- **Noto Sans KR**: 5.1.0
- **Roboto**: 5.1.0

### **HTTP & Utils**
- **Axios**: 1.7.7

### **Development**
- **ESLint**: 9.15.0
- **Prettier**: 3.3.3
- **TypeScript ESLint**: 8.15.0

## 📁 폴더 구조

```
pet's-delight/
├── public/
│   └── index.html
│
├── src/
│   ├── components/                   # 공통 컴포넌트
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Layout.tsx
│   │
│   ├── domains/                      # 도메인별 구조 (DDD)
│   │   ├── auth/                     # 인증 도메인
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RoleSelector.tsx
│   │   │   │   ├── SocialLoginButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   ├── auth.constants.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── product/                  # 상품 도메인
│   │   │   ├── components/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── product.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── workshop/                 # 공방 도메인
│   │   │   ├── components/
│   │   │   │   ├── WorkshopCard.tsx
│   │   │   │   ├── WorkshopGrid.tsx
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── workshop.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── category/                 # 카테고리 도메인
│   │       ├── components/
│   │       │   ├── CategoryTabs.tsx
│   │       │   └── index.ts
│   │       ├── types/
│   │       │   ├── category.types.ts
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   ├── pages/                        # 페이지 컴포넌트
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RoleSelectionPage.tsx
│   │   │   └── index.ts
│   │   └── mainpage/
│   │       ├── HomePage.tsx
│   │       ├── CategoriesPage.tsx
│   │       ├── WorkshopsPage.tsx
│   │       ├── SupportPage.tsx
│   │       └── NotFoundPage.tsx
│   │
│   ├── routes/                       # 라우팅 설정
│   │   └── Router.tsx
│   │
│   ├── data/                         # 더미 데이터
│   │   ├── products.data.ts
│   │   ├── workshops.data.ts
│   │   ├── categories.data.ts
│   │   └── index.ts
│   │
│   ├── theme/                        # MUI 테마
│   │   └── index.ts
│   │
│   ├── styles/                       # 전역 스타일
│   │   └── globals.css
│   │
│   ├── constants/                    # 전역 상수
│   │   └── index.ts
│   │
│   ├── hooks/                        # 커스텀 훅 (향후 확장)
│   ├── utils/                        # 유틸리티 함수 (향후 확장)
│   ├── services/                     # API 서비스 (향후 확장)
│   │
│   ├── App.tsx                       # 메인 앱 컴포넌트
│   ├── main.tsx                      # 앱 진입점
│   └── vite-env.d.ts                # Vite 타입 정의
│
├── package.json                      # 의존성 관리
├── tsconfig.json                     # TypeScript 설정
├── tsconfig.node.json               # Node.js TypeScript 설정
├── vite.config.ts                   # Vite 설정
├── eslint.config.js                 # ESLint 설정
└── README.md
```

## 🚀 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린팅
npm run lint

# 타입 체크
npm run type-check
```

## 📱 주요 라우트

| 경로 | 페이지 | 상태 |
|------|--------|------|
| `/` | HomePage | ✅ |
| `/login` | LoginPage | ✅ |
| `/role-selection` | RoleSelectionPage | ✅ |
| `/categories` | CategoriesPage | 🚧 |
| `/workshops` | WorkshopsPage | 🚧 |
| `/support` | SupportPage | 🚧 |
