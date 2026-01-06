import pandas as pd
import json

# Read Excel file
df = pd.read_excel('bigvalue-platform-mart-data.xlsx')

# Save as JSON for easier analysis
df_json = df.to_dict('records')

# Save to file
with open('data_products.json', 'w', encoding='utf-8') as f:
    json.dump(df_json, f, ensure_ascii=False, indent=2)

# Print summary
print(f"Total rows: {len(df)}")
print(f"\nColumns: {list(df.columns)}")
print(f"\nFirst 5 rows:")
print(df.head(5).to_string())

print("\n\nJSON file created: data_products.json")
