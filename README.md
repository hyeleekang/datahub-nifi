# NiFi Frontend

NiFi 운영을 위한 통합 관리 웹 애플리케이션입니다.

## 🚀 주요 기능

- NiFi 프로세스 그룹 모니터링
- 프로세서 상태 관리 (시작/중지)
- 실시간 데이터 흐름 시각화

## 🛠 기술 스택

### 핵심 기술
- [Vite](https://vitejs.dev) - 빠른 프론트엔드 빌드 도구
- [React](https://reactjs.org) - 사용자 인터페이스 구축을 위한 JavaScript 라이브러리
- [TypeScript](https://www.typescriptlang.org) - JavaScript의 타입 지원 확장
- [TailwindCSS](https://tailwindcss.com) - 유틸리티 우선 CSS 프레임워크

### 상태 관리 및 데이터 페칭
- [Zustand](https://zustand.docs.pmnd.rs/) - 상태 관리
- [@tanstack/react-query](https://tanstack.com/query/latest) - 데이터 페칭 및 캐싱
- [Axios](https://axios-http.com) - HTTP 클라이언트

### 라우팅 및 UI
- [React Router v7](https://reactrouter.com) - 클라이언트 사이드 라우팅
- [React Toastify](https://fkhadra.github.io/react-toastify/) - 알림 컴포넌트
- [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton) - 로딩 상태 UI

### 개발 도구
- [ESLint](https://eslint.org) - 코드 품질 관리
- [Prettier](https://prettier.io) - 코드 포맷팅
- [PNPM](https://pnpm.io) - 패키지 매니저

## 📦 설치 및 실행

### 사전 요구사항
- Node.js 18.0.0 이상
- PNPM 8.0.0 이상

### 설치
```bash
# PNPM 전역 설치
npm install -g pnpm

# 프로젝트 의존성 설치
pnpm install
```

### 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정해주세요:

```env
# API 설정
VITE_API_BASE_URL=http://localhost:8080
VITE_NIFI_API_BASE_URL=/v1/nifi
```

### 개발 서버 실행
```bash
pnpm dev
```
기본적으로 http://localhost:3000 에서 실행됩니다.

### 프로덕션 빌드
```bash
pnpm build
```
빌드된 파일은 `dist` 디렉토리에 생성됩니다.

## 🔧 개발 가이드

### 코드 스타일
- ESLint와 Prettier를 사용하여 코드 스타일을 일관되게 유지합니다.
- 커밋 전 `pnpm lint`를 실행하여 코드 품질을 확인해주세요.

### API 호출
- `@shared/api` 디렉토리의 공통 훅을 사용하여 API를 호출합니다.
- React Query를 사용하여 데이터 캐싱과 상태 관리를 합니다.

### 상태 관리
- 전역 상태는 Zustand를 사용하여 관리합니다.
- 컴포넌트 내부 상태는 React의 useState를 사용합니다.

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
