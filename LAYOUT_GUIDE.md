# Big Value Layout Guide

> **단 하나의 규칙**: 모든 HTML 요소는 최소 2개 이상의 클래스를 가져야 합니다.

이 문서는 Big Value 홈페이지의 CSS 아키텍처를 이해하고 올바르게 사용하는 방법을 안내합니다.

---

## 📋 목차

1. [개요](#1-개요)
2. [CSS 파일 구조](#2-css-파일-구조)
3. [Double-Class System](#3-double-class-system)
4. [컴포넌트 라이브러리](#4-컴포넌트-라이브러리)
5. [Template 사용법](#5-template-사용법)
6. [실전 예제](#6-실전-예제)
7. [FAQ](#7-faq)
8. [체크리스트](#8-체크리스트)
9. [참고 자료](#9-참고-자료)

---

## 1. 개요

### 1.1 CSS 시스템 철학

Big Value의 CSS 시스템은 다음 3가지 원칙을 따릅니다:

1. **Component-First Approach**: 모든 UI 요소는 재사용 가능한 컴포넌트
2. **Double-Class System**: 모든 요소는 최소 2개의 클래스 (`[component] [template-type]`)
3. **Separation of Concerns**: common.css는 스타일, template_*.css는 레이아웃

### 1.2 핵심 원칙

```
common.css (스타일)      +      template_*.css (레이아웃)      =      완성된 페이지
폰트, 색상, 간격              컨테이너, 그리드, 배치                  일관성 + 유연성
```

**절대 금지 사항**:
- ❌ 페이지별 CSS 파일 생성 (예: `flow.css`, `about-page.css`)
- ❌ template CSS에서 폰트 크기나 색상 재정의
- ❌ `!important` 사용
- ❌ 단일 클래스만 사용 (`.hero`만 쓰고 끝내기)

---

## 2. CSS 파일 구조

### 2.1 파일 목록

```
css/
├── common.css                  # 디자인 시스템 + 컴포넌트 라이브러리
├── template_landing.css        # 랜딩 페이지 레이아웃
├── template_product.css        # 제품 페이지 레이아웃
├── template_category.css       # 카테고리 페이지 레이아웃
├── template_feed.css           # 인사이트 피드 레이아웃
├── template_list.css           # 리스트 페이지 레이아웃
├── template_detail.css         # 상세 페이지 레이아웃
├── template_about.css          # 회사 소개 레이아웃
├── template_pricing.css        # 가격 페이지 레이아웃
└── template_legal.css          # 약관 페이지 레이아웃
```

### 2.2 파일 역할

#### `common.css` (~35KB)
**포함 내용**:
- CSS 변수 (색상, 간격, 폰트 등)
- 리셋 스타일
- 헤더/푸터 (모든 페이지 공통)
- 컴포넌트 라이브러리 (Hero, Title, Section, Card, Grid 등)
- 애니메이션 유틸리티

**수정 시기**: 전체 사이트 디자인 시스템이 변경될 때만

#### `template_*.css` (~10-20KB)
**포함 내용**:
- 페이지 타입별 레이아웃과 배치
- 그리드 구조
- 반응형 미디어 쿼리

**수정 시기**: 특정 템플릿의 레이아웃을 변경할 때

---

## 3. Double-Class System

### 3.1 개념

**모든 HTML 요소는 2개 이상의 클래스를 가져야 합니다:**

```html
<element class="[component] [variant] [template-specific]">
                 ↑             ↑            ↑
            common.css    common.css   template_*.css
```

### 3.2 클래스 역할

| 클래스 유형 | 정의 위치 | 역할 | 예시 |
|------------|---------|------|------|
| **Component** | common.css | 기본 스타일 (폰트, 색상, 간격) | `.title`, `.card`, `.hero` |
| **Variant** | common.css | 컴포넌트 변형 | `.title--hero`, `.card--problem` |
| **Template** | template_*.css | 레이아웃, 배치 | `.product-hero`, `.product-card` |

### 3.3 올바른 예시 vs 잘못된 예시

#### ❌ 잘못된 예시 (Single Class)

```html
<!-- 나쁜 예: 단일 클래스만 사용 -->
<section class="hero">
    <h1 class="headline">제목</h1>
    <p class="description">설명</p>
</section>
```

**문제점**:
- 스타일과 레이아웃이 섞임
- 재사용 불가능
- 페이지별로 다르게 동작

#### ✅ 올바른 예시 (Double/Multi Class)

```html
<!-- 좋은 예: 다중 클래스 사용 -->
<section class="hero hero--dark section section--large product-hero">
              ↑        ↑         ↑          ↑            ↑
         component  variant  component   variant     template

    <h1 class="title title--hero hero__headline">제목</h1>
            ↑         ↑            ↑
        component  variant    template

    <p class="hero__description">설명</p>
</section>
```

**장점**:
- 명확한 역할 분리
- 어디서든 재사용 가능
- 일관된 디자인 보장

---

## 4. 컴포넌트 라이브러리

`common.css`에 정의된 모든 컴포넌트를 소개합니다.

### 4.1 Hero Component

**용도**: 페이지 상단의 큰 히어로 섹션

#### Variants

| 클래스 | 배경 스타일 | 사용 예시 |
|--------|-----------|---------|
| `.hero--dark` | 다크 그라데이션 | 제품 페이지 히어로 |
| `.hero--light` | 라이트 그라데이션 | Flow 페이지 |
| `.hero--gradient` | 컬러 그라데이션 | 랜딩 페이지 |
| `.hero--gradient-ai` | AI 전용 그라데이션 | AI Solution 페이지 |

#### HTML 예시

```html
<section class="hero hero--dark section section--large product-hero">
    <div class="hero__content">
        <h1 class="hero__headline title title--hero">
            큰 제목이 들어갑니다
        </h1>
        <p class="hero__description">
            설명 텍스트가 들어갑니다.
        </p>
        <div class="hero__cta">
            <a href="#" class="btn btn--cta btn--large">버튼</a>
        </div>
    </div>
</section>
```

---

### 4.2 Title Component

**용도**: 모든 제목 (h1, h2, h3)

#### Variants

| 클래스 | 폰트 크기 | 사용 위치 |
|--------|---------|---------|
| `.title--hero` | 56px | Hero 섹션 메인 제목 |
| `.title--section` | 48px | 섹션 제목 |
| `.title--card` | 22px | 카드 제목 |
| `.title--display` | 64px | 특별히 큰 제목 |

#### 특수 요소

- `.title__highlight`: 강조 색상 (브랜드 컬러)

#### HTML 예시

```html
<!-- Hero 제목 -->
<h1 class="title title--hero hero__headline">
    메인 제목에 <span class="title__highlight">강조</span>를 넣습니다
</h1>

<!-- Section 제목 -->
<h2 class="title title--section section__title">
    섹션 제목
</h2>

<!-- Card 제목 -->
<h3 class="title title--card card__title">
    카드 제목
</h3>
```

---

### 4.3 Section Component

**용도**: 콘텐츠 섹션 래퍼

#### Variants

| 클래스 | 배경 색상 | 패딩 크기 | 사용 예시 |
|--------|---------|---------|---------|
| `.section--white` | 흰색 | 기본 | 일반 섹션 |
| `.section--light` | 연한 회색 | 기본 | 교차 섹션 |
| `.section--dark` | 다크 배경 | 기본 | CTA 섹션 |
| `.section--gradient-light` | 연한 그라데이션 | 기본 | 솔루션 섹션 |
| `.section--large` | - | 120px | 중요 섹션 |
| `.section--medium` | - | 80px | 보통 섹션 |
| `.section--small` | - | 60px | 작은 섹션 |

#### 내부 요소

- `.section__header`: 섹션 헤더 영역
- `.section__title`: 섹션 제목
- `.section__subtitle`: 섹션 부제목
- `.section__message`: 섹션 메시지 박스

#### HTML 예시

```html
<section class="section section--white section--large product-problem">
    <div class="section__header">
        <h2 class="title title--section section__title">섹션 제목</h2>
        <p class="section__subtitle">부제목이 들어갑니다</p>
    </div>

    <!-- 섹션 콘텐츠 -->

    <div class="section__message">
        <p>강조 메시지가 들어갑니다</p>
    </div>
</section>
```

---

### 4.4 Card Component

**용도**: 콘텐츠 카드 (박스형 컨테이너)

#### Variants

| 클래스 | 스타일 | 사용 예시 |
|--------|--------|---------|
| `.card--white` | 흰색 배경 | 일반 카드 |
| `.card--large` | 큰 패딩 | 중요 카드 |
| `.card--problem` | 빨간 왼쪽 테두리 | 문제점 카드 |
| `.card--value` | 호버 효과 | 가치 제안 카드 |

#### 내부 요소

- `.card__icon`: 카드 아이콘
- `.card__title`: 카드 제목
- `.card__desc`: 카드 설명

#### HTML 예시

```html
<!-- 문제점 카드 -->
<article class="card card--problem">
    <div class="card__icon">⚠️</div>
    <h3 class="title title--card card__title">문제점 제목</h3>
    <p class="card__desc">
        문제점에 대한 설명이 들어갑니다.
    </p>
</article>

<!-- 가치 제안 카드 -->
<article class="card card--value card--large product-value__card">
    <div class="card__icon">✓</div>
    <h3 class="title title--card card__title">가치 제목</h3>
    <p class="card__desc">
        제공하는 가치에 대한 설명입니다.
    </p>
</article>
```

---

### 4.5 Grid Component

**용도**: 반응형 그리드 레이아웃

#### Variants

| 클래스 | 데스크톱 | 모바일 | 사용 예시 |
|--------|---------|--------|---------|
| `.grid--2col` | 2컬럼 | 1컬럼 | 양분할 레이아웃 |
| `.grid--3col` | 3컬럼 | 1컬럼 | 3개 나열 |
| `.grid--4col` | 4컬럼 | 1컬럼 | 4개 나열 |
| `.grid--auto` | 자동 (min 280px) | 1컬럼 | 카드 그리드 |

#### HTML 예시

```html
<!-- 자동 그리드 (카드 여러 개) -->
<div class="grid grid--auto">
    <article class="card card--problem">...</article>
    <article class="card card--problem">...</article>
    <article class="card card--problem">...</article>
    <article class="card card--problem">...</article>
</div>

<!-- 고정 3컬럼 그리드 -->
<div class="grid grid--3col">
    <div>컬럼 1</div>
    <div>컬럼 2</div>
    <div>컬럼 3</div>
</div>
```

---

### 4.6 Button Component

**용도**: 모든 버튼 스타일

#### Variants

| 클래스 | 스타일 | 사용 예시 |
|--------|--------|---------|
| `.btn--cta` | Primary 버튼 (파란색) | 주요 액션 |
| `.btn--outline` | 외곽선 버튼 | 보조 액션 |
| `.btn--large` | 큰 버튼 (56px) | 히어로 CTA |
| `.btn--medium` | 중간 버튼 (48px) | 일반 버튼 |
| `.btn--small` | 작은 버튼 (40px) | 텍스트 내 버튼 |

#### HTML 예시

```html
<!-- Primary CTA 버튼 -->
<a href="#" class="btn btn--cta btn--large">무료로 시작하기</a>

<!-- Outline 버튼 -->
<button class="btn btn--outline btn--medium">자세히 보기</button>
```

---

### 4.7 Animation Utilities

**용도**: 스크롤 애니메이션

#### 클래스

- `.fade-in-up`: 아래에서 위로 페이드인
- `.fade-in-delay-1`: 0.1초 지연
- `.fade-in-delay-2`: 0.2초 지연
- `.fade-in-delay-3`: 0.3초 지연
- `.fade-in-delay-4`: 0.4초 지연

#### JavaScript 필요

애니메이션을 작동시키려면 스크롤 시 `.visible` 클래스를 추가해야 합니다.

```javascript
// script.js에 포함된 코드 (이미 작동 중)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
```

#### HTML 예시

```html
<div class="grid grid--auto">
    <article class="card card--problem fade-in-up">...</article>
    <article class="card card--problem fade-in-up fade-in-delay-1">...</article>
    <article class="card card--problem fade-in-up fade-in-delay-2">...</article>
    <article class="card card--problem fade-in-up fade-in-delay-3">...</article>
</div>
```

---

## 5. Template 사용법

### 5.1 Product Template (`template_product.css`)

**사용 시기**: 제품 상세 페이지 (Data Product, Flow, AI Solution, Data API)

#### 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <link rel="stylesheet" href="../../css/common.css">
    <link rel="stylesheet" href="../../css/template_product.css">
</head>
<body>
    <!-- Hero Section -->
    <section class="hero hero--dark section section--large product-hero">
        <div class="product-hero__content">
            <h1 class="title title--hero hero__headline">제품 제목</h1>
            <p class="hero__description">제품 설명</p>
        </div>
        <div class="product-hero__visual">
            <!-- 시각 자료 -->
        </div>
    </section>

    <!-- Problem Section -->
    <section class="section section--white section--large product-problem">
        <div class="section__header">
            <h2 class="title title--section section__title">문제 정의</h2>
        </div>
        <div class="grid grid--auto">
            <article class="card card--problem">...</article>
            <article class="card card--problem">...</article>
        </div>
    </section>

    <!-- Solution Section -->
    <section class="section section--gradient-light section--large product-solution">
        <div class="section__header">
            <h2 class="title title--section section__title">솔루션</h2>
        </div>
        <!-- 솔루션 콘텐츠 -->
    </section>

    <!-- CTA Section -->
    <section class="section section--dark section--large product-cta">
        <h2 class="title title--section section__title">CTA 제목</h2>
        <a href="#" class="btn btn--cta btn--large">문의하기</a>
    </section>
</body>
</html>
```

#### 주요 템플릿 클래스

| 클래스 | 역할 |
|--------|------|
| `.product-hero` | 제품 히어로 레이아웃 (좌우 2분할) |
| `.product-hero__content` | 히어로 텍스트 영역 |
| `.product-hero__visual` | 히어로 비주얼 영역 |
| `.product-problem` | 문제 정의 섹션 |
| `.product-solution` | 솔루션 섹션 |
| `.product-cta` | CTA 섹션 |

---

### 5.2 Landing Template (`template_landing.css`)

**사용 시기**: 메인 랜딩 페이지 (`index.html`)

#### 특징

- 큰 히어로 섹션
- 인터랙티브 애니메이션
- 인사이트 피드 하이라이트
- Final CTA

---

### 5.3 Category Template (`template_category.css`)

**사용 시기**: 카테고리 페이지 (Products 페이지)

#### 특징

- Philosophy 섹션
- Common Value 섹션
- 비교 테이블
- 제품 그리드

---

### 5.4 기타 Templates

- **Feed**: 인사이트 피드, AI 활용 사례
- **List**: 공지사항, 뉴스룸, 고객 사례
- **Detail**: 상세 페이지
- **About**: 회사 소개
- **Pricing**: 가격 정책
- **Legal**: 약관/개인정보처리방침

---

## 6. 실전 예제

### 6.1 새로운 제품 페이지 만들기

**시나리오**: "BigValue Cloud" 제품 페이지를 만든다고 가정

#### Step 1: HTML 파일 생성

```
products/
└── cloud/
    └── index.html
```

#### Step 2: 기본 구조 작성

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BigValue Cloud - BigValue</title>

    <!-- CSS 링크 (순서 중요!) -->
    <link rel="stylesheet" href="../../css/common.css">
    <link rel="stylesheet" href="../../css/template_product.css">
</head>
<body>
    <!-- GNB (공통) -->
    <div id="gnb-placeholder"></div>

    <main class="main">
        <!-- 여기에 콘텐츠 추가 -->
    </main>

    <!-- Footer (공통) -->
    <div id="footer-placeholder"></div>

    <script src="../../script.js"></script>
</body>
</html>
```

#### Step 3: Hero 섹션 추가

```html
<section class="hero hero--dark section section--large product-hero">
    <div class="product-hero__content">
        <h1 class="title title--hero hero__headline">
            클라우드에서<br>
            <span class="title__highlight">데이터를 자유롭게</span>
        </h1>
        <p class="hero__description">
            BigValue Cloud는 데이터를 클라우드에서 안전하게 저장하고
            언제 어디서나 접근할 수 있는 솔루션입니다.
        </p>
        <div class="hero__cta">
            <a href="#" class="btn btn--cta btn--large">무료로 시작하기</a>
        </div>
    </div>
    <div class="product-hero__visual">
        <!-- 이미지 또는 일러스트 -->
        <img src="../../assets/images/cloud-hero.png" alt="Cloud">
    </div>
</section>
```

#### Step 4: Problem 섹션 추가

```html
<section class="section section--white section--large product-problem">
    <div class="section__header">
        <h2 class="title title--section section__title">
            데이터 관리의 어려움
        </h2>
    </div>

    <div class="grid grid--auto">
        <article class="card card--problem fade-in-up">
            <div class="card__icon">⚠️</div>
            <h3 class="title title--card card__title">분산된 데이터</h3>
            <p class="card__desc">
                데이터가 여러 곳에 흩어져 있어 관리가 어렵습니다.
            </p>
        </article>

        <article class="card card--problem fade-in-up fade-in-delay-1">
            <div class="card__icon">🔒</div>
            <h3 class="title title--card card__title">보안 우려</h3>
            <p class="card__desc">
                중요한 데이터의 보안을 어떻게 관리해야 할지 고민입니다.
            </p>
        </article>

        <article class="card card--problem fade-in-up fade-in-delay-2">
            <div class="card__icon">💰</div>
            <h3 class="title title--card card__title">높은 비용</h3>
            <p class="card__desc">
                자체 서버를 운영하는 비용이 점점 증가하고 있습니다.
            </p>
        </article>
    </div>
</section>
```

#### Step 5: Solution 섹션 추가

```html
<section class="section section--gradient-light section--large product-solution">
    <div class="section__header">
        <h2 class="title title--section section__title">
            BigValue Cloud가 해결합니다
        </h2>
    </div>

    <div class="grid grid--3col">
        <article class="card card--value card--large">
            <div class="card__icon">☁️</div>
            <h3 class="title title--card card__title">통합 관리</h3>
            <p class="card__desc">
                모든 데이터를 한 곳에서 안전하게 관리합니다.
            </p>
        </article>

        <article class="card card--value card--large">
            <div class="card__icon">🛡️</div>
            <h3 class="title title--card card__title">강력한 보안</h3>
            <p class="card__desc">
                엔터프라이즈급 보안으로 데이터를 보호합니다.
            </p>
        </article>

        <article class="card card--value card--large">
            <div class="card__icon">💸</div>
            <h3 class="title title--card card__title">비용 절감</h3>
            <p class="card__desc">
                사용한 만큼만 과금되어 비용을 최적화합니다.
            </p>
        </article>
    </div>
</section>
```

#### Step 6: CTA 섹션 추가

```html
<section class="section section--dark section--large product-cta">
    <div class="section__header">
        <h2 class="title title--section section__title">
            지금 바로 BigValue Cloud를 시작하세요
        </h2>
        <p class="section__subtitle">
            14일 무료 체험으로 모든 기능을 경험해보세요
        </p>
    </div>
    <div class="hero__cta">
        <a href="#" class="btn btn--cta btn--large">무료 체험 시작</a>
        <a href="#" class="btn btn--outline btn--large">영업팀 문의</a>
    </div>
</section>
```

#### 완성된 전체 코드

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="BigValue Cloud - 클라우드에서 데이터를 자유롭게">
    <title>BigValue Cloud - BigValue</title>
    <link rel="stylesheet" href="../../css/common.css">
    <link rel="stylesheet" href="../../css/template_product.css">
</head>
<body>
    <div id="gnb-placeholder"></div>

    <main class="main">
        <!-- Hero -->
        <section class="hero hero--dark section section--large product-hero">
            <div class="product-hero__content">
                <h1 class="title title--hero hero__headline">
                    클라우드에서<br>
                    <span class="title__highlight">데이터를 자유롭게</span>
                </h1>
                <p class="hero__description">
                    BigValue Cloud는 데이터를 클라우드에서 안전하게 저장하고
                    언제 어디서나 접근할 수 있는 솔루션입니다.
                </p>
                <div class="hero__cta">
                    <a href="#" class="btn btn--cta btn--large">무료로 시작하기</a>
                </div>
            </div>
            <div class="product-hero__visual">
                <img src="../../assets/images/cloud-hero.png" alt="Cloud">
            </div>
        </section>

        <!-- Problem -->
        <section class="section section--white section--large product-problem">
            <div class="section__header">
                <h2 class="title title--section section__title">
                    데이터 관리의 어려움
                </h2>
            </div>
            <div class="grid grid--auto">
                <article class="card card--problem fade-in-up">
                    <div class="card__icon">⚠️</div>
                    <h3 class="title title--card card__title">분산된 데이터</h3>
                    <p class="card__desc">
                        데이터가 여러 곳에 흩어져 있어 관리가 어렵습니다.
                    </p>
                </article>
                <article class="card card--problem fade-in-up fade-in-delay-1">
                    <div class="card__icon">🔒</div>
                    <h3 class="title title--card card__title">보안 우려</h3>
                    <p class="card__desc">
                        중요한 데이터의 보안을 어떻게 관리해야 할지 고민입니다.
                    </p>
                </article>
                <article class="card card--problem fade-in-up fade-in-delay-2">
                    <div class="card__icon">💰</div>
                    <h3 class="title title--card card__title">높은 비용</h3>
                    <p class="card__desc">
                        자체 서버를 운영하는 비용이 점점 증가하고 있습니다.
                    </p>
                </article>
            </div>
        </section>

        <!-- Solution -->
        <section class="section section--gradient-light section--large product-solution">
            <div class="section__header">
                <h2 class="title title--section section__title">
                    BigValue Cloud가 해결합니다
                </h2>
            </div>
            <div class="grid grid--3col">
                <article class="card card--value card--large">
                    <div class="card__icon">☁️</div>
                    <h3 class="title title--card card__title">통합 관리</h3>
                    <p class="card__desc">
                        모든 데이터를 한 곳에서 안전하게 관리합니다.
                    </p>
                </article>
                <article class="card card--value card--large">
                    <div class="card__icon">🛡️</div>
                    <h3 class="title title--card card__title">강력한 보안</h3>
                    <p class="card__desc">
                        엔터프라이즈급 보안으로 데이터를 보호합니다.
                    </p>
                </article>
                <article class="card card--value card--large">
                    <div class="card__icon">💸</div>
                    <h3 class="title title--card card__title">비용 절감</h3>
                    <p class="card__desc">
                        사용한 만큼만 과금되어 비용을 최적화합니다.
                    </p>
                </article>
            </div>
        </section>

        <!-- CTA -->
        <section class="section section--dark section--large product-cta">
            <div class="section__header">
                <h2 class="title title--section section__title">
                    지금 바로 BigValue Cloud를 시작하세요
                </h2>
                <p class="section__subtitle">
                    14일 무료 체험으로 모든 기능을 경험해보세요
                </p>
            </div>
            <div class="hero__cta">
                <a href="#" class="btn btn--cta btn--large">무료 체험 시작</a>
                <a href="#" class="btn btn--outline btn--large">영업팀 문의</a>
            </div>
        </section>
    </main>

    <div id="footer-placeholder"></div>
    <script src="../../script.js"></script>
</body>
</html>
```

**결과**: 페이지별 CSS 없이 완성된 제품 페이지!

---

## 7. FAQ

### Q1. 왜 Double-Class를 사용해야 하나요?

**A**: 단일 클래스만 사용하면 스타일과 레이아웃이 섞여서 유지보수가 어렵습니다.

```html
<!-- 나쁜 예 -->
<h1 class="hero-title">제목</h1>
```
→ 이 클래스에 폰트, 색상, 위치가 모두 섞여 있음. 다른 곳에서 재사용 불가.

```html
<!-- 좋은 예 -->
<h1 class="title title--hero hero__headline">제목</h1>
```
→ `.title`은 폰트/색상, `.title--hero`는 크기, `.hero__headline`은 위치. 각각 독립적으로 재사용 가능.

---

### Q2. 새로운 컴포넌트를 만들고 싶어요

**A**: `common.css`에 추가하고 Double-Class 패턴을 따르세요.

**예시**: "Badge" 컴포넌트 추가

1. `common.css`에 추가:
```css
/* Badge Component */
.badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
}

.badge--primary {
    background: var(--color-brand-primary-pale);
    color: var(--color-brand-primary);
}

.badge--success {
    background: #d1fae5;
    color: #065f46;
}
```

2. HTML에서 사용:
```html
<span class="badge badge--primary">New</span>
<span class="badge badge--success">완료</span>
```

---

### Q3. 템플릿 CSS에서 폰트 크기를 바꾸고 싶어요

**A**: 안 됩니다! 폰트 크기는 `common.css`의 컴포넌트에서만 정의합니다.

**잘못된 방법**:
```css
/* template_product.css (X) */
.product-hero__headline {
    font-size: 72px;  /* 절대 안 됨! */
}
```

**올바른 방법**:
```css
/* common.css (O) */
.title--hero-large {
    font-size: 72px;
}
```

```html
<!-- HTML -->
<h1 class="title title--hero-large hero__headline">제목</h1>
```

---

### Q4. 기존 페이지를 어떻게 수정하나요?

**A**: HTML만 수정하세요. CSS는 건드리지 마세요.

**예시**: Flow 페이지의 제목 텍스트 변경

```html
<!-- products/flow/index.html 수정 -->
<h1 class="title title--hero hero__headline">
    새로운 제목으로 변경  <!-- 이 부분만 수정 -->
</h1>
```

CSS 파일은 절대 수정하지 않습니다.

---

### Q5. 모바일에서 레이아웃이 깨져요

**A**: 반응형은 이미 적용되어 있습니다. Grid 컴포넌트를 올바르게 사용했는지 확인하세요.

**체크 포인트**:
1. `.grid` 클래스를 사용했는가?
2. `.grid--auto`, `.grid--2col` 등 variant를 추가했는가?
3. 브라우저 개발자 도구에서 1024px 이하로 축소해서 확인

```html
<!-- 올바른 사용 -->
<div class="grid grid--auto">
    <div class="card">...</div>
    <div class="card">...</div>
</div>
```

---

### Q6. 애니메이션이 작동하지 않아요

**A**: `.fade-in-up` 클래스를 추가했는지 확인하고, `script.js`가 로드되었는지 확인하세요.

**체크 포인트**:
1. HTML에 `.fade-in-up` 클래스 추가했는가?
2. `<script src="../../script.js"></script>` 포함되어 있는가?
3. 브라우저 콘솔에 에러가 없는가?

---

### Q7. 페이지별 CSS를 만들고 싶어요

**A**: 절대 안 됩니다!

페이지별 CSS 파일을 만드는 순간 이 시스템이 무너집니다. 대신:

1. 새로운 컴포넌트가 필요하면 → `common.css`에 추가
2. 새로운 레이아웃이 필요하면 → 기존 `template_*.css`에 추가 또는 새로운 템플릿 생성

---

## 8. 체크리스트

새로운 페이지를 만들거나 기존 페이지를 수정할 때 이 체크리스트를 사용하세요.

### 페이지 생성 체크리스트

- [ ] HTML 파일 생성 (적절한 디렉토리에)
- [ ] `<link>` 태그에 `common.css` 포함
- [ ] `<link>` 태그에 적절한 `template_*.css` 포함
- [ ] GNB placeholder 추가 (`<div id="gnb-placeholder"></div>`)
- [ ] Footer placeholder 추가 (`<div id="footer-placeholder"></div>`)
- [ ] `script.js` 로드 (`<script src="../../script.js"></script>`)

### HTML 작성 체크리스트

- [ ] 모든 요소에 최소 2개 이상의 클래스
- [ ] Component 클래스 사용 (`.hero`, `.title`, `.card` 등)
- [ ] Variant 클래스 사용 (`.hero--dark`, `.title--hero` 등)
- [ ] Template 클래스 사용 (`.product-hero`, `.product-problem` 등)
- [ ] Semantic HTML 사용 (`<section>`, `<article>`, `<header>` 등)
- [ ] 애니메이션 클래스 추가 (`.fade-in-up`, `.fade-in-delay-*`)

### CSS 수정 체크리스트

- [ ] `common.css`에만 스타일 추가 (컴포넌트)
- [ ] `template_*.css`에는 레이아웃만 추가
- [ ] 페이지별 CSS 파일 생성하지 않음
- [ ] `!important` 사용하지 않음
- [ ] 기존 컴포넌트 재사용 우선 고려

### 테스트 체크리스트

- [ ] PC 브라우저에서 확인 (1920px)
- [ ] 태블릿에서 확인 (768px)
- [ ] 모바일에서 확인 (375px)
- [ ] 모든 링크 작동 확인
- [ ] 버튼 호버 효과 확인
- [ ] 스크롤 애니메이션 작동 확인
- [ ] 브라우저 콘솔에 에러 없음

---

## 9. 참고 자료

### 9.1 예제 페이지

성공적으로 마이그레이션된 페이지들:

1. **Flow 페이지** (`products/flow/index.html`)
   - 참고 포인트: Hero 분할 레이아웃, Problem-Solution 구조

2. **Data Product 페이지** (`products/data-product/index.html`)
   - 참고 포인트: 복잡한 섹션 구성, 다양한 카드 스타일

3. **AI Solution 페이지** (`products/ai-solution/index.html`)
   - 참고 포인트: Gradient 배경, 다이어그램 레이아웃

4. **Products 카테고리 페이지** (`products/index.html`)
   - 참고 포인트: 비교 테이블, 제품 그리드

### 9.2 주요 파일

| 파일 | 역할 | 수정 빈도 |
|------|------|---------|
| `css/common.css` | 디자인 시스템 + 컴포넌트 | 낮음 (디자인 변경 시) |
| `css/template_product.css` | 제품 페이지 레이아웃 | 매우 낮음 |
| `products/*/index.html` | 각 제품 페이지 콘텐츠 | 높음 (텍스트 수정) |
| `LAYOUT_GUIDE.md` | 이 가이드 문서 | 낮음 (시스템 변경 시) |

### 9.3 BEM 네이밍 참고

```
.block                    # 컴포넌트 (예: .card)
.block__element          # 하위 요소 (예: .card__title)
.block--modifier         # 변형 (예: .card--large)
.block__element--modifier # 하위 요소 변형 (예: .card__title--small)
```

### 9.4 CSS 변수 (common.css에 정의됨)

```css
/* 색상 */
--color-brand-primary: #0066ff
--color-brand-primary-pale: #e6f0ff
--color-neutral-black: #000000
--color-neutral-white: #ffffff

/* 간격 */
--spacing-xs: 8px
--spacing-s: 16px
--spacing-m: 24px
--spacing-l: 32px
--spacing-xl: 48px
--spacing-2xl: 64px
--spacing-3xl: 80px

/* Border Radius */
--radius-s: 4px
--radius-m: 8px
--radius-l: 12px
--radius-xl: 16px

/* 컨테이너 */
--container-max-width: 1440px
```

---

## 10. 마치며

이 가이드를 따르면:

✅ 일관된 디자인 시스템
✅ 빠른 페이지 개발
✅ 쉬운 유지보수
✅ 페이지별 CSS 파일 0개

**핵심 원칙을 다시 한번**:
1. 모든 요소는 최소 2개 이상의 클래스
2. common.css는 스타일, template_*.css는 레이아웃
3. 페이지별 CSS 파일 절대 금지

**문제가 생겼을 때**:
1. 이 가이드의 FAQ 섹션 확인
2. 기존 페이지 (Flow, Data Product 등) 참고
3. `common.css`의 컴포넌트 먼저 확인

Happy coding! 🚀
