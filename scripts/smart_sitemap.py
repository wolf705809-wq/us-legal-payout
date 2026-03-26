import pandas as pd
from datetime import datetime

# 설정
BASE_URL = "https://www.us-settlement-review.com"
START_DATE = datetime(2026, 3, 27) 
DAILY_INCREMENT = 50 

def generate_stealth_sitemap():
    df = pd.read_csv('top_3000_with_highways.csv')
    days_passed = (datetime.now() - START_DATE).days
    if days_passed < 0: days_passed = 0
    show_count = 100 + (days_passed * DAILY_INCREMENT)
    target_list = df.head(min(show_count, 3000))

    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap_xml += f'  <url><loc>{BASE_URL}/</loc><priority>1.0</priority></url>\n'

    for _, row in target_list.iterrows():
        state_slug = str(row['state_id']).lower()
        city_slug = str(row['city']).lower().replace(' ', '-')
        url = f"{BASE_URL}/truck/{state_slug}/{city_slug}"
        sitemap_xml += f'  <url><loc>{url}</loc><lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod><priority>0.8</priority></url>\n'
    sitemap_xml += '</urlset>'
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_xml)
    print(f"📡 Sitemap Updated: {len(target_list)} cities.")

if __name__ == "__main__":
    generate_stealth_sitemap()