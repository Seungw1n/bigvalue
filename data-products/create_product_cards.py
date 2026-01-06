import json

# Create curated, marketing-friendly data products
# Organized into 4 main categories

data_products = {
    "categories": [
        {
            "id": "real-estate",
            "name": "부동산 데이터",
            "icon": "🏠",
            "description": "실거래가, 전월세, 토지, 개발 계획 등 부동산 시장 전반의 데이터",
            "products": [
                {
                    "id": "apt-price",
                    "name": "아파트 시세 정보",
                    "description": "전국 아파트 실거래가 및 시세 정보",
                    "tags": ["시세", "아파트", "실거래"],
                    "features": [
                        "단지형/나홀로 아파트 실거래가",
                        "전월세 시세 정보",
                        "지역별 시세 변동 추이"
                    ]
                },
                {
                    "id": "housing-trade",
                    "name": "주택 실거래 데이터",
                    "description": "주택 매매, 전세, 월세 실거래 정보",
                    "tags": ["실거래", "매매", "전월세"],
                    "features": [
                        "주택 매매 실거래가",
                        "전세/월세 실거래 정보",
                        "임차 만료 추정 데이터"
                    ]
                },
                {
                    "id": "property-owner",
                    "name": "부동산 소유자 정보",
                    "description": "건물 및 토지 소유자 데이터",
                    "tags": ["소유자", "건물", "토지"],
                    "features": [
                        "주거용/상업용 건물 소유자",
                        "토지 소유자 정보",
                        "다주택자 분석 데이터"
                    ]
                },
                {
                    "id": "officetel",
                    "name": "오피스텔 데이터",
                    "description": "오피스텔 시세 및 임대 정보",
                    "tags": ["오피스텔", "시세", "임대"],
                    "features": [
                        "오피스텔 실거래가",
                        "임대 현황 정보",
                        "수익률 분석 데이터"
                    ]
                },
                {
                    "id": "land-data",
                    "name": "토지 거래 정보",
                    "description": "토지 실거래 및 용도지역 데이터",
                    "tags": ["토지", "용도지역", "개발"],
                    "features": [
                        "토지 실거래가 정보",
                        "용도지역/지구/구역",
                        "개발 계획 정보"
                    ]
                },
                {
                    "id": "redevelopment",
                    "name": "재개발·재건축 정보",
                    "description": "재개발, 재건축 지역 및 진행 상황 데이터",
                    "tags": ["재개발", "재건축", "정비사업"],
                    "features": [
                        "재개발/재건축 지역 정보",
                        "사업 진행 단계",
                        "조합 설립 현황"
                    ]
                }
            ]
        },
        {
            "id": "commercial",
            "name": "상권 데이터",
            "icon": "🏪",
            "description": "유동인구, 매출, 업종 분포 등 상권 분석 핵심 데이터",
            "products": [
                {
                    "id": "foot-traffic",
                    "name": "유동인구 데이터",
                    "description": "시간대별, 연령별 유동인구 정보",
                    "tags": ["유동인구", "상권", "분석"],
                    "features": [
                        "시간대별 유동인구",
                        "성별/연령별 구분",
                        "요일별 패턴 분석"
                    ]
                },
                {
                    "id": "sales-data",
                    "name": "업종별 매출 데이터",
                    "description": "업종별, 지역별 매출 정보",
                    "tags": ["매출", "업종", "매장"],
                    "features": [
                        "업종별 매출 데이터",
                        "지역별 매출 비교",
                        "시즌별 매출 트렌드"
                    ]
                },
                {
                    "id": "store-opening",
                    "name": "점포 개폐업 정보",
                    "description": "업종별 점포 개업 및 폐업 데이터",
                    "tags": ["개업", "폐업", "창업"],
                    "features": [
                        "일별 개폐업 현황",
                        "업종별 개폐업률",
                        "상권별 생존율 분석"
                    ]
                },
                {
                    "id": "commercial-area",
                    "name": "상권 변화 트렌드",
                    "description": "상권 활성화 지수 및 변화 추이",
                    "tags": ["상권분석", "트렌드", "성장"],
                    "features": [
                        "상권 활성화 지수",
                        "신흥 상권 발굴",
                        "쇠퇴 상권 감지"
                    ]
                },
                {
                    "id": "card-sales",
                    "name": "카드 매출 데이터",
                    "description": "신용카드/체크카드 업종별 매출 정보",
                    "tags": ["카드", "소비", "매출"],
                    "features": [
                        "카드 업종별 매출",
                        "시계열 소비 패턴",
                        "지역별 소비 트렌드"
                    ]
                },
                {
                    "id": "rental-market",
                    "name": "임대 시장 정보",
                    "description": "상업용 부동산 임대료 및 공실률 데이터",
                    "tags": ["임대료", "공실률", "상업용"],
                    "features": [
                        "상업용 임대료 시세",
                        "공실률 통계",
                        "계약 갱신 데이터"
                    ]
                }
            ]
        },
        {
            "id": "corporate",
            "name": "기업 데이터",
            "icon": "🏢",
            "description": "사업자 등록, 재무제표, 신용평가 등 기업 분석 데이터",
            "products": [
                {
                    "id": "business-registration",
                    "name": "사업자 등록 정보",
                    "description": "전국 사업자 등록 및 변경 이력 데이터",
                    "tags": ["사업자", "등록", "기업정보"],
                    "features": [
                        "사업자 등록 정보",
                        "업종 및 업태",
                        "개업/휴폐업 이력"
                    ]
                },
                {
                    "id": "financial-statement",
                    "name": "기업 재무 데이터",
                    "description": "재무제표, 신용등급, 재무비율 분석",
                    "tags": ["재무제표", "신용등급", "분석"],
                    "features": [
                        "손익계산서/재무상태표",
                        "신용등급 정보",
                        "재무비율 분석"
                    ]
                },
                {
                    "id": "corporate-info",
                    "name": "법인 정보 데이터",
                    "description": "법인 등기, 임원 정보, 자본금 변동",
                    "tags": ["법인", "등기", "임원"],
                    "features": [
                        "법인 등기 정보",
                        "임원 현황",
                        "자본금 변동 이력"
                    ]
                },
                {
                    "id": "investment",
                    "name": "투자 및 M&A 정보",
                    "description": "기업 투자 유치 및 M&A 이력 데이터",
                    "tags": ["투자", "M&A", "스타트업"],
                    "features": [
                        "투자 유치 이력",
                        "M&A 거래 정보",
                        "투자자 네트워크"
                    ]
                },
                {
                    "id": "patent",
                    "name": "특허 및 인증 정보",
                    "description": "기업 특허, 인증, 수상 이력",
                    "tags": ["특허", "인증", "IP"],
                    "features": [
                        "특허 등록 정보",
                        "인증 및 수상 이력",
                        "지식재산권 현황"
                    ]
                },
                {
                    "id": "employment",
                    "name": "고용 보험 데이터",
                    "description": "기업별 고용 인원 및 변동 추이",
                    "tags": ["고용", "인력", "채용"],
                    "features": [
                        "고용 인원 현황",
                        "신규 채용 데이터",
                        "퇴사율 분석"
                    ]
                }
            ]
        },
        {
            "id": "demographic",
            "name": "인구 데이터",
            "icon": "👥",
            "description": "거주인구, 직장인구, 소득 추정 등 인구통계 데이터",
            "products": [
                {
                    "id": "population",
                    "name": "거주 인구 데이터",
                    "description": "지역별, 연령별 거주 인구 통계",
                    "tags": ["인구", "거주", "통계"],
                    "features": [
                        "성별/연령별 인구",
                        "가구 유형 분포",
                        "인구 밀도 정보"
                    ]
                },
                {
                    "id": "working-population",
                    "name": "직장 인구 데이터",
                    "description": "업무 지역별 직장인구 및 통근 패턴",
                    "tags": ["직장인구", "통근", "업무지역"],
                    "features": [
                        "지역별 직장인구",
                        "통근 시간대 분포",
                        "산업별 인구 구성"
                    ]
                },
                {
                    "id": "income-estimate",
                    "name": "소득 추정 데이터",
                    "description": "지역별 소득 수준 추정 정보",
                    "tags": ["소득", "추정", "구매력"],
                    "features": [
                        "가구 소득 추정",
                        "소득 분위별 분포",
                        "구매력 지수"
                    ]
                },
                {
                    "id": "migration",
                    "name": "인구 이동 데이터",
                    "description": "지역 간 인구 이동 및 전입출 정보",
                    "tags": ["이동", "전입", "전출"],
                    "features": [
                        "지역 간 이동 현황",
                        "전입/전출 사유",
                        "이동 패턴 분석"
                    ]
                },
                {
                    "id": "commute",
                    "name": "통근·통학 데이터",
                    "description": "출퇴근 및 통학 동선 정보",
                    "tags": ["통근", "통학", "교통"],
                    "features": [
                        "출퇴근 시간대별 동선",
                        "대중교통 이용 패턴",
                        "역세권 통근 인구"
                    ]
                },
                {
                    "id": "household",
                    "name": "가구 구성 데이터",
                    "description": "가구 유형 및 세대 구성 정보",
                    "tags": ["가구", "세대", "구성"],
                    "features": [
                        "1인 가구 비율",
                        "세대별 구성원 수",
                        "가구 유형 분포"
                    ]
                }
            ]
        }
    ]
}

# Save to JSON for frontend use
with open('data_products_curated.json', 'w', encoding='utf-8') as f:
    json.dump(data_products, f, ensure_ascii=False, indent=2)

print("Curated data products created!")
print(f"\nTotal categories: {len(data_products['categories'])}")
for category in data_products['categories']:
    print(f"  - {category['name']}: {len(category['products'])} products")
