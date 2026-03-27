import pandas as pd
from datetime import datetime

# 설정
BASE_URL = "https://www.us-settlement-review.com"

def generate_stealth_sitemap():
    try:
        df = pd.read_csv('top_3000_with_highways.csv')
    except FileNotFoundError:
        print("❌ 에러: CSV 파일을 찾을 수 없습니다.")
        return

    # 족쇄 해제: 100개 제한 로직 삭제
    target_list = df 

    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap_xml += f'  <url><loc>{BASE_URL}/</loc><priority>1.0</priority></url>\n'

    for _, row in target_list.iterrows():
        state_slug = str(row['state_id']).lower().strip()
        city_slug = str(row['city']).lower().replace(' ', '-').strip()
        url = f"{BASE_URL}/truck/{state_slug}/{city_slug}"
        sitemap_xml += f'  <url><loc>{url}</loc><lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod><priority>0.8</priority></url>\n'
    
    sitemap_xml += '</urlset>'
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_xml)
        
    # [중요] 이 문구가 터미널에 떠야 성공입니다!
    print(f"📡 0.1% Stealth Mode: All {len(target_list)} cities indexed in sitemap.xml.")

if __name__ == "__main__":
    generate_stealth_sitemap()