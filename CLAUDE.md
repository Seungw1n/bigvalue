# Big Value Web Project Manifesto

이 문서는 빅밸류 홈페이지 리뉴얼 프로젝트의 **절대적인 기준(Single Source of Truth)**입니다.
우리는 "화려한 기술"보다 **"안정적인 운영"과 "명확한 고객 소통"**을 최우선으로 합니다.
AI 에이전트는 코드를 작성할 때 이 문서의 제약 조건을 반드시 준수해야 합니다.

---

## 1. Project Identity & Goals
<project_identity>
- **Project**: Big Value Corporate Website Renewal
- **Core Mission**: 데이터의 가치를 고객이 쉽게 이해하고, 실제 비즈니스에 활용하도록 설득한다.
- **Key KPIs**:
    1. **Customer Understanding**: 빅밸류의 데이터 상품과 솔루션을 직관적으로 전달.
    2. **High MAU**: 매일 변경되는 'Daily Insight' 콘텐츠로 재방문 유도.
    3. **Conversion**: '서비스 바로가기' 및 '문의하기' 클릭률 극대화.
- **Operator Persona**: 코딩 초보자이지만 주 3회 실험과 배포를 실행하는 열정적인 PO. (안정성과 쉬운 수정이 생명)
</project_identity>

## 2. Tech Stack (Vanilla & Minimal)
<tech_stack>
복잡한 프레임워크나 빌드 도구(Webpack, Vite 등)를 사용하지 않습니다. 브라우저에서 바로 돌아가는 코드를 작성합니다.

- **Structure**: HTML5 (Semantic Tags 준수)
- **Styling**: CSS3 (No SCSS/Tailwind). **CSS Variables(:root)**를 적극 활용하여 테마 관리.
- **Scripting**: Vanilla JavaScript (ES6+). 복잡한 클래스보다는 직관적인 함수형 코드 지향.
- **Animation**: CSS Transitions/Animations 우선 사용. 복잡한 스크롤 인터렉션 필요 시에만 `AOS` 또는 `GSAP`(CDN 방식) 소극적 사용.
- **Deployment**: Netlify Drop 또는 GitHub Pages (빌드 과정 없이 즉시 배포 가능해야 함).
</tech_stack>

## 3. Directory Structure (Safety First)
<file_structure>
파일을 찾기 쉽고, 수정할 때 실수를 줄이는 구조입니다.

/ (Root)
  index.html          # 메인 랜딩 페이지
  about.html          # 회사 소개
  products.html       # 데이터 상품 소개
  contact.html        # 문의하기
  /assets
    /images           # 이미지 파일 (직관적인 영문명 사용)
    /icons            # 아이콘 (SVG 권장)
  /css
    style.css         # 공통 스타일 (Reset, Variables, Layout)
    home.css          # 홈 전용 스타일
    responsive.css    # 모바일 대응 미디어 쿼리 모음
  /js
    main.js           # 공통 기능 (헤더, 푸터, 메뉴)
    daily-content.js  # **핵심**: 매일 바뀌는 콘텐츠 데이터 관리 (수정 빈도 높음)
</file_structure>

## 4. Coding Conventions (For Beginners)
<conventions>
유지보수 사고를 방지하기 위해 다음 규칙을 엄격히 지킵니다.

1.  **HTML (구조)**:
    - `<div>` 남발 금지. `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`를 사용하여 구조를 명확히 합니다.
    - 주석 필수: 각 섹션의 시작과 끝에 주석을 답니다. (예: ``)

2.  **CSS (스타일)**:
    - **BEM 네이밍 흉내내기**: 클래스명은 `구역__요소` 형태로 짓습니다. (예: `.hero__title`, `.nav__button`) -> 이렇게 해야 스타일이 꼬이지 않습니다.
    - `!important` 사용 절대 금지.

3.  **JavaScript (기능)**:
    - **방어적 코딩**: 요소를 선택할 때는 반드시 존재 여부를 확인합니다.
      ```javascript
      const btn = document.querySelector('.btn');
      if (btn) { ... } // 이렇게 감싸지 않으면 다른 페이지에서 에러가 납니다.
      ```
    - 기능별로 함수를 분리합니다. 한 함수는 50줄을 넘기지 않도록 노력합니다.
</conventions>

## 5. Daily Content Strategy (MAU Booster)
<daily_content_strategy>
매일 변경되는 콘텐츠(오늘의 데이터 퀴즈, 핫한 상권, 뉴스 등)를 안전하게 업데이트하기 위한 전략입니다.

1.  **데이터 분리**: HTML을 직접 수정하다가 태그를 깨먹지 않도록, 변경되는 텍스트와 이미지는 `/js/daily-content.js`의 객체(Object) 변수에서 관리합니다.
2.  **자동 렌더링**: 페이지 로드 시 JS가 데이터를 읽어와 HTML에 꽂아줍니다.
3.  **Fallback**: JS 에러 발생 시를 대비해 HTML에 기본 콘텐츠(정적 콘텐츠)를 넣어둡니다.
</daily_content_strategy>

## 6. Development Workflow (3x/Week)
<workflow>
1.  **Small Steps**: 한 번에 하나씩만 수정합니다 (예: 버튼 색 바꾸기 -> 확인 -> 배포).
2.  **Test**: PC 브라우저와 모바일(크롬 개발자 도구)에서 모두 깨짐 없는지 확인.
3.  **No Build**: 별도의 빌드 명령 없이 저장(Save) 후 바로 확인합니다.
</workflow>