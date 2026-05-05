# Hacker News Bulletin Board

React + TypeScript로 구축된 Hacker News API 기반 뉴스 게시판 애플리케이션

## 🚀 기술 스택

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: TanStack React Query
- **HTTP Client**: Fetch API

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── NewsCard.tsx    # 뉴스 카드 컴포넌트
│   ├── LoadingSkeleton.tsx # 로딩 스켈레톤 UI
│   ├── ErrorState.tsx  # 에러 상태 컴포넌트
│   ├── EmptyState.tsx  # 빈 상태 컴포넌트
│   └── Tabs.tsx        # 탭 네비게이션
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.tsx    # 메인 페이지
│   └── DetailPage.tsx  # 상세 페이지
├── hooks/              # 커스텀 훅
│   ├── useInfiniteStories.tsx # 무한 스크롤 훅
│   └── useStory.tsx    # 단일 스토리 훅
├── api/                # API 관련
│   └── hackerNews.ts   # Hacker News API 클라이언트
├── types/              # TypeScript 타입 정의
│   └── news.ts
└── App.tsx             # 메인 앱 컴포넌트
```

## ✨ 주요 기능

### 🏠 메인 페이지

- **탭 기반 네비게이션**: Top, New, Best 스토리 분류
- **무한 스크롤**: 20개씩 자동 로딩
- **반응형 카드 레이아웃**: 이미지, 제목, 메타데이터 포함
- **시간 표시**: "2 hours ago" 형태
- **프리패치**: 마우스 호버 시 상세 페이지 데이터 미리 로딩

### 📖 상세 페이지

- **히어로 이미지**: 큰 커버 이미지
- **상세 메타데이터**: 작성자, 점수, 시간, 댓글 수
- **외부 링크**: 원본 기사로 이동
- **뒤로 가기**: 부드러운 네비게이션

### 🎨 UX/UI 개선사항

- **로딩 스켈레톤**: 데이터 로딩 중 레이아웃 미리보기
- **프리패치**: 마우스 호버 시 상세 페이지 데이터 미리 로딩
- **무한 스크롤**: 20개씩 자동 로딩
- **빈 상태 처리**: 데이터 없을 때 안내
- **에러 상태 처리**: 특정 api 데이터 재요청 버튼
- **모바일 최적화**: 반응형 지원

## 🔧 기술 선택 이유

### React Query 사용 이유

1. **서버 상태 관리**: API 데이터의 캐싱, 동기화, 업데이트를 자동으로 처리
2. **개발자 경험**: 로딩, 에러, 성공 상태를 간단하게 관리
3. **성능 최적화**: 중복 요청 제거, 백그라운드 업데이트
4. **무한 스크롤**: `useInfiniteQuery`로 페이지네이션 간소화

### 캐싱 전략

```typescript
// 10분간 데이터를 신선하게 유지
staleTime: 10 * 60 * 1000;

// 5분간 캐시 유지 후 가비지 컬렉션
cacheTime: 5 * 60 * 1000;

// 백그라운드에서 자동 리패치
refetchOnWindowFocus: true;
```

## ⚡ 성능 최적화

### 불필요한 요청 방지

- **Prefetch**: 마우스 호버 시 상세 페이지 데이터 미리 로딩
- **Deduplication**: 동일한 요청 자동 중복 제거
- **Stale While Revalidate**: 캐시된 데이터 먼저 표시 후 백그라운드 업데이트

### 이미지 최적화

- **Lazy Loading**: 스크롤 시 이미지 지연 로딩
- **Fallback 시스템**: 3단계 이미지 서비스 폴백
- **일관성**: 스토리 ID 기반 시드로 동일한 이미지 보장

### staleTime 설정

```typescript
// 스토리 목록: 5분간 신선
staleTime: 5 * 60 * 1000;

// 개별 스토리: 10분간 신선 (변경 가능성 낮음)
staleTime: 10 * 60 * 1000;
```

## 🛠 개선 가능 사항

### 단기 개선사항

- **가상화 스크롤**: `react-window`로 대용량 리스트 성능 최적화
- **검색 기능**: 제목, 작성자 기반 클라이언트 사이드 검색
- **정렬 옵션**: 점수, 시간, 댓글 수 기준 정렬
- **다크 모드**: 사용자 선호도에 따른 테마 전환

### 중장기 개선사항

- **SSR/SSG**: Next.js 도입으로 SEO 및 초기 로딩 성능 개선
- **PWA**: 서비스 워커로 오프라인 지원
- **실시간 업데이트**: WebSocket으로 실시간 점수/댓글 업데이트
- **사용자 개인화**: 북마크, 읽은 기사 표시, 맞춤 추천

### 기술적 개선사항

- **번들 최적화**: 코드 스플리팅, Tree shaking
- **CDN**: 이미지 및 정적 자원 CDN 배포
- **모니터링**: Sentry, Google Analytics 도입
- **테스팅**: Jest, Testing Library로 테스트 커버리지 확대

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 📝 API 문서

### Hacker News API 엔드포인트

- **Top Stories**: `https://hacker-news.firebaseio.com/v0/topstories.json`
- **New Stories**: `https://hacker-news.firebaseio.com/v0/newstories.json`
- **Best Stories**: `https://hacker-news.firebaseio.com/v0/beststories.json`
- **Story Detail**: `https://hacker-news.firebaseio.com/v0/item/{id}.json`

### 데이터 구조

```typescript
interface Story {
  id: number;
  title: string;
  by: string;
  time: number;
  url?: string;
  score?: number;
  descendants?: number;
  text?: string;
}
```
