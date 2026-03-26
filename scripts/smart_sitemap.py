import pandas as pd
from datetime import datetime
from pathlib import Path

# 설정
BASE_URL = "https://www.us-settlement-review.com"
START_DATE = datetime(2026, 3, 27) # 런칭 날짜
DAILY_INCREMENT = 50 # 하루에 추가될 페이지 수

def generate_stealth_sitemap():
    df = pd.read_csv('top_3000_with_highways.csv')
    
    # 오늘까지 노출할 개수 계산
    days_passed = (datetime.now() - START_DATE).days
    if days_passed < 0: days_passed = 0
    
    show_count = 100 + (days_passed * DAILY_INCREMENT) # 첫날 100개로 시작
    target_list = df.head(min(show_count, 3000))

    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # 메인 페이지 추가
    sitemap_xml += f'  <url><loc>{BASE_URL}/</loc><priority>1.0</priority></url>\n'

    for _, row in target_list.iterrows():
        state_slug = str(row['state_id']).lower()
        city_slug = str(row['city']).lower().replace(' ', '-')
        url = f"{BASE_URL}/truck/{state_slug}/{city_slug}"
        
        sitemap_xml += f'  <url>\n'
        sitemap_xml += f'    <loc>{url}</loc>\n'
        sitemap_xml += f'    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>\n'
        sitemap_xml += f'    <changefreq>weekly</changefreq>\n'
        sitemap_xml += f'    <priority>0.8</priority>\n'
        sitemap_xml += f'  </url>\n'
    
    sitemap_xml += '</urlset>'
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_xml)
    
    print(f"📡 Stealth Sitemap Updated: {len(target_list)} / 3000 cities exposed.")

if __name__ == "__main__":
    generate_stealth_sitemap()