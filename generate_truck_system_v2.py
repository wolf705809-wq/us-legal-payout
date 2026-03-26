import os
import pandas as pd
from pathlib import Path
import sys

# 1. 경로 설정
ROOT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
DATA_PATH = ROOT_DIR / "top_3000_with_highways.csv"
OUTPUT_ROOT = ROOT_DIR / "truck"

# 2. scripts 폴더를 파이썬 경로에 추가 (smart_sitemap 임포트용)
sys.path.append(str(ROOT_DIR / "scripts"))
from smart_sitemap import generate_stealth_sitemap

def get_dynamic_content(city, state_id, highways):
    """도시별 고유 문구를 생성하여 중복 콘텐츠 페널티를 회피합니다."""
    # 고대의대급 파트너가 강조할 '데이터 기반 분석' 문구
    risk_summary = f"Forensic analysis of the {highways} corridor in {city} reveals significant commercial vehicle density. This audit decodes federal safety violations specific to {state_id} jurisdiction."

    return {
        "truck_risk_summary": risk_summary,
        "seo_title": f"{city}, {state_id} Truck Accident Statutory Audit | 18-Wheeler Protocol",
        "seo_description": f"Authorized 18-wheeler accident audit for {city}, {state_id}. Analyzing carrier policy layers and FMCSA safety compliance on {highways}."
    }

def render_template(template: str, values: dict) -> str:
    rendered = template
    for key, val in values.items():
        # {{ key }} 와 {{key}} 모두 대응
        rendered = rendered.replace(f"{{{{ {key} }}}}", str(val))
        rendered = rendered.replace(f"{{{{{key}}}}}", str(val))
    return rendered

def generate_pages():
    if not TEMPLATE_PATH.exists():
        print(f"❌ 에러: {TEMPLATE_PATH} 파일이 없습니다.")
        return

    # 템플릿 읽기
    template_html = TEMPLATE_PATH.read_text(encoding="utf-8")
    
    # CSV 데이터 로드
    df = pd.read_csv(DATA_PATH)
    print(f"🚀 {len(df)}개 도시 페이지 생성 및 물리적 구조화 시작...")

    for index, row in df.iterrows():
        city = str(row['city'])
        state_id = str(row['state_id'])
        highways = str(row['major_highways'])
        
        # URL 및 폴더용 슬러그
        state_slug = state_id.lower()
        city_slug = city.lower().replace(' ', '-')
        
        # 동적 문구 생성
        dynamic = get_dynamic_content(city, state_id, highways)
        
        # 템플릿 치환 값 매칭
        render_values = {
            "state_name": f"{city}, {state_id}",
            "truck_risk_summary": dynamic["truck_risk_summary"],
            "statute_code": "DECODING. . .", 
            "real_statute_code": f"FMCSA-390.{index+1024}", # 유니크한 가짜 실존 코드 효과
            "seo_title": dynamic["seo_title"],
            "seo_description": dynamic["seo_description"],
            "major_highways": highways # JS에서 쓸 데이터
        }
        
        rendered = render_template(template_html, render_values)
        
        # 주(State)별 폴더 구조 생성 (예: truck/fl/miami.html)
        state_dir = OUTPUT_ROOT / state_slug
        if not state_dir.exists():
            os.makedirs(state_dir)
            
        output_path = state_dir / f"{city_slug}.html"
        output_path.write_text(rendered, encoding="utf-8")
        
        if index % 500 == 0 and index > 0:
            print(f"📊 진행 상황: {index}개 도시 돌파...")

    print(f"✅ 총 {len(df)}개 정적 페이지 생성 완료.")

if __name__ == "__main__":
    # 실행 순서: 페이지 생성 -> 사이트맵 업데이트
    generate_pages()
    generate_stealth_sitemap()
    print("🚀 모든 시스템이 [v2026.03] 규격으로 업데이트되었습니다.")