import os
import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
DATA_PATH = ROOT_DIR / "truck_state_profiles.json" # 로컬 JSON 파일 경로
OUTPUT_ROOT = ROOT_DIR / "truck"

if not OUTPUT_ROOT.exists():
    os.makedirs(OUTPUT_ROOT)

def render_template(template: str, values: dict) -> str:
    rendered = template
    for key, val in values.items():
        rendered = rendered.replace(f"{{{{ {key} }}}}", str(val))
    return rendered

def generate_pages():
    # 1. 템플릿 읽기
    template_html = TEMPLATE_PATH.read_text(encoding="utf-8")
    
    # 2. 로컬 JSON 데이터 읽기 (Supabase 대신!)
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        truck_data = json.load(f)

    # 3. 페이지 생성
    for row in truck_data:
        state_name = row["state_name"]
        state_slug = row["state_key"].lower()
        
        # 리스크 요약 문구 생성
        risk_summary = f"High-risk exposure: {row.get('major_highway')}. {row.get('crash_stats')}. Weather threat: {row.get('weather_factor')}."
        
        rendered = render_template(template_html, {
            "state_name": state_name,
            "statute_code": row.get("statute_authority", "Statutory reference pending"),
            "truck_risk_summary": risk_summary,
            "seo_title": f"{state_name} 18-Wheeler Accident Settlement Audit | Nodal",
        })
        
        output_path = OUTPUT_ROOT / f"{state_slug}.html"
        output_path.write_text(rendered, encoding="utf-8")
        print(f"✅ Generated: {output_path.name}")

if __name__ == "__main__":
    generate_pages()
