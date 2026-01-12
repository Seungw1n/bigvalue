# Product Components 사용 가이드

product.css에 정의된 공통 컴포넌트를 사용하여 모든 제품 페이지의 스타일을 통일합니다.
**디자인 시스템 기준**: Flow 페이지

## 📦 적용 대상 페이지

- products/data-product/index.html
- products/ai-solution/index.html
- products/data-api/index.html
- products/flow/index.html
- developers/flow/index.html
- developers/data-api/index.html

---

## 🎨 공통 컴포넌트

### 1. Hero Section (히어로 섹션)

```html
<section class="product-section product-section--light">
    <div class="product-container product-container--narrow">
        <h1 class="product-hero__headline">
            메인 제목<br>
            <span class="product-hero__headline-highlight">강조할 부분</span>
        </h1>
        <p class="product-hero__description">
            제품에 대한 설명 문구입니다.<br>
            18px, line-height 1.8로 설정됩니다.
        </p>
    </div>
</section>
```

**스타일 상세:**
- `.product-hero__headline`: 52px, bold, black, letter-spacing -1px
- `.product-hero__headline-highlight`: 브랜드 컬러
- `.product-hero__description`: 18px, dark, line-height 1.8

---

### 2. Section (일반 섹션)

```html
<section class="product-section product-section--white">
    <div class="product-container">
        <div class="product-section__header">
            <h2 class="product-section__title">섹션 제목</h2>
            <p class="product-section__subtitle">부제목 (선택사항)</p>
        </div>
        <!-- 섹션 내용 -->
    </div>
</section>
```

**스타일 상세:**
- `.product-section`: padding 120px 30px (기본)
- `.product-section--white`: 흰색 배경
- `.product-section--light`: 그라데이션 배경 (#f8fafc → #ffffff)
- `.product-section__title`: 48px, bold, black, letter-spacing -1px
- `.product-section__subtitle`: 20px, dark, line-height 1.8

---

### 3. Card (카드 컴포넌트)

#### 기본 카드
```html
<div class="product-card">
    <div class="product-card__icon">🎯</div>
    <h3 class="product-card__title">카드 제목</h3>
    <p class="product-card__desc">카드 설명 내용</p>
</div>
```

#### 큰 카드 (Values 카드)
```html
<div class="product-card product-card--white product-card--large product-card--value">
    <div class="product-card__icon product-card__icon--large">✨</div>
    <h3 class="product-card__title product-card__title--large">카드 제목</h3>
    <p class="product-card__desc product-card__desc--large">카드 설명</p>
</div>
```

#### 문제 카드 (Problem 카드)
```html
<div class="product-card product-card--problem">
    <div class="product-card__icon">❗</div>
    <h3 class="product-card__title">문제점</h3>
    <p class="product-card__desc">문제에 대한 설명</p>
</div>
```

**스타일 상세:**
- `.product-card`: 기본 카드 (40px padding, #f8fafc 배경)
- `.product-card--white`: 흰색 배경
- `.product-card--large`: 큰 패딩 (48px 40px)
- `.product-card--problem`: 왼쪽 빨간 보더 (4px solid #ef4444)
- `.product-card--value`: hover 시 브랜드 컬러 보더
- `.product-card__title`: 22px, 600 weight
- `.product-card__title--large`: 24px

---

### 4. Grid Layout (그리드 레이아웃)

```html
<div class="product-grid product-grid--2col">
    <div class="product-card">...</div>
    <div class="product-card">...</div>
    <div class="product-card">...</div>
    <div class="product-card">...</div>
</div>
```

**옵션:**
- `.product-grid--2col`: 2열 그리드
- `.product-grid--3col`: 3열 그리드
- `.product-grid--auto`: 자동 그리드 (minmax(280px, 1fr))

---

### 5. Container (컨테이너)

```html
<div class="product-container">
    <!-- 기본 컨테이너 (max-width: 1440px) -->
</div>

<div class="product-container product-container--narrow">
    <!-- 좁은 컨테이너 (max-width: 900px) -->
</div>

<div class="product-container product-container--medium">
    <!-- 중간 컨테이너 (max-width: 1000px) -->
</div>
```

---

### 6. Badge & Emphasis

```html
<!-- Badge -->
<span class="product-badge">Solution</span>

<!-- Emphasis Text -->
<p>일반 텍스트 <span class="product-emphasis">강조 텍스트</span></p>
<p>일반 텍스트 <span class="product-emphasis product-emphasis--strong">굵은 강조</span></p>
```

---

## 📱 반응형 디자인

모든 공통 컴포넌트는 자동으로 반응형 디자인이 적용됩니다.

### 브레이크포인트

1. **Desktop (기본)**: > 1024px
   - headline: 52px
   - section title: 48px

2. **Tablet**: ≤ 1024px
   - headline: 44px
   - section title: 40px
   - 2/3열 그리드 → 1열

3. **Mobile**: ≤ 768px
   - headline: 36px
   - section title: 32px
   - padding 감소

4. **Small Mobile**: ≤ 480px
   - headline: 28px
   - section title: 28px

---

## 🎯 사용 예시

### Flow 페이지 스타일 (기준)

```html
<!-- Hero Section -->
<section class="product-section product-section--light">
    <div class="product-container">
        <h1 class="product-hero__headline">
            분석이 아니라,<br>
            <span class="product-hero__headline-highlight">판단을 바로 보세요</span>
        </h1>
        <p class="product-hero__description">
            데이터를 고르고 분석하는 시대는 끝났습니다.
        </p>
    </div>
</section>

<!-- Problem Section -->
<section class="product-section product-section--white">
    <div class="product-container">
        <div class="product-section__header">
            <h2 class="product-section__title">데이터는 넘치지만,<br>판단은 느립니다</h2>
        </div>
        <div class="product-grid product-grid--2col">
            <div class="product-card product-card--problem">
                <div class="product-card__icon">❓</div>
                <h3 class="product-card__title">데이터를 모릅니다</h3>
                <p class="product-card__desc">어떤 데이터가 필요한지 알 수 없습니다</p>
            </div>
            <!-- 더 많은 카드... -->
        </div>
    </div>
</section>

<!-- Values Section -->
<section class="product-section product-section--white">
    <div class="product-container">
        <div class="product-section__header">
            <h2 class="product-section__title">Flow가 제공하는 4가지 핵심 가치</h2>
        </div>
        <div class="product-grid product-grid--2col">
            <div class="product-card product-card--white product-card--large product-card--value">
                <div class="product-card__icon product-card__icon--large">🎯</div>
                <h3 class="product-card__title product-card__title--large">
                    분석 노하우를<br>선택할 필요가 없습니다
                </h3>
                <p class="product-card__desc product-card__desc--large">
                    BigValue가 설계한 판단 기준이 내장되어 있습니다.
                </p>
            </div>
            <!-- 더 많은 카드... -->
        </div>
    </div>
</section>
```

---

## ✅ 체크리스트

제품 페이지를 만들 때 다음을 확인하세요:

- [ ] `<link rel="stylesheet" href="../../css/product.css">` 추가
- [ ] Hero headline은 `product-hero__headline` 사용
- [ ] Section title은 `product-section__title` 사용
- [ ] Card는 `product-card` + 적절한 modifier 사용
- [ ] Grid는 `product-grid--2col` 또는 `product-grid--3col` 사용
- [ ] Container는 `product-container` 사용
- [ ] 반응형 테스트 완료 (모바일, 태블릿, 데스크탑)

---

## 🔧 커스터마이징

각 제품별 고유한 스타일이 필요한 경우:

1. **인라인 `<style>` 태그 사용** (AI Solution, Data API 현재 방식)
2. **별도 CSS 파일 생성** (Flow 현재 방식: flow.css)

단, 기본 텍스트 크기, 정렬, 위치는 공통 컴포넌트를 따라야 합니다.

### 허용되는 커스터마이징
- 배경색 및 배경 이미지
- 보더 색상 및 스타일
- 애니메이션 효과
- 아이콘 및 이미지

### 통일해야 하는 요소
- headline 크기: 52px (Hero), 48px (Section)
- description 크기: 18px (Hero), 20px (Section)
- card title 크기: 22-24px
- card desc 크기: 16px
- padding: 120px 30px (Section)
- line-height 및 letter-spacing

---

## 📚 참고 자료

- **기준 페이지**: products/flow/index.html
- **CSS 파일**: css/product.css (라인 14-204: 공통 컴포넌트)
- **반응형**: css/product.css (라인 1459-1576)
