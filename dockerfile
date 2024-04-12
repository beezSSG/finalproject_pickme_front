# 베이스 이미지 정의
FROM node:latest AS build

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

# 의존성 설치 및 애플리케이션 빌드
RUN npm install
RUN npm run build

# 제품용 이미지 빌드
FROM nginx:latest

# Nginx 설정 파일 복사
COPY --from=build /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Nginx 실행
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
