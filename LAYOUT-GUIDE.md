# 빅밸류 홈페이지 레이아웃 템플릿 가이드

> 초보자도 15분 안에 새 페이지를 만들 수 있는 완벽 가이드

## 📋 목차

1. [페이지 유형 개요](#페이지-유형-개요)
2. [CSS 파일 구조](#css-파일-구조)
3. [페이지 유형별 템플릿](#페이지-유형별-템플릿)
4. [재사용 가능한 컴포넌트](#재사용-가능한-컴포넌트)
5. [CSS Variables 활용](#css-variables-활용)
6. [새 페이지 만들기](#새-페이지-만들기)

---

## 페이지 유형 개요

빅밸류 홈페이지는 **9가지 페이지 유형**으로 구성되어 있습니다.

| 유형 | 페이지 예시 | CSS 파일 |
|------|------------|----------|
| **A. Landing** | `index.html` | `landing.css` |
| **B. Category** | `products/index.html` | `category.css` |
| **C. Product** | `products/data-product/` | `product.css` |
| **D. List** | `company/newsroom/` | `list.css` |
| **E. Detail** | `*/detail.html` | `detail.css` |
| **F. Feed** | `use-case/customer-studies/` | `feed.css` |
| **G. About** | `company/about-us/` | `about.css` |
| **H. Pricing** | `pricing/` | `pricing.css` |
| **I. Legal** | `privacy-policy/` | `legal.css` |

---

## CSS 파일 구조

### 파일 로드 순서

```html
<head>
    <!-- 1. 공통 스타일 (필수, 모든 페이지) -->
    <link rel="stylesheet" href="/css/common.css">

    <!-- 2. 페이지 유형별 스타일 (해당하는 것만) -->
    <link rel="stylesheet" href="/css/[page-type].css">

    <!-- 3. 페이지별 커스텀 스타일 (선택사항) -->
    <link rel="stylesheet" href="./custom.css">
</head>
```

### CSS 파일 역할

#### `common.css` (모든 페이지 필수)
- CSS Variables (색상, 폰트, 간격 등)
- CSS Reset & Base
- Header (GNB)
- Footer
- Button System
- Layout Components (컨테이너, 섹션, 히어로, 그리드 등)
- Inquiry Modal

#### 페이지 유형별 CSS
- `landing.css`: 홈 페이지 전용 (히어로 애니메이션, 인사이트 하이라이트 등)
- `product.css`: 제품 상세 페이지 (제품 카드, 필터, 비교표 등)
- `list.css`: 리스트 페이지 (뉴스룸, 공지사항 카드 그리드 등)
- 기타...

---

## 페이지 유형별 템플릿

### Type A: Landing (홈 페이지)

**사용 CSS:** `common.css` + `landing.css`

**HTML 구조:**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BigValue - 데이터의 가치를 비즈니스로</title>
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/landing.css">
</head>
<body>
    <!-- GNB (공통) -->
    <div id="gnb-placeholder"></div>

    <!-- Main Content -->
    <main class="main landing-layout">
        <section class="hero-new">
            <!-- 인터랙티브 히어로 -->
        </section>

        <section class="insight-highlights">
            <!-- 하이라이트 콘텐츠 -->
        </section>

        <section class="final-cta">
            <!-- 최종 CTA -->
        </section>
    </main>

    <!-- Footer (공통) -->
    <div id="footer-placeholder"></div>

    <script src="/script.js"></script>
</body>
</html>
```

**예시 페이지:** `index.html`

---

### Type B: Category Overview

**사용 CSS:** `common.css` + `category.css`

**HTML 구조:**
```html
<main class="main category-layout">
    <section class="section section--hero-simple">
        <div class="hero hero--gradient">
            <div class="container">
                <h1 class="hero__title">Products</h1>
                <p class="hero__subtitle">빅밸류의 데이터 상품과 솔루션</p>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="card-grid card-grid--3col">
                <!-- 하위 항목 카드들 -->
                <a href="/products/data-product/" class="card">
                    <h3 class="card__title">Data Product</h3>
                    <p class="card__description">설명...</p>
                </a>
            </div>
        </div>
    </section>
</main>
```

**예시 페이지:** `products/index.html`

---

### Type C: Product Detail

**사용 CSS:** `common.css` + `product.css`

**HTML 구조:**
```html
<main class="main product-layout">
    <section class="section section--hero-product">
        <div class="hero hero--split">
            <div class="hero__content">
                <h1 class="hero__title">Data Product</h1>
                <p class="hero__subtitle">데이터 공급망 전체를 관리하는 제품</p>
                <div class="hero__buttons">
                    <a href="#" class="btn btn--cta btn--large">시작하기</a>
                    <a href="#" class="btn btn--outline btn--large">문의하기</a>
                </div>
            </div>
            <div class="hero__visual">
                <img src="..." alt="...">
            </div>
        </div>
    </section>

    <section class="section">
        <!-- 기능 설명 -->
    </section>

    <section class="section section--bg-neutral">
        <!-- 비교표 또는 Before/After -->
    </section>

    <section class="section section--cta">
        <!-- 최종 CTA -->
    </section>
</main>
```

**예시 페이지:** `products/data-product/index.html`

---

### Type D: List Page

**사용 CSS:** `common.css` + `list.css`

**HTML 구조:**
```html
<main class="main list-layout">
    <section class="section">
        <div class="container">
            <div class="page-header">
                <h1 class="page-header__title">Newsroom</h1>
                <p class="page-header__description">빅밸류의 최신 소식을 확인하세요</p>
            </div>

            <div id="newsroom-list" class="card-grid card-grid--3col">
                <!-- JavaScript로 동적 로드 -->
            </div>
        </div>
    </section>
</main>
```

**예시 페이지:** `company/newsroom/index.html`, `company/notice/index.html`

---

### Type E: Detail Page

**사용 CSS:** `common.css` + `detail.css`

**HTML 구조:**
```html
<main class="main detail-layout">
    <article class="article">
        <header class="article__header">
            <h1 class="article__title">기사 제목</h1>
            <div class="article__meta">
                <span class="article__date">2025-01-08</span>
                <span class="article__category">보도자료</span>
            </div>
        </header>

        <div class="article__body">
            <p>본문 내용...</p>
            <h2>소제목</h2>
            <p>더 많은 내용...</p>
        </div>

        <footer class="article__footer">
            <!-- 관련 항목, 공유 버튼 등 -->
        </footer>
    </article>
</main>
```

**예시 페이지:** `company/newsroom/detail.html`, `*/detail.html`

---

### Type F: Content Feed

**사용 CSS:** `common.css` + `feed.css`

**HTML 구조:**
```html
<main class="main feed-layout">
    <section class="section">
        <div class="container">
            <div class="page-header">
                <h1 class="page-header__title">Customer Studies</h1>
            </div>

            <!-- 필터/검색 (선택사항) -->
            <div class="filter-section">
                <!-- 필터 버튼들 -->
            </div>

            <div id="studies-grid" class="card-grid card-grid--3col">
                <!-- 카드 그리드 -->
            </div>
        </div>
    </section>
</main>
```

**예시 페이지:** `use-case/customer-studies/index.html`, `use-case/insight-feed/index.html`

---

### Type G: About

**사용 CSS:** `common.css` + `about.css`

**HTML 구조:**
```html
<main class="main about-layout">
    <section class="section about-hero">
        <!-- 회사 소개 히어로 -->
    </section>

    <section class="section">
        <!-- 비전 & 미션 -->
    </section>

    <section class="section section--bg-neutral">
        <!-- 히스토리 -->
    </section>

    <section class="section">
        <!-- 팀 소개 -->
    </section>
</main>
```

**예시 페이지:** `company/about-us/index.html`

---

### Type H: Pricing

**사용 CSS:** `common.css` + `pricing.css`

**HTML 구조:**
```html
<main class="main pricing-layout">
    <section class="section">
        <div class="container">
            <div class="page-header">
                <h1 class="page-header__title">Pricing</h1>
                <p class="page-header__description">최적의 플랜을 선택하세요</p>
            </div>

            <div class="pricing-cards">
                <!-- 가격 카드 그리드 -->
            </div>
        </div>
    </section>
</main>
```

**예시 페이지:** `pricing/index.html`

---

### Type I: Legal

**사용 CSS:** `common.css` + `legal.css`

**HTML 구조:**
```html
<main class="main legal-layout">
    <article class="article">
        <header class="article__header">
            <h1 class="article__title">개인정보처리방침</h1>
            <div class="article__meta">
                <span class="article__date">시행일: 2025-01-01</span>
            </div>
        </header>

        <div class="article__body">
            <h2>제1조 (목적)</h2>
            <p>본문...</p>

            <h2>제2조 (정의)</h2>
            <p>본문...</p>
        </div>
    </article>
</main>
```

**예시 페이지:** `privacy-policy/index.html`, `terms-of-service/index.html`

---

## 재사용 가능한 컴포넌트

`common.css`에 정의된 레이아웃 컴포넌트를 활용하세요.

### Container System

```html
<!-- 기본 컨테이너 (max-width: 1920px) -->
<div class="container">
    콘텐츠
</div>

<!-- 좁은 컨테이너 (max-width: 1400px) -->
<div class="container container--narrow">
    콘텐츠
</div>

<!-- 넓은 컨테이너 (max-width: 100%) -->
<div class="container container--wide">
    콘텐츠
</div>
```

### Section System

```html
<!-- 기본 섹션 (padding: 80px 0) -->
<section class="section">
    콘텐츠
</section>

<!-- 작은 섹션 (padding: 40px 0) -->
<section class="section section--small">
    콘텐츠
</section>

<!-- 큰 섹션 (padding: 120px 0) -->
<section class="section section--large">
    콘텐츠
</section>

<!-- 배경색 변형 -->
<section class="section section--bg-neutral">
    연한 회색 배경
</section>

<section class="section section--bg-primary">
    연한 보라색 배경
</section>
```

### Hero System

```html
<!-- 그래디언트 히어로 -->
<div class="hero hero--gradient">
    <h1 class="hero__title">제목</h1>
    <p class="hero__subtitle">부제목</p>
    <div class="hero__buttons">
        <a href="#" class="btn btn--cta">버튼 1</a>
        <a href="#" class="btn btn--outline">버튼 2</a>
    </div>
</div>

<!-- 양분할 히어로 (좌: 텍스트, 우: 이미지) -->
<div class="hero hero--split">
    <div class="hero__content">
        <h1 class="hero__title">제목</h1>
        <p class="hero__subtitle">부제목</p>
        <div class="hero__buttons">
            <a href="#" class="btn btn--cta">버튼</a>
        </div>
    </div>
    <div class="hero__visual">
        <img src="..." alt="...">
    </div>
</div>

<!-- 전체 높이 히어로 -->
<div class="hero hero--full-height">
    콘텐츠
</div>
```

### Grid System

```html
<!-- 2열 그리드 -->
<div class="card-grid card-grid--2col">
    <div class="card">카드 1</div>
    <div class="card">카드 2</div>
</div>

<!-- 3열 그리드 (가장 많이 사용) -->
<div class="card-grid card-grid--3col">
    <div class="card">카드 1</div>
    <div class="card">카드 2</div>
    <div class="card">카드 3</div>
</div>

<!-- 4열 그리드 -->
<div class="card-grid card-grid--4col">
    <div class="card">카드 1</div>
    <div class="card">카드 2</div>
    <div class="card">카드 3</div>
    <div class="card">카드 4</div>
</div>
```

### Button System

```html
<!-- CTA 버튼 (기본) -->
<a href="#" class="btn btn--cta btn--large">시작하기</a>
<button class="btn btn--cta btn--medium">중간 크기</button>
<button class="btn btn--cta btn--small">작은 크기</button>

<!-- 아웃라인 버튼 -->
<a href="#" class="btn btn--outline btn--large">문의하기</a>

<!-- 텍스트 버튼 -->
<button class="btn btn--text btn--small">자세히 보기</button>
```

### Page Header

```html
<div class="page-header">
    <h1 class="page-header__title">페이지 제목</h1>
    <p class="page-header__description">페이지 설명</p>
</div>
```

---

## CSS Variables 활용

색상, 폰트, 간격 등을 쉽게 변경할 수 있습니다.

### 주요 Variables

```css
/* 색상 */
var(--color-brand-primary)          /* #4434e2 */
var(--color-brand-primary-hover)    /* #3526C7 */
var(--color-neutral-black)          /* #0c0b17 */
var(--color-neutral-white)          /* #ffffff */

/* 폰트 크기 */
var(--font-size-xs)   /* 12px */
var(--font-size-s)    /* 14px */
var(--font-size-m)    /* 16px */
var(--font-size-l)    /* 20px */
var(--font-size-xl)   /* 24px */
var(--font-size-2xl)  /* 32px */
var(--font-size-3xl)  /* 40px */
var(--font-size-4xl)  /* 48px */

/* 간격 */
var(--spacing-xs)   /* 4px */
var(--spacing-s)    /* 8px */
var(--spacing-m)    /* 12px */
var(--spacing-l)    /* 16px */
var(--spacing-xl)   /* 20px */
var(--spacing-2xl)  /* 24px */
var(--spacing-3xl)  /* 30px */

/* Border Radius */
var(--radius-s)    /* 6px */
var(--radius-m)    /* 8px */
var(--radius-l)    /* 12px */
var(--radius-full) /* 50% */

/* 섹션 패딩 */
var(--section-padding-y)        /* 80px */
var(--section-padding-y-small)  /* 40px */
var(--section-padding-y-large)  /* 120px */
```

### 사용 예시

```css
.my-custom-section {
    padding: var(--section-padding-y) 0;
    background-color: var(--color-neutral-lightest);
}

.my-custom-title {
    font-size: var(--font-size-3xl);
    color: var(--color-brand-primary);
    margin-bottom: var(--spacing-2xl);
}
```

---

## 새 페이지 만들기

### Step 1: 페이지 유형 결정

새로 만들 페이지가 9가지 유형 중 어디에 해당하는지 결정합니다.

**예시:** "제품 소개 페이지" → **Type C: Product**

### Step 2: HTML 파일 생성

적절한 디렉토리에 `index.html` 파일을 생성합니다.

```
/products/new-product/index.html
```

### Step 3: 템플릿 복사

이 가이드에서 해당 페이지 유형의 HTML 구조를 복사합니다.

### Step 4: CSS 파일 로드

```html
<head>
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/product.css">
</head>
```

### Step 5: 콘텐츠 작성

- GNB와 Footer는 `script.js`가 자동으로 생성하므로 신경 쓰지 않아도 됩니다.
- `main` 태그 안에 페이지 콘텐츠를 작성합니다.
- 재사용 가능한 컴포넌트를 최대한 활용합니다.

### Step 6: 테스트

1. **PC 브라우저**에서 페이지 열기
2. **모바일 반응형** 확인 (Chrome 개발자 도구 → 반응형 모드)
3. **GNB, Footer, 버튼** 등 모든 요소가 제대로 작동하는지 확인

### Step 7: 배포

Netlify Drop에 전체 폴더를 드래그 앤 드롭하여 즉시 배포!

---

## 주의사항

### ✅ 해야 할 것

- **BEM 네이밍 규칙** 준수 (`.block__element--modifier`)
- **CSS Variables** 적극 활용
- **재사용 가능한 컴포넌트** 우선 사용
- **방어적 코딩** (JavaScript에서 요소 존재 여부 확인)
- **반응형 디자인** 고려 (모바일 테스트 필수)

### ❌ 하지 말아야 할 것

- `!important` 사용 금지
- 인라인 스타일 최소화
- 하드코딩된 색상/간격 사용 (CSS Variables 사용)
- 복잡한 빌드 도구 사용
- 너무 복잡한 JavaScript 작성

---

## 문제 해결

### 페이지가 깨져 보여요

1. **브라우저 콘솔 확인** (F12 → Console 탭)
2. **CSS 파일 경로 확인** (`/css/common.css`가 로드되는지)
3. **JavaScript 오류 확인** (`script.js`가 로드되는지)

### GNB나 Footer가 안 보여요

1. **Placeholder 확인** (`<div id="gnb-placeholder"></div>` 있는지)
2. **script.js 로드 확인** (`<script src="/script.js"></script>`)
3. **브라우저 콘솔에서 에러 확인**

### 모바일에서 레이아웃이 깨져요

1. **viewport meta 태그 확인**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. **반응형 컴포넌트 사용** (`.card-grid`는 자동으로 반응형)
3. **Chrome 개발자 도구**로 다양한 화면 크기 테스트

---

## 추가 리소스

- **CLAUDE.md**: 프로젝트 전체 규칙 및 제약 조건
- **styles.css.backup**: 기존 CSS 파일 (참고용)
- **예시 페이지**: 각 유형별 실제 페이지 참고

---

## 도움이 필요하신가요?

1. 이 가이드의 템플릿을 그대로 복사해서 사용하세요
2. 기존 페이지를 참고하세요 (같은 유형의 페이지)
3. CSS Variables를 적극 활용하세요
4. 문제가 생기면 `styles.css.backup`을 참고하세요

**행운을 빕니다! 🚀**
