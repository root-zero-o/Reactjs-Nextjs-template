# Dependencies 설치 환경
# NodeJS 16 (Alpine Linux project 기반)을 base 이미지로 한다.
FROM node:16-alpine AS deps
# One common issue that may arise is a missing shared library required for use of process.dlopen
# To add the missing shared libraries to your image, adding the libc6-compat package in your Dockerfile is recommended
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
# /app으로 작업 디렉토리 전환
WORKDIR /app

# 사용하는 패키지 매니저에 맞게 Dependencies 설치
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
# NodeJS 16 (Alpine Linux project 기반)을 base 이미지로 한다.
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# 앱 빌드
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

# disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# 이 docker image는 80번 포트를 외부에 공개할 것이다
EXPOSE 3000

ENV PORT 3000

# 도커 컨테이너가 실행되었을 때 실행되는 명령어 정의
CMD ["node", "server.js"]