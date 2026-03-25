import os
import re
from pathlib import Path
from typing import Any, Dict, List
from supabase import Client, create_client

ROOT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
OUTPUT_ROOT = ROOT_DIR / "truck"

def get_supabase_client() -> Client:
    supabase_url = os.getenv("SUPABASE_URL", "").strip()
    supabase_key = os.getenv("SUPABASE_API_KEY", "").strip() or os.getenv("SUPABASE_ANON_KEY", "").strip()
    return create_client(supabase_url, supabase_key)

def slugify(value: str) -> str:
    clean = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return clean or "unknown-state"

def build_risk_summary(row: Dict[str, Any]) -> str:
    highway = row.get("major_highway", "primary freight corridors")
    crash_stats = row.get("crash_stats", "regional truck incident data")
    weather = row.get("weather_factor", "local road hazard factors")
    return f"High-risk freight exposure across {highway}; {crash_stats}; {weather}."

def render_template(template: str, values: Dict[str, str]) -> str:
    rendered = template
    for key, val in values.items():
        rendered = rendered.replace(f"{{{{ {key} }}}}", val)
    return rendered

def fetch_truck_data(client: Client) -> List[Dict[str, Any]]:
    # 50개 제한은 두되, 데이터가 조금 부족해도 진행하도록 수정
    truck_rows = client.table("truck_state_profiles").select("*").eq("is_active", True).limit(50).execute().data or []
    state_rows = client.table("state_profiles").select("state_key, statute_authority").eq("is_active", True).execute().data or []
    
    statute_map = {str(row.get("state_key", "")).strip().lower(): str(row.get("statute_authority", "")).strip() for row in state_rows}
    for row in truck_rows:
        key = str(row.get("state_key", "")).strip().lower()
        row["statute_code"] = statute_map.get(key, "Statutory reference pending")
    return truck_rows

def generate_pages() -> None:
    if not TEMPLATE_PATH.exists(): return
    template_html = TEMPLATE_PATH.read_text(encoding="utf-8")
    client = get_supabase_client()
    truck_data = fetch_truck_data(client)

    for row in truck_data:
        state_name = str(row.get("state_name", "")).strip()
        state_slug = str(row.get("state_key", "")).strip().lower() or slugify(state_name)
        
        # 폴더를 만들지 않고 truck/ 폴더 바로 아래에 '주이름.html'로 저장
output_file = OUTPUT_ROOT / f"{state_slug}.html"
output_file.write_text(rendered, encoding="utf-8")
    print(f"Generated {len(truck_data)} Truck Pages.")

if __name__ == "__main__":
    generate_pages()
