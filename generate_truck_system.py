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
    """트럭 전용 문구로 구성하며, 모든 에러 요인(KeyError)을 제거한 버전"""
    
    # 1. 트럭 전용 제목
    h1_options = [
        f"{state_name} 18-Wheeler Liability Infrastructure",
        f"Commercial Carrier Compliance Audit: {state_name}",
        f"{state_name} Federal Trucking Safety Verification",
        f"Audit the $750k+ Statutory Floor in {state_name}"
    ]
    
    # 2. 트럭 전용 인트로 (Don't fight unarmed 대신 들어갈 문구)
    intro_options = [
        f"Large carriers hide behind complex corporate layers. Our engine decodes FMCSA safety violations and {state_name} insurance floors that adjusters often omit.",
        f"We analyze black-box data and commercial policy limits to identify the true recovery floor for {state_name} trucking incidents.",
        f"Commercial insurers leverage technical complexity to suppress claims. This infrastructure verifies {state_name} statutory liability against federal safety standards."
    ]
    
    # 3. 트럭 리스크 요약 (에러가 났던 부분! truck_risk_summary로 들어갈 문구)
    highway = row.get('major_highway', 'local interstate')
    stats = row.get('crash_stats', 'significant annual incidents')
    
    narrative_options = [
        f"With heavy congestion on {highway}, {state_name} records {stats} annually. This audit captures these risk vectors.",
        f"Statutory audits for {state_name} focus on the {highway} corridor, where {stats} occur regularly.",
        f"Our engine maps the {stats} near {highway} to establish a non-negotiable recovery floor."
    ]
    
    # 4. 하단 시스템 라벨
    label_options = [
        "FEDERAL CARRIER COMPLIANCE UNIT | FMCSA DATA SYNC [v2026.03]",
        "COMMERCIAL POLICY LAYER AUDIT | JURISDICTIONAL SECURE [v2026.03]",
        "18-WHEELER STATUTORY MONITOR | STATE-SPECIFIC PROTOCOL [v2026.03]"
    ]

    return {
        "dynamic_h1": random.choice(h1_options),
        "dynamic_intro": random.choice(intro_options),
        "dynamic_narrative": random.choice(narrative_options), # 이 줄이 빠져서 에러가 났던 겁니다!
        "system_label": random.choice(label_options),
        "seo_description": f"Authorized 18-wheeler accident audit for {state_name}. Analyze carrier policy layers and federal safety compliance."
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
