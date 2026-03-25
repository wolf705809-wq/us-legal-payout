import os
import re
from pathlib import Path
from typing import Any, Dict, List
from supabase import Client, create_client

ROOT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
OUTPUT_ROOT = ROOT_DIR / "truck"

# 트럭 폴더가 없으면 생성
if not OUTPUT_ROOT.exists():
    os.makedirs(OUTPUT_ROOT)

def get_supabase_client() -> Client:
    supabase_url = os.getenv("SUPABASE_URL", "").strip()
    supabase_key = os.getenv("SUPABASE_API_KEY", "").strip() or os.getenv("SUPABASE_ANON_KEY", "").strip()
    return create_client(supabase_url, supabase_key)

def build_risk_summary(row: Dict[str, Any]) -> str:
    highway = row.get("major_highway", "primary freight corridors")
    crash_stats = row.get("crash_stats", "regional truck incident data")
    weather = row.get("weather_factor", "local road hazard factors")
    return f"High-risk exposure: {highway}. {crash_stats}. Weather threat: {weather}."

def render_template(template: str, values: Dict[str, str]) -> str:
    rendered = template
    for key, val in values.items():
        # {{ key }} 형태를 찾아서 val로 교체
        rendered = rendered.replace(f"{{{{ {key} }}}}", str(val))
    return rendered

def generate_pages() -> None:
    if not TEMPLATE_PATH.exists(): 
        print("Template not found!")
        return
    
    template_html = TEMPLATE_PATH.read_text(encoding="utf-8")
    client = get_supabase_client()
    
    # 데이터 가져오기
    truck_rows = client.table("truck_state_profiles").select("*").eq("is_active", True).execute().data or []
    state_rows = client.table("state_profiles").select("state_key, statute_authority").execute().data or []
    
    statute_map = {row["state_key"].lower(): row["statute_authority"] for row in state_rows}

    for row in truck_rows:
        state_name = row["state_name"]
        state_slug = row["state_key"].lower()
        
        # 최적화된 파일 경로: truck/texas.html
        output_path = OUTPUT_ROOT / f"{state_slug}.html"

        rendered = render_template(template_html, {
            "state_name": state_name,
            "statute_code": statute_map.get(state_slug, "Statutory reference pending"),
            "truck_risk_summary": build_risk_summary(row),
            "seo_title": f"{state_name} 18-Wheeler Accident Settlement Audit | Nodal",
        })
        
        output_path.write_text(rendered, encoding="utf-8")
        print(f"✅ Generated: {output_path.name}")

if __name__ == "__main__":
    generate_pages()
