# Stage 1: Build the React application
FROM node:18 AS builder

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /app

# pnpm 설치를 위한 package.json 및 pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./

# pnpm 설치
RUN npm install -g pnpm typescript

# 의존성 설치
RUN pnpm install && ls -la node_modules/.bin

# 나머지 앱 소스 코드 복사
COPY . .

# 앱 빌드
RUN pnpm run build

# Stage 2: Nginx를 사용하여 React 앱 제공 설정
FROM nginx:stable-alpine

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌더 단계에서 빌드된 자산 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 웹 서버를 위한 포트 80 개방
EXPOSE 3000

# Nginx 시작 및 포어그라운드에서 실행 유지
CMD ["nginx", "-g", "daemon off;"]