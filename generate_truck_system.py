import os
import json
import random
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
DATA_PATH = ROOT_DIR / "truck_state_profiles.json"
OUTPUT_ROOT = ROOT_DIR / "truck"

if not OUTPUT_ROOT.exists():
    os.makedirs(OUTPUT_ROOT)

def get_dynamic_content(state_name, row):
    """최소한의 필수 데이터만 생성하여 KeyError를 방지합니다."""
    highway = row.get('major_highway', 'local interstate')
    stats = row.get('crash_stats', 'significant annual incidents')
    
    # 리스크 요약 한 줄 생성
    risk_summary = f"Analysis of the {highway} corridor identifies {stats} per annum. This audit maps these vectors against the statutory floor."

    return {
        "truck_risk_summary": risk_summary,
        "seo_description": f"Authorized 18-wheeler accident audit for {state_name}. Analyze carrier policy layers and federal safety compliance on {highway}."
    }

def render_template(template: str, values: dict) -> str:
    rendered = template
    for key, val in values.items():
        # 중괄호 사이의 공백 유무와 상관없이 치환되도록 처리
        rendered = rendered.replace(f"{{{{ {key} }}}}", str(val))
        rendered = rendered.replace(f"{{{{{key}}}}}", str(val))
    return rendered

def generate_pages():
    template_html = TEMPLATE_PATH.read_text(encoding="utf-8")
    
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        truck_data = json.load(f)

    for row in truck_data:
        state_name = row["state_name"]
        state_slug = row["state_key"].lower().replace(' ', '_')
        
        # 동적 데이터 가져오기
        dynamic = get_dynamic_content(state_name, row)
        
        # 템플릿에 들어갈 값들 매칭 (KeyError 발생하지 않도록 수정됨)
        render_values = {
            "state_name": state_name,
            "truck_risk_summary": dynamic["truck_risk_summary"],
           "statute_code": row.get("fmcsa_code", "DECODING. . ."),
            "seo_title": f"{state_name} 18-Wheeler Statutory Audit | Nodal v2026",
            "seo_description": dynamic["seo_description"]
        }
        
        rendered = render_template(template_html, render_values)
        
        output_path = OUTPUT_ROOT / f"{state_slug}.html"
        output_path.write_text(rendered, encoding="utf-8")
        print(f"✅ Generated: {output_path.name}")

if __name__ == "__main__":
    generate_pages()
