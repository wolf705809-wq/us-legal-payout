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
    """구글봇을 속이기 위한 문장 구조 다변화 로직"""
    
    # 1. 타이틀 변형 (주마다 제목 스타일이 달라짐)
    h1_templates = [
        f"{state_name} 18-Wheeler Statutory Audit",
        f"Uncover Your Settlement Gap in {state_name}",
        f"{state_name} Commercial Truck Liability Report",
        f"Statutory Recovery Floor: {state_name} Edition"
    ]
    
    # 2. 첫 문장 변형 (인트로 문구를 섞음)
    intros = [
        f"In {state_name}, insurance algorithms are calibrated to devalue claims.",
        f"The trucking liability framework in {state_name} is complex by design.",
        f"Recovering damages after a commercial wreck in {state_name} requires precise data.",
        f"Every 18-wheeler incident in {state_name} falls under specific statutory floors."
    ]
    
    # 3. 데이터 결합 문장 (JSON 데이터를 문장 속에 녹여냄)
    highway = row.get('major_highway', 'local interstate')
    stats = row.get('crash_stats', 'significant annual incidents')
    
    narratives = [
        f"With heavy congestion on {highway}, {state_name} records {stats} annually.",
        f"Statutory audits for {state_name} frequently focus on {highway} traffic data.",
        f"Our engine analyzes the {stats} that occur near {highway} to establish your recovery floor.",
        f"The {highway} corridor in {state_name} remains a primary zone for high-value litigation."
    ]

    return {
        "dynamic_h1": random.choice(h1_templates),
        "dynamic_intro": random.choice(intros),
        "dynamic_narrative": random.choice(narratives),
        "seo_description": f"Authorized statutory audit for {state_name} truck accidents. Mapping {highway} data to identify recovery floors."
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
