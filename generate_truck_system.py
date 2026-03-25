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
    """문구를 템플릿에서 고정했으므로, 최소한의 SEO 데이터만 반환합니다."""
    
    highway = row.get('major_highway', 'local interstate')
    stats = row.get('crash_stats', 'significant annual incidents')
    
    # 템플릿에 들어갈 리스크 요약 한 줄만 생성
    risk_summary = f"Analysis of the {highway} corridor confirms {stats} occurring annually. This audit maps these vectors against the statutory floor."

    return {
        "dynamic_narrative": risk_summary,
        "seo_description": f"Authorized 18-wheeler accident audit for {state_name}. Analyze carrier policy layers and federal safety compliance on {highway}."
    }

def render_template(template: str, values: dict) -> str:
    rendered = template
    for key, val in values.items():
        rendered = rendered.replace(f"{{{{ {key} }}}}", str(val))
    return rendered

def generate_pages():
    template_html = TEMPLATE_PATH.read_text(encoding="utf-8")
    
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        truck_data = json.load(f)

    for row in truck_data:
        state_name = row["state_name"]
        state_slug = row["state_key"].lower()
        
        # SEO 보강 데이터 생성
        dynamic = get_dynamic_content(state_name, row)
        
        rendered = render_template(template_html, {
            "state_name": state_name,
            "dynamic_h1": dynamic["dynamic_h1"],
            "dynamic_intro": dynamic["dynamic_intro"],
            "truck_risk_summary": dynamic["dynamic_narrative"],
            "statute_code": row.get("statute_authority", "Statutory reference pending"),
            "seo_title": f"{state_name} Truck Accident Audit | Nodal v2026",
            "seo_description": dynamic["seo_description"]
        })
        
        output_path = OUTPUT_ROOT / f"{state_slug}.html"
        output_path.write_text(rendered, encoding="utf-8")
        print(f"✅ SEO Optimized: {output_path.name}")

if __name__ == "__main__":
    generate_pages()
