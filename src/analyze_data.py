import pandas as pd
import json
from collections import defaultdict

# Read Excel file
df = pd.read_excel('bigvalue-platform-mart-data.xlsx')

# The first row contains headers/categories
# Get unique table descriptions to understand the data categories
header_row = df.iloc[0]
data_rows = df.iloc[1:]

# Get unique table descriptions (column index 2)
unique_tables = data_rows.iloc[:, 2].dropna().unique()

# Create categories based on table descriptions
categories = defaultdict(list)

# Analyze the data structure
for idx, row in data_rows.iterrows():
    table_name = row.iloc[1] if pd.notna(row.iloc[1]) else ""
    table_desc = row.iloc[2] if pd.notna(row.iloc[2]) else ""
    field_name = row.iloc[5] if pd.notna(row.iloc[5]) else ""
    field_desc = row.iloc[6] if pd.notna(row.iloc[6]) else ""

    if table_desc and field_name:
        # Categorize based on keywords in table description
        if any(keyword in table_desc for keyword in ['부동산', '아파트', '오피스텔', '주택', '토지', '건물', '실거래']):
            category = '부동산 데이터'
        elif any(keyword in table_desc for keyword in ['상권', '매출', '업종', '점포', '유동인구']):
            category = '상권 데이터'
        elif any(keyword in table_desc for keyword in ['기업', '사업자', '법인', '신용', '재무']):
            category = '기업 데이터'
        elif any(keyword in table_desc for keyword in ['금융', '대출', '금리', '투자', '은행']):
            category = '금융 데이터'
        elif any(keyword in table_desc for keyword in ['인구', '인적', '거주', '직장']):
            category = '인구 데이터'
        elif any(keyword in table_desc for keyword in ['교통', '지하철', '역', '도로']):
            category = '교통 데이터'
        elif any(keyword in table_desc for keyword in ['소비', '카드', '결제']):
            category = '소비 데이터'
        else:
            category = '기타 데이터'

        categories[category].append({
            'table_name': table_name.strip() if table_name else '',
            'table_desc': table_desc.strip() if table_desc else '',
            'field_name': field_name.strip() if field_name else '',
            'field_desc': field_desc.strip() if field_desc else ''
        })

# Print summary
print("=" * 80)
print("BigValue Platform Data Mart - Category Analysis")
print("=" * 80)
print(f"\nTotal data points: {len(data_rows)}")
print(f"\nCategories found: {len(categories)}")
print()

for category, items in sorted(categories.items()):
    # Get unique tables in this category
    unique_tables_in_category = set(item['table_desc'] for item in items if item['table_desc'])
    print(f"\n{category}:")
    print(f"  - Total fields: {len(items)}")
    print(f"  - Unique tables: {len(unique_tables_in_category)}")
    print(f"  - Table examples:")
    for table in list(unique_tables_in_category)[:3]:
        print(f"    - {table}")

# Save categorized data to JSON for frontend use
output = {
    'categories': {}
}

for category, items in categories.items():
    # Group by table description
    tables = defaultdict(list)
    for item in items:
        if item['table_desc']:
            tables[item['table_desc']].append({
                'field': item['field_name'],
                'description': item['field_desc']
            })

    output['categories'][category] = {
        'name': category,
        'tables': [
            {
                'name': table_desc,
                'fields': fields
            }
            for table_desc, fields in tables.items()
        ]
    }

# Save to JSON
with open('categorized_data.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("\n\n" + "=" * 80)
print("Categorized data saved to: categorized_data.json")
print("=" * 80)
